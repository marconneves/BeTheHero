import { Request, Response } from 'express';

import Sentry from '../config/sentry';
import connection from '../database/connection';

export default {
  async index(request: Request, response: Response) {
    const ong_id = request.headers.authorization as string;

    Sentry.setUser({ id: ong_id });

    const transaction = Sentry.startTransaction({
      op: 'profile_index',
      name: 'Show profile of ong'
    });

    try {
      const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .select('*');

      return response.json(incidents);
    } catch (error) {
      Sentry.captureException(error);
      return response.status(400).json({ error: true, message: error });
    } finally {
      transaction.finish();
    }
  }
};
