function write(data, callback) {
  var http = new XMLHttpRequest();
  var url = "/api/sheets/add/";
  callback = callback || function() {};

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback("success");
    }
  };

  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(data));
}

function read(data, callback) {
  var http = new XMLHttpRequest();
  var url = "/api/sheets/read/";
  callback = callback || function() {};

  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var result = JSON.parse(this.responseText);
      callback(result);
    }
  };

  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(data));
}

module.exports = {
  read,
  write
};
