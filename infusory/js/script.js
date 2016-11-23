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
    optype = "WITHDRAW";
  }
  else if (document.getElementById('depositiss').checked){
    optype = "DEPOSIT";
  }
  else{
    optype = "";
  }
  var amtinr = document.getElementById('amountininr').value;
  var message = "You have selected " + optype + ", and entered an amount of Rs" + amtinr + "!";
  var msg = "?mobno=" + mobno + "&message=" + encodeURIComponent(message);
  RequestData("POST", "https://spechide-144910.appspot.com/CORS/SendSMS/" + msg, "", function(u, r){
    console.log(u);
    console.log(r);
    var jsonobj = JSON.parse(r);
    var mid = jsonobj.message;
    var sts = jsonobj.type;
    if(sts == "success"){
      document.getElementById('RegForm').innerHTML = '<button class="form-control" onclick="window.location.reload();">ReFresh the Webpage</button>';
    }
    else{
      alert("this should never occur! unless the smsgateway suspended my account.\r\n" + "URL: " + u + "\r\nRESPONSE: " + r);
    }
  });
};

console.log("custom scripts loaded");
