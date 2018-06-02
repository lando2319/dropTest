

const async = require("async");
// const funcitons = require("firebase-functions");
const admin = require("firebase-admin");
const configActual = require("./config/configActual.js");
const util = require('util');

admin.initializeApp({
    credential: admin.credential.cert(configActual.pwdIs),
    databaseURL: configActual.dbURL
});

const firestore = admin.firestore();

var userQueue = async.queue(function(userDocID, finalCallback) {
    console.log("\n>>>> Beginning Process For " + userDocID);

    firestore.collection("users").doc(userDocID).delete().then(function() {
        console.log("Successfully Saved User Info to Database");
        finalCallback();
    }).catch(function(error) {
        console.log("Firebase Error: " + error);
        process.exit(1);
    });

}, 1);

userQueue.drain = function() {
    console.log("----------------------------------- SCRIPT COMPLETE -----------------------------------");
    process.exit(1);
};

function startProcess() {
    var i;
    for (i = 0; i < 1001; i++) {
        var userDocID = "zzzzzzzzzzzzzzzzzzzzzzzzzzzz" + i;
        userQueue.push(userDocID);
    }
};

// ------------------ START PROCESS ------------------ 
startProcess();


