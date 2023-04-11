// import {MongoClient} from 'mongodb';
import wordBank from "./wordle-bank.txt";

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

// export const generateWordSet = async() => {
//     let db;
//     let wordBankArr= [];

//     // const client = new MongoClient(process.env.MONGO_CONNECT);
//     const client = new MongoClient('mongodb://127.0.0.1:27017');
//     await client.connect();
//     db = client.db('wordbank')
//     let result = await db.collection("words").find({}).toArray()
//     for await(const item of result) {
//         wordBankArr.push(item['aback'])
//     }

//     let wordSet = new Set(wordBankArr)
    
//     return { wordSet }
// }

export const generateWordSet = async () => {
    let wordSet;

    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split('\n');
            wordSet = new Set(wordArr)
        });

        return { wordSet }
}