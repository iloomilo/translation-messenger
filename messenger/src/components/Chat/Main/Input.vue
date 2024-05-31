<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../../stores/userStore';
import socket from "../../../socket.js";
//user from global store
const { user } = useUserStore();
//input of the message
const messageInput = ref("");
//when a message gets submitted
const handleSendMessage = async () => {
    if(messageInput.value.length > 0 ) {
        const messageData = {
            author: user.username,
            message: messageInput.value,
            time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes()
        }

        await socket.emit("chat_message", messageData);
        messageInput.value = "";
    }
}

</script>

<template>
    <div class="flex justify-center">
        <form @submit.prevent="handleSendMessage" class="fixed bottom-5 w-[60%] flex gap-4 px-10 items-center">
            <textarea v-model="messageInput" placeholder="Enter your message...." class="textarea textarea-bordered textarea-sm w-full resize-none grow !h-[100px]"></textarea>
            <button type="submit" class="btn btn-primary w-[100px] h-[100px]">
                <img class="w-10 h-10" src="../../../assets/paper-plane.svg" alt="">
            </button>
        </form>
    </div>
</template>