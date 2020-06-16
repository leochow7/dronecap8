const express = require ('express');
const mongodb = require ('mongodb');

const router = express.Router();

//Get All Jobs
router.get('/', async (req, res) => {
    const jobs = await loadJobsCollection();
    res.send(await jobs.find({}).toArray());
});

//Get particular Job
router.get('/:id', async (req, res) => {
    const jobs = await loadJobsCollection();
    console.log(req.params.id)
    res.send(await jobs.findOne({_id: new mongodb.ObjectID(req.params.id)}));
});

//Get Jobs w/ location
router.get('/loc/:loc', async (req, res) => {
    const jobs = await loadJobsCollection();
    res.send(await jobs.find({
        loc: req.params.loc
    }).toArray());
});

//Get unmatched jobs
router.post('/available', async (req, res) => {
    const jobs = await loadJobsCollection();
    res.send(await jobs.find({
        loc: req.body.loc,
        status: "unmatched"
    }).toArray());
});

//Post New Job
router.post('/', async (req, res) => {
    const jobs = await loadJobsCollection();
    await jobs.insertOne({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        loc: req.body.loc,
        duration: req.body.duration,
        purpose: req.body.purpose,
        status: "unmatched",
        pilot_list:[],
        pilot_id: "",
        pilot_name: "",
        owner: req.body.owner,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Update Job on pilot application
router.post('/apply/:id/done', async (req, res) => {
    const jobs = await loadJobsCollection();
    await jobs.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},
        {
            $push: {pilot_list: {
                "pilot_name": "Test Pilot",
                "pilot_id": req.body.pilot_id.toString()
            }}
        }
    )
    res.status(200).send();
});

//Update job on final pilot
router.post('/apply/:id', (req, res)=>{
    res.send("Hello Appplicant!");
});

//Function to connect to the DB
async function loadJobsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://admin:admin@cluster0-yj43b.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });
    return client.db('dronecap').collection('jobs');
}

module.exports = router;