<template lang="pug">
  .map__cont
    h2.map__title Сейчас вы в локации || {{ nowYouAreIn }} ||
    .map__inner
      .map__preloader(:class='{ active: isWalking }')
        .map__preloader-inner
          .map__path
            .map__path-inner
              .map__path-start {{ startPoint }}
              .map__path-end {{ endPoint }}
              .map__path-pin(:class='{ active: isWalking }')
      .map__location.map__location--buildings(@click="changeLocation(0)" v-if="isLocationDiscovered(0)")
        .map__location-cont(:class="{ 'current': isCurrent[0] }")
          .map__location-title
            | Жилые 
            br 
            | дома
      .map__location.map__location--park(@click="changeLocation(1)" v-if="isLocationDiscovered(1)")
        .map__location-cont(:class="{ 'current': isCurrent[1] }")
          .map__location-title 
            | Парковая 
            br 
            | зона
      .map__location.map__location--cellar(@click="changeLocation(2)" v-if="isLocationDiscovered(2)")
        .map__location-cont(:class="{ 'current': isCurrent[2] }")
          .map__location-title
            | Подвал
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'WorldMap',
  data() {
    return {
      isCurrent: [false, false, true],
      isWalking: false,
      startPoint: '',
      endPoint: '',
    }
  },
  methods: {
    ...mapActions(['setCurrentLocation']),
    ...mapGetters(['getLocations']),

    isLocationDiscovered(id) {
      return this.getLocations()[id].isDivorced
    },

    changeLocation(index) {
      if (this.getCurrentLocationIndex !== index) {
        this.startPoint = this.getLocations()[this.getCurrentLocationIndex].location
        this.endPoint = this.getLocations()[index].location
        this.isWalking = true;
        let walkingTimeout = setTimeout(()=> {
          this.isCurrent.fill(false);
          this.isCurrent[index] = true;
          this.setCurrentLocation(index)
          this.isWalking = false;
          clearTimeout(walkingTimeout)
        }, 2600)
      }
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