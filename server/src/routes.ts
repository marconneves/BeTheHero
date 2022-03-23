import { celebrate, Joi, Segments } from 'celebrate';
import { Application, Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import IncidentController from './controllers/IncidentController';
import OngController from './controllers/OngController';
import ProfileController from './controllers/ProfileController';
import SessionController from './controllers/SessionController';
import swaggerFile from './docs/swagger.json';

export default (app: Application) => {
  const routes = Router();

  app.use(routes);

  routes.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, {
      customSiteTitle: 'HooPay Documentations',
      customfavIcon: 'https://avatars.githubusercontent.com/u/100241471?v=4',
      swaggerUrl: '/docs.json'
    })
  );

  routes.post('/session', SessionController.create);

  routes.get(
    '/profile',
    celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown()
    }),
    ProfileController.index
  );

  routes.get('/ongs', OngController.index);
  routes.post(
    '/ongs',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
      })
    }),
    OngController.create
  );

  routes.get('/incidents', IncidentController.index);

  routes.post(
    '/incidents',
    celebrate({
      [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
      }).unknown(),
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
      })
    }),
    IncidentController.create
  );
  routes.delete(
    '/incidents/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    }),
    IncidentController.delete
  );
};
