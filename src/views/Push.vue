<template>
    <div class="login">
        <div class="container">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div style="margin-top: 40%">
                        <h5>Push notification</h5>
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="email" v-model="email">
                            <span v-if="feedback">{{ feedback }}</span>
                        </div>
                        <button type="submit" @click="enable" class="btn btn-primary">Enable push notification</button>
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

    export default {
        name: "Login",
        components: {Message},
        data(){
            return {
                feedback: null,
                email: null
            }
        },
        methods: {
            enable(){
               if(this.email) {
                    db.collection('users').add({
                        email: this.email,
                        subscribed: 'true'
                    })
                    this.email = null
                }
            },
            sendmessage(args){
                var message = args.message;
                if(message) {
                    db.collection('messages').add({
                        message: message
                    })
                    this.message = null
                }
            }
        }
    }
</script>

<style scoped>

</style>