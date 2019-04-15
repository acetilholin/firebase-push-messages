import firebase from 'firebase';
import firestore from 'firebase/firestore';


var config = {
    apiKey: "AIzaSyBDi2AFTiafp_2CKE61c-FUciYEdGON3T8",
    authDomain: "vue-push-jawa.firebaseapp.com",
    databaseURL: "https://vue-push-jawa.firebaseio.com",
    projectId: "vue-push-jawa",
    storageBucket: "vue-push-jawa.appspot.com",
    messagingSenderId: "42647551280"
};
const firebaseApp = firebase.initializeApp(config);
const messaging = firebaseApp.messaging();



/*

messaging.requestPermission()
    .then(function () {
        console.log('have permission');

    })
    .then(function (token) {
        console.log(token)
    })
    .catch(function (err) {
        console.log(err)
    })
*/


export default firebaseApp.firestore()