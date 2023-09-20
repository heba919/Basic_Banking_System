const express = require("express");
const Razorpay = require ("razorpay");
const shortid = require('shortid')
const cors = require('cors');
const {connectToDb , getDb} = require ('./dbConnection');
const PORT = process.env.PORT || 3002;
let DB
const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: "rzp_test_BEDbe8xY9hKINs",
  key_secret:  "CDVtLgim6ja6yB8OJ7udGhmN"

});


 connectToDb((err)=>{
    if(!err) {
      app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      });
      DB = getDb()
    }else {
      app.listen(PORT, () => {
      console.log(`Error: ${err}`);
    });
    }
  })


//Routes

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = 5
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}
  

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})
///////////////////

app.get("/customers", (req, res) => {
  let users =[];

 DB.collection('users').find().forEach(user => users.push(user))
  .then(()=>{
    res.status(200).json(users)
  })
  .catch(()=>{
    res.status(500).json({error:'cant fetch users!!'})
  })

  });

app.get("/customers/:id", (req, res) => {
   
   DB.collection('users').findOne({id:req.params.id})
   .then((user)=>{
      res.status(200).json(user)
    })
    .catch(()=>{
      res.status(500).json({error:'cant fetch that user!!'})
    })
  
  
  });

  app.get("/customer/:name", (req, res) => {

 
    DB.collection('users').findOne({name:req.params.name})
    .then((user)=>{
       res.status(200).json(user)
     })
     .catch(()=>{
       res.status(500).json({error:'cant fetch that user!!'})
     })
   
   
   });

app.get("/alltransaction", (req, res) => {
    let transaction=[];
    DB.collection('bankTransaction').find()
    .forEach(trans => transaction.push(trans) )
    .then(()=>{
       res.status(200).json(transaction)
     })
     .catch(()=>{
       res.status(500).json({error:'cant fetch transaction!!'})
     })
   
   
   });

app.get("/transaction/:id", (req, res) => {
  const id = parseInt(req.params.id);
  DB.collection('bankTransaction').findOne({ id: id })
    .then((Transaction)=>{
       res.status(200).json(Transaction)
     })
     .catch((err)=>{
       res.status(500).json({error:'' + err})
     })
   
   
   });

app.post("/makeTransaction", (req,res) =>{
  const transaction = req.body;
  DB.collection('bankTransaction')
    .insertOne(transaction)
    .then((result)=>{
      res.status(200).json(result)
    })
    .catch(()=>{
      res.status(500).json({error:'transaction has been failed!!'})
    })

});

app.patch("/customerbalance/:id" , (req , res) =>{
 const update = req.body;

 DB.collection('users')
    .updateOne({id:req.params.id}, {$set:update })
    .then((result)=>{
      res.status(200).json(result)
    })
    .catch(()=>{
      res.status(500).json({error:'transaction has been failed!!'})
    })
 

  
})
  