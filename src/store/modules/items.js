export default {
  actions: {
    setinventory(ctx, addedItem) {
      ctx.commit('updatePool', addedItem)
    },
    giveItem(ctx, {newItemId, num}) {
      ctx.commit('incinventory', {newItemId, num})
    },
    takeItem(ctx, {removedItem, num}) {
      ctx.commit('decinventory', {removedItem, num})
    },
  },
  mutations: {
    incinventory(state, {newItemId, num}) {
      state.inventory.temp.some(el => el.id === newItemId ? el.quantity+=num : null);
    },
    decinventory(state, {removedItem, num}) {
      state.inventory.temp.some(el => el.name === removedItem ? el.quantity-=num : null);
    },
    updatePool(state, addedItem) {
      state.inventory.temp.push({id: addedItem.id, name: addedItem.name, quantity: 0});
    },
  },
  getters: {
    getinventory(state) {
      return state.inventory.temp
    },
    getItemMap(state) {
      return state.itemMap
    },
    getInventory(state){
      return state.inventory.temp
    },
  },
  state: {
    itemMap: [  
      // scrap
      { id: 0, name: 'ветка'}, { id: 1, name: 'сухая трава'}, { id: 2, name: 'бумажная обертка'},
      // useful
      { id: 3, name: 'жестянка'}, { id: 4, name: 'рукоять'}, { id: 5, name: 'провод'},
      // food
      { id: 6, name: 'остатки еды'}, { id: 7, name: 'консервированная еда'},
      // consumables
      { id: 8, name: 'спичка'},
      // equipment
      { id: 9, name: 'набор для разведения костра'},
      // quests
      { id: 10, name: 'листок с текстом' }
    ],
    inventory: {
      temp: [
          // {name: 'сухая трава', quantity: 2},{name: 'спичка', quantity: 2},{name: 'консервированная еда', quantity: 3},
      ],
    },
  }
}