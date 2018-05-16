const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hello', function(request, response) {
  let json = {
    express: "Hello from Express backend"
  };
  response.send(json);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
