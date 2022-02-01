<template v-slot:defaul>
    <div>
    <table class="table table-light text-left" >
        <thead class="tr">
            <tr style='{background-color:pink;}' >
                <th >#</th> 
                <th>MONTANT($)</th>
                <th>NOM DU BENEFICIER</th> 
                <th>TELEPHONE</th> 
                <th>DATE</th>                 
                <th>MONTANT</th>
                <th>COUNT</th>
                <th v-if="$store.state.user.groups.includes('admin')">STATUS</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="depot in depots.results" :key="depot.id" :class="classe[depot.is_valid]">
                <td>{{ depot.id }}</td>
                <td> {{ money(depot.montant)}} $</td>
                <td>{{ depot.nom }}</td>
                <td>{{ depot.tel }}</td>
                <td>{{datetime(depot.date) }}</td>
                <td> {{ money(depot.montant_fbu)}} Fbu</td>
                <td> Servi {{ money(depot.counter)}} fois</td>
                <td v-if="$store.state.user.groups.includes('admin')">{{(depot.is_valid) }}</td>                
                
                <td >
                <div v-if="$store.state.user.groups.includes('admin')">
                    <button class="btn btn-info btn-sm ml-1 " @click="Update(depot)" >Modifier </button>
                    <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteDepot(depot)">Effacer</button> 
                </div> 
                <div v-else>
                    
                    <button class="btn btn-info btn-sm ml-1 " @click.once ="appeler(depot); counter+=1"> Appeler</button>           
                    <button class="btn btn-success btn-sm ml-1 "@click.once ='servir(depot)'>Servir</button>
                    
                </div>
                </td>
            </tr>
        </tbody> 
    </table>
    <ModaleDepot v-if="update"  :updatedepot="updatedepot" @close="close"></ModaleDepot>
    </div>

</template>

<script>

import axios from 'axios'
import ModaleDepot from '../components/DepotModel'
export default {
    components:{ModaleDepot,},
    data() {
        return {
            form :{
                is_valid:''
            },
            classe:{
                'defaut':'gold-star',
                'appel':'silver-star',
                'servi':'bronze-star'
              },
            update:false,
            depots :[],
            selectedDepot : null,
            clicked:false,
            servie:false,
            revele : false,
            updatedepot:null,
            counter:0
        }
    },
    watch:{
        "$store.state.depots"(new_val){
            this.depots = new_val
        }
    },
    mounted() {
        axios.get(this.$store.state.url+"/depot/", this.header )
        .then(res => {
            this.$store.state.depots = res.data          
            console.log(res.data.results);
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
                }
            }
        },

    },
    methods: {
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
            console.log(this.depot)

        },
        Update2(depot){
            this.update = true
            this.updatedepot=depot
            console.log(this.depot)

        },
        DeleteDepot: function(dep) {
            if (confirm('Delete ' + dep.id)) {
                axios.delete(this.$store.state.url+`/depot/${dep.id}`, {
                    headers :{
                        "Authorization" : `Bearer ${this.$store.state.user.access}`}
                    })
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
<style>
.tr {
    background-color: teal;
    text-align: left;
    color: white;
}
.gold-star {
  background-color: #ffee58;
  color:white ;
}

.silver-star {
  background-color: #BDBDBD;
  color:white ;
}

.bronze-star {
  background-color: #cd7f32;
  color:white ;
}

.change-rank{
  background-color: #00C853;
  color:white ;
}
</style>