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
      this.giveItem( {newItem: recipe.gives.id, num: recipe.gives.quantity})
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
      return this.getinventory.some(el => el.name === neededItem && el.quantity >= itsQuantity)
    },
  },
  computed: {
    ...mapGetters(['getinventory']),
    availableItems: function() {
      return this.getinventory.filter(function(el) {
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

<style lang="sass" src='./Backpack.sass'></style>