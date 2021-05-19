<template>
  <div class="home">

    <button @click.prevent="postSketchDraft">POST Sketch&Draft</button>
      <div v-if="postSketchDraftBtn" class="confirmed">
        <p>Inspect console for results</p> 
      </div> 
    <br>
    <br> 

    <form @submit.prevent="updateSketch">
      <input type="number" placeholder="Sketch ID to change">
      <input type="text" placeholder="Changes">
      <button type="submit">PATCH Sketch</button>
        <div v-if="patchSketchBtn" class="confirmed">
          <p>Inspect console for results</p> 
        </div>    
    </form>
    <br>
    <br>  
  
    <form @submit.prevent="deleteDraft">
      <input type="number" placeholder="Draft ID to delete">
    <button>DELETE Draft</button>
      <div v-if="deleteDraftBtn" class="confirmed">
        <p>Inspect console for results</p> 
      </div>  
    </form>
    <br>
    <br>
    
    <form @submit.prevent="postOrder">
      <input type="number" placeholder="Draft ID to order">
    <button>POST Order</button> 
      <div v-if="postOrderBtn" class="confirmed">
        <p>Inspect console for results</p> 
      </div>
    </form>
  
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
      postSketchDraftBtn: false,
      patchSketchBtn: false,
      deleteDraftBtn: false,
      postOrderBtn: false
  }),

  methods: {
    postSketchDraft(){
    this.$store.dispatch('postSketchDraft') 
    this.postSketchDraftBtn = true
    },
    updateSketch(e){
    this.$store.dispatch('updateSketch', { id: e.target[0].valueAsNumber, changes: e.target[1].value })
    this.patchSketchBtn = true
    },
    deleteDraft(e){
    this.$store.dispatch('deleteDraft', e.target[0].valueAsNumber)
    this.deleteDraftBtn = true
    },
    postOrder(e){
    this.$store.dispatch('postOrder', e.target[0].valueAsNumber),
    this.postOrderBtn = true
    },

  }
  
}
</script>
