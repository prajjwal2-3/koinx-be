import { DataSource } from "typeorm";
import { config } from "../config/dotenv";
import { Coins } from "./entities/Coins";
export const AppDataSource = new DataSource({
    type: "mongodb",
    url: config.DATABASE_URL,
    entities: [Coins],
})