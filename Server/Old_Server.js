const {MongoClient} = require("mongodb");
const URL = "mongodb://localhost:27017";

const client = new MongoClient(URL);

async function GetConnection()
{
    let result = await client.connect();
    let db = result.db("MarvellousInfosystems");
    return db.collection("Batches");
}

async function ReadData()
{
    let data = await GetConnection();
    data = await data.find().toArray();
    console.log("Data from the Marvelous Database is :");
    console.log(data);
}

async function DeleteData()
{
    let data = await GetConnection();
    let result = await data.deleteOne({"Name":"PPA"});
    if(result.acknowledged)
    {
        console.log("Data gets deleted successfully...");
    }
}

async function InsertData()
{
    let data = await GetConnection();
    let result = await data.insertOne({"Batch" : "LSP","Fees":"23442","Duration":"3.5 Months"});
    if(result.acknowledged)
    {
        console.log("Data gets inserted succsfully");
    }

}

async function UpdateData()
{
    let data = await GetConnection();
    let result = await data.updateOne({"Name":"Python"},{$set:{"Fees":"52463"}});
    if(result.acknowledged)
    {
        console.log("Data gets updated successfully");
    }
}
function main()
{
    let ret;
    ret = GetConnection();
    console.log("Database Connected");
    ReadData();
    DeleteData();
    InsertData();
    UpdateData();
}

main()