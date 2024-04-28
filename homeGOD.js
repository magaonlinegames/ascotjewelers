
$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyCKnX0w115NGUzMJFGR0BJLtAizU13vViU",
        authDomain: "command-center-18c31.firebaseapp.com",
        projectId: "command-center-18c31",
        storageBucket: "command-center-18c31.appspot.com",
        messagingSenderId: "532092672696",
        appId: "1:532092672696:web:4cb03667b3c03e11b3724d" 
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    getUserIpAddress();
});

function getCurrentTimeInGMT() {
    const currentTimeInGMT = new Date().toUTCString();
    return currentTimeInGMT;
}

function addDataToFirestore(ip,city,region,country) {
    // Add a new document with a generated id.
    var currentTimeInGMT = new Date().toLocaleString();
    var currentTimeInGMT2 = new Date();
    var db=firebase.firestore();
    db.collection("ASCOT_VISITORS").add({
        client_ip: ip,
        client_region: region,
        client_city: city,
        time_gmt: currentTimeInGMT,
        TIME: currentTimeInGMT2,
        country: country
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log('tIME: '+ currentTimeInGMT);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}  
function insertData(ip,city,region,country){
    // Add a new document in collection "cities"
        firebase.firestore().collection("ASCOT_VISITORS").doc(ip+country+"_"+city).set({
            client_ip: ip,
            client_region: region,
            client_city: city,
            country: country
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });                                     
}


function getUserIpAddress(){
    $.getJSON("https://api.ipify.org/?format=json", function(e) {
    console.log("USER IP: "+e.ip);
    if (e.ip != "") {
      $.get("https://ipinfo.io", function(response) {
        var IPCODE = response.ip;
        var IP_CITY = response.city;
        var IP_COUNTRY = response.country;  
        var IP_REGION = response.region; 
        console.log("Country of origin: "+response.city, response.country);
        if (IP_COUNTRY != '') {
            // insertData(IPCODE,IP_CITY,IP_REGION,IP_COUNTRY);
            addDataToFirestore(IPCODE,IP_CITY,IP_REGION,IP_COUNTRY);
        }else{
            console.log("Can't get User Information...");
        }
      }, "jsonp");
      return e.ip;
    }
  });
}