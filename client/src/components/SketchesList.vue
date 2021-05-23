<template>
  <div>
    <span class="bold">ID: </span>
    <span> {{ sketch.id }} </span>
    <span class="bold">message: </span>
    <span>{{ sketch.message }} </span>
    <span class="bold">changes: </span>
    <span class="changes">{{ sketch.changes }} </span>
    <span class="bold">created at: </span>
    <span>{{ sketch.created_at }} </span>
    <span class="bold">updated at: </span>
    <span>{{ sketch.updated_at }}</span>
  </div>
</template>

<script>
export default {
  name: 'SketchesList',

  props: {
      sketch: Object
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  font-size: 0.8em;
}
.bold {
  font-weight: bold;
}
.changes {
  color: #42b983;
}
</style>
