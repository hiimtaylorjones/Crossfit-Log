const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/json_test', function(request, response) {
  let json = {
    data: {
      "one": "onnnnneee",
      "two": "twwwwwwooo",
      "three": "threeeee"
    },
    type: "json_test"
  }
  response.send(json);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
