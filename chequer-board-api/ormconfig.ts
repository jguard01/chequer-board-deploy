import './src/boilerplate.polyfill';

import { SnakeNamingStrategy } from './src/snake-naming.strategy';

module.exports = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    synchronize: true,
    migrations: ['src/migrations/*{.ts,.js}'],
};