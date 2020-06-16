const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
var path = require('path');

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const posts = require('./routes/api/posts');
const jobs = require('./routes/api/jobs');
const pilots = require('./routes/api/pilots')
const consumers = require('./routes/api/consumers')

app.use('/api/posts', posts)
app.use('/api/jobs', jobs)
app.use('/api/pilots', pilots)
app.use('/api/consumers', consumers)
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
// Route for serving assets
app.get('/', function (request, response) {
    response.render('index');
});
// adding new route here is replicating this section
// @pilots is the URL you need and response... wala part is file you want to serve. 
// you need to save file over here __dirname + '/public'+ '/pilot.html'
// inside public folder. absolute path - \dronecap\public\consumer.html
// That's it
// Add authentication for unwanted things
// passport.js
// Explore .ejs stuff. It's cool rendering engine. 

// Pilot Page
app.get('/pilots', function (request, response) {
response.sendFile(path.join(__dirname + '/public'+ '/pilot.html'));
});

// Consumer UI
app.get('/consumer', function (request, response) {
    response.sendFile(path.join(__dirname + '/public'+ '/consumer.html'));
    });
    
//Application Page
app.get('/apply/:id', function (request, response) {
    response.sendFile(path.join(__dirname + '/public'+ '/apply.html'));
    });

// Profile Page
app.get('/profile', function(request, response){
    response.sendFile(path.join(__dirname + '/public'+ '/profile.html'));
});

// Success Page
app.get('/success', function(request, response){
    response.sendFile(path.join(__dirname + '/public'+ '/success.html'));
});

// Deliver Page
app.get('/success', function(request, response){
    response.sendFile(path.join(__dirname + '/public'+ '/deliver.html'));
});

// DeliveryConsumer Page
app.get('/success', function(request, response){
    response.sendFile(path.join(__dirname + '/public'+ '/deliveryConsumer.html'));
});

// Success Page
app.get('/success', function(request, response){
    response.sendFile(path.join(__dirname + '/public'+ '/success.html'));
});

// Plan Pilot Trip
app.get('/plan', function(request, response){
    response.sendFile(path.join(__dirname + '/public'+ '/planPilotTrip.html'));
});

// 404 Page
app.use(function (req, res) {
    res.status(404).render('generic-errors');
});
const port = process.env.PORT || 5000;

// client\index.html
app.listen(port, ()=> console.log(`Server started on port ${port}`));
