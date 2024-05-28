import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', () => {
    
    const user = ref(null);
  
    return { user }
  });