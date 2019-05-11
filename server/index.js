const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const getReposByUsername = require('../helpers/github.js')
const db = require('../database/index.js')
let app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(cors())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body.value, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var category = ['id','name', 'html_url', 'forks_count', 'stargazers_count']
      var selected = [];
      info.map((repo) => {
        var selectedRepo = {}
        for(var i = 0; i < category.length; i++) {
          if(category[i] === 'id') {
            selectedRepo.repo_id = repo[category[i]]
          } else {
            selectedRepo[category[i]] = repo[category[i]] 
          }
        }
        selected.push(selectedRepo)
      })
      
      db.save(selected, (err) => {
        if(err) {
          res.sendStatus(404)
        } else {
          res.sendStatus(201)
        }
      })
      console.log(selected)
    }
  })
res.send('hi')
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

