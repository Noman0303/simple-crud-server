// create an express server, require express server
const express = require('express');
// require cors
const cors = require('cors');
// require mongo
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// make an app that call that express server 
const app = express();
// Create an available port or conditional to port no. 5000. This is for running the app on any available port. 
const port = process.env.PORT || 5000;

// While fetching data in client side server with useEffect from the user management server, Data fetch is blocked for CORS policy. So solve this issue , we have to add cors /middleware in the user management server side. 

app.use(cors());

// We also want to convert the express received data to json file. So we shall use below funtion. 

app.use(express.json());

// mongodb link 


const uri = "mongodb+srv://MK_Noman:dontaskpass1@cluster0.fguqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// while using async function try{}, catch{} & finally{} are to be used. Atleast two of these need to be used. 

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db('usersDB');
    const userCollection = database.collection('users');

    // or, const userCollection = client.db('usersDB').collection('users')

    app.get('/users', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray(); // or, const result = userCollection.find().toArray()
      res.send(result)
    })

    app.get('/users/:id',async(req,res)=>{
      const id = req.params.id;
      
      const query = {_id : new ObjectId(id)}
      // query er ekta object ke refer kore , sekhane kon property ke match korbe seta identify korte hobe. 
      // new ObjectedId chara track kora jabena. 
      const result = await userCollection.findOne(query)
       // jehetu result e await use hoyeche, upore obossoi async use hote hobe. 
      // console.log('Please update the user',id)
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user :', user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.put('/users/:id',async(req,res)=>{
      const id = req.params.id;
      const user = req.body;
      console.log(id, user);
      
      const filter ={_id : new ObjectId(id)};
      const options = {upsert:true};
      const updateUser ={
        $set: {
          name: user.name,
          email: user.email
        }
      }
      const result = await userCollection.updateOne(filter, updateUser, options)
      res.send (result);
    })

    app.delete('/users/:id',async(req,res)=>{
      const id = req.params.id
      console.log('Please delete from database',id)
      // query er ekta object ke refer kore , sekhane kon property ke match korbe seta identify korte hobe. 
      // new ObjectedId chara track kora jabena. 
      const query = {_id : new ObjectId(id)}
      // jehetu result e await use hoyeche, upore obossoi async use hote hobe. 
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    // {_id :id}


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// To check if the app runs in the root route, we will use below function 

app.get('/', (req, res) => {
  res.send('SIMPLE CRUD IS RUNNING')
})

// selected port e app ta listen korar jonno nicher function.Eikhane port dilei app selected port e listen/run hobe. But seta bujhar subidhar jonno console.log kore dekhbo. 

app.listen(port, () => {
  console.log(`SIMPLE CRUD is running on port, ${port}`)
})




