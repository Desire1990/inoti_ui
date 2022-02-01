<template>
  <div class="pricing6 py-5 bg-light">
  <div class="container"> 
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1 class="mb-3">Money Transfer to make your Work Effective</h1>
        <h3 class="subtitle font-weight-normal">We offer 100% satisafaction and Money back Guarantee</h3>
      </div>
    </div>
    <!-- row  -->
    <div class="row mt-4" >
      <!-- column  -->
      <div class="col-md-6" v-if="$store.state.user.groups.includes('admin')">
        <div class="card card-shadow border-0 mb-4">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <h5 class="font-weight-medium mb-0">Canada</h5>
              <div class="ml-auto"><span class="badge badge-danger font-weight-normal p-2">home</span></div>
            </div>
            <div class="row">
              <div class="col-lg-7 text-center">
                <div class="price-box my-3">
                  <span class="text-dark display-5">{{(currency(CTotal))}}</span>
                  <a class="btn btn-info-gradiant font-14 border-0 text-white p-3 btn-block mt-3" href="/">NICE WORK AND IDEA</a>
                </div>
              </div>
              <div class="col-lg-5 align-self-center">
                <ul class="list-inline pl-3 font-14 font-weight-medium text-dark">
                  <li class="py-2"><i class="icon-check text-info mr-2"></i> <span>All Days a Week </span></li>
                  <li class="py-2"><i class="icon-check text-info mr-2"></i> <span>Dedicated To Canadian</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>  
      <div class="col-md-6" v-if="$store.state.user.groups.includes('admin')">
        <div class="card card-shadow border-0 mb-4">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <h5 class="font-weight-medium mb-0">Burundi</h5>
            </div>
            <div class="row">
              <div class="col-lg-7 text-center">
                <div class="price-box my-3">
                  <span class="text-dark display-5">{{(money(BTotal))}} Fbu</span>
                  <a class="btn btn-info-gradiant font-14 border-0 text-white p-3 btn-block mt-3" href="/">NICE WORK AND IDEA</a>
                </div>
              </div>
              <div class="col-lg-5 align-self-center">
                <ul class="list-inline pl-3 font-14 font-weight-medium text-dark">
                  <li class="py-2"><i class="icon-check text-info mr-2"></i> <span>All Days a Week </span></li>
                  <li class="py-2"><i class="icon-check text-info mr-2"></i> <span>Dedicated To Burundian</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- column  -->
      <!-- column  -->
      <div class="col-md-6" v-else>
        <div class="card card-shadow border-0 mb-4">
          <div class="card-body p-4">
            <div class="d-flex align-items-center">
              <h5 class="font-weight-medium mb-0">Burundi</h5>
            </div>
            <div class="row">
              <div class="col-lg-7 text-center">
                <div class="price-box my-3">
                  <span class="text-dark display-5">{{(money(BTotal))}} Fbu</span>
                  <a class="btn btn-info-gradiant font-14 border-0 text-white p-3 btn-block mt-3" href="/">NICE WORK AND IDEA</a>
                </div>
              </div>
              <div class="col-lg-5 align-self-center">
                <ul class="list-inline pl-3 font-14 font-weight-medium text-dark">
                  <li class="py-2"><i class="icon-check text-info mr-2"></i> <span>All Days a Week </span></li>
                  <li class="py-2"><i class="icon-check text-info mr-2"></i> <span>Dedicated To Burundo-canadian</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- column  -->
    </div>
  </div>
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
<style scoped>
@import url(//fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800);
.pricing6 {
  font-family: "Montserrat", sans-serif;
  color: #8d97ad;
  font-weight: 300;
}

.pricing6 h1,
.pricing6 h2,
.pricing6 h3,
.pricing6 h4,
.pricing6 h5,
.pricing6 h6 {
  color: #3e4555;
}

.pricing6 .font-weight-medium {
  font-weight: 500;
}

.pricing6 .bg-light {
  background-color: #f4f8fa !important;
}

.pricing6 h5 {
    line-height: 22px;
    font-size: 18px;
}

.pricing6 .subtitle {
  color: #8d97ad;
  line-height: 24px;
}

.pricing6 .card.card-shadow {
  -webkit-box-shadow: 0px 0px 30px rgba(115, 128, 157, 0.1);
  box-shadow: 0px 0px 30px rgba(115, 128, 157, 0.1);
}

.pricing6 .price-box sup {
  top: -20px;
  font-size: 16px;
}

.pricing6 .price-box .display-5 {
  line-height: 58px;
  font-size: 3rem;
}

.pricing6 .btn-info-gradiant {
    background: #188ef4;
    background: -webkit-linear-gradient(legacy-direction(to right), #188ef4 0%, #316ce8 100%);
    background: -webkit-gradient(linear, left top, right top, from(#188ef4), to(#316ce8));
    background: -webkit-linear-gradient(left, #188ef4 0%, #316ce8 100%);
    background: -o-linear-gradient(left, #188ef4 0%, #316ce8 100%);
    background: linear-gradient(to right, #188ef4 0%, #316ce8 100%);
}

.pricing6 .btn-info-gradiant:hover {
    background: #316ce8;
    background: -webkit-linear-gradient(legacy-direction(to right), #316ce8 0%, #188ef4 100%);
    background: -webkit-gradient(linear, left top, right top, from(#316ce8), to(#188ef4));
    background: -webkit-linear-gradient(left, #316ce8 0%, #188ef4 100%);
    background: -o-linear-gradient(left, #316ce8 0%, #188ef4 100%);
    background: linear-gradient(to right, #316ce8 0%, #188ef4 100%);
}

.pricing6 .btn-md {
    padding: 15px 45px;
    font-size: 16px;
}

.pricing6 .text-info {
    color: #188ef4 !important;
}

.pricing6 .badge-danger {
    background-color: #ff4d7e;
}

.pricing6 .font-14 {
  font-size: 14px;
}
</style>