var GoogleSpreadsheet = require('google-spreadsheet');
var request = require("request");

var profanity = require('profam').Profanity();
profanity.setDownloadUrl(process.env.APPLICATION_URI + '/assets/profanity.json');
profanity.addLanguages('en');
profanity.setModes('asterisks-full');

var lru = require('lru-cache');
var cache = lru({
  max: 10000,
  maxAge: 4000,
  length: function(n, key){return n.length}
});
var Guid = require('guid');

var sheets = {
  "add": function(req, res) {
    var field = req.body.field;
console.log(field);
    var entry = "entry." + req.body.entry;
    var url = "https://docs.google.com/a/mozillafoundation.org/forms/d/e/" + req.body.sheet + "/formResponse";

    var formData = {};
    formData[entry] = field;

    request({
      method: 'POST',
      url: url,
      form: formData
    }, function(err, payload) {
      if (err) {
        res.status(500).send({error: err});
      } else {
        res.sendStatus(200);
      }
    });
  },
  "read": function(req, res) {
    var channel = req.body.channel;
    var rows = cache.get(channel);
    if (typeof rows !== 'undefined') {
      res.json(rows);
      return;
    }

    var doc = new GoogleSpreadsheet(req.body.sheet);

    doc.getRows(1, {
      limit: 200,
      reverse: true,
      orderby: "timestamp"
    }, function(err, results) {
      var rows = [];
      if (err) {
        res.status(500).send({error: err});
      } else {
        rows = results.map(function(obj) {
          var filteredWord = profanity.run(obj.field.toLowerCase())[0]['asterisks-full'];
          if (obj.whitelist !== "allow" && filteredWord !== obj.field.toLowerCase()) {
            filteredWord = 'unicorns';
          } else {
            filteredWord = obj.field;
          }
          return {
            field: filteredWord
          };
        });

        var results = {
          guid: Guid.create(),
          rows: rows
        };

        cache.set(channel, results);

        res.json(results);
      }
    });
  }
}

module.exports = sheets;
