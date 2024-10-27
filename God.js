
var VOTEFOR;
$(document).ready(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyArsStSv7Yr88TxRNRvDfMVNMamsdLh4lI",
        authDomain: "adelhardandrechtsanwaelte.firebaseapp.com",
        projectId: "adelhardandrechtsanwaelte",
        storageBucket: "adelhardandrechtsanwaelte.appspot.com",
        messagingSenderId: "395720574018",
        appId: "1:395720574018:web:8afc53448574bf020f19db" 
  };
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

    $('.login_password_input, .login_email_input').keydown(function (e) {
        if (e.keyCode == 13) {
            alert('you pressed enter ^_^');      
        }
    })
    
  $("form").submit(
      function(e){
          e.preventDefault();
      }
  );

//  insertData('james');
//  insertData('davene');
//  insertData('donna');
// insertData('michael');

  
  getData('james');
  getData('davene');
  getData('donna');
  getData('marthazaab');
  getData('michael');
//   getData('davidhoward');
//   getData('victoriamuller');
//   getData('kattywhite');
//   GET_DESIGNERS();

  getUserIpAddress();
});

function insertData(docc){
    // Add a new document in collection "cities"
        firebase.firestore().collection("DESIGNERS").doc(docc).set({
            name: "Los Angeles",
            vote: 125
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });                                     
}

// GET DATA 
function GET_DESIGNERS(){
    console.log('777-DESIGNERS');
    var db = firebase.firestore();
    var docRef = db.collection("DESIGNERS").doc("davene");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data**:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
function getData(docc){
    var designerName,vote;
    var docRef = firebase.firestore().collection("DESIGNERS").doc(docc);

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data for designerss:"+doc.id +" "++, doc.data());
            console.log("Document data for designerss: " + doc.id, doc.data());

            if(docc=='james'){
                console.log('yeah james');
                $('.james_vote').text(doc.data().vote);
                //$('#david_votes_count').text(123);
            }
            if(docc=='davene'){
                console.log('DAVENE ***');
                $('.davene_vote').text(doc.data().vote);
                //$('#david_votes_count').text(123);
            }
            if(docc=='donna'){
                console.log('donna***');
                $('.donna_vote').text(doc.data().vote);
                //$('#david_votes_count').text(123);
            }
            if(docc=='davidhoward'){
                console.log('yeah david');
                $('.david_vote').text(doc.data().vote);
                //$('#david_votes_count').text(123);

            }
            if(docc=='kattywhite'){
                $('.katty_vote').text(doc.data().vote);
            }
            if(docc=='marthazaab'){
                $('.martha_vote').text(doc.data().vote);
            }
            if(docc=='michael'){
                console.log('MICHAEL ***');
                $('.michael_vote').text(doc.data().vote);
            }
            if(docc=='victoriamuller'){
                $('.vicky_vote').text(doc.data().vote);
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });                         
}
function openJames(){
    console.log('clicked on vote for lsss');

}
function voteFor(who){
    console.log('clicked on vote for '+ who);
    $('.votedForWho').text(who);
    if (who == 'davene') {
        VOTEFOR = 'davene';
        $('.VOTER_INFO').removeClass('ghide');
    }
    if (who == 'james') {
        console.log('JAMES 177');
        VOTEFOR = 'james';
       $('.VOTER_INFO').removeClass('ghide');
    }
    if (who == 'david') {
        VOTEFOR = 'david';
        $('.VOTER_INFO').removeClass('ghide');
    }
    if (who == 'victoria') {
        VOTEFOR = 'victoria';
        $('.VOTER_INFO').removeClass('ghide');
    }
    if (who == 'donna') {
        VOTEFOR = 'donna';
        $('.VOTER_INFO').removeClass('ghide');
    }
    if (who == 'martha') {
        VOTEFOR = 'martha';
        $('.VOTER_INFO').removeClass('ghide');
    }
    
}

function openDonna(){
    $('.votedForWho').text('Donna');
    VOTEFOR = 'donna';
    $('.VOTER_INFO').removeClass('ghide');
}

function submitVoterInfo(){
    var firstName = $('#voter_first_name').val();
    var lastName = $('#voter_last_name').val();
    var email = $('#voter_email').val();
    var homeAddress = $('#voter_home_address').val();
    var message = $('#voter_message').val();

    console.log('About to send Voter Info to ...');
    $('#voter_send_btn').addClass('hide')
  
    
    if(VOTEFOR == 'davene'){
        $('#voter_chosen').text('Davene Obeng Muller');
        saveVote(firstName, lastName,email,homeAddress,message,VOTEFOR);
    }
    if(VOTEFOR == 'james'){
        $('#voter_chosen').text('James');
        saveVote(firstName, lastName,email,homeAddress,message,VOTEFOR);
    }
    if(VOTEFOR == 'david'){
        $('#voter_chosen').text('David');
        saveVote(firstName, lastName,email,homeAddress,message,VOTEFOR);
    }
    if(VOTEFOR == 'donna'){
        $('#voter_chosen').text('Donna Louisa Trusty');
        saveVote(firstName, lastName,email,homeAddress,message,VOTEFOR);
    }
}

function saveVote(fn,ln,email,homeAddress,message,who){
        
    if (fn != '' || email != '' || homeAddress != '' || message != '') {
            $('#submit_vot er_btn').hide();
            firebase.firestore().collection("VOTERS").doc(fn+ln).set({
                fname: fn,
                lname: ln,
                email: email,
                home_address: homeAddress,
                message: message,
                voteFor: who,
                vote: 1
            })
            .then(() => {
                console.log("Voter successfully written!");
                $('#submit_voter_btn').show();
                $('#voter_send_btn').removeClass('hide')

                voteProcessUI();
            })
            .catch((error) => {
                console.error("Error writing Voter: ", error);
                $('#submit_voter_btn').show();
            }); 
        } else {
            alert('Please fill the input fields above...');
        }

                                            
}

function voteProcessUI(){
    $('.form_card').hide();
    $('.vote-loading').removeClass('ghide');
    
    setTimeout(
        function(){
            $('.vote-loading').addClass('ghide');
            $('.vote-confirmed').removeClass('ghide');
            $('.voted_for_david').removeClass('ghide');
            
        },4000
    );
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
        console.log('TIME: '+ currentTimeInGMT);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
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
