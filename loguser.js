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
var currentUser = '';
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
    console.log(displayName);
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
        currentUser = user;
        console.log("Provider: " + currentUser.provider);
        console.log(currentUser.uid);
        console.log(currentUser);
        // var userRef = dataRef.ref('/users/');
        // Code for handling the push
        dataRef.ref('users/' + user.uid + '/profile').set({
            userID: user.uid,
            email: user.email,
            displayName: displayName,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        $('#btnLogOut').removeClass('hide');
        $('.form-signup').addClass('hide');
    } else {
        // No user is signed in.
        console.log('not logged in');
        $('#btnLogOut').addClass('hide');
        $('.form-signup').removeClass('hide');
    }
});
// Firebase watcher 
// Using .on("", function(snapshot)) syntax will retrieve the data from the database (both initially and everytime something changes)
// This will then store the data inside the variable "snapshot"
dataRef.ref('users/' + currentUser.uid + '/profile').on("value", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().displayName);
    console.log(childSnapshot.val().dateAdded);
    console.log(childSnapshot.val().currentUser.uid);
    console.log(currentUser.uid);
    if (childSnapshot.val().userID === user.userID) {
        $("#member-list").append("<div class='well'><span id='displayname'> " + childSnapshot.val().displayName + " </span><span id='email'> " + childSnapshot.val().email + " </span><span id='dateAdded'> " + childSnapshot.val().dateAdded + " </span></div>");
    }
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
 * Writes the user's data to the database.
 */
// [START basic_write]
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
/**
 * Cleanups the UI and removes all Firebase listeners.
 */
function cleanupUi() {
    // Remove all previously displayed posts.
    topUserPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
    recentPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
    userPostsSection.getElementsByClassName('posts-container')[0].innerHTML = '';
    // Stop all currently listening Firebase listeners.
    listeningFirebaseRefs.forEach(function (ref) {
        ref.off();
    });
    listeningFirebaseRefs = [];
}
/**
 * The ID of the currently signed-in User. We keep track of this to detect Auth state change events that are just
 * programmatic token refresh but not a User status change.
 */
var currentUID;
/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */
function onAuthStateChanged(user) {
    // We ignore token refresh events.
    if (user && currentUID === user.uid) {
        return;
    }
    cleanupUi();
    if (user) {
        currentUID = user.uid;
        splashPage.style.display = 'none';
        writeUserData(user.uid, user.displayName, user.email, user.photoURL);
        startDatabaseQueries();
    } else {
        // Set currentUID to null.
        currentUID = null;
        // Display the splash page where you can sign-in.
        splashPage.style.display = '';
    }
}
/**
 * Displays the given section element and changes styling of the given button.
 */
function showSection(sectionElement, buttonElement) {
    recentPostsSection.style.display = 'none';
    userPostsSection.style.display = 'none';
    topUserPostsSection.style.display = 'none';
    addPost.style.display = 'none';
    recentMenuButton.classList.remove('is-active');
    myPostsMenuButton.classList.remove('is-active');
    myTopPostsMenuButton.classList.remove('is-active');
    if (sectionElement) {
        sectionElement.style.display = 'block';
    }
    if (buttonElement) {
        buttonElement.classList.add('is-active');
    }
}
// Bindings on load.
window.addEventListener('load', function () {
    // Bind Sign in button.
    $('#signInButton').on('click', function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    });
    // Listen for auth state changes
    firebase.auth().onAuthStateChanged(onAuthStateChanged);
    // Bind menu buttons.
    recentMenuButton.onclick = function () {
        showSection(recentPostsSection, recentMenuButton);
    };
    addButton.onclick = function () {
        showSection(addPost);
        messageInput.value = '';
        titleInput.value = '';
    };
    recentMenuButton.onclick();
}, false);