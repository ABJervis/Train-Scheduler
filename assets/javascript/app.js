// Initialize Firebase
var config = {
    apiKey: "AIzaSyCMvLXU1Vwr-fePiZfVzwszSFMq0Rq8j8w",
    authDomain: "train-try-2.firebaseapp.com",
    databaseURL: "https://train-try-2.firebaseio.com",
    projectId: "train-try-2",
    storageBucket: "train-try-2.appspot.com",
    messagingSenderId: "194125010521"
  };
  firebase.initializeApp(config);


var database = firebase.database();

//moment variables



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

//first time (push back 1 year to keep time accordingly)
var firstMilitary = moment(trainTime, "HH:mm").subtract(1, "years");
console.log(firstMilitary);

//current time
var currentTime = moment();
console.log("current time: " + moment(currentTime).format("HH:mm"));

var timeDifference = moment().diff(moment(firstMilitary), "minutes");
console.log("difference: " + timeDifference);

var tRemainder = timeDifference % trainFrequency;
console.log(tRemainder);

//Minutes until next train
var tMinutes = trainFrequency - tRemainder;
console.log("Minutes until: " + tMinutes);

var nextTrain = moment().add(tMinutes, "minutes");
console.log("arrival: "+ moment(nextTrain).format("hh:mm:"));

var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(firstMilitary),
    $("<td>").text(nextTrain)

);

//append new row to table

$("#train-table > tbody").append(newRow);



})
