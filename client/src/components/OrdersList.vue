<template>
  <div>
    <span class="bold">ID: </span>
    <span> {{ order.id }} </span>
    <span class="bold">message: </span>
    <span>{{ order.message }} </span>
    <span class="bold">created at: </span>
    <span>{{ order.created_at }} </span>
    <span class="bold">updated at: </span>
    <span>{{ order.updated_at }}</span>
  </div>
</template>

<script>
export default {
  name: 'OrdersList',

  props: {
      order: Object
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
