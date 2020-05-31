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
      state.lootPool.temp.push({id: addedItem.id, name: addedItem.name, quantity: 0})
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
      { id: 0, name: 'ветка'}, { id: 1, name: 'сухая трава'}, { id: 2, name: 'бумага'},
      //useful
      { id: 3, name: 'жестянка'}, { id: 4, name: 'рукоять'}, { id: 5, name: 'провод'},
      //food
      { id: 6, name: 'остатки еды'}, { id: 7, name: 'консервированная еда'},
      //consumables
      { id: 8, name: 'спичка'},
      //equipment
      { id: 9, name: 'набор для разведения костра'},
    ],
    lootPool: {
      temp: [
          // {name: 'сухая трава', quantity: 2},{name: 'спичка', quantity: 2},{name: 'консервированная еда', quantity: 3},
      ],
    },
  }
}