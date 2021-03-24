import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "production";
export const PORT = process.env.PORT || 8080;
export const SECRET = process.env.SECRET || "";
