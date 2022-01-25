<template>
    <div class="settings">
    <div class="row">

    <div class="col-6 p-2">
          <div class="col-10">
              <div class="count_view blue  ">
                <div class="count_list">
                  <h2>CAPITAL CANADA</h2>
                  <p>{{(currency(CTotal))}}</p>
          
                </div>
              </div>
            </div>
              <div class="col-10">
              <div class="count_view green">
                <div class="count_list">
                  <h2>CAPITAL BURUNDI</h2>
                  <p>{{money(BTotal)}} FBU</p>
                </div>
              </div>
            </div> 
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

.count_view {
  height: 80px;
  margin-top: 7px;
  border-radius: 5px; }
  .count_view.red {
    background-color: rgba(255, 0, 0, 0.21); }
  .count_view.blue {
    background-color: rgba(0, 123, 255, 0.18); }
  .count_view.yellow {
    background-color: rgba(255, 255, 0, 0.23); }
  .count_view.orange {
    background-color: rgba(255, 165, 0, 0.19); }
  .count_view.green {
    background-color: rgba(49, 212, 133, 0.23); }
  .count_view .count_list {
    width: 79%;
    float: left; }
    .count_view .count_list h2 {
      font-size: 15px;
      padding-top: 15px;
      font-weight: 700;
      margin-bottom: 0px;
      text-align: center; }
    .count_view .count_list p {
      font-size: 25px;
      font-weight: 600;
      margin: 0px;
      text-align: center; }
  .count_view .detail_list_icon i {
    font-size: 30px;
    padding-top: 25px; }
    .count_view .detail_list_icon i.pink {
      color: #ff6565; }
    .count_view .detail_list_icon i.blue {
      color: #519cef; }
    .count_view .detail_list_icon i.yellow {
      color: #f7b743; }
    .count_view .detail_list_icon i.green {
      color: #25b725; }
</style>