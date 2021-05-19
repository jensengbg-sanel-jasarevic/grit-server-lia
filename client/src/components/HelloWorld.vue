<template>
  <div class="hello">

  <button @click.prevent="postSketchDraft">POST Sketch&Draft</button> 
  <br>
  <br> 

  <form @submit.prevent="updateSketch">
    <input type="number" placeholder="Sketch ID to change">
    <input type="text" placeholder="Changes">
    <button type="submit">PATCH Sketch</button>
  </form>
  <br>
  <br>  
 
  <form @submit.prevent="deleteDraft">
    <input type="number" placeholder="Draft ID to delete">
  <button>DELETE Draft</button>
  </form>
  <br>
  <br>
   
  <form @submit.prevent="postOrder">
    <input type="number" placeholder="Draft ID to order">
  <button>POST Order</button> 
  </form>
  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  methods: {
    postSketchDraft(){
    this.$store.dispatch('postSketchDraft') 
    },
    updateSketch(e){
    this.$store.dispatch('updateSketch', { id: e.target[0].valueAsNumber, changes: e.target[1].value })
    },
    deleteDraft(e){
    this.$store.dispatch('deleteDraft', e.target[0].valueAsNumber)
    },
    postOrder(e){
    this.$store.dispatch('postOrder', e.target[0].valueAsNumber)
    } 
  }, 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
