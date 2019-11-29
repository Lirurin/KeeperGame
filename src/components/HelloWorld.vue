<template>
  <div>

  </div>
</template>

<script>
export default {
  // name: 'HelloWorld',
  // props: {
  //   msg: String
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>


.text-window
p.text-message
.text-controls
span(v-for="(option) in currentQuest.remark[0].routes[0]" class='option') {{ option }}