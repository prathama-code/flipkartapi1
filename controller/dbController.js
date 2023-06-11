let mongo = require('mongodb');
let {MongoClient} = require('mongodb');
var mongoUrl ='mongodb+srv://<prathama-code>:<MWYhE8Vnwi4TKUHI>@cluster0.p7sc7i8.mongodb.net/?retryWrites=true&w=majority' ;
//  mongodb+srv://<prathama-code>:<MWYhE8Vnwi4TKUHI>@cluster0.p7sc7i8.mongodb.net/?retryWrites=true&w=majority
// let mongoUrl = "mongodb://127.0.0.1:27017";
let client = new MongoClient(mongoUrl)


async function dbConnect(){
    await client.connect()
}

let db = client.db('flipkartclone');

async function getData(colName,query){
    let output = [];
    try{
        const cursor = db.collection(colName).find(query);
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    }
    catch(err){
        output.push({"Error":"Error in getData"})
    }
    return output
}


async function postData(colName,data){
    let output;
    try{
        output = await db.collection(colName).insertOne(data)
    }
    catch(err){
        output = {"response":"Error in postData"}
    }
    return output
}



module.exports = {
    dbConnect,
    getData,
    postData
    
}