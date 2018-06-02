
const async = require("async");
const admin = require("firebase-admin");
const configActual = require("./config/configActual.js");
const util = require('util');

admin.initializeApp({
    credential: admin.credential.cert(configActual.pwdIs),
    databaseURL: configActual.dbURL
});

var fireDB = admin.firestore();

var recordCount = 0;

fireDB.collection("users").where("countThis", "<", "DONE").get().then(snapshot => {
    snapshot.forEach(doc => {
        console.log("uid", doc.id);
        console.log("countThis", doc.data().countThis);
        recordCount ++;
    });

    console.log("recordCount", recordCount);
}).catch(err => {
    console.log('Error getting documents', err);
    process.exit(1);
});

