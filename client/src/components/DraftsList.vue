<template>
  <div>
    <span class="bold">ID: </span>
    <span> {{ draft.id }} </span>
    <span class="bold">message: </span>
    <span>{{ draft.message }} </span>
    <span class="bold">created at: </span>
    <span>{{ draft.created_at }} </span>
    <span class="bold">updated at: </span>
    <span>{{ draft.updated_at }}</span>
  </div>
</template>

<script>
export default {
  name: 'DraftsList',

  props: {
      draft: Object
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
  color: red;
}
</style>
