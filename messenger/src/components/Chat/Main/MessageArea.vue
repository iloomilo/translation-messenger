<script setup>
import Message from './Message.vue';
import socket from "../../../socket.js";
import { ref } from 'vue';
//all messages
const messages = ref([]);
//listener on new messages
socket.on("chat_message", (msg) => {
    messages.value.push(msg);
})
</script>

<template>
    <div class="py-3 px-5">
        <Message v-for="(message , index) in messages" :key="index" :messageDetails="message" />
       
    </div>
</template>