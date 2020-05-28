export default {
  actions: {
    setLootPool(ctx, addedItem) {
      ctx.commit('updatePool', addedItem)
    },
    giveItem(ctx, {newItem, num}) {
      ctx.commit('incLootPool', {newItem, num})
    },
    takeItem(ctx, {removedItem, num}) {
      ctx.commit('decLootPool', {removedItem, num})
    }
  },
  mutations: {
    incLootPool(state, {newItem, num}) {
      state.lootPool.temp.some(el => el.name === newItem ? el.quantity+=num : null);
    },
    decLootPool(state, {removedItem, num}) {
      state.lootPool.temp.some(el => el.name === removedItem ? el.quantity-=num : null);
    },
    updatePool(state, addedItem) {
      state.lootPool.temp.push({id: addedItem.itemId, name: addedItem.name, quantity: 0})
    }
  },
  getters: {
    getLootPool(state) {
      return state.lootPool.temp
    },
    getItemMap(state) {
      return state.itemMap
    }
  },
  state: {
    itemMap: [  
      //scrap
      { itemId: 0, name: 'stick'}, { itemId: 1, name: 'dried grass'}, { itemId: 2, name: 'paper'},
      //useful
      { itemId: 3, name: 'can'}, { itemId: 4, name: 'handle'}, { itemId: 5, name: 'wire'},
      //food
      { itemId: 6, name: 'food leftovers'}, { itemId: 7, name: 'preserved food'},
      //consumables
      { itemId: 8, name: 'match'},
      //equipment
      { itemId: 9, name: 'flashlight'},
    ],
    lootPool: {
      temp: [
          // {name: 'dried grass', quantity: 2},{name: 'match', quantity: 2},{name: 'preserved food', quantity: 3},
      ],
    },
  }
}