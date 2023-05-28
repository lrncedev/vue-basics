<script setup>
import {ref, computed} from "vue";
import ProductList from '../components/ProductList.vue';
import CartItem from "../components/CartItem.vue";

import store from "../store/store";
const cartItems = computed(() => store.state.cart);

const cartCount = computed(() => {
  return cartItems.value.length;
})

const cart = ref(false);

const showCart = () => {
  cart.value = !cart.value;
}

const handleCloseCart = (bool) => {
  cart.value = bool;
}
</script>
<template>
  <div class="h-screen">
    <div class="flex py-2 px-4 items-center justify-between bg-white border-b border-gray-50 shadow-sm">
      <div class="font-bold text-gray-800 text-xl">Welcome to Commercial</div>
      <div class="flex gap-1 items-center">
        <button class="justify-self-end"><i class="material-icons text-red-700 cursor-pointer" @click="showCart">shopping_cart</i></button> 
        <span class="font-bold">{{ cartCount > 0 ? cartCount: '' }}</span>
      </div>
    </div>
    <ProductList />
    <div v-if="cart">
      <CartItem @close="handleCloseCart"/>
    </div>
  </div>
</template>

