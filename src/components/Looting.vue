<template lang="pug">
.looting
  .wrap
    .loot__area
      .loot__list(:class='{ shown: isLocationSeached }')
        .loot__place-wrap(v-for ='(place, index) in locationPlaces')
          span.loot__place(
            @click = 'choosePlace(place.placeId)' 
            :class='{selected: index===currentplaceId, filling: lootingStarted, disabled: lootingStarted}'
            ) {{ place.name }}
            span.loot__empty(v-if = 'place.searchCount === 0') 
          span.loot__place-back( :class='{disabled: lootingStarted, selected: index===currentplaceId,filling: lootingStarted }') недоступно
      .loot__info(:class='{ shown: isLocationSeached }')
        .loot__icon
            img(v-if="isPlaceSelected" :src="require(`../assets/places/${selectedPlace.iconId}.svg`)", alt="...")
        .loot__description
          .loot__parameter(v-if="isPlaceSelected")
            | Вы нашли:
            br
            span.loot__last(:class="{ found: isNewItem }") || {{ lastFound }} ||
          .loot__parameter(v-if="isPlaceSelected")
            | Попыток: {{ selectedPlace.searchCount }}
        .loot__action
          span.loot__action-btn(v-if="isPlaceSelected" :class="{ disabled: lootingStarted }" @click='searchInPlace(selectedPlace.placeId)') обыскать
          span.loot__action-back(:class="{ disabled: lootingStarted }") Обыск...
      .loot__show(v-if="!isLocationSeached")
        .loot__search-btn(@click="showLootable")
          svg.loot__progress-meter(width='200' height='200' viewport='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg')
            circle.loot__progress-bar(:class='{full: isSearching}' r='55' cx='100' cy='100')
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'looting',
  data() {
    return {
      lootingStarted: false,
      isPlaceSelected: false,
      isSearching: false,
      isNewItem: false,
      lastFound: 'ничего',
      searchCount: 0,
      currentplaceId: null,
      selectedPlace: {}
    }
  },
  methods: {
    ...mapActions(['giveItem', 'setSearchCount', 'setLocationSearch']),
    ...mapGetters(['getItemMap', 'getLocations', 'getCurrentLocationIndex', 'getInventory']),

    // LOOTING
    searchInPlace(placeId) {
      this.isNewItem = false;
      if ('boundLootId' in this.selectedPlace) {
        for (let item of this.getInventory()) {
          if (item.id === this.selectedPlace.boundLootId && item.quantity === 0) {
            this.giveItem({newItemId: this.selectedPlace.boundLootId, num:1})
          }
        } 
      }
      if (this.selectedPlace.searchCount >= 1) {
        this.lootingStarted = true;
        let lootingTimer = setTimeout(()=> {
          this.setSearchCount(placeId)
          this.lootingStarted = false;
          this.searchLoot()
          this.isNewItem = true;
          clearTimeout(lootingTimer)
        }, 1500)
      }
    },

    choosePlace(placeId) {
      this.isPlaceSelected = true;
      this.currentplaceId = placeId;
      this.selectedPlace = {};
      this.selectedPlace = this.getLocations()[this.getCurrentLocationIndex()].places[placeId]
    },

    showLootable() {
      this.isSearching = true;
      let showTimer = setTimeout(() => {
        this.setLocationSearch();
        this.isSearching = false;
        clearTimeout(showTimer)
      }, 5200);
    },

    searchLoot() {
      if (this.playerStamina <= 0) {
        console.log('fatigue');
      } else {
        let foundItemId = this.randomItem()
        this.giveItem({newItemId: foundItemId, num:1})
        this.$emit('staminaUsed', {
          usedStamina: this.getRandNum(5, 1),
          usedCalories: this.getRandNum(45, 10),
        })
        foundItemId === undefined ? this.lastFound = 'ничего' : this.lastFound = this.getItemMap()[foundItemId].name;
      }
    },

    // RANDOMIZERS
    randomItem() {
      // Normalise rates
      let locationLootMap = this.selectedPlace.lootMap;
      let rateTotal = 0;
      for (let i = 0; i < locationLootMap.length; i++) {
        rateTotal += locationLootMap[i].rate;
      }
      for (let i = 0; i < locationLootMap.length; i++) {
        locationLootMap[i].distribution = locationLootMap[i].rate / rateTotal;
      }
      //return item name
      let key = 0;
      let selector = Math.random();
      while (selector > 0) {
        selector -= locationLootMap[key].distribution;
        key++;
      }
      key--;
      return locationLootMap[key].item;
    },

    getRandNum(max, min) {
      let rand = Math.floor(Math.random() * Math.floor(max));
      return rand <= min ? min : rand
    },
  },
  computed: {
    isLocationSeached: function() {
      return this.getLocations()[this.getCurrentLocationIndex()].searched
    },
    locationPlaces: function() {
      return this.getLocations()[this.getCurrentLocationIndex()].places
    },
  },
}
</script>

<style lang="sass" src='./Looting.sass'></style>