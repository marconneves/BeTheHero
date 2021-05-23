import { Request, Response } from 'express';

import connection from '../database/connection';
import Sentry from '../config/sentry';

type IndexProps = {
    page: number;
}

export default {
    async index(request: Request, response: Response){
        const { page = 1 } = (request.query as unknown) as IndexProps;
        const transaction = Sentry.startTransaction({
            op: "incident_index",
            name: "List incidents",
            data: {
                page
            }
        });

        try {
            const { count } = await connection('incidents').select({
                count: connection.raw('count(*)')
            }).first()
    
            const incidents = await connection('incidents')
                .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                .limit(5)
                .offset((page-1)*5)
                .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
            response.header('X-Total-Count', count);
        
            return response.json(incidents);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    },
    async create(request: Request, response: Response){
        const { title, description, value } = request.body,
            ong_id = request.headers.authorization;
        
        const transaction = Sentry.startTransaction({
            op: "incident_create",
            name: "Create a new incident",
            data: {
                body: request.body
            }
        });

        try {
            const [ id ] = await connection('incidents').insert({
                title,
                description,
                value,
                ong_id
            });
    
            return response.json({id});
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }

    },
    async delete(request: Request, response: Response){
        const {id} = request.params,
            ong_id = request.headers.authorization;

        const transaction = Sentry.startTransaction({
            op: "incident_delete",
            name: "Delete a incident",
            data: {
                id
            }
        });

        try {
            const incident = await connection('incidents')
                .where('id', id)
                .select('ong_id')
                .first();

            if(!incident){
                return response.status(404).json({error: 'Incident Not Found.'});
            }
            
            if(incident.ong_id!==ong_id){
                return response.status(401).json({error: 'Operation not permitted.'});
            }
            await connection('incidents').where('id', id).delete();

            return response.status(204).send();
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    }
};