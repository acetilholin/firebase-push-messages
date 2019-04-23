import firebase from 'firebase';
import firestore from 'firebase/firestore';
import Vue from 'vue';

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
const firebaseapp = firebase.initializeApp(config);
export default firebaseapp.firestore()

Vue.prototype.$messaging = firebase.messaging()

navigator.serviceWorker.register(' firebase-messaging-sw.js')
    .then((registration) => {
        Vue.prototype.$messaging.useServiceWorker(registration)
    }).catch(err => {
    console.log(err)
})


