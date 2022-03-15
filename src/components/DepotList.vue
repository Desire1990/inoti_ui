<template>
<div class="table-responsive">
      <div class="form-inline my-2 my-lg-0" style="margin-left: 5%;">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="search_term" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" v-on:click.prevent="getData()">Search</button>
      </div>
      <br>
  <table class="table">
        <thead class="tr">
            <tr style={background-color:pink;} >
                <th >#</th> 
                <th>NOM DU BENEFICIER</th> 
                <th v-if="$store.state.user.groups.includes('admin')">MONTANT($)</th>
                <th>TELEPHONE</th> 
                <th>DATE</th>                 
                <th>MONTANT</th>
                <!-- <th v-if="$store.state.user.groups.includes('admin')">COUNT</th> -->
                <th v-if="$store.state.user.groups.includes('admin')">TAUX</th>
                <th v-if="$store.state.user.groups.includes('admin')">STATUS</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="(depot, index) in depots.results" :key="depot.id" :class="classe[depot.is_valid]" >
               
                <th>{{ index+1 }}.</th>
                <td>{{ depot.nom }}</td>
                <td v-if="$store.state.user.groups.includes('admin')"> {{ currency(depot.montant)}}</td>
                <td>{{ depot.tel }}</td>
                <td>{{datetime(depot.date) }}</td>
                <td> {{ money(depot.montant_fbu)}} Fbu</td>
                <th v-if="$store.state.user.groups.includes('admin')"> {{ money(depot.taux.taux)}} Fbu</th>
                <td v-if="$store.state.user.groups.includes('admin')">{{(depot.is_valid) }}</td>                
                
                <td v-if='depot.is_valid!="servi"'>
                <div v-if="$store.state.user.groups.includes('admin') ">
                    <button class="btn btn-info btn-sm ml-1 " @click="Update(depot)" >Modifier </button>
                    <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteDepot(depot)">Effacer</button> 
                </div> 
                <div v-else>                    
                    <button class="btn btn-info btn-sm ml-1 " @click ="appeler(depot); counter+=1; isHidden = true"> Appeler</button>           
                    <button class="btn btn-success btn-sm ml-1 "@click ='servir(depot); isHidden = true'>Servir</button>
                    
                </div>
                </td>
                <td v-else>
                    
                </td>

            </tr>
        </tbody>
        <tfoot>
            <tr class="tf">
              <th>Total</th>
              <th></th>
              <th v-if="$store.state.user.groups.includes('admin')">{{currency(total())}}</th>
              <th></th>
              <th></th>
              <th>{{money(totale())}} Fbu</th>
              <th></th>
              <th  v-if="$store.state.user.groups.includes('admin')"></th>
              <th  v-if="$store.state.user.groups.includes('admin')"></th>
            </tr>
        </tfoot>
  </table>

  <center>
      <div class="buttons">
        <button class="btn btn-info btn-sm ml-1 " @click="loadPrev()" v-if="showPrevButton">Prev</button>
        <button class="btn btn-info btn-sm ml-1 " @click="loadNext()" v-if="showNextButton">Next  </button>
    </div>      
  </center>

    <ModaleDepot v-if="update"  :updatedepot="updatedepot" @close="close"></ModaleDepot>
    </div>

</template>

<script>

import axios from 'axios'
import ModaleDepot from '../components/DepotModel'
export default {
    components:{ModaleDepot,},
    props:{last:Object},
    data() {
        return {
            form :{
                is_valid:'',
                montant:''
            },
            classe:{
                defaut:'gold-star',
                appel:'silver-star',
                servi:'bronze-star'
              },
            update:false,
            depots:this.$store.state.depots,
            selectedDepot : null,
            clicked:false,
            servie:false,
            revele : false,
            updatedepot:null,
            counter:0,
            currentPage: 1,
            num_depot :0,
            query: '',
            currentPage: 1,
            showNextButton: false,
            showPrevButton: false,
            search_term:'',
            loading:false
        }
    },
    watch:{
        "$store.state.depots"(new_val){
            this.depots = new_val
        }
    },
    mounted() {
        this.getTransfer(),
        this.getData();
    },
    methods: {
        total(){
            let total = 0;
            for(let item of this.depots.results){
                total += item.montant;
            }
            return total;
        },
        totale(){
            let total = 0;
            for(let item of this.depots.results){
                total += item.montant_fbu;
            }
            return total;
        },
        getData: function() {
          let api_url = this.$store.state.url+"/depot/"
          if(this.search_term!==''||this.search_term!==null) {
            api_url = this.$store.state.url+`/depot/?search=${this.search_term}`
          }
          this.loading = true;
          axios.get(api_url, this.header)
              .then((response) => {
                this.$store.state.depots = response.data
                console.log(response.data) 
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
        },
        getTransfer() {
            axios.get(this.$store.state.url+`/depot/?page=${this.currentPage}`, this.header)
            .then(response => {
                this.$store.state.depots = response.data 
                console.log(response.data) 
                if (response.data.next) {
                    this.showNextButton = true
                }

                if (response.data.previous) {
                    this.showPrevButton = true
                }

                this.depots = response.data.results
            })
        },
        loadNext() {
            this.currentPage += 1
            this.getTransfer()
        },
        loadPrev() {
            this.currentPage -= 1
            this.getTransfer()
        },
        fetchData(){
            axios.get(this.$store.state.url+"/depot/", this.header )
            .then(res => {
                this.$store.state.depots = res.data          
                console.log(res.data.results);
            })
            .catch(err => {
                console.error(err); 
            })           
        },
        close(){
            this.update=false
        },
        Update(depot){
            this.update = true
            this.updatedepot=depot

        },
        DeleteDepot(dep) {
            if (confirm('Delete ' + dep.id)) {
                axios.delete(this.$store.state.url+`/depot/${dep.id}/`, this.header)
                    .then( response => 
                        
                    {
                        this.fetchData()
                        return response
                    }
                );
            }
        },
        appeler(dep){
            if (confirm('êtes-vous sur d\'avoir appele ' + dep.nom)) {
                axios.patch(this.$store.state.url+`/depot/${dep.id}`+'/',{
                    is_valid:'appel'
                }, this.header)
                .then(response => {
                    console.log(response.data)
                    this.fetchData()
                }).catch(err => {
                    console.error(err); 
                })
            }

        },
        servir(dep){
            if (confirm('êtes-vous sur d\'avoir servi ' + dep.nom)) {
                axios.patch(this.$store.state.url+`/depot/${dep.id}`+'/',{
                    is_valid : 'servi'
                }, this.header)
                .then(response => {
                    console.log(response.data)
                    this.fetchData()
                }).catch(err => {
                    console.error(err); 
                })
            }
        },


    },
      
}
</script>
<style scoped>
.tr {
    background-color: teal;
    text-align: left;
    color: white;
}
.tf {
    background-color: thistle;
    text-align: left;
    color: black;
}
.gold-star {
  background-color:white;
  color:black ;
}

.silver-star {
  background-color: green;
  color:white ;
}

.bronze-star {
  background-color: yellow;
  color:black ;
}

</style>