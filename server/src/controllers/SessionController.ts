import { Request, Response } from 'express';

import connection from '../database/connection';
import Sentry from '../config/sentry';

export default {
    async create(request: Request, response: Response){
        const { id } = request.body;

        Sentry.setUser({ id });
        const transaction = Sentry.startTransaction(
            {
                op: "session_create",
                name: "Create a session of a ong",
            }
        );

        try {
            const ong = await connection('ongs')
                .where('id', id)
                .select('name')
                .first();

            if(!ong){
                return response.status(400).json({error: 'No ONG found with this ID'})
            }

            return response.json(ong);
        } catch (error) {
            Sentry.captureException(error);
            return response.status(400).json({error: true, message: error});
        } finally {
            transaction.finish();
        }
    },
};