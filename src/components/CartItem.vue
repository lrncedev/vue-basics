<script setup>
import {computed} from "vue";
import store from "../store/store";


const emits = defineEmits(['close']);

const closeCart = () => {
  emits('close', false)
}

const cartItems = computed(() => store.state.cart);

const getTotalPrice = computed(() => {
  let totalPrice = 0;
  for (const item of store.state.cart) {
    totalPrice += item.price * item.quantity;
  }
  return totalPrice;
});

const decrease = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1;
  }
};


const increase = (item) => {
  item.quantity += 1;
};

const remove = (product) => {
  store.mutations.removeFromCart(product)
}


</script>
<template>
  <div class="cart bg-gray-400 bg-opacity-30" @click="closeCart">
    <div class="cart-actual bg-white h-screen flex flex-col px-4 pb-4 pt-2" @click.stop>
      <div class=" flex justify-between items-center py-3 border-b-2 border-gray-200">
        <div class="text-gray-700 font-bold">My Cart</div>
        <div class="text-gray-400">Cart Value: ${{ getTotalPrice.toFixed(2) }}</div>
      </div>
      <div v-if="cartItems == 0" class="text-center text-2xl font-bold mt-3 text-gray-600">
      No items on cart
      </div>
      <div v-else class="h-full w-full overflow-y-scroll ">
        <div v-for="item in cartItems" :key="item.id" class="flex flex-col">
          <div class="grid">
            <div><img :src="item.image" alt="" class="aspect-square px-2 py-2"></div>
            <div class="text-xs">{{ item.title.substring(0, 30) + "..." }}</div>
            <div class="text-center">${{ (item.price * item.quantity).toFixed(2)}}</div>
            <div class="mx-2">
              <div class="flex items-center justify-center">
                <button class="px-2 py-1 bg-gray-300 rounded-sm" @click.stop="decrease(item)">-</button>
                <span class="mx-2">{{ item.quantity }}</span>
                <button class="px-2 py-1 bg-gray-300 rounded-sm" @click.stop="increase(item)">+</button>
              </div>
            </div>
            <div class="text-red-700 cursor-pointer flex items-center ml-4 justify-self-end" @click.stop="remove(item)"><i class="material-icons">delete</i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.cart {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
}

.grid {
  align-items: center;
  column-gap: 1em;
  grid-template-columns: 40px 100px 1fr 1fr 30px;
  grid-auto-rows: 50px;
}

.cart-actual {
  width: 30vw;
}
</style>