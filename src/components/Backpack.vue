<template lang="pug">
  .backpack__wrap
    .backpack__inner
      .backpack__inventory
        .backpack__craft-possible
          span.backpack__craft-title Можно создать
          .backpack__craft-list
            .backpack__craft-option(v-for='option in craftOptions')
              span {{ option.gives.name }}
              span.backpack__craft-create(@click = 'craftSomething(option)') создать
        .backpack__cont
          .backpack__items
            div(v-for="item in availableItems" class='item' @click="addToCraft(item)") 
              img.backpack__icon(:src="require(`../assets/items/${item.id}.svg`)", alt="...")
              span {{ item.quantity }}
          .backpack__craft
            span.backpack__title крафт
            .backpack__craft-place
              div.backpack__craft-item(v-for="(item, index) in craftPile"  @click="removeFromCraft(index)")
                img.backpack__icon(:src="require(`../assets/items/${item.id}.svg`)", alt="...")
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'backpack',
  data() {
    return {
      // CRAFTING
      craftPile: [],
      craftOptions: [],
      craftRecipes: [
        {
          uses: [
            {
              id: 0,
              quantity: 1
            },
            {
              id: 1,
              quantity: 1
            },
            {
              id: 8,
              quantity: 1
            }
          ],
          gives: {
            id: 9,
            name:'набор для разведения костра',
            quantity: 1,
          }
        },
      ],
    }
  },
  methods: {
    ...mapActions(['takeItem', 'giveItem']),
    ...mapGetters(['getItemMap']),

    // CRAFTING
    numOfItemsInPile(item) {
      let num = 0;
      for ( let el of this.craftPile) {
        el.id === item.id ? num++: num = num;
      }
      return num
    },

    craftSomething(recipe) {
      for (let item of recipe.uses) {
        this.takeItem({removedItem: this.getItemMap()[item.id].name, num: item.quantity}, )
      }
      this.craftPile = [];
      this.giveItem( {newItem: recipe.gives.name, num: recipe.gives.quantity})
    },

    removeFromCraft(index) {
      this.craftPile.splice(index, 1)
    },

    addToCraft(item) {
      this.numOfItemsInPile(item)
      if (item.quantity >= 1 && this.numOfItemsInPile(item) < item.quantity) {
        this.craftPile.push(this.getItemMap()[item.id])
      }
    },
    getCraftItem(neededItem, itsQuantity) {
      return this.getLootPool.some(el => el.name === neededItem && el.quantity >= itsQuantity)
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
    // available recipes monitoring
    craftPile: function(val) {
      this.craftOptions = [];
      for (let recipe of this.craftRecipes) {
        let answers = [];
        for (let item of recipe.uses) {
          this.numOfItemsInPile(this.getItemMap()[item.id]) >= item.quantity ? answers.push(true): answers.push(false)
        }
        if (!answers.some(el => el === false)){
          !this.craftOptions.some(el => el.gives.id === recipe.gives.id) ? this.craftOptions.push(recipe): null;
        } 
      }
    }
  }
}
</script>

<style lang="sass">
  .backpack
    z-index: 1
    position: absolute
    top: -50%
    right: 50%
    width: 100vw
    height: 100vh
    transform: translate(50%, -50%)
    transition: top .6s ease
  .backpack.opened
    top: 50%
    transition: top .6s ease
  .backpack__wrap
    position: absolute
    top: 50%
    right: 50%
    transform: translate(50%, -50%)
    max-width: 768px
    width: 100%
    height: 768px
    background: url('../assets/backpack.svg') center center no-repeat
    background-size: 95%
  .backpack__inner
    position: relative
    width: 100%
    height: 100%
  .backpack__inventory
    position: absolute
    right: 50%
    top: 50%
    display: flex
    flex-direction: column
    justify-content: space-between
    max-width: 400px
    width: 100%
    height: 400px
    border: 1px solid #fff
    border-radius: 15px
    background-color: #0c2429
    transform: translate(50%, -18%)
  .backpack__cont
    display: flex
    flex: 1
  .backpack__craft-possible
    height: 95px
    padding: 0 15px 5px 15px
    border-bottom: 1px solid #ffffff
  .backpack__craft-list
    overflow: auto
    max-height: 65px
    padding: 4px 10px
  .backpack__craft-title
    display: block
    margin-top: 5px
    color: #ffffff
    text-align: center
  .backpack__craft-option
    display: flex
    justify-content: space-between
    padding-bottom: 5px
    color: #ffffff
    font-size: 14px
  .backpack__craft-create
    border-bottom: 1px solid #ffffff
    cursor: pointer
  .backpack__craft-list
    display: flex
    flex-direction: column
  .backpack__items
    display: flex
    flex-wrap: wrap
    align-items: flex-start
    align-content: flex-start
    width: 80%
    padding: 10px 8px 5px 8px
    overflow-y: auto
  .backpack__craft
    display: flex
    flex-direction: column
    align-items: center
    width: 20%
    padding: 5px 0
    border-left: 1px solid #ffffff
  .backpack__craft-place
    display: flex
    flex-direction: column
    align-items: center
    width: 100%
    max-height: 250px
    padding-top: 10px
    overflow: auto
  .backpack__title
    padding: 4px
    border-bottom: 1px solid #ffffff
    font-size: 15px
    color: #ffffff
    text-transform: uppercase
  .backpack__craft-item
    width: 50px
    height: 50px
    padding: 4px
    border: 1px solid #fff
    border-radius: 5px
    margin-bottom: 5px
    color: #ffffff
</style>