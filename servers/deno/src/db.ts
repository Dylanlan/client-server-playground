import { Client } from "./deps.ts";

class Database {
  client: any;

  constructor() {
    this.connect();
  }

  async connect() {
    const env = Deno.env.toObject();

    this.client = new Client({
      user: env.PG_USER,
      password: env.PG_PASSWORD,
      database: env.PG_DB,
      hostname: env.PG_HOST,
      port: env.PG_PORT,
    });

    await this.client.connect();
  }
}

export default new Database().client;



