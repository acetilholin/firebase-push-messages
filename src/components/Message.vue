<template>
    <div class="message">
        <div class="form-group">
            <label for="exampleFormControlTextarea1">Message</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="message"></textarea>
        </div>
        <button type="submit" @click="$emit('send',{'message' : message })" class="btn btn-success">Push message</button>
    </div>
</template>

<script>
    export default {
        name: "Message",
        data(){
            return{
                message: null
            }
        }
    }
</script>

<style scoped>

</style>