import dotenv from "dotenv";

dotenv.config();

export const config = {
  accessKeyId: process.env.accessKeyId || "accessKeyId",
  secretAccessKey: process.env.secretAccessKey || "secretAccessKey",
};
