requestURL = "https://www.n2yo.com/rest/v1/satellite/above/"+userLat+"/"+userLng+"/0/10/0/&apiKey=[ADD_API_KEY]";

function load(url, callback) {
  var xhr;
  if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
  else {
    // Check for browser compatability
    var versions = [
      "Microsoft.XmlHttp",
      "MSXML2.XmlHttp",
      "MSXML2.XmlHttp.3.0",
      "MSXML2.XmlHttp.4.0",
      "MSXML2.XmlHttp.5.0"
    ];
    for (var i = 0, len = versions.length; i < len; i++) {
      try {
        xhr = new ActiveXObject(versions[i]);
        break;
      }
      catch(e) {}
    } // end for
  }

xhr.onreadystatechange = loadCallback;

function loadCallback() {
  if (xhr.readyState < 4) {
    return;
  }
  if (xhr.status !== 200) {
    return;
  }
  // request parsed OK
  if (xhr.readyState === 4) {
    callback(xhr);
  }
}
xhr.open('GET', requestURL, true);
xhr.send('');
}

// 'Find Satellites' button calls this function
function getSats() {
load(requestURL, function(xhr) {
  var data = xhr.responseText;
  var json = JSON.parse(data);
  console.log(data);
  alert("There are currently "+json.info.satcount+" Satellites above pin location \nwithin a 10 degree range. \nClick ok and scroll down to see Satallite list.")

  // Create a list out of Satallite names to appear below button
  var output = document.getElementById('output');
  output.innerHTML = '<h2>Here are the list of Satallite names</h2>'
  for (var i = 0; i < json.info.satcount; i++) {
    output.innerHTML += '<li>'+json.above[i].satname+'</li>'
    }
  });
}
