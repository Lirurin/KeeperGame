export default {
  actions: {
    giveItem(ctx, {newItemID, num}) {
      ctx.commit('incItemQuant', {newItemID, num})
    },
    takeItem(ctx, {removedItemID, num}) {
      ctx.commit('decItemQuant', {removedItemID, num})
    },
  },
  mutations: {
    incItemQuant(state, {newItemID, num}) {
      state.itemMap.some(el => el.id === newItemID ? el.quantity+=num : null);
    },
    decItemQuant(state, {removedItemID, num}) {
      state.itemMap.some(el => el.id === removedItemID ? el.quantity-=num : null);
    },
  },
  getters: {
    getItemMap(state) {
      return state.itemMap
    },
  },
  state: {
    itemMap: [  
      // scrap
      { id: 0, name: 'Ветка', isFood: false, kcal: 0, quantity: 0,}, { id: 1, name: 'Сухая трава', isFood: false, kcal: 0, quantity: 0,}, 
      { id: 2, name: 'Бумажная обертка', isFood: false, kcal: 0, quantity: 0,},
      // useful
      { id: 3, name: 'Жестянка', isFood: false, kcal: 0, quantity: 0,}, { id: 4, name: 'Рукоять', isFood: false, kcal: 0, quantity: 0,}, 
      { id: 5, name: 'Провод', isFood: false, kcal: 0, quantity: 0,},
      // food
      { id: 6, name: 'Остатки батончика', isFood: true, kcal: 80, quantity: 0,}, { id: 7, name: 'Консервированная еда', isFood: true, kcal: 300, quantity: 0,},
      // consumables
      { id: 8, name: 'Спичка', isFood: false, kcal: 0, quantity: 0,},
      // equipment
      { id: 9, name: 'Набор для разведения костра', isFood: false, kcal: 0, quantity: 0,},
      // quests
      { id: 10, name: 'Листок с текстом', isFood: false, kcal: 0, quantity: 0,}
    ],
  }
}