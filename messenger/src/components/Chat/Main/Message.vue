<script setup>
import { defineProps } from 'vue';

const props = defineProps(["ownMessage"]);
</script>

<template>
<div class="chat" :class="props.ownMessage ? 'chat-end' : 'chat-start'">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div class="chat-header">
    Max Mustermann
    <time class="text-xs opacity-50">12:45</time>
  </div>
  <div class="chat-bubble">Hello Alex! This is the frontend!</div>
  <div class="chat-footer opacity-50">
    Delivered
  </div>
</div>
</template>