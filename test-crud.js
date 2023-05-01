const { MongoClient } = require('mongodb');
const uri = "";
const client = new MongoClient(uri, { useNewUrlParser: true});

async function main () {
    try {
        await client.connect();
        console.log("mongoDB 접속");

        const collection = client.db("test").collection('person');

        await collection.insertOne({name: 'Andy', age:'30'});

        const documents = await collection.find({name: 'Andy'}).toArray();
        console.log('찾은 문서', documents);
        
        await collection.updateOne({name: 'Andy'}, {$set: {age: 31}});
        console.log('문서업데이트');

        const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
        console.log('갱신된 문서 :', updatedDocuments );

        await client.close();
    } catch (err) {
        console.log(err);
    }
}

main();