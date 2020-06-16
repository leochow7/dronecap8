const express = require ('express');
const mongodb = require('mongodb');

const router = express.Router();


//Get Pilots 
router.get('/', async (req, res)=>{
    const pilots = await loadPilotsCollection();
    res.send(await pilots.find({}).toArray());
});

//Add a new pilot
router.post('/', async (req, res) => {
    const pilots = await loadPilotsCollection();
    await pilots.insertOne({
        name: req.body.name,
        rating: req.body.rating,
        certified: req.body.certified,
        bio: req.body.bio,
        instagram: req.body.instagram,
        job_list: [],
        next_job: "",
        createdAt: new Date()
    });
    res.status(200).send();
});


//Function to connect to the DB
async function loadPilotsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://admin:admin@cluster0-yj43b.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    return client.db('dronecap').collection('pilots');
}

module.exports = router;
