const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
  name: String,
  html_url: String,
  forks_count: Number,
  stargazers_count: Number,
  createdAt: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var errArr = [];
  var count = 0;
  data.forEach((repo) => {
    Repo.updateOne({ repo_id: repo.repo_id }, repo, { upsert: true }, (err) => {
      count++
      if (err) {
        errArr.push(err);
      }
      if (count === data.length) {
        if (errArr[0]) {
          callback(errArr[0])
        } else {
          callback(null);
        }
      }
    })
  })
}

var getRepos = (callback) => {
  Repo.find({}).limit(25).sort({'createdAt': -1}).exec(callback);
}

module.exports.save = save;
module.exports.getRepos = getRepos;