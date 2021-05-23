<template>
  <div class="home">

    <button @click="postSketchDraft">POST Sketch & Draft</button>
    <SketchesList v-for="sketch in sketches" :key="sketch.message" :sketch="sketch" />
    <br> 

    <form @submit.prevent="updateSketch" class="updateSketches">
      <input type="number" placeholder="Sketch ID to change">
      <input type="text" placeholder="Changes">
      <button type="submit" class="patchBtn">PATCH Sketch</button>  
    </form>
    <br>  
  
    <form @submit.prevent="deleteDraft">
      <input class="deleteDraft" type="number" placeholder="Draft ID to delete">
    <button class="deleteBtn">DELETE Draft</button> 
    </form>
    <DraftsList v-for="draft in drafts" :key="draft.message" :draft="draft" />
    <br>

    <form @submit.prevent="postOrder">
      <input class="postOrder" type="number" placeholder="Draft ID to order">
    <button>POST Order</button> 
    <OrdersList v-for="order in orders" :key="order.message" :order="order" />
    </form>
  
  </div>
</template>

<script>
import SketchesList from '@/components/SketchesList'
import DraftsList from '@/components/DraftsList'
import OrdersList from '@/components/OrdersList'

export default {
  name: 'Home',

  components: {
  SketchesList,
  DraftsList,
  OrdersList
  },

  methods: {
    postSketchDraft(){
    this.$store.dispatch('postSketchDraft')
    this.$store.dispatch("getSketches"); 
    this.$store.dispatch("getDrafts"); 
    },
    updateSketch(e){
    this.$store.dispatch('updateSketch', { id: e.target[0].valueAsNumber, changes: e.target[1].value })
    this.$store.dispatch("getSketches");
    document.querySelectorAll(".updateSketches > input").forEach(input => input.value = "")
    },
    deleteDraft(e){
    this.$store.dispatch('deleteDraft', e.target[0].valueAsNumber)
    this.$store.dispatch("getDrafts"); 
    document.querySelector(".deleteDraft").value = ""
    },
    postOrder(e){
    this.$store.dispatch('postOrder', e.target[0].valueAsNumber)
    this.$store.dispatch("getOrders"); 
    document.querySelector(".postOrder").value = ""
    }
  },

  computed: {
  sketches() {
  return this.$store.state.sketches;
  },
  drafts() {
  return this.$store.state.drafts;
  },
  orders() {
  return this.$store.state.orders;
  }
  }

  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin-left: 1%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  padding: 10px;
  color: white;
  cursor: pointer;
}
.deleteBtn {
  background-color: #d11a2a;
}
.patchBtn {
  background-color: #ff9800;
}
.updateSketches > input {
  margin: 5px;
}
</style>