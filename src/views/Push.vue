<template>
    <div class="login">
        <div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div style="margin-top: 40%">
                        <h5>Push notification</h5>
                        <button type="submit" @click="subscribe" class="btn btn-primary">Subscribe</button>
                        <button type="submit" @click="unsubscribe" style="margin: 10px" class="btn btn-warning">
                            Unsubscribe
                        </button>
                        <p v-if="message">{{message}}</p>
                    </div>
                    <message style="margin-top: 10%" v-on:send="sendmessage"></message>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import db from '@/firebase/init'
    import Message from "../components/Message";
    import firebase from 'firebase'

    export default {
        name: "Login",
        components: {Message},
        data() {
            return {
                message: null
            }
        },
        methods: {
            subscribe() {
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    var token = result.credential.accessToken;
                    $user = result.user;

                    db.collection("users").where("email", "==", `${$user.email}`)
                        .get()
                        .then(function (querySnapshot) {
                            if (querySnapshot.empty === true) {
                                db.collection('users').doc($user.uid).set({
                                    email: $user.email,
                                    uid: $user.uid
                                })
                            }
                        })
                })
                $subscribed = true;
            },
            unsubscribe() {
                db.collection("users").doc($user.uid).delete().then(function () {
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
                $subscribed = false;
            },
            issubscribed() {
                db.collection("users").where("email", "==", `${$user.email}`) /* true - non existing, false - existing */
                    .get()
                    .then(querySnapshot => {
                        $subscribed = querySnapshot.empty === true ? false : true
                    })
            },
            sendmessage(args) {
                var message = args.message;
                var key = Math.random().toString(35).substring(7);

                if ((message) && ($subscribed === true)) {
                    firebase.messaging().requestPermission().then(() => firebase.messaging().getToken())
                        .then((token) => {
                            db.collection('messages').add({
                                message: message,
                                token: token,
                                key: key,
                                uid: $user.uid
                            })
                        })
                        .catch((err) => console.log(err))
                    this.retrieveData(key);
                }
            },
            retrieveData(key) {
                db.collection('messages').get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            let msg = doc.data()
                            if ((msg.key === key) && ($user.email != null)) {
                                const payload = new Notification(`From: ${$user.email}`, {
                                    body: `${msg.message}`
                                })
                            }
                        })
                    })
            }
        }
    }
</script>

<style scoped>

</style>