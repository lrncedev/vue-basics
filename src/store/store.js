import { reactive } from 'vue';

const state = reactive({
  cart: []
});

const mutations = {
  addToCart(product) {
    state.cart.push(product);
  },
  removeFromCart(product) {
    const index = state.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      state.cart.splice(index, 1);
    }
  }
};

export default {
  state,
  mutations
};