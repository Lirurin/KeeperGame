<template lang="pug">
  #app
    .stats
      .stat-wrap
        span.stat-text Выносливость: {{ playerStamina }} %
        span.stat
          span.stat-bar.stat-bar--stamina(ref="staminaBar")
      .stat-wrap
        span.stat-text Калории: {{ calories }} ккал
        span.stat
          span.stat-bar.stat-bar--kcal(ref="kcalBar")
    .interface
      span.interface__btn.interface__btn--inventory(@click='openInventory')
      span.interface__btn.interface__btn--quests(@click='openQuestBook')
        span.interface__btn--available(:class='{show: isQuestAvailable}') {{ availableQuestsNubber }}
      span.interface__btn.interface__btn--map(@click='openMap')
    Looting(@statsUsed='decreaseStats')
    .map(:class="{ opened: isMapOpen }")
      .map__glass(@click='closeAllInterface')
      WorldMap
    .backpack(:class="{ opened: isInventoryOpen }")
      .backpack__glass(@click='closeAllInterface')
      Backpack(@statsAdded='increaseStats')
    .quest__book(:class="{ opened: isQuestBookOpen }")
      .quest__glass(@click='closeAllInterface')
      Quests(@questsNumberChanged='showQuestsNumber')
</template>

<script>
import store from './store'
import Quests from './components/Quests';
import Backpack from './components/Backpack';
import WorldMap from './components/WorldMap';
import Looting from './components/Looting'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  store,
  components: {
    Quests,
    Backpack,
    WorldMap,
    Looting
  },
  data() {
    return {
      // INTERFACE
      isInventoryOpen: false,
      isQuestBookOpen: false,
      isMapOpen: false,
      availableQuestsNubber: 0,
      isQuestAvailable: false,

      //NEEDS
      calories: 3000,
      playerStamina: 100,
    }
  },

  methods: {
    ...mapActions(['takeItem',]),
    ...mapGetters(['getItemMap','getInventory']),

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

    decreaseStats(data) {
      this.calories -= data.usedCalories;
      this.playerStamina -= data.usedStamina;
    },

    increaseStats(data) {
      this.calories += data.usedCalories;
      this.playerStamina += data.usedStamina;
    },

    showQuestsNumber(data){
      if (data.questsNum > 0) {
        this.isQuestAvailable = true;
        this.availableQuestsNubber = data.questsNum;
      } else {
        this.isQuestAvailable = false;
        this.availableQuestsNubber = 0;
      }
    },

    // ACTIONS
    openInventory() {
      this.isInventoryOpen = !this.isInventoryOpen;
      this.isMapOpen === true? this.isMapOpen = false:  null
      this.isQuestBookOpen === true? this.isQuestBookOpen = false:  null
    },
    openQuestBook() {
      this.isQuestBookOpen = !this.isQuestBookOpen;
      this.isInventoryOpen === true? this.isInventoryOpen = false: null
      this.isMapOpen === true? this.isMapOpen = false:  null
    },
    openMap() {
      this.isMapOpen = !this.isMapOpen;
      this.isInventoryOpen === true? this.isInventoryOpen = false: null
      this.isQuestBookOpen === true? this.isQuestBookOpen = false:  null
    },
    closeAllInterface() {
      this.isMapOpen = false;
      this.isInventoryOpen = false;
      this.isQuestBookOpen = false;
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
    },
  },

  // LIFE СYCLE
  mounted() {
    //hunger simulation
    window.setInterval(this.caloriesToStamina, 10000) 
    //stat-bars
    this.$refs.staminaBar.style.width = `${this.playerStamina}%`;
    this.$refs.kcalBar.style.width = `${this.calories * 100/4000}%`;
  },

}
</script>

<style lang="sass" src="./App.sass"></style>