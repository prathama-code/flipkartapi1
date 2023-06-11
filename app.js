let express = require('express');
let app = express();
let port = process.env.PORT||2120;
let Mongo = require('mongodb')
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect,getData,postData} = require('./controller/dbController')


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())




app.get('/',(req,res) => {
    res.send('Hiii From express')
})

// GET ALL SUPPLIER LOCATION
app.get('/supplierlocation',async (req,res)=>{
    let query = {};
    let collection = "supplierlocation";
    let output = await getData(collection,query)
    res.send(output)
})

// GET ALL PRODUCTS
app.get('/productsAll',async (req,res)=>{
    let query = {};
    let collection = "productsAll";
    let output = await getData(collection,query)
    res.send(output)
})

// CATEGORY
app.get('/category',async (req,res)=>{
    let query = {};
    let collection = "category";
    let output = await getData(collection,query)
    res.send(output)
})

// PRODUCTS RELATED TO SAME CATEGORY
//  app.get('/productsRelated',async (req,res)=>{
//      let query = {category_id:4};
//      let collection = "productsRelated";
//      let output = await getData(collection,query)
//      res.send(output)
// })

// PRODUCTS RELATED TO SAME CATEGORY
 app.get('/productsRelatedToSameCat',async (req,res)=>{
     let query = {};
     if(req.query.categoryid){
         query = {category_id:Number(req.query.categoryid)}
     }
     else{
         query={}
     }
     let collection = "productsRelatedToSameCat";
     let output = await getData(collection,query)
     res.send(output)
 })

//  DETAILS
app.get('/details/:id',async(req,res)=>{
    let id = Number(req.params.id);
    let query = {
        category_id : id
    }
    let collection = "productsAll";
    let output = await getData(collection,query);
    res.send(output);
})

// ORDERS

app.get('/orders',async(req,res) => {
    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }else{
        query = {}
    }
   
    let collection = "orders";
    let output = await getData(collection,query);
    res.send(output)
})

// PLACE ORDER
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = "ordersallinone";
    console.log(">>>",data)
    let response = await postData(collection,data)
    res.send(response)
})

// ORDER DETAILS
app.post('/orderDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {id:{$in:req.body.id}};
        let collection = 'ordersallinone';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})




app.listen(port,(err) => {
    dbConnect();
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})




