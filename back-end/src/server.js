import express from 'express';
import path from 'path';
import { db, connectToDb} from './db.js';
import {fileURLToPath} from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../build')))


app.get("/api", async (req, res) => {
    const words = await db.collection('words').find({});
    const allMovies = await words.toArray();
    res.send(allMovies)
})

connectToDb(() =>{
    console.log('Successfully connected to Database')
    app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})
})