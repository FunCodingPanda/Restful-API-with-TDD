const express = require('express')
const bodyParser = require('body-parser')
const app = express()

let events = [
  { uid: 1, 
    description: "G78 to Cuba",
    date: "June 23rd to June 30th", 
    duration: "170 hours"
  }, 

  { uid: 2,
    description: "Celebrate Canada Day",
    date: "July 1st 2018",
    duration: "Infinite"
  } ]

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/events', function(req, res) {
  console.log("Get is working");
  res.json(events);
});

app.get('/events/:uid', function(req, res) {
  // give a variable to the requested variable 

  // const event = events.find((event)=> event.uid === parseInt(req.params.uid);
  const event = events.find((event)=> event.uid == req.params.uid);

  if(!event) {
    res.status(404).json({
      error: `Could not find event uid ${req.params.uid}`
    });
  } else { 
    res.status(200).json(event);
  }
});

app.patch('/events/:uid', function(req, res) {
  // the idea of patch is to change or add one aspect of the events
  for (let i = 0; i < events.length; i++) { //for each item in an event, you merge it 
    if (events[i].uid == req.params.uid) {
      events[i] = {
        ...events[i], 
        ...req.body
      }
      return res.status(200).json(events[i]);
    }
  }
  return res.status(404).json({
    error: `could not find event with uid ${req.params.uid}`
  });
});

app.put('/events/:uid', function(req, res) {
  for(let i = 0; i < events.length; i++) {
    if(events[i].uid == req.params.uid) {
      events[i] = {
        uid: req.params.uid,
        ...req.body
      }
      return res.status(200).json(events[i]);
    }
  }
  return res.status(404).json({
    error: `could not find with uid ${req.params.uid}`
  });
})

app.delete('/events/:uid', function(req, res) {
  const event = events.find((event) => event.uid == req.params.uid); // if this equals to the requested uid
  if(!event) { //if not event 
    return res.status(404).json({
      error: `Could not find event with uid ${req.params.uid}` //respond with this code 
    });
  } else {
    events = events.filter((event) => event.uid != req.params.uid); // have all the events that are not the requested event 
    return res.status(200).json({
      deleted: event
    });
  }
}); 

app.listen(3000, function() {
  console.log('Server is listening on port 3000')
});

module.exports = app;


// create a new event object with info provided (DONE)
// return all events (DONE)
// get an event with ID, error if not found (DONE)
// update existing with Id, error if not found (DONE)
// remove from data store, error if not found (DONE)
 