<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../stores/userStore';
import { useRouter } from 'vue-router';
import { globalConfig } from '../../config.js';

const router = useRouter();

const store = useUserStore();

//Reactive values of the input fields, already trimmed
const username = ref("");
const password = ref("");

//Loading state of the button
const loading = ref(false);

//Errormessage of the database
const errorMessage = ref("");

//Handle Login
const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = false;
  
  //Client side input valididations to reduce server load
  if(username.value.length < 3 || password.value.length < 5) {
    loading.value = false;
    return errorMessage.value = "Invalid username or password";
  }

  //HTTP request to see if login credentials match
  const response = await fetch(globalConfig.API_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    }),
  });
  //Converting received response to JSON format
  const data = await response.json();
  //if passwords match
  if(data.ok) {
    //log user in and redirect him to the app
    store.authorizeUser(data.userInfo);
    router.push('/');
  } else {
    //display an eror
    errorMessage.value = data.message;
  }
  loading.value = false;
}

</script>

<template>
  <form @submit.prevent="handleLogin" class="card-body">
    <h1 class="text-3xl font-semibold">Login</h1>
    
    <div class="form-control">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input 
        v-model.trim="username"
        type="text" class="grow" placeholder="Username" />
      </label>
      
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      
      <label class="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
        <input 
        v-model.trim="password"
        type="password" class="grow" placeholder="Password"/>
      </label>
      <p class="text-error mt-2 overflow-hidden transition-all" 
        :class="errorMessage ? 'h-[30px] translate-y-0' : 'h-[0px] -translate-y-6'">
        {{ errorMessage }}
        </p>
      
      <label class="mt-2">
        Don't have an account?
        <RouterLink to="/register" class="link link-hover text-accent">Sign up!</RouterLink>
      </label>
    </div>
    
    <div class="form-control mt-6">
      <button class="btn btn-primary flex overflow-hidden" :class="{'btn-disabled': loading}">
        <Transition>
          <span v-if="loading" class="loading loading-spinner loading-sm opacity-50"></span>
        </Transition>
        <p class="grow-0 transition-all">Login</p>
      </button>
    </div>   
  </form>
</template>

<style scoped> 

button > span ~ p {
  transform: translateX(5px);
}


.v-enter-active,
.v-leave-active {
  transition: all 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

</style>
