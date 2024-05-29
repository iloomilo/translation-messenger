<script setup>
import Message from './Message.vue';
</script>

<template>
    <div class="py-3 px-5">
        <Message :ownMessage="true" />
        <Message :ownMessage="true" />
        <Message :ownMessage="true" />
        <Message :ownMessage="false" />
        <Message :ownMessage="true" />
        <Message :ownMessage="true" />
        <Message :ownMessage="true" />
        <Message :ownMessage="false" />
        
    </div>
</template>