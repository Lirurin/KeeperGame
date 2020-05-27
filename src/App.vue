<template lang="pug">
  #app
    .stats
      .stat-wrap
        span.stat-text Stamina: {{ playerStamina }} %
        span.stat
          span.stat-bar.stat-bar--stamina(ref="staminaBar")
      .stat-wrap
        span.stat-text Calories: {{ calories }} kcal
        span.stat
          span.stat-bar.stat-bar--kcal(ref="kcalBar")
    span.openInventory(@click='isInventoryOpen = !isInventoryOpen') Open inventory
    .looting
      .wrap
        h2 Currently you are in {{ nowYouIn }}
        h2 You found {{ lastFound }}
        .lootTimer
          .timerTrack(ref="timerTrack")
    .controls
      button(@click="timedLoot()" class="lootBtn" :disabled="isDisabled") Loot
      button(@click="eatSomething()" class="lootBtn" :disabled="isDisabled") Eat
      button(@click="craftFire()" :disabled="isDisabled") fire
      button(@click="addWood()" :disabled="isDisabled") add Wood
      .map
        button.buildings(@click="changeLocation(0)")
        button.park(@click="changeLocation(1)")
    .inventory(:class="{ opened: isInventoryOpen }")
      ul
        li(v-for="(item) in availableItems" class='item') {{ item.name }} : {{ item.quantity }}
    .equipment
      transition(name="fade")
        .available-equip
          .available-equip__item(v-if='fireNear')
            svg( xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.62 511.62" xml:space="preserve")
              path(d='M156.45,351.309c8.564,12.272,19.368,23.935,32.404,34.972c13.039,11.036,26.215,20.553,39.543,28.547\
              c13.326,7.998,28.553,15.893,45.682,23.702l-0.287-0.287l1.143,0.287c-12.754-24.365-19.128-45.679-19.128-63.953\
              c0-9.709,2.334-18.894,7-27.549c4.661-8.664,10.749-16.426,18.268-23.271c7.522-6.851,15.848-13.702,24.982-20.554\
              c9.133-6.857,18.267-14.232,27.411-22.127c9.134-7.898,17.463-16.276,24.981-25.126c7.519-8.852,13.606-19.558,18.274-32.12\
              c4.661-12.563,6.995-26.269,6.995-41.112c0-18.654-2.621-36.164-7.851-52.534c-5.235-16.368-12.135-30.693-20.697-42.968\
              c-8.562-12.275-19.362-23.935-32.408-34.97c-13.038-11.04-26.214-20.557-39.539-28.549C269.897,15.703,254.671,7.804,237.543,0\
              l0.284,0.288L236.971,0c12.56,24.741,18.839,46.061,18.839,63.95c0,9.707-2.331,18.892-6.995,27.55\
              c-4.665,8.66-10.754,16.415-18.271,23.269c-7.52,6.851-15.846,13.703-24.982,20.557c-9.139,6.851-18.276,14.228-27.411,22.126\
              c-9.136,7.898-17.462,16.274-24.982,25.122c-7.517,8.852-13.606,19.558-18.271,32.12c-4.661,12.563-6.995,26.269-6.995,41.112\
              c0,18.654,2.611,36.165,7.846,52.533C140.985,324.708,147.886,339.037,156.45,351.309z')
              path(d='M454.092,477.788c-1.811-1.803-3.949-2.703-6.42-2.703H63.95c-2.474,0-4.615,0.9-6.423,2.703\
              c-1.809,1.808-2.712,3.949-2.712,6.424v18.271c0,2.479,0.903,4.617,2.712,6.427c1.809,1.811,3.949,2.711,6.423,2.711h383.722\
              c2.471,0,4.609-0.9,6.42-2.711c1.807-1.81,2.714-3.948,2.714-6.427v-18.271C456.806,481.737,455.905,479.596,454.092,477.788z')
            span Burn Time: {{ burnTime }}
    quests(v-if = 'isQuest')
</template>

<script>
import store from './store'
import quests from './components/Quests';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  store,
  components: {
      quests,
  },
  data() {
      return {
        // INTERFACE
        isInventoryOpen: false,

        lootArr: [
          {
          location: 'houses',
          lootMap: [  
            //scrap
            { item: { itemId: 0, name: 'wooden bits'}, weight: 30}, {item:  { itemId: 1, name: 'scrap wood'}, weight: 30}, { item: { itemId: 2, name: 'paper'}, weight: 20},
            //useful
            { item: { itemId: 3, name: 'can'}, weight: 7}, { item: { itemId: 4, name: 'wooden handle'}, weight: 5}, { item: { itemId: 4, name: 'wire'}, weight: 30},
            //food
            { item: { itemId: 5, name: 'food leftovers'}, weight: 20},{ item: { itemId: 6, name: 'preserved food'}, weight: 10},
            //consumables
            { item: { itemId: 7, name: 'match'}, weight: 5},
            //equipment
            { item: { itemId: 8, name: 'flashlight'}, weight: 1},
          ]
          },
          {
          location: 'park',
          lootMap: [  
            //scrap
            { item: { itemId: 0, name: 'wooden bits'}, weight: 50}, { item: { itemId: 1, name: 'scrap wood'}, weight: 30}, { item:{ itemId: 2, name: 'paper'}, weight: 40},
            //useful
            { item: { itemId: 4, name: 'wire'}, weight: 5},
            //food
            { item: { itemId: 5, name: 'food leftovers'}, weight: 10}, { item: { itemId: 6, name: 'preserved food'}, weight: 5},
            //consumables
            { item: { itemId: 7, name: 'match'}, weight: 3},
            //equipment
            { item: { itemId: 8, name: 'flashlight'}, weight: 1},
          ]
          },
        ],

        // QUESTING
        isQuest: true,

        // LOOTING
        lootTime: 2000,
        lastFound: 'nothing',
        isDisabled: false,
        playerStamina: 100,
        searchCount: 0,
        countedPers: [],
        calories: 3000,
        fireNear: false,
        burnTime: 2000,
        currentLocation: 1,
        nowYouIn: 'park',
    }
  },

  methods: {
    ...mapActions(['giveItem', 'takeItem', 'setLootPool']),

    // LOOTING
    timedLoot() {
      let transitionTime = (this.lootTime / 1000) + 's';
      this.isDisabled = true;
      this.$refs.timerTrack.classList.add('timerTrack--active');
      this.$refs.timerTrack.style.transitionDuration = transitionTime;
      setTimeout(() => {
        this.$refs.timerTrack.classList.remove('timerTrack--active');
        this.$refs.timerTrack.style.transitionDuration = '0s';
      }, this.lootTime);
      setTimeout(function () { this.searchLoot() }.bind(this), this.lootTime);
    },
    searchLoot() {
      if (this.playerStamina <= 0) {
        console.log('fatigue');
      } else {
        let foundItem = this.randomItem();
        this.playerStamina -= this.getRandNum(7);
        this.calories -= this.getRandNum(80);
        this.giveItem(foundItem)
        foundItem === undefined ? this.lastFound = 'nothing' : this.lastFound = foundItem;
        this.isDisabled = false;
      }
    },

    // RANDOMIZERS
    randomItem() {
      // Normalise Weights
      let weightTotal = 0;
      for (let i = 0; i < this.lootArr[this.currentLocation].lootMap.length; i++) {
        weightTotal += this.lootArr[this.currentLocation].lootMap[i].weight;
      }
      for (let i = 0; i < this.lootArr[this.currentLocation].lootMap.length; i++) {
        this.lootArr[this.currentLocation].lootMap[i].distribution = this.lootArr[this.currentLocation].lootMap[i].weight / weightTotal;
      }
      //return item name
      let key = 0;
      let selector = Math.random();
      while (selector > 0) {
        selector -= this.lootArr[this.currentLocation].lootMap[key].distribution;
        key++;
      }
      key--;
      return this.lootArr[this.currentLocation].lootMap[key].item.name;
    },
    getRandNum(max) {
      let rand = Math.floor(Math.random() * Math.floor(max));
      return rand === 0 ? 1 : rand
    },

    // SURVIVAL AND NEEDS
    eatSomething() {
      let innerThis = this;
      this.getLootPool.some((el) => {
        if (el.name === 'food leftovers' && el.quantity > 0) {
          this.takeItem('food leftovers')
          innerThis.calories += innerThis.getRandNum(250);
        }
        else if (el.name === 'preserved food' && el.quantity > 0) {
          this.takeItem('preserved food')
          innerThis.calories += innerThis.getRandNum(1300);
        }
      });
    },

    caloriesToStamina() {
      if (this.calories >= 20) {
        if (this.fireNear) {
          this.calories -= 15;
          this.playerStamina += 5;
        } else {
          this.calories -= 20;
          this.playerStamina+=1;
        }
      } else {
        console.log('need food');
      }
    },

    addWood() {
      if ((this.getCraftItem('wooden bits', 1))) {
        this.burnTime += (300 + this.getRandNum(200));
        this.getLootPool.filter(obj => (obj.name === 'wooden bits' && obj.quantity > 0) ? this.takeItem('wooden bits') : null);
      }
    },

    // CRAFTING
    getCraftItem(neededItem, itsQuantity) {
      return this.getLootPool.some(el => el.name === neededItem && el.quantity >= itsQuantity)
    },

    craftFire() {
      if (this.fireNear === false && this.getCraftItem('scrap wood', 2) && this.getCraftItem('match', 1)) {
        this.fireNear = true;
        this.getLootPool.filter(obj => (obj.name === 'scrap wood' && obj.quantity > 0) ? this.takeItem('scrap wood') : null);
        this.getLootPool.filter(obj => (obj.name === 'match' && obj.quantity > 0) ? this.takeItem('match') : null);
      }
      this.countdownFire()
    },

    // ACTIONS
    changeLocation(index) {
      this.currentLocation = index;
      this.nowYouIn = this.lootArr[index].location
    },
    disableFire() {
      this.fireNear = false;
    },

    // TIMERS
    countdownFire() {
      if (this.burnTime > 0) {
        this.burnTime -= 1;
        setTimeout(this.countdownFire, 100)
      } else {
        this.disableFire();
      }
    },
  },

  computed: {
      ...mapGetters(['getLootPool']),
      availableItems: function() {
        return this.getLootPool.filter(function(el) {
          return el.quantity
        })
      },
  },

  watch: {
    calories: function (val) {
      // bar limits
      val >= 4000 ? this.calories = 4000 : this.calories;
      val <= 0 ? this.calories = 0 : this.calories;
      // bar fullness
      this.$refs.kcalBar.style.width = `${val*100/4000}%`
    },
    playerStamina: function (val) {
      // bar limits
      val >= 100 ? this.playerStamina = 100 : this.playerStamina;
      val <= 0 ? this.playerStamina = 0 : this.playerStamina;
      // bar fullness
      this.$refs.staminaBar.style.width = `${val}%`
    }
  },

  // LIFE СYCLE
  mounted() {
    // get all possible loot and put into array
    let tempArray = [];
    this.lootArr.forEach(function (el) {
      el.lootMap.forEach(function (el2) {
        tempArray.push(el2.item.name);
      });
    });

    // make only unique items left
    tempArray = new Set(tempArray);
    tempArray.forEach(item => this.setLootPool(item));

    //hunger simulation
    window.setInterval(this.caloriesToStamina, 10000) 

    //stat-bars
    this.$refs.staminaBar.style.width = `${this.playerStamina}%`
    this.$refs.kcalBar.style.width = `${this.calories*100/4000}%`
  },

}
</script>

<style lang="sass" src="./App.sass">

</style>
