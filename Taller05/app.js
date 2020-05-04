var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerFacebook = new firebase.auth.FacebookAuthProvider();
var providerYahoo = new firebase.auth.OAuthProvider('yahoo.com');

function guardarDatos(user) {
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
    }
    firebase.database().ref("taller05/usuarios/" + user.uid).set(usuario)
}

function guardarDatos2(user) {
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
    }
    firebase.auth().signInWithRedirect(providerYahoo);
    firebase.database().ref("taller05/usuarios/" + user.uid).set(usuario)
}
$('#loginGoogle').click(function () {
    firebase.auth()
        .signInWithPopup(providerGoogle)
        .then(function (result) {
            console.log(result.user);
            $('#loginGoogle').hide();
            guardarDatos(result.user);
            $('#root').append(result.user.displayName);
            $('#avatar').attr('src',result.user.photoURL)
        });
});
$('#loginFacebook').click(function () {
    firebase.auth()
        .signInWithPopup(providerFacebook)
        .then(function (result) {
            console.log(result.user);
            $('#loginFacebook').hide();
            guardarDatos(result.user);
            $('#root').append(result.user.displayName);
            $('#avatar').attr('src',result.user.photoURL)
        });
});

$('#loginYahoo').click(function () {
    firebase.auth()
    .currentUser
        .signInWithPopup(providerYahoo)
        .then(function (result) {
            console.log(result.user);
            $('#loginYahoo').hide();
            guardarDatos2(result.user);
            $('#root').append(result.user.displayName);
            $('#avatar').attr('src',result.user.photoURL)
            providerYahoo.addScope('mail-r');
            result.credential.idToken;
        });
});


providerYahoo.setCustomParameters({
    // Prompt user to re-authenticate to Yahoo.
    prompt: 'login',
    // Localize to French.
    language: 'es'
  });

  providerYahoo.addScope('mail-r');
// Request read/write access to user contacts.
// This must be preconfigured in the app's API permissions.
providerYahoo.addScope('sdct-w');






