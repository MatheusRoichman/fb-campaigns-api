import e from "express";

export interface MongoUrlOptions {
  username: string;
  password: string;
  host: string;
  database: string;
  port?: number;
  retryWrites?: boolean;
  w?: string;
}

export type MongoAtlasUrlOptions = Omit<MongoUrlOptions, "port">;

export const buildMongoAtlasUrl = (mongoConfig: MongoAtlasUrlOptions): string => {
  const {
    username,
    password,
    host,
    database,
    retryWrites = true, 
    w = "majority"
  } = mongoConfig;

  const mongoUrl = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=${retryWrites}&w=${w}`;

  return mongoUrl;
}
