<template lang="pug">
  .quests
    button(@click="setCurrentQuest(currentQuestId)") QUEST
    template(v-if='isQuestStarted')
      .text-window
        p.text-message {{ currentQuest.remark[currentRemark].text }}
        .text-controls
          span(v-for="(option) in currentQuest.remark[currentRemark].routes" @click  = 'optionClick(option, currentQuestId)' class='option') {{ option.text }}
</template>>
 
<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'quests',
  data() {
    return {
      isQuestStarted: false,
      currentQuestId: 0,
      currentQuest: {},
      currentRoutes: [],
      currentRemark: 0,

      questPool: [
        {
          questName: 'First Quest',
          questDone: false,
          remark: [
            {
              text: 'default text',
              leadsTo: 1,
              routes: [
                  { text: 'lead to 1', leadsTo: 1,},
              ]
            },
            {
              text: 'first text',
              leadsTo: 0,
              routes: [
                  { text: 'lead to 1', leadsTo: 1,},
                  { text: 'lead to 2', leadsTo: 2,},
              ]
            },
            {
              text: 'second text',
              leadsTo: 0,
              routes: [
                  { text: 'reward', leadsTo: 2, reward: { itemId: 7, name: 'match', quantity: 1}, questEnd: true},
              ]
            }
          ],
        },
      ],
    }
  }, 
  methods: {
    ...mapActions(['giveItem']),

    setCurrentQuest(id) {
      if (this.questPool[id].questDone === false) {
        this.isQuestStarted = true;
        this.currentQuest = this.questPool[id];
      }
    },

    optionClick(option, id) {
      this.currentRemark = option.leadsTo;
      if ('reward' in option) {
        this.giveItem({newItem: option.reward.name, num: option.reward.quantity})
      }
      if ('questEnd' in option && option.questEnd === true) {
        this.isQuestStarted = false;
        this.currentRemark = 0;
        this.questPool[id].questDone = true;
      }
    },
  },

  computed: {
    
  },

  watch: {

  }

}
</script>

<style scoped lang="sass">

</style>