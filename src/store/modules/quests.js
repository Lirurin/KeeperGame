export default {
  actions: {
    setQuestDone(ctx, questID) {
      ctx.commit('changeQuestState', questID)
    },
    setQuestAvailable(ctx, questID) {
      ctx.commit('changeQuestAvailability', questID)
    }
  },
  mutations: {
    changeQuestState(state, questID){
      state.quests[questID].questDone = true;
    },
    changeQuestAvailability(state, questID) {
      state.quests[questID].questAvailable = true;
    }
  },
  getters: {
    getQuests(state) {
      return state.quests
    } 
  },
  state: {
    quests: [
      {
        questId: 0,
        questName: 'Ключ от города',
        questDone: false,
        questAvailable: false,
        description: 'Парк обнесен довольно высоким забором. Стоит осмотреться и поискать выход',
        requirements: {
          neededLocation: { id: 1, name: 'Парковая зона' },
          neededItems: null,
          // neededItems: [ { id: 10, name: 'Листок с текстом' } ]
        },
        reward: {
          discoveredLocation: {id:0, name: 'Жилые дома'},
          discoveredQuestId: null,
          foundItems: null
        },
        remark: [
          { // 0
            text: ['Some text'],
            routes: [
              { text: 'Далее', leadsTo: 1,},
            ]
          },
          { // 1
            text: ['Some text'],
            routes: [
              { text: 'Осмотреть ворота', leadsTo: 2,},
              { text: 'Осмотреть сторожку', leadsTo: 3,},
            ]
          },
          { //2
            text: ['Some text'],
            routes: [
              { text: 'Вернуться', leadsTo: 1,},
            ]
          },
          { // 3
            text: ['Some text'],
            routes: [
              { text: 'Оборвать растение и войти', leadsTo: 5,},
              { text: 'Заглянуть в окно', leadsTo: 4,},
            ]
          },
          { // 4
            text: ['Some text','Some text'],
            routes: [
              { text: 'Вернуться', leadsTo: 3,},
            ]
          },
          { // 5
            text: ['Some text'],
            routes: [
              { text: 'Далее', leadsTo: 6,},
            ]
          },
          { // 6
            text: ['Some text'],
            routes: [
              { text: 'Нажать на кнопки', leadsTo: 7,},
              { text: 'Осмотреть стол', leadsTo: 8,},
            ]
          },
          { // 7
            text: ['Some text'],
            routes: [
              { text: 'Вернуться', leadsTo: 6,},
            ]
          },
          { // 8
            text: ['Some text'],
            routes: [
              { text: 'Открыть ящик', leadsTo: 9,},
            ]
          },
          { // 9
            text: ['Some text'],
            routes: [
              { text: 'Осмотреть фото', leadsTo: 10,},
            ]
          },
          { // 10
            text: ['Some text'],
            routes: [
              { text: 'Развернуть лист', leadsTo: 11,},
            ]
          },
          { // 11
            text: ['Some text'],
            routes: [
              { text: 'Далее', leadsTo: 12,},
            ]
          },
          { // 12
            text: ['Some text'],
            routes: [
              { text: 'Забрать вещи и выйти из сторожки', leadsTo: 13,},
            ]
          },
          { // 13
            text: ['Some text'],
            routes: [
              { text: 'Далее', leadsTo: 14,},
            ]
          },
          { // 14
            text: ['Some text', 'Some text'],
            routes: [
              { text: 'Далее', leadsTo: 15,},
            ]
          },
          { // 15
            text: [''],
            routes: [
              { text: 'Закрыть окно', leadsTo: 15, questEnd: true},
            ]
          },
        ],
      },
      {
        questId: 1,
        questName: 'Доброе утро, мир',
        questDone: false,
        questAvailable: true,
        description: '...',
        requirements: null,
        reward: {
          discoveredLocation: {id: 1, name: 'Парковая зона'}, 
          discoveredQuestId: 0,
          foundItems: null
        },
        remark: [
          { //0
            text: ['...'],
            routes: [
              { text: 'Включить свет', leadsTo: 1,},
            ]
          },
          { //1
            text: ['Some text'],
            routes: [
              { text: 'Осмотреться', leadsTo: 2,},
            ]
          },
           { //2
            text: ['Some text'],
            routes: [
              { text: 'Взять обертку', leadsTo: 3,},
              { text: 'Взять листок', leadsTo: 4,},
            ]
          },
          { //3
            text: ['Some text'],
            routes: [
              { text: 'Взять листок', leadsTo: 4,},
            ]
          },
          { //4
            text: ['Some text'],
            routes: [
              { text: 'Далее', leadsTo: 5,},
            ]
          },
          { //5
            text: ['Some text'],
            routes: [
              { text: 'Выйти из комнаты', leadsTo: 6,},
            ]
          },
          { //6
            text: ['Some text'],
            routes: [
              { text: 'Подойти к белой двери', leadsTo: 7,},
              { text: 'Подойти к зеленой двери', leadsTo: 8,},
            ]
          },
          { //7
            text: ['Some text'],
            routes: [
              { text: 'Вернуться', leadsTo: 6,},
            ]
          },
          { //8
            text: ['Some text'],
            routes: [
              { text: 'Попробовать открыть дверь', leadsTo: 9,},
              { text: 'Вернуться', leadsTo: 6,},
            ]
          },
          { //9
            text: ['Some text'],
            routes: [
              { text: 'Подняться по лестнице', leadsTo: 10,},
            ]
          },
          { //10
            text: ['Some text'],
            routes: [
              { text: 'Далее', leadsTo: 11,},
            ]
          },
          { //11
            text: ['Some text'],
            routes: [
              { text: 'Далее', leadsTo: 12, },
            ]
          },
          { //12
            text: [''],
            routes: [
              { text: 'Закрыть окно', leadsTo: 12, questEnd: true},
            ]
          },
        ],
      },

    ]
  }
}