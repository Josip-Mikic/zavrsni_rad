import mongoose from "mongoose";

const zSchema = mongoose.Schema(
  {
    //kako ce izgledati relacija
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
  }, //opcije
  {
    timestamps: true, //kada kreiras ovaj entity, dodaj kad je kreiran i uređivan vrijeme
  }
);
const User = mongoose.model("User", zSchema);
//User je tablica napravljena po modelu userSchema

export default User;
