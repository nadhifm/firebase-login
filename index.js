firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    if (user.emailVerified) {
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      var email_id = user.email;
      document.getElementById("user_para").innerHTML =
        "Welcome User : " + email_id;
    } else {
      window.alert("Verify you email");
      logout();
    }
  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});


function login() {
  
var recaptcha_response = grecaptcha.getResponse();
  if (recaptcha_response.length == 0) {
    window.alert("Recaphta required");
    return false;
  }
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      var errorMessage = error.message;
      grecaptcha.reset();
      window.alert("Error : " + errorMessage);
    });
  return true;
}

function register() {
var recaptcha_response = grecaptcha.getResponse();
  if (recaptcha_response.length == 0) {
    window.alert("Recaptcha required");
    return false;
  }
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      user.sendEmailVerification();
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorMessage = error.message;
      grecaptcha.reset();
      window.alert("Error : " + errorMessage);
    });
  return true;
}

function logout() {
  firebase.auth().signOut();
  grecaptcha.reset();
  document.getElementById('email_field').value = '';
  document.getElementById('email_field').value = '';
}
