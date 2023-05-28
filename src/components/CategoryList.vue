<script setup>
import {ref} from "vue";
const props = defineProps({
  categories: Array
})
const emits = defineEmits(['filterCategory'])

const category = ref(null);

const filterByCategory = () => {
  emits('filterCategory', category.value)
}

</script>
<template>
  <div>
    <label for="filter" class="mr-2">Categories</label>
    <select id="filter" v-model="category" @change="filterByCategory">
      <option value="all" selected>All</option>
      <option v-for="(category, index) in categories" :key="index" :value="category">
        {{ category }}
      </option>
    </select>
  </div>
</template>