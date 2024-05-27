<script setup>
import { ref, computed } from 'vue';

// Recatives values of input fields, already trimmed
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

//Regex to verify passwords
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//Clientside password validition, shows error in HTML if not filled out correctly
const validateUsername = computed(() => {
  return username.value.length > 3;
});

const validatePassword = computed(() => {
  return passwordRegex.test(password.value);
});

const validateConfirmPassword = computed(() => {
  return password.value === confirmPassword.value && password.value.length > 0;
});

//Authentication handling
const handleRegister = () => {
  if(validateUsername.value && validatePassword.value && validateConfirmPassword.value) {
    console.log("Register");
  }
}
</script>

<template>
  <form @submit.prevent="handleRegister" class="card-body">
    <h1 class="text-3xl font-semibold">Sign Up</h1>
    
    <div class="form-control">
      <label class="label">
        <span class="label-text">Username</span>
      </label>
      
      <label class="input input-bordered flex items-center gap-2" :class="{'border-error focus:outline-error': !validateUsername && username}">
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" :class="{'fill-error': !validateUsername && username}" class="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input
        v-model.trim="username"
        type="text" class="grow" placeholder="Username" />
      </label> 
      <p v-if="!validateUsername && username" class="text-error mt-2">Username has to be at least 3 characters!</p>
    </div>
    
    <div class="form-control">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      
      <label class="input input-bordered flex items-center gap-2" :class="{'border-error focus:outline-error': !validatePassword && password}">
        <svg
        :class="{'fill-error': !validatePassword && password}"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
        <input
        v-model.trim="password"
        type="password" class="grow" placeholder="Password"/>
      </label>
      <p v-if="!validatePassword && password" class="text-error mt-2">Password has to include be at least 8 characters, special character and  a number!</p>

      <label class="label">
        <span class="label-text">Confirm Password</span>
      </label>
      
      <label class="input input-bordered flex items-center gap-2" :class="{'border-error focus:outline-error': !validateConfirmPassword && confirmPassword}">
        <svg 
        :class="{'fill-error': !validateConfirmPassword && confirmPassword}"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" /></svg>
        <input 
        v-model.trim="confirmPassword"
        type="password" class="grow" placeholder="Confirm Password" />
      </label>
      <p v-if="!validateConfirmPassword && confirmPassword" class="text-error mt-2">Passwords don't match!</p>
      
      <label class="mt-2">
        Already have an account?
        <RouterLink to="/login" class="link link-hover text-accent">Sign in!</RouterLink>
      </label>
      
    </div>
    
    <div class="form-control mt-6">
      <button class="btn btn-primary">Sign Up</button>
    </div>
  </form>
</template>