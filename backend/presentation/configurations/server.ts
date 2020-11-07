import 'reflect-metadata';
import '../../application/autoMappers/configuration.mapper';
import '../../infrastructure/crosscutting/ioc/metadata';

import * as helmet from 'helmet';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from '../../infrastructure/crosscutting/ioc/inversify.config';
import { Logger } from '../../application/commons/core/logger';
import { Database } from '../../infrastructure/data/context/database';

class Server {

  public inversifyExpress: InversifyExpressServer;

  public express: express.Application;

  public constructor() {
    this.inversifyExpress = new InversifyExpressServer(container);
    this.configuration()
      .then(() => this.status()
        .then(() => this.database()));
  }

  private configuration() {
    return new Promise((resolve, reject) => {
      try {
        dotenv.config();
        const allowCors = require('./cors');

        this.inversifyExpress.setConfig((server) => {
          server.use(bodyParser.urlencoded({ extended: true, limit: '3mb' }));
          server.use(bodyParser.json({ limit: '3mb' }));
          server.use(allowCors);
          server.use(helmet());
        });

        this.express = this.inversifyExpress.build();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private database() {
    new Database().Build();
  }

  public status() {
    return new Promise((resolve) => {
      const port = process.env.PORT || 4001;

      if (!process.env.SECRET) {
        Logger.Error(this, 'Did not find the environment variables!');
      } else {
        Logger.Info(this, 'Environment variables loaded!');
      }
      const server = this.express.listen(port, function () {
        Logger.Info(this, `Backend is running on port ${port}.`);
        resolve();
      });
    });
  }
}

export default new Server().express;