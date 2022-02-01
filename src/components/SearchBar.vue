<template>
<div class=" d-inline-flex pull-left mt-3">
 <div class="input-group">
  <input class="form-control" @keyup.enter="searchBarcode()" type="text" placeholder="Search" />
    <div class="input-group-append">
      <button class="btn btn-secondary" type="button">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      depots : this.$store.state.depots
    }
  },
  computed: {
    filteredResources (){
      if(this.searchQuery){
      return this.depots.filter((item)=>{
        return item.date.startsWith(this.searchQuery);
      })
      }else{
        return this.depots;
      }
    }
  },
  methods: {
    searchBarcode() {
      axios
        .get('api/Products/SearchProductBarcode/' + this.code)
        .then(function(response) {
          this.addDetail(response.data)
        })
        .catch(function(error) {
          console.log(error)
        })
    },

  }


}
</script>

<style scoped>
.main {
    width: 50%;
    margin: 50px auto;
}
.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: relative;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: #aaa;
}

</style>