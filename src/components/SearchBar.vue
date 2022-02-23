<template>
<div class=" d-inline-flex pull-left mt-3">
 <div class="input-group">
  <input class="form-control" v-model='search_term'type="text" placeholder="Search" />
    <div class="input-group-append">
      <button class="btn btn-secondary" type="button" @click.prevent='getAll()'>
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
      loading: true,
      currentDepot: {},
      search_term:'',
      depots : this.$store.state.depots
    }
  },
  mounted(){
    this.getAll()
  },
  methods:{
    getAll(){
      url = this.$store.state.url+"/depot/"
      if (this.search_term!==''||this.search_term!=null){
        api_url=this.$store.state.url+`/depot/?search=${this.search_term}`
      }
      this.loading=true
      axios.get(api_url)
      .then((response) => {
        this.depots=response.data
        this.loading=false
      }).catch((error) => {
        this.loading=false
        console.error(error);
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