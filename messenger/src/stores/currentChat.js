import { ref } from "vue";
import { defineStore } from "pinia";


export const useCurrentChat = defineStore('currentChat', () => {
    
    const currentChatUser = ref(null);
  
    const changeCurrentChat = (userData) => {
        currentChatUser.value = userData;
    }

    return { currentChatUser, changeCurrentChat }
  });