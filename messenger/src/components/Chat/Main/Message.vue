<script setup>
import { defineProps } from 'vue';
import { useUserStore } from '../../../stores/userStore';
//userdata from global store
const { user } = useUserStore();
//messageDetails passed from parent
const props = defineProps(["messageDetails"]);

</script>

<template>
<div class="chat" :class="props.messageDetails.author === user.username? 'chat-end' : 'chat-start'">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    </div>
  </div>
  <div class="chat-header">
    {{ messageDetails.author}}
    <time class="text-xs opacity-50">{{ props.messageDetails.time}}</time>
  </div>
  <div class="chat-bubble">{{ props.messageDetails.message }}</div>
  <div class="chat-footer opacity-50">
    Delivered
  </div>
</div>
</template>