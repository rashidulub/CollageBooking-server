const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bpxo3nu.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    app.get('/collages',async(req,res)=>{
        const cursor= collageCollection.find();
        const result= await cursor.toArray();
        res.send(result)
    })

    const menuCollection = client.db("collage").collection("menu")
    const collageCollection = client.db("admission").collection("collage")

    app.post('/collages',async(req,res)=>{
        const newAdmission = req.body;
        console.log(newAdmission);
        const result = await collageCollection.insertOne(newAdmission)
        res.send(result)
    })



    app.get('/menu',async(req,res)=>{
        const result = await menuCollection.find().toArray();
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('collage server is running')
})

app.listen(port,()=>{
    console.log(`collage server is running on port ${port}`);
})