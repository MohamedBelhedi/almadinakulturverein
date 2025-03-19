import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } 
from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';

const firebaseConfig = {
    apiKey: "AIzaSyD-O52FjJJPBUSOF5Pr3IAySRgsUqZD-0g",
    authDomain: "logintestalmadina.firebaseapp.com",
    projectId: "logintestalmadina",
    storageBucket: "logintestalmadina.appspot.com",
    messagingSenderId: "423749818722",
    appId: "1:423749818722:web:41e871d62b67149fc3f43b"
};

// Wrap everything in DOMContentLoaded to ensure DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    // DOM Elements
    const email_val = document.getElementById('email');
    const password_val = document.getElementById('password');
    const submit = document.getElementById('submit');
    const forgetPassword = document.getElementById("password_forgot");
    const anmeldung = document.getElementById("anmelden");
    const abmeldung = document.getElementById("abmelden");
    // Sign Up function
    const signUp = () => {
        if (!email_val || !password_val) {
            alert("Email oder Passwort-Feld nicht gefunden");
            return;
        }
        const email = email_val.value;
        const passwort = password_val.value;
        
        createUserWithEmailAndPassword(auth, email, passwort)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user);
                // Uncomment if you want email verification
                // sendEmailVerification(auth.currentUser)
                //     .then(() => {
                //         alert("Verifizierungslink wurde gesendet");
                //     });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Fehler: ${errorCode} - ${errorMessage}`);
            });
    };

    // Password Reset function
    const RestPassword = () => {
        if (!email_val) {
            alert("Email-Feld nicht gefunden");
            return;
        }
        const email = email_val.value;
        
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Link zugesandt");
            })
            .catch((error) => {
                alert(`Fehler: ${error.code} - ${error.message}`);
            });
    };

    // Login function
    const logIn = () => {
        if (!email_val || !password_val) {
            alert("Email oder Passwort-Feld nicht gefunden");
            return;
        }
        const email = email_val.value;
        const password = password_val.value;
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location.assign("almadinaprogramm.html");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Fehler evtl Anmeldedaten falsch: ${errorCode} - ${errorMessage}`);
            });
    };

    // Sign Out function
    const SignedOut = () => {
        signOut(auth)
            .then(() => {
                window.location.assign("/");
                alert("abgemeldet");
                localStorage.clear(); // Add this after deleting cookies
            })
            .catch((error) => {
                alert(`Abmeldefehler: ${error.message}`);
            });
    };

    // Add event listeners with null checking
    if (submit) {
        submit.addEventListener('click', signUp);
    } else {
        console.error("Submit-Button nicht gefunden");
    }

    if (email_val) {
        email_val.addEventListener('input', (e) => {
            console.log(e.target.value);
        });
    } else {
        console.error("Email-Feld nicht gefunden");
    }

    if (forgetPassword) {
        forgetPassword.addEventListener('click', RestPassword);
    } else {
        console.error("Passwort-vergessen-Link nicht gefunden");
    }

    if (anmeldung) {
        anmeldung.addEventListener('click', logIn);
    } else {
        console.error("Anmelden-Button nicht gefunden");
    }

    // Only add sign-out listener if element exists
    if (abmeldung) {
        abmeldung.addEventListener('click', SignedOut);
    }
});