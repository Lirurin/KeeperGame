import Vue from 'vue'
import Vuex from 'vuex'
import quests from './modules/quests'
import items from './modules/items'
import worldMap from './modules/worldMap'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        quests,
        items,
        worldMap,
    }
})