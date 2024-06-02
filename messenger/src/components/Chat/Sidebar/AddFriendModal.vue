<script setup>
import { ref } from 'vue';
const friendInput = ref("");
const handleAddFriend = () => {
    if(friendInput.value.length < 3) return;
    console.log(friendInput.value + " added");
    friendInput.value = ""
}
</script>
<template>
    <!-- You can open the modal using ID.showModal() method -->
    <button class="btn" onclick="my_modal_4.showModal()">
    <img class="h-auto max-w-full" src="../../../assets/addfriend.svg" alt="">
    </button>
    <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-5xl border border-primary">
            <h3 class="font-bold text-lg">Add Friend</h3>
            <label class="input input-bordered flex items-center gap-2 mt-4 w-[80%] mx-auto">
                Username
                <input v-model="friendInput" type="text" class="grow" placeholder="e.g iloomilo" />
            </label>
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button, it will close the modal -->
                    <button class="btn btn-outline w-20 mr-3 opacity-50 hover:opacity-100 transition-opacity">Close</button>
                    <button @click="handleAddFriend" class="btn btn-primary w-20">Add</button>
                </form>
            </div>
        </div>
    </dialog>
</template>


