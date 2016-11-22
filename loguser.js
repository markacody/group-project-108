//Check js link
console.log("Connected to App Sign Up Form!");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBT4aC7DBeIy2W6AESBQFokEoZBzYiW54M",
    authDomain: "musicapp-284be.firebaseapp.com",
    databaseURL: "https://musicapp-284be.firebaseio.com",
    storageBucket: "musicapp-284be.appspot.com",
    messagingSenderId: "293602357087"
};
firebase.initializeApp(config);
// Initial Values
var email = '';
var password = '';
var displayName = '';
var user = firebase.auth().currentUser;
var dataRef = firebase.database();
//Set up Signing in Auth Firebase - musicApp - Authentication=============
//Login
$('#btnLogin').on('click', function () {
    //Store Input in Variables
    email = $('#txtEmail').val().trim();
    password = $('#txtPassword').val().trim();
    //Sign in Active User
    var loginPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });
    return false;
});
//Creating an Account
$('#btnSignUp').on('click', function () {
    //Store Input in Variables
    email = $('#txtEmail').val().trim();
    password = $('#txtPassword').val().trim();
    displayName = $('#displayName').val().trim();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        //https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    });
    return false;
});
//User Sign Out =================
$('#btnLogOut').on('click', function () {
    firebase.auth().signOut();
    //User Status - a Real Time Listener takes a callback  - everytime state changes sign in or sign out (null)
});
//Get Active User Profile and Add to DB
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("User Object: " + user);
        var dataRef = firebase.database();
        var userRef = dataRef.ref('/users/');
        userRef.update({
            user: user.uid,
            displayName: user.displayName,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $('#btnLogOut').removeClass('hide');
    } else {
        // No user is signed in.
        console.log('not logged in');
        $('#btnLogOut').addClass('hide');
    }
});
// Firebase watcher 
// **** Using .on("value", function(snapshot)) syntax will retrieve the data from the database (both initially and everytime something changes)
// This will then store the data inside the variable "snapshot". We could rename "snapshot" to anything.
dataRef.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().displayName);
    console.log(childSnapshot.val().user);
    console.log(childSnapshot.val().dateAdded);
    // full list of items to the well
    $("#member-list").append("<div class='well'><span id='name'> " + childSnapshot.val().user + " </span><span id='email'> " + childSnapshot.val().displayName + " </span><span id='age'> " + childSnapshot.val().dateAdded + " </span></div>");
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#name-display").html(snapshot.val().name);
    $("#email-display").html(snapshot.val().email);
    $("#age-display").html(snapshot.val().age);
    $("#comment-display").html(snapshot.val().comment);
});
// Add each train's data into the table
// $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" + empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
// });
// Add User Auth to FB Database
//Get the firebase reference    
// var dataRef = firebase.database();
// dataRef.onAuth(function (authData) {
//     if (authData && isNewUser) {
//         dataRef.child("users").child(authData.uid).set({
//             provider: authData.provider,
//             name: getName(authData)
//                 //some more user data
//         });
//     }
// });
//Get User Information Specific to Provider
// if (user != null) {
//     user.providerData.forEach(function (profile) {
//         console.log("Sign-in provider: " + profile.providerId);
//         console.log("  Provider-specific UID: " + profile.uid);
//         console.log("  Name: " + profile.displayName);
//         console.log("  Email: " + profile.email);
//         console.log("  Photo URL: " + profile.photoURL);
//     });
// }
//Can update user account info and linking auth provider credentials ... save for later