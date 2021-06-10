import { DataTypes, Model } from "https://deno.land/x/denodb@v1.0.38/mod.ts";

class User extends Model {
  static table = "users";
  static timestamp = true;

  static fields = {
    _id: { primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    timeOffset: { type: DataTypes.INTEGER, allowNull: false },
    timezone: { type: DataTypes.STRING, allowNull: false },
  };
}

export interface JsonUser {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  timeOffset: number;
  timezone: string;
}

export default User;
