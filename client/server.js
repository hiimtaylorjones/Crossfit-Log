const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

console.log("Preparing database...");
db.serialize(function () {
  db.run('CREATE TABLE workouts (title TEXT, time TEXT, description TEXT additional_notes TEXT)')
});
console.log("Database configured");

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hello', function(request, response) {
  let json = {
    express: "Hello from Express backend"
  };
  response.send(json);
});

app.post('/api/workouts', function(request, response) {
  console.log("Request body: ");
  console.log(request.body);

  var title = request.body.title;
  var time = request.body.time;
  var description = request.body.description;
  var additionalNotes = request.body.additionalNotes;

  var missingParams = false;
  if (title === "") {
    missingParams = true;
    missingParamMessage = "Missing workout title.";
  } else if (time === "") {
    missingParams = true;
    missingParamMessage = "Missing workout time.";
  } else if (description === "") {
    missingParams = true;
    missingParamMessage = "Missing workout description.";
  }

  if (missingParams === true) {
    response.send({
      status: 500,
      message: missingParamMessage
    })
  } else {
    db.serialize(function () {

      db.run("INSERT INTO workouts (title, time, description, additional_notes) VALUES(title, time, description, additional_notes)", {
        'title': title,
        'time': time,
        'description': description,
        'additional_notes': additionalNotes
      });
      console.log("Record created!");
      console.log("Preparing to list database....");
    
      db.each('SELECT rowid AS id, title FROM workouts', function (err, row) {
        if (err) {
          console.log(err);
        } else {
          console.log(row.id + ': ' + row.title);
        }    
      });
      
    });
    db.close();
    response.send({
      status: 200,
      message: "Workout created!"
    });
  }  
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
