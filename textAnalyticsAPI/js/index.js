"use strict"

//
let analyse = function() {

  //  body of the request we will be making
  let requestBody = {
    "documents": [
      {
        "language": "en",
        "id": 1,
        "text": document.getElementById('input').value
      }
    ]
  };

  // header of the request we will be making
  let myHeader = new Headers({
    // specifies content type as JSON
    'Content-type': 'application/json',
    // specifies the api key that will be used
    'Ocp-Apim-Subscription-key':'8e9100485bab4a7a8b3b261626e7e3c6'
  });

  // initialization object
  let initObject = {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: myHeader
  };

  let URL = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases';
  let request = new Request(URL, initObject);

  fetch(request)
    .then( response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then( response => {
      document.getElementById('output').innerHTML =
      `
      Total Key Phrases: ${response.documents[0].keyPhrases.length}
      <br>
      ${response.documents[0].keyPhrases}
      `;
    })
    .catch( err => {
      console.log(err);
      document.getElementById('output').textContent = "ERROR OCCURED";
    })
};

document.getElementById('analyseButton').addEventListener('click', analyse);
