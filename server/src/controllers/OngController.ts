import { Request, Response } from 'express';

import Sentry from '../config/sentry';
import connection from '../database/connection';
import generateUniqueId from '../utils/generateUniqueId';

export default {
  async index(request: Request, response: Response) {
    const transaction = Sentry.startTransaction({
      op: 'ong_index',
      name: 'List ongs'
    });

    try {
      const ongs = await connection('ongs').select('*');

      return response.json(ongs);
    } catch (error) {
      Sentry.captureException(error);
      return response.status(400).json({ error: true, message: error });
    } finally {
      transaction.finish();
    }
  },
  async create(request: Request, response: Response) {
    const transaction = Sentry.startTransaction({
      op: 'ong_create',
      name: 'Create a new ong',
      data: {
        body: request.body
      }
    });

    try {
      const { name, email, whatsapp, city, uf } = request.body;
      const id = generateUniqueId(4);

      await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      });

      return response.json({ id });
    } catch (error) {
      Sentry.captureException(error);
      return response.status(400).json({ error: true, message: error });
    } finally {
      transaction.finish();
    }
  }
};
