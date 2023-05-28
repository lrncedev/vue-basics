<script setup>

const props = defineProps({
  product: Object
})
const emits = defineEmits(['close', 'addItem']);

const closeItem = () => {
  emits('close', false)
}

const clicked = (product) => {
  emits('addItem', product)
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-40" @click="closeItem">
    <div class="bg-white p-4 shadow-lg max-w-xl rounded-md">
      <div class="grid grid-cols-2">
        <img :src="props.product.image" alt="Product Image" class="object-contain h-48 w-full mx-auto py-4" />
        <div class="flex flex-col">
          <div class="px-4 pb-2 border-b-2 border-gray-100">
            <div class="text-gray-400 text-sm">Product Name</div>
            <div class="text-xl text-gray-700">{{ props.product.title.substring(0, 40)+ "..."}}</div>
            <div class="text-gray-400 text-base">Price:</div>
            <div class="text-gray-700 text-sm font-bold">${{ props.product.price }} <span class="text-gray-400 ml-2"> <del class="text-base">${{ (props.product.price * 1.10).toFixed(2)}}</del>  </span></div>
          </div>
          <div class="flex justify-end mt-auto">
            <button class="px-2 py-2 bg-red-700 text-white rounded-sm" @click.stop="clicked(props.product)">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>