// Initialize Firebase
var config = {
    apiKey: "AIzaSyCMvLXU1Vwr-fePiZfVzwszSFMq0Rq8j8w",
    authDomain: "train-try-2.firebaseapp.com",
    databaseURL: "https://train-try-2.firebaseio.com",
    projectId: "train-try-2",
    storageBucket: "train-try-2.appspot.com",
    messagingSenderId: "194125010521"
  };
  !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

var database = firebase.database();


//on click for submit of new train

$("#add-train-btn").on("click", function(event){
    event.preventDefault();

//grab entered information and store in temporary object

var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#destination-input").val().trim();
var trainFirstTime = $("#time-input").val().trim();
var trainFrequency = $("#frequency-input").val().trim();

var newTrain = {
    name: trainName,
    destination: trainDestination, 
    time: trainFirstTime,
    frequency: trainFrequency
};

//upload information into the database

database.ref().push(newTrain);

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency)



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
    var trainFirstTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTime);
    console.log(trainFrequency);

//first time (push back 1 year to keep time accordingly)
var firstTrain = moment(trainFirstTime, "HH:mm").subtract(1, "years");
console.log(firstTrain);

//current time
var currentTime = moment();
console.log("current time: " + moment(currentTime).format("HH:mm"));

//difference between times
var timeDifference = moment().diff(moment(firstTrain), "minutes");
console.log("difference: " + timeDifference);

//remainder
var tRemainder = timeDifference % trainFrequency;
console.log(tRemainder);

//Minutes until next train
var tMinutes = trainFrequency - tRemainder;
console.log("Minutes until: " + tMinutes);

var nextTrain = moment().add(tMinutes, "minutes");
console.log("arrival: "+ moment(nextTrain).format("HH:mm"));

var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutes)

);

//append new row to table

$("#train-table > tbody").append(newRow);



})
