export default {
  actions: {
    setCurrentLocation(ctx, newInd) {
      ctx.commit('changeCurrentLocation', newInd);
    },
    setSearchCount(ctx, placeId) {
      ctx.commit('decSearchCount', placeId)
    },
    setLocationSearch(ctx) {
      ctx.commit('searchLocation')
    },
    setLocationDiscover(ctx) {
      ctx.commit('discoverLocation')
    }
  },
  mutations: {
    changeCurrentLocation(state, newInd) {
      state.currentLocationIndex = newInd;
    },
    decSearchCount(state, placeId) {
      state.locations[state.currentLocationIndex].places[placeId].searchCount -= 1
    },
    searchLocation(state) {
      state.locations[state.currentLocationIndex].searched = true
    },
    discoverLocation(state) {
      state.locations[state.currentLocationIndex].isDivorced = true
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
        isDivorced: false,
        searched: false,
        places: [
          {
            name: 'Одноэтажный дом',
            iconId: 3,
            placeId: 0,
            searchCount: 8,
            lootMap: [
              { item: 3, rate: 50}, { item: 5, rate: 30},
            ]
          },
          {
            name: 'Двухэтажный дом',
            iconId: 4,
            placeId: 1,
            searchCount: 16,
            lootMap: [
              { item: 3, rate: 50}, { item: 5, rate: 30},
            ]
          },
        ],
      },
      {
        location: 'Парковая зона',
        isDivorced: true,
        searched: false,
        places: [
          {
            name: 'Мусорный бак',
            iconId: 0,
            placeId: 0,
            searchCount: 7,
            lootMap: [
              { item: 0, rate: 50}, { item: 1, rate: 30},
            ]
          },
          {
            name: 'Мусорный бак',
            iconId: 0,
            placeId: 1,
            searchCount: 1,
            lootMap: [
              { item: 0, rate: 50}, { item: 1, rate: 30},
            ]
          },
          {
            name: 'Сторожка у ворот',
            iconId: 1,
            placeId: 2,
            searchCount: 5,
            boundLootId: 10,
            lootMap: [
              { item: 0, rate: 50}, { item: 1, rate: 30},
            ]
          },
          {
            name: 'Парковая зона',
            iconId: 2,
            placeId: 3,
            searchCount: 40,
            lootMap: [
              { item: 0, rate: 50}, { item: 1, rate: 30},
            ]
          },
      ],
      // lootMap: [
      //   { item: 0, rate: 50}, { item: 1, rate: 30}, { item: 2, rate: 40},
      //   { item: 5, rate: 5},  { item: 6, rate: 10}, { item: 7, rate: 5},
      //   { item: 8, rate: 3},  { item: 9, rate: 1},
      // ]
      },
    ],
    currentLocationIndex: 1,
  }
}