export default {
  actions: {
    setCurrentLocation(ctx, newInd) {
      ctx.commit('changeCurrentLocation', newInd);
    }
  },
  mutations: {
    changeCurrentLocation(state, newInd) {
      state.currentLocationIndex = newInd;
    }
  },
  getters: {
    getLocations(state) {
      return state.locations
    },
    getCurrentLocationIndex(state) {
      return state.currentLocationIndex
    }
  },
  state: {
    //lootArr
    locations: [
      {
      location: 'Жилые дома',
      lootMap: [  
        { item: 0, rate: 30}, {item: 1, rate: 30},  { item: 2, rate: 20},
        { item: 3, rate: 7},  { item: 4, rate: 5},  { item: 5, rate: 30},
        { item: 6, rate: 20}, { item: 7, rate: 10}, { item: 8, rate: 5},
        { item: 9, rate: 1}, 
      ]
      },
      {
      location: 'Парковая зона',
      lootMap: [  
        { item: 0, rate: 50}, { item: 1, rate: 30}, { item: 2, rate: 40},
        { item: 5, rate: 5},  { item: 6, rate: 10}, { item: 7, rate: 5},
        { item: 8, rate: 3},  { item: 9, rate: 1},
      ]
      },
    ],
    currentLocationIndex: 1,
  }
}