require('dotenv').config();
import express, { json } from 'express';
const app = express();

app.use(json());

app.get("/api/test", async function(req, res) {
    res.json( {message:'Connected to backend'} );
});

export default app;