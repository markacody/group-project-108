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
// //SEARCH BAR API QUERY and INTERACTION =========
// $('#mainsearch').on('click', function () {
//     searchTerm = $('.searchinput').val().trim();
//     console.log(searchTerm);
//     searchNoSpaces = searchTerm.replace(/ /gi, '+');
//     console.log(searchNoSpaces);
//     searchCriteria = $("#myDropdown option:selected").text();
//     console.log(searchCriteria);
// });
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
        firebase.auth().currentUser.updateProfile({
            displayName: displayName
        });
    });
    return false;
});
//User Sign Out =================
$('#btnLogOut').on('click', function () {
    $('.well').remove();
    firebase.auth().signOut();
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
        //Could Turn All DOM Updates to Function
        $('main').removeClass('hide');
        $('#btnLogOut').removeClass('hide');
        $('.search_bar').removeClass('hide');
        $('#loginForm').addClass('hide');
        $('#user-container').removeClass('hide');
        //Adds User Auth Data to Firebase Database
        dataRef.ref('users/' + user.uid + '/profile').set({
            userID: user.uid,
            email: user.email,
            displayName: user.displayName
        });
        userProfileToDom();
    } else {
        // No user is signed in.
        console.log('not logged in');
        // Set currentUID to null.
        currentUser = null;
        $('main').addClass('hide');
        $('#btnLogOut').addClass('hide');
        $('.search_bar').addClass('hide');
        $('#loginForm').removeClass('hide');
        $('.form-signup').removeClass('hide');
        $('#user-container').addClass('hide');
    }
});

function userProfileToDom() {
    dataRef.ref('users/' + currentUser + '/profile').on("value", function (childSnapshot) {
        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val());
        console.log(childSnapshot.val().displayName);
        console.log(childSnapshot.val().dateAdded);
        console.log(childSnapshot.val().currentUser);
        $("#userData").html("<div class='userInfo'><span id='displayname'> ROCK ON " + displayName + "! </span></br><span id='email'> You're signed in with " + childSnapshot.val().email + "</div>");
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
}
// Bind Provider Sign in buttons.
$('#sign-in-button').on('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
});
//Spotify Oauth Grab Token
$('#sign-in-spotify').on('click', function () {
    firebase.auth().signInWithCustomToken(token).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode) {
            $(".message-alert").html('<p>' + errorMessage + '</p>');
        }
        console.log(error);
        // ...
    });
});
//Linking Multiple Provider Accounts
auth.currentUser.linkWithPopup(provider).then(function (result) {
    // Accounts successfully linked.
    var credential = result.credential;
    var user = result.user;
    // ...
}).catch(function (error) {
    // Handle Errors here.
    // ...
});
auth.currentUser.link(firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, 'password'));
firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
        // Accounts successfully linked.
        var credential = result.credential;
        var user = result.user;
        // ...
    }
}).catch(function (error) {
    // Handle Errors here.
    // ...
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