import express from 'express';
import helmet from 'helmet';
import 'module-alias/register';
import "reflect-metadata";
import {createConnection} from "typeorm";

import {ApiServer} from "./ApiServer";


const app = express();
app.use(helmet());


export const dbConnection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "wineshop",
    entities: ['dist/**/entity/*.{js,ts}'],
    synchronize: true,
    logging: false
});

const apiServer = new ApiServer();
apiServer.start(8000);

