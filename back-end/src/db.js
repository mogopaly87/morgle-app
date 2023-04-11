import {MongoClient} from 'mongodb';
// import * as dotenv from 'dotenv';



// dotenv.config();
let db;

async function connectToDb(cb) {
    // const ssm = new SSM({region: 'us-east-1'});
    // var params = {
    //     Name: '/production/mongodbpass',
    //     WithDecryption: true,
        
    // }
    // ssm.getParameter(params, async(err, data) => {
    //     if (err) console.log(err, err.stack);
    //     else {
    //         // console.log(data.Parameter.Value)
    //         const client = new MongoClient(data.Parameter.Value);
    //         await client.connect();
    //         db = client.db('ratingsdb')
    //         cb();
    //     }
        

    
    // })
    // const client = new MongoClient(process.env.MONGO_CONNECT);
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    db = client.db('wordbank')
    cb();

}

export {
    db,
    connectToDb,
}
