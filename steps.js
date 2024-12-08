/**
 * --------------------------------
 * MingoDB connection > open account in MongoDB > create User > setting  for South Asia> Create password > White list IP access
 * -------------------------------
 * Create account
 * create an user with password 
 * Setting for South Asia 
 * create Password
 * whitelist the IP address
 * database > connet > drivers > Node > View full code 
 * change the password in the uri
 * --------------------------------
 * 
 * 1. CREATE --- POST
 * 2. app.post('/users/async (req,res) => {}) 
 * 3. Make the function async to use await inside it. 
 * 4. Go to MongoDB documentation > usage example > insert       operations > insert a Document
 * Make sure you use the express.json() middleware. Otherswise you wont get the user from req.body
 * access data from the body : const user = req.body
 * const result = await userCollection.insertOne(user);
 * res.send(result);
 * 
 * 
 * 
 * 
 * CLIENT
 * (App.jsx or main file)
 * 1. create fetch
 * 2. add second paramwewter as an object 
 * 3. provide method:  'POST'
 * 4. add headers: {'content-type' : 'application/json'},
 * 5. add  body: JSON.stringify(user),
 * 
 * 
 * -------------------------------------
 * READ MANY
 * ------------------------------------
 * 1. create a const cursor = userCollection.find()
 * 2. const result = await cursor.toArray() > result ke array te convert kora holo
 * 
 * -------------------------------------------
 * DELETE ONE
 * ---------------------------------------------
 * 1. app.delete('/users/:id',async(req,res)=>{})
 * 2. specify unique object id to delete the right user. 
 * 3. const query = {_id : new ObjectId(id)}
 * 4. const result = await userCollection.deleteOne(query);
 * 
 * Client
 * 1. create dynamic url/uri with id 
 * 2. mention the DELETE method
 * 
 * 
 * 
 */