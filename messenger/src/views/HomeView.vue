<script setup>
import Sidebar from '../components/Chat/Sidebar/Sidebar.vue';
import Header from '../components/Chat/Main/Header.vue';
import MessageArea from '../components/Chat/Main/MessageArea.vue';
import Input from '../components/Chat/Main/Input.vue';
import { useCurrentChat } from '../stores/currentChat';

const { currentChatUser} = useCurrentChat();
</script>
<template>
    <main class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <Header />
            <div v-if="currentChatUser">
                <MessageArea />
                <Input />
            </div>
            <div class="flex justify-center items-center h-full" v-else>
                <p class="text-4xl">Select a user to chat with!</p>
            </div>
        </div> 
        <Sidebar />
    </main>
</template>