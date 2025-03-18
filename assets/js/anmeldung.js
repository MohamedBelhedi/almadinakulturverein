import { getAuth,createUserWithEmailAndPassword,
  sendEmailVerification,sendPasswordResetEmail,
  signInWithEmailAndPassword,signOut
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js'

    // If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js'

    // Add Firebase products that you want to use

import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'

const firebaseConfig = {

    apiKey: "AIzaSyD-O52FjJJPBUSOF5Pr3IAySRgsUqZD-0g",

    authDomain: "logintestalmadina.firebaseapp.com",

    projectId: "logintestalmadina",

    storageBucket: "logintestalmadina.appspot.com",

    messagingSenderId: "423749818722",

    appId: "1:423749818722:web:41e871d62b67149fc3f43b"

  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);




var email_val=document.getElementById('email');
var password_val=document.getElementById('password');

// ###### Test Elemenst#######
// var email="test@test.com";
// var passwort="Test123456#"
// ######ende####################
const submit=document.getElementById('submit');


const auth = getAuth();
const signUp=()=>{
  var email=document.getElementById('email').value;
  var passwort=document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, passwort)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // {!user?alert("Benutzer schon angemeldet"):
      // sendEmailVerification(auth.currentUser)
      // .then(() => {
      //   // Email verification sent!
      //   // ...
      //   alert("Link zugesandt")
      // })
    
     
    })
     
    
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("error: " + errorCode)
      // ..
    });
  
  };

submit.addEventListener('click',signUp);
email_val.addEventListener('input',(e)=>{

console.log(e.target.value);

});

var forgetPassword=document.getElementById("password_forgot");
const RestPassword=()=>{
  var email=document.getElementById('email').value;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    alert("Link zugesandt");
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });




}
forgetPassword.addEventListener('click',RestPassword);


const logIn=()=>{
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.assign("almadinaprogramm.html");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Fehler evtl anmeldedaten Falsch",errorCode,errorMessage);
  });



}

const anmeldung = document.getElementById("anmelden");
anmeldung.addEventListener('click',logIn);

const abmeldung=document.getElementById("abmelden");

const SignedOut=()=>{


  signOut(auth).then(() => {
    // Sign-out successful.

    window.location.assign("https://www.google.de");
    alert("abgemeldet");
  }).catch((error) => {
    // An error happened.
  });


}
abmeldung.addEventListener('click',SignedOut)
