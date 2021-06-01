import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

class User extends Model {
  static table = "users";
  static timestamp = true;

  static fields = {
    _id: { primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    timeOffset: { type: DataTypes.INTEGER, allowNull: false },
  };

  static defaults = {
    timeOffset: 0,
  };
}

export interface JsonUser {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  timeOffset: string;
}

export default User;
