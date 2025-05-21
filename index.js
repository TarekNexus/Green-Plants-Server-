const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tareknexus.i3y2ilu.mongodb.net/?retryWrites=true&w=majority&appName=TarekNexus`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
  
    
    const plantCollection = client.db("PlantsDB").collection("AllPlants");

    app.post("/plants", async (req, res) => {
      const newPlant = {
        ...req.body,
        addedDate: req.body.addedDate
          ? new Date(req.body.addedDate)
          : new Date(),
      };

      const result = await plantCollection.insertOne(newPlant);
      res.send(result);
    });

    app.get("/plants/latest", async (req, res) => {
      const latestPlants = await plantCollection
        .find()
        .sort({ addedDate: -1, _id: -1 }) 
        .limit(6)
        .toArray();

      res.send(latestPlants);
    });

    app.get("/plants", async (req, res) => {
      const { sortBy } = req.query;
      let sortOption = {};

      if (sortBy === "nextWateringDate") {
        sortOption.nextWateringDate = 1;
      } else if (sortBy === "careLevel") {
        sortOption.careLevel = 1;
      }

      const result = await plantCollection.find().sort(sortOption).toArray();
      res.send(result);
    });

    app.get("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await plantCollection.findOne(query);
      res.send(result);
    });

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

    app.delete("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await plantCollection.deleteOne(query);
      res.send(result);
    });

    app.put("/plants/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = req.body;
      const updatedDoc = {
        $set: updatedUser,
      };
      const result = await plantCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

   




   
  } finally {
   
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("plants  server is runing");
});

app.listen(port, () => {
  console.log(`plants server is running on port ${port}`);
});
