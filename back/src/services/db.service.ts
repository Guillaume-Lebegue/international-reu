import {
  Database,
  MongoDBConnector,
} from "https://deno.land/x/denodb@v1.0.38/mod.ts";

import UserModel from "../models/user.model.ts";

class DBService {
  public connection?: MongoDBConnector;
  public db?: Database;

  constructor() {}

  connect() {
    this.connection = new MongoDBConnector({
      uri: Deno.env.get("DB_HOST") as string,
      database: Deno.env.get("DB_NAME") as string,
    });

    console.log(
      `Connecting Mongodb to ${this.connection._options.uri}/${this.connection._options.database}`,
    );

    this.db = new Database(this.connection);

    this.db.link([UserModel]);

    this.db.sync();
  }
}

const dbService = new DBService();

export default dbService;
