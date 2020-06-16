<template lang="pug">
  .quests__book
    .quests__container
      .quests__list
        .quest__item(
          v-if="availableQuests.length !== 0"
          v-for='(quest, index) of availableQuests' 
          :class="{selected: quest.questName === currentQuest.questName }" 
          @click="selectQuest(quest.questId)") {{ quest.questName }}
        h2.quests__no-items(v-if="availableQuests.length === 0") Нет доступных заданий
      .quests__description
        .quests__description-inner(v-if="questSelected")
          h3.quests__name {{ currentQuest.questName }}
          .quests__text {{ currentQuest.description }}
          template(v-if="currentQuest.requirements !== null")
            .quests__requirements Требования:
              br
              span.quests__required
                span.quests__requirement( v-if="currentQuest.requirements.neededLocation !== null" :class = "{ fulfilled: locationFulfilled }") 
                  | Местность:
                  br
                  | {{ currentQuest.requirements.neededLocation.name }}
              span.quests__required(v-if="currentQuest.requirements.neededItems !== null")
                | Предметы:
                span.quests__requirement(v-for="(item, index) in currentQuest.requirements.neededItems" :class = "{ fulfilled: checkItems(index) }") 
                  br
                  | {{ item.name }}
          template(v-else)
            .quests__requirements Требования: нет
        .quests__description-btns
          button(@click="setCurrentQuest(currentQuest.questId)" v-if="questSelected") Начать
    template(v-if='isQuestStarted')
      .quest__dialog(:class="{ disappearing: questEnding }")
        .quest__message 
          span.quest__message-line(v-for="line in currentQuest.remark[currentRemark].text") {{ line }}
          .quest__message-reward(v-if="currentRemark === currentQuest.remark.length - 1") 
            span(v-if="currentQuest.reward.discoveredLocation !== null") Открыта область: {{ currentQuest.reward.discoveredLocation.name}}
            span(v-if="currentQuest.reward.discoveredQuestId !== null") Доступно задание: {{ questPool[currentQuest.reward.discoveredQuestId].questName }}
        .quest__controls
          span.quest__control(v-for="(option) in currentQuest.remark[currentRemark].routes" @click = 'optionClick(option, currentQuest.questId)') {{ option.text }}
</template>
 
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'quests',
  data() {
    return {
      questSelected: false,
      isQuestStarted: false,
      currentQuestId: null,
      currentQuest: {},
      currentRoutes: [],
      currentRemark: 0,
      questEnding: false,
      availableQuests: [],
      inLocation: false,
      haveItems: false,
      questPool: [],
    }
  }, 
  methods: {
    ...mapActions(['giveItem', 'setLocationDiscover', 'setQuestDone', 'setQuestAvailable']),
    ...mapGetters(['getCurrentLocationIndex', 'getItemMap', 'getLocations', 'getQuests']),

    // item requirments check
    checkItems(index) {
      let items = [];
      let requirments = this.currentQuest.requirements
      if (requirments !== null) {
        if (requirments.neededItems !== null) {
          for (let item of this.currentQuest.requirements.neededItems) {
            this.getItemMap()[item.id].quantity > 0 ? items.push(true) : items.push(false);
          }
          items.some( el => el === false ) ? this.haveItems = false: this.haveItems = true;
        }
      } else {
        this.haveItems = true;
      }
      return items[index]
    },

    // location requirments check
    checkLocation() {
      let requirments = this.currentQuest.requirements
      if (requirments !== null) {
        if (requirments.neededLocation !== null ) {
          this.getCurrentLocationIndex() === this.currentQuest.requirements.neededLocation.id ? this.inLocation = true: this.inLocation = false;
        }
      } else {
        this.inLocation = true;
      }
    },

    // start quest if requirments fulfilled
    setCurrentQuest(id) {
      this.checkLocation()
      this.checkItems()
      if (this.inLocation && this.haveItems) {
        this.startQuest(id)
      }
    },

    startQuest(id) {
      if (this.questPool[id].questDone === false) {
        this.isQuestStarted = true;
      }
    },

    // quest selection from list
    selectQuest(index) {
      this.currentQuestId = index;
      this.questSelected = true; 
      this.currentQuest = this.questPool[index];
    },

    giveReward() {
      if (this.currentQuest.reward.discoveredQuestId !== null) {
        this.setQuestAvailable(this.currentQuest.reward.discoveredQuestId)
      }
      if (this.currentQuest.reward.discoveredLocation !== null) {
        this.setLocationDiscover(this.currentQuest.reward.discoveredLocation.id)
      }
      if (this.currentQuest.reward.foundItems !== null) {
        this.giveItem({newItemID: this.currentQuest.reward.foundItems.itemId, num: this.currentQuest.reward.foundItems.quantity})
      }
    },

    // transition between quest text massages
    optionClick(option, id) {
      if ('questEnd' in option && option.questEnd === true) {
        this.giveReward()
        this.questEnding = true;
        let questEndTimeout = setTimeout(() => {
          this.questEnding = false;
          this.isQuestStarted = false;
          this.questSelected = false;
          this.currentRemark = 0;
         
          this.setQuestDone(id);
          this.currentQuestId = null;
          this.getAvailableQuests();
          clearTimeout(questEndTimeout)
        }, 700) 
      }
      this.currentRemark = option.leadsTo;
    },

    // get quest list 
    getAvailableQuests() {
      this.availableQuests = this.questPool.filter(el => el.questDone === false && el.questAvailable === true)
    },

  },
  computed: {
    locationFulfilled: function() {
      this.checkLocation()
      return this.inLocation
    },
  },

  watch: {
    availableQuests(val) {
      this.$emit('questsNumberChanged', {
        questsNum: val.length
      })
    },
  },

  mounted() {
    this.questPool = this.getQuests()
    this.getAvailableQuests()
  }
}
</script>

<style lang="sass" src="./Quests.sass"></style>