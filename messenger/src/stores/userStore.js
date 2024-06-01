import { ref } from "vue";
import { defineStore } from "pinia";
import socket from "../socket.js";

export const useUserStore = defineStore('userStore', () => {
    
    const user = ref(null);
  
    const authorizeUser = (loggedInUser) => {
      user.value = loggedInUser;
      socket.auth = user.value;
      socket.connect();
      console.log(socket);
      console.log(socket.auth)
    }

    return { user, authorizeUser }
  });