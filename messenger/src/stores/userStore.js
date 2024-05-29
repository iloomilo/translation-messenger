import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', () => {
    
    const user = ref(null);
  
    const authorizeUser = (loggedInUser) => {
      user.value = loggedInUser;
    }

    return { user, authorizeUser }
  });