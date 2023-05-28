<script setup>
import {computed} from "vue";
import store from "../store/store";


const emits = defineEmits(['close']);

const closeCart = () => {
  emits('close', false)
}

const cartItems = computed(() => store.state.cart);

</script>
<template>
  <div class="cart bg-gray-400 bg-opacity-30" @click="closeCart">
    <div class="w-3/12 bg-white h-screen flex flex-col px-4 py-4">
      <div class="text-gray-700 font-bold pb-3 border-b-2 border-gray-100">My Cart</div>
      <div v-if="cartItems == 0">
      No items on cart
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id">
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.cart {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
}
</style>