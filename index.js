import express from 'express';
import cors from 'cors';

const app = express()

const PORT = 8080

app.listen(PORT, () => {
    console.log("The server is listening on", PORT);
});