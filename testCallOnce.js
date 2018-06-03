

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

async.waterfall([
    function(mainCallback) {
        firestore.collection("users").doc("zzzzzzzzzzzzzzzzzzzzzzzzzzzz0").update({callOnceWithProtection:"PENDING"}).then(function() {
            console.log("Successfully Saved User Info to Database");
            mainCallback();
        }).catch(function(error) {
            console.log("Firebase Error: " + error);
            process.exit(1);
        });
    },
    function(mainCallback) {
        firestore.collection("users").doc("zzzzzzzzzzzzzzzzzzzzzzzzzzzz0").update({foo:"bar2"}).then(function() {
            console.log("Successfully Saved User Info to Database");
        }).catch(function(error) {
            console.log("Firebase Error: " + error);
            process.exit(1);
        });
    },

])
