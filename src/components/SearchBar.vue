<template>
<div class=" d-inline-flex pull-left mt-3">
 <div class="input-group">
  <input class="form-control" v-model='search_term'type="text" placeholder="Search" />
    <div class="input-group-append">
      <button class="btn btn-secondary" type="button">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
</div>
  
</template>

<script>
  import axios from 'axios'
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
  methods:{
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