
'use strict';

const functions = require('firebase-functions');

exports.countDropTest = functions.firestore.document('users/{userId}').onUpdate((change, context) => {
   if (change.after.data().countThis == "APENDING") {
       let uid = context.params.userId;

       try {
           return change.after.ref.update({"countThis":"0"}).then(function() {
               console.log("dropTest UID:", uid, "successfully set to processing");
               try {
                   change.after.ref.update({"countThis":"1"}).then(function() {
                       console.log("dropTest UID:", uid, "successfully set to 1");
                       try {
                           change.after.ref.update({"countThis":"2"}).then(function() {
                               console.log("dropTest UID:", uid, "successfully set to 2");
                               try {
                                   change.after.ref.update({"countThis":"3"}).then(function() {
                                       console.log("dropTest UID:", uid, "successfully set to 3");
                                       try {
                                           sleep(3000);
                                           change.after.ref.update({"countThis":"4"}).then(function() {
                                               console.log("dropTest UID:", uid, "successfully set to 4");
                                               try {
                                                   sleep(3000);
                                                   change.after.ref.update({"countThis":"DONE"}).then(function() {
                                                       console.log("dropTest UID:", uid, "successfully set to DONE");
                                                       console.log("DONE");
                                                   }).catch(function(error) {
                                                       return console.log("dropTest UID:", uid, "Firebase Error step 6: ", error);
                                                   });
                                               } catch(error) {
                                                   console.error("dropTest catchError step 6", error);
                                               }
                                           }).catch(function(error) {
                                               return console.log("dropTest UID:", uid, "Firebase Error step 5: ", error);
                                           });
                                       } catch(error) {
                                           console.error("dropTest catchError step 5", error);
                                       }
                                   }).catch(function(error) {
                                       return console.log("dropTest UID:", uid, "Firebase Error step 4: ", error);
                                   });
                               } catch(error) {
                                   console.error("dropTest catchError step 4", error);
                               }
                           }).catch(function(error) {
                               return console.log("dropTest UID:", uid, "Firebase Error step 3: ", error);
                           });
                       } catch(error) {
                           console.error("dropTest catchError step 3", error);
                       }
                   }).catch(function(error) {
                       return console.log("dropTest UID:", uid, "Firebase Error step 2: ", error);
                   });
               } catch(error) {
                   console.error("dropTest catchError step 2", error);
               }
           }).catch(function(error) {
               return console.log("dropTest UID:", uid, "Firebase Error step 1: ", error);
           });
       } catch(error) {
           console.error("dropTest field update catchError step 1", error);
       }
   }
})

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

