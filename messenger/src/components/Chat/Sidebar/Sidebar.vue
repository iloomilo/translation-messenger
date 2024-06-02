
<script setup>
import { ref } from 'vue';
import Friend from './Friend.vue';
import AddFriendModal from "./AddFriendModal.vue";

const friends = ref(null);
</script>
<template>
<div class="drawer-side">
    <div class="flex items-center justify-between px-8 pt-5">
      <h1 class="text-xl">Friends</h1>
      <AddFriendModal />
    </div>
    <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
    <ul v-if="friends" class="menu p-4 w-96 min-h-full bg-base-200 text-base-content">
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
        <Friend />
    </ul>
    <div class="menu p-4 w-96 h-full bg-base-200">
      <p class="text-lg text-center">You didn't add any friends yet!</p>
    </div>
  </div>
</template>


