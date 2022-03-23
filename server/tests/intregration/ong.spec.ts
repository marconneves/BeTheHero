import supertest from 'supertest';

import app from '../../src/app';
import connection from '../../src/database/connection';

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('should be able to create a new ONG', async () => {
    const response = await supertest(app).post('/sandbox/ongs').send({
      name: 'DogVile',
      email: 'DogVile@moc.com',
      whatsapp: '66996956504',
      city: 'Pelotas',
      uf: 'RS'
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
