//intialize firebase - don't forget link on html

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCfcLpbbvChHnCsRvgumLJ1i30r30Emv0",
    authDomain: "train-scheduler-65be7.firebaseapp.com",
    databaseURL: "https://train-scheduler-65be7.firebaseio.com",
    projectId: "train-scheduler-65be7",
    storageBucket: "train-scheduler-65be7.appspot.com",
    messagingSenderId: "949919316762"
};

firebase.initializeApp(config);

var database = firebase.database();


//on click for submit of new train

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

//grab entered information and store in temporary object

var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainTime = $("#time-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();

var newTrain = {
    train: trainName,
    destination: trainDestination, 
    train: trainTime,
    frequency: trainFrequency
};

//upload information into the database

database.ref().push(newTrain);

console.log(newTrain.train);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency)

alert("Success");

//clear all text-boxes

$("#train-name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");

});

//firebase watcher for adding trains

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());

    //store in variable - only what is needed

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

//calculation for minutes remaining
    
    var interval = trainTime;
    var minutesAway = [interval-(trainTime % interval)] + Moment();
        console.log(minutesAway);


})

//calulations//time should be stored as military time - look at moment am/pm