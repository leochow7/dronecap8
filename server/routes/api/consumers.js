const express = require ('express');
const mongodb = require('mongodb');

const router = express.Router();


//Get Consumers 
router.get('/', async (req, res)=>{
    const consumers = await loadConsumersCollection();
    res.send(await consumers.find({}).toArray());
});

//Add a new consumer
router.post('/', async (req, res) => {
    const consumers = await loadConsumersCollection();
    await consumers.insertOne({
        name: req.body.name,
        job_list: [],
        next_job: "",
        createdAt: new Date()
    });
    res.status(200).send();
});


//Function to connect to the DB
async function loadConsumersCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://admin:admin@cluster0-yj43b.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    return client.db('dronecap').collection('consumers');
}

module.exports = router;
