<script setup>
import RegisterForm from '../components/Auth/RegisterForm.vue';
</script>

<template>
    <main class="min-h-screen flex justify-center items-center">
        <div class="w-[600px]">
            <RegisterForm />
        </div>
    </main>
</template>

<style scoped>
main {
    background: url("../assets/blob.svg") no-repeat center;
    background-size: cover;
}
</style>