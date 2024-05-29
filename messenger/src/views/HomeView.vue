<script setup>
import Sidebar from '../components/Chat/Sidebar/Sidebar.vue';
import Header from '../components/Chat/Main/Header.vue';
import MessageArea from '../components/Chat/Main/MessageArea.vue';
import Input from '../components/Chat/Main/Input.vue';
</script>
<template>
    <main class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <Header />
            <MessageArea />
            <Input />
        </div> 

        <Sidebar />
    </main>
</template>