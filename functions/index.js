
'use strict';

const functions = require('firebase-functions');
const async = require("async");

exports.countDropTest = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
   if (change.after.data().countThis == "PENDING") {
       let uid = context.params.userId;
       try {
           async.waterfall([
               function(mainCallback) {
                   try {
                       change.after.ref.update({"countThis":"PROCESSING"}).then(function() {
                           console.log("dropTest UID:", uid, "successfully set to processing");
                           return mainCallback();
                       }).catch(function(error) {
                           return console.log("dropTest UID:", uid, "Firebase Error step 1: ", error);
                       });
                   } catch(error) {
                       console.error("dropTest field update catchError step 1", error);
                   }
               },
               function(mainCallback) {
                   try {
                       change.after.ref.update({"countThis":"1"}).then(function() {
                           console.log("dropTest UID:", uid, "successfully set to 1");
                           return mainCallback();
                       }).catch(function(error) {
                           return console.log("dropTest UID:", uid, "Firebase Error step 2: ", error);
                       });
                   } catch(error) {
                       console.error("dropTest catchError step 2", error);
                   }
               },
               function(mainCallback) {
                   try {
                       change.after.ref.update({"countThis":"2"}).then(function() {
                           console.log("dropTest UID:", uid, "successfully set to 2");
                           return mainCallback();
                       }).catch(function(error) {
                           return console.log("dropTest UID:", uid, "Firebase Error step 3: ", error);
                       });
                   } catch(error) {
                       console.error("dropTest catchError step 3", error);
                   }
               },
               function(mainCallback) {
                   try {
                       change.after.ref.update({"countThis":"3"}).then(function() {
                           console.log("dropTest UID:", uid, "successfully set to 3");
                           return mainCallback();
                       }).catch(function(error) {
                           return console.log("dropTest UID:", uid, "Firebase Error step 4: ", error);
                       });
                   } catch(error) {
                       console.error("dropTest catchError step 4", error);
                   }
               },
               function(mainCallback) {
                   try {
                       change.after.ref.update({"countThis":"4"}).then(function() {
                           console.log("dropTest UID:", uid, "successfully set to 4");
                           return mainCallback();
                       }).catch(function(error) {
                           return console.log("dropTest UID:", uid, "Firebase Error step 5: ", error);
                       });
                   } catch(error) {
                       console.error("dropTest catchError step 5", error);
                   }
               },
               function(mainCallback) {
                   try {
                       change.after.ref.update({"countThis":"DONE"}).then(function() {
                           console.log("dropTest UID:", uid, "successfully set to DONE");
                           return console.log("DONE");
                       }).catch(function(error) {
                           return console.log("dropTest UID:", uid, "Firebase Error step 6: ", error);
                       });
                   } catch(error) {
                       console.error("dropTest catchError step 6", error);
                   }
               },
           ]);
       } catch(error) {
           console.error("outside catchError", error);
       }
   } else {
       return null
   }
})

