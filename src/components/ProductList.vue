<script setup>
import {onMounted, ref, computed} from "vue"
import axios from "axios";
import store from "../store/store";

import ViewProduct from "./ViewProduct.vue";
import CategoryList from "./CategoryList.vue";

const products = ref([]);
const categories = ref([]);

const show = ref(false);
const itemObject = ref(null);
const selectedCategory = ref('all');

const showModal = (itemObj) => {
  itemObject.value = itemObj;
  show.value = true;
}

const handleChangeCategory = (category) => {
  selectedCategory.value = category;
}

const handleClosePopup = (bool) => {
  show.value = bool;
}

const handleAddToCart = (product) => {
  store.mutations.addToCart(product)
}


const addToCart = (product) => {
  store.mutations.addToCart(product)
}

const filteredProducts = computed(() => {
  if(selectedCategory.value == 'all'){
    return products.value;
  }else {
    let items =  products.value.filter((product) => product.category == selectedCategory.value)
    return items;
  }
})

onMounted(() => {
  axios.get('https://fakestoreapi.com/products')
  .then((response) => {
    products.value = response.data;
    }
  )
  .catch((err) => {
    console.log(err)
  });

  axios.get('https://fakestoreapi.com/products/categories')
  .then((response) => {
    categories.value = response.data;
  })
})
</script>

<template>
  <div class="px-4 py-4">
    <div class="flex justify-end">
      <CategoryList :categories="categories" @filterCategory="handleChangeCategory"/>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4 sm:grid-cols-2" >
      <div v-for="item in filteredProducts" class="shadow-lg" :key="item.id">
        <div class="bg-white py-4">
          <img :src="item.image" alt="Product Image" class="aspect-square h-1/2 w-1/3 mx-auto" />
        </div>
        <div class="px-4 py-2 border-y-2 border-gray-100">
          <div class="text-gray-400 text-lg">Product Name</div>
          <div class="text-base text-gray-700">{{ item.title.substring(0, 25) + "..." }}</div>
          <div class="text-gray-400 text-lg">Price:</div>
          <div class="text-gray-700 text-lg font-bold">${{ item.price }} <span class="text-gray-400 ml-2"> <del>${{ (item.price * 1.10).toFixed(2)}}</del>  </span></div>
        </div>
        <div class="flex flex-col justify-center mt-auto text-center">
          <div class="font-medium text-base cursor-pointer hover:bg-gray-100 py-2" @click="showModal(item)">View Product</div>
          <div class="font-bold text-base text-red-600 cursor-pointer hover:bg-gray-100 py-2" @click="addToCart(item)">Add to Cart</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="show">
        <ViewProduct :product="itemObject" @close="handleClosePopup" @addItem="handleAddToCart"/>
      </div>
    </transition>
  </div>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>