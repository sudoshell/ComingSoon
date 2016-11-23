var RequestData = function(type, URL, formData, callBack){
  // create a XHR object
  var xhr = new XMLHttpRequest();
  // open the XHR object in asynchronous mode
  xhr.open(type, URL, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=ISO-8859-1');
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // OK! we have a successful response.
      var response = xhr.responseText;
      //console.log('OUTPUT: ' + response);
      // do something else with the response
      callBack(URL, response);
    }
  };
  // GET or POST the URL according to type
  if(type == "GET"){
    xhr.send();
  }
  if(type == "POST"){
    xhr.send(formData);
  }
};

var RegToken = function(){
  var mobno = document.getElementById('mobilenumber').value;
  var optype = "";
  if (document.getElementById('withdrawiss').checked){
    optype = "W";
  }
  else if (document.getElementById('depositiss').checked){
    optype = "D";
  }
  else{
    optype = "";
  }
  var amtinr = document.getElementById('amountininr').value;
  var msg = "mobno: " + mobno + "type: " + optype + "amt: " + amtinr +" thanks";
  
  RequestData("POST", "https://spechide.shrimadhav.uk/functions/cors.php" + "?q=" + encodeURIComponent(formdata), "", function(u, r){
    console.log(u);
    console.log(r);
  });
};

console.log("custom scripts loaded");
