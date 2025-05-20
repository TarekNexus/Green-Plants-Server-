const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port =process.env.PORT|| 3000

app.use(cors())
app.use(express.json())







const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tareknexus.i3y2ilu.mongodb.net/?retryWrites=true&w=majority&appName=TarekNexus`;


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
    const plantCollection = client.db("PlantsDB").collection("AllPlants")


 app.post("/plants",async(req,res)=>{
      const newUsers=req.body
      
       const result = await plantCollection.insertOne(newUsers);
       res.send(result)
    })

 app.get("/plants",async(req,res)=>{
      const cursor=plantCollection.find()
       const result = await cursor.toArray();
       res.send(result)
    })

  app.get("/plants/:id",async(req,res)=>{
          const id=req.params.id;
          const query={_id:new ObjectId(id)}
           const result = await plantCollection.findOne(query);
           res.send(result)
        })

app.get("/plants/id/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await plantCollection.findOne(query);
  res.send(result);
});

app.get("/plants/email/:email", async (req, res) => {
  const email = req.params.email;
  const query = { userEmail: email };
  const result = await plantCollection.find(query).toArray();
  res.send(result);
});


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('plants  server is runing')
})


app.listen(port, () => {
  console.log(`plants server is running on port ${port}`)
})
