import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { config as configDotenv } from 'dotenv';
import { buildMongoAtlasUrl } from './utils/buildMongoUrl';
import targetAudienceRoutes from './routes/target_audience';
import campaignRoutes from './routes/campaign';

configDotenv();

const app = express();
app.use(json());
app.use(cors());

app.use(targetAudienceRoutes);
app.use(campaignRoutes);

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

mongoose.connect(buildMongoAtlasUrl({
  username: process.env.MONGODB_USERNAME ?? '',
  password: process.env.MONGODB_PASSWORD ?? '',
  host: process.env.MONGODB_HOST ?? '',
  database: process.env.MONGODB_DATABASE ?? '',
})).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.log(err);
});
