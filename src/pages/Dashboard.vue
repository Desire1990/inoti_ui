<template>
<div class="main-content">
    <div class="header bg-gradient-primary pb-8 pt-5 pt-md-8">
      <div class="container-fluid">
        <h2 class="mb-5 text-white">Stats Transfer</h2>
        <div class="header-body">
          <div class="row">
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Canada</h5>
                      <span class="h2 font-weight-bold mb-0">{{(currency(CTotal))}}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i class="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i></span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <h5 class="card-title text-uppercase text-muted mb-0">Burundi</h5>
                      <span class="h2 font-weight-bold mb-0">{{(money(BTotal))}} Fbu</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-success text-white rounded-circle shadow">
                        <i class="fas fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i></span>
                    <span class="text-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page content -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      total_canada : 0,
      total_burundi : 0
    }
  },
  mounted() {
    axios.get(this.$store.state.url+"/compte/",this.header)
        .then(res => {
          this.total_canada = res.data.results
          this.total_burundi = res.data.results
          console.log(res)
        })
        .catch(err => {
            console.error(err); 
        })
  },
  computed:{
          header(){
              return{
          headers :{
            "Authorization" : `Bearer ${this.$store.state.user.access}`
          },
        }
      },
       CTotal(){
         let total = 0; 

         for(let i = 0 ; i<this.total_canada.length ; i++ ){
           total += this.total_canada[i].montant_canada
         }
         return total
       },
       BTotal(){
         let total = 0;
           for(let i = 0 ; i<this.total_burundi.length ; i++ ){
           total += this.total_burundi[i].montant_burundi
         }
         return total

       },
    }
}
</script>