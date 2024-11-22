import express from 'express';
import "dotenv/config";
import cors from 'cors';

const { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

const app = express()

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`The server is listening on ${BACKEND_URL}:${PORT}`);
  });