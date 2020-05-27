export default {
  actions: {
    setLootPool(ctx, addedItem) {
      ctx.commit('updatePool', addedItem)
    },
    giveItem(ctx, newItem) {
      ctx.commit('incLootPool', newItem)
    },
    takeItem(ctx, removedItem) {
      ctx.commit('decLootPool', removedItem)
    }
  },
  mutations: {
    incLootPool(state, newItem) {
      state.lootPool.temp.some(el => el.name === newItem ? el.quantity+=1 : null);
    },
    decLootPool(state, removedItem) {
      state.lootPool.temp.some(el => el.name === removedItem ? el.quantity-=1 : null);
    },
    updatePool(state, addedItem) {
      state.lootPool.temp.push({ name: addedItem, quantity: 0})
    }
  },
  getters: {
    getLootPool(state) {
      return state.lootPool.temp
    }
  },
  state: {
    lootPool: {
      temp: [
          // {name: 'scrap wood', quantity: 2},{name: 'match', quantity: 2},{name: 'preserved food', quantity: 3},
      ],
    },
  }
}