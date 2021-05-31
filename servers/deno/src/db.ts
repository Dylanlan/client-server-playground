import { DataTypes, Database, Model, PostgresConnector } from 'https://deno.land/x/denodb/mod.ts';

const env = Deno.env.toObject();

const connection = new PostgresConnector({
  username: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DB,
  host: env.PG_HOST,
});

export const db = new Database(connection);

export class Thing extends Model {
  static table = 'things';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  };
}

db.link([Thing]);
