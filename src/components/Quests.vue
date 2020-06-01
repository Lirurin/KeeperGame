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
          questName: 'Найти спички',
          questDone: false,
          remark: [
            {
              text: 'На улице достаточно холодно, нужно как-то согреться',
              leadsTo: 1,
              routes: [
                  { text: 'Подумать о костре', leadsTo: 1,},
              ]
            },
            {
              text: 'Проще всего будет найти ветки и траву, а вот со спичками проблемы',
              leadsTo: 0,
              routes: [
                  { text: 'Вернуться', leadsTo: 1,},
                  { text: 'Поискать спички на кухне ближайшего дома', leadsTo: 2,},
              ]
            },
            {
              text: 'Вам повезло, рядом с грязной и запыленной газовой печью лежал один коробок',
              leadsTo: 0,
              routes: [
                  { text: '+3 спички', leadsTo: 2, reward: { itemId: 7, name: 'спичка', quantity: 3}, questEnd: true},
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
}
</script>

<style scoped lang="sass">
  .text-window
    position: absolute
    bottom: 60px
    right: 50%
    display: flex
    flex-direction: column
    justify-content: space-between
    width: 600px
    height: 400px
    border: 1px solid white
    padding: 20px
    background: #0c2429
    transform: translateX(50%)

  .text-message
    color: white
    text-align: center

  .text-controls
    display: flex
    flex-direction: column

  .option
    margin: 10px 20px
    color:  white
    cursor: pointer
</style>