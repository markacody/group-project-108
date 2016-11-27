//Check JS link
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
// Initial Global Values
var email = '';
var password = '';
var displayName = '';
var user = firebase.auth().currentUser;
var dataRef = firebase.database();
var currentUser = '';
/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
// function writeUserData(currentUser, email, displayName, imageURL) {
//     // Code for handling the push
//     dataRef.ref('users/' + currentUser + '/profile').set({
//         userID: currentUser,
//         email: email,
//         displayName: displayName,
//         profile_picture: imageURL
//     });
// }
//Set up Signing in Auth Firebase Authentication=============
//Login
$('#btnLogin').on('click', function () {
    //Store Input in Variables
    email = $('#emailBack').val().trim();
    password = $('#passwordBack').val().trim();
    //Sign in Active User
    var loginPromise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
            $(".message-alert").html('<p>' + errorMessage + '</p>');
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
    console.log(displayName);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            $(".message-alert").html('<p>The password is too weak.</p>');
        } else {
            $(".message-alert").html('<p>' + errorMessage + '</p>');
        }
        console.log(error);
        //https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    });
    return false;
});
//User Sign Out =================
$('#btnLogOut').on('click', function () {
    $('.well').remove();
    firebase.auth().signOut();
    //User Status - a Real Time Listener takes a callback  - everytime state changes sign in or sign out (null)
});
//Get Active User Profile and Add to DB
firebase.auth().onAuthStateChanged(function (user) {
    // We ignore token refresh events.
    // if (user && currentUser === user.uid) {
    //     return;
    // }
    if (user) {
        // User is signed in.
        currentUser = user.uid;
        email = user.email;
        console.log("Logged In");
        console.log("Provider: " + currentUser.provider);
        console.log(currentUser);
        console.log("Email: " + user.email);
        console.log("displayName: " + displayName);
        console.log("dateAdded: " + firebase.database.ServerValue.TIMESTAMP);
        $('#btnLogOut').removeClass('hide');
        $('#loginForm').addClass('hide');
        $('#user-container').removeClass('hide');
        dataRef.ref('users/' + user.uid + '/profile').set({
            userID: user.uid,
            email: user.email,
            displayName: displayName
        });
        userProfileToDom();
    } else {
        // No user is signed in.
        console.log('not logged in');
        // Set currentUID to null.
        currentUID = null;
        $('#btnLogOut').addClass('hide');
        $('#loginForm').removeClass('hide');
        $('.form-signup').removeClass('hide');
        $('#user-container').addClass('hide');
    }
});
// Firebase watcher 
// Using .on("", function(snapshot)) syntax will retrieve the data from the database (both initially and everytime something changes)
// This will then store the data inside the variable "snapshot"
function userProfileToDom() {
    dataRef.ref('users/' + currentUser + '/profile').on("value", function (childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().displayName);
        console.log(childSnapshot.val().dateAdded);
        console.log(childSnapshot.val().currentUser);
        $("#userData").html("<div class='well'><span id='displayname'> " + displayName + " </span><span id='email'> " + childSnapshot.val().email + "</div>");
        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
}
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
//Can update user account info and linking auth provider credentials
/**

/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
/**
 * Displays the given section element and changes styling of the given button.
 */
// function showSection(sectionElement, buttonElement) {
//     recentPostsSection.style.display = 'none';
//     userPostsSection.style.display = 'none';
//     topUserPostsSection.style.display = 'none';
//     addPost.style.display = 'none';
//     recentMenuButton.classList.remove('is-active');
//     myPostsMenuButton.classList.remove('is-active');
//     myTopPostsMenuButton.classList.remove('is-active');
//     if (sectionElement) {
//         sectionElement.style.display = 'block';
//     }
//     if (buttonElement) {
//         buttonElement.classList.add('is-active');
//     }
// }
// Bindings on load.
// Bind Sign in button.
$('#sign-in-button').on('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
});
// // Listen for auth state changes
// firebase.auth().onAuthStateChanged(onAuthStateChanged);
// // Bind menu buttons.
// recentMenuButton.onclick = function () {
//     showSection(recentPostsSection, recentMenuButton);
// };
// addButton.onclick = function () {
//     showSection(addPost);
//     messageInput.value = '';
//     titleInput.value = '';
// };
// recentMenuButton.onclick();