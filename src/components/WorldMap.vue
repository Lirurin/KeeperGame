<template lang="pug">
  .map__cont
    h2.map__title Сейчас вы в локации || {{ nowYouAreIn }} ||
    .map__inner
      .map__preloader
      .map__location.map__location--buildings(@click="changeLocation(0)")
        .map__location-cont(:class="{ 'current': isCurrent[0] }")
          .map__location-title
            | Жилые 
            br 
            | дома
      .map__location.map__location--park(@click="changeLocation(1)")
        .map__location-cont(:class="{ 'current': isCurrent[1] }")
          .map__location-title 
            | Парковая 
            br 
            | зона
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'WorldMap',
  data() {
    return {
      isCurrent: [false, true],
    }
  },
  methods: {
    ...mapActions(['setCurrentLocation']),
    ...mapGetters(['getLocations']),

    changeLocation(index) {
      this.isCurrent.fill(false);
      this.isCurrent[index] = true;
      this.setCurrentLocation(index)
    },
  },
  computed: {
    ...mapGetters(['getCurrentLocationIndex']),

    nowYouAreIn: function() {
      return this.getLocations()[this.getCurrentLocationIndex].location
    }
  },
}
</script>

<style lang="sass" src="./WorldMap.sass"></style>