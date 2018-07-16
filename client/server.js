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
  db.run('CREATE TABLE workouts (title varchar(255), time varchar(255), description TEXT, additional_notes TEXT)')

  // var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

  // for (var i = 0; i < 10; i++) {
  //   stmt.run('Ipsum ' + i)
  // }

  // stmt.finalize()

  // db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
  //   console.log(row.id + ': ' + row.info)
  // })
})
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
  response.send({
    status: 200,
    message: "Workout created!"
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
