<template v-slot:defaul>
    <div>
    <table class="table table-light text-left" >
        <thead class="tr">
            <tr style='{background-color:pink;}' >
                <th prop='id'>#</th> 
                <th prop='montant'>MONTANT($)</th>
                <th prop='nom'>NOM DU BENEFICIER</th> 
                <th prop='tel'>TELEPHONE</th> 
                <th prop='date'>DATE</th>                 
                <th prop='montant_fbu'>MONTANT</th>
                <th v-if="$store.state.user.groups.includes('admin')">STATUS</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="depot in depots.results" :key="depot.id" :class="classe[depot.status]">
                <td>{{ depot.id }}</td>
                <td> {{ money(depot.montant)}} $</td>
                <td>{{ depot.nom }}</td>
                <td>{{ depot.tel }}</td>
                <td>{{datetime(depot.date) }}</td>
                <td> {{ money(depot.montant_fbu)}} Fbu</td>
                <td v-if="$store.state.user.groups.includes('admin')">{{(depot.status) }}</td>                
                
                <td >
                <div v-if="$store.state.user.groups.includes('admin')">
                    <button class="btn btn-info btn-sm ml-1 " @click="Update(depot)" >Modifier </button>
                    <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteDepot(depot)">Effacer</button> 
                </div> 
                <div v-else>
                    
                    <button class="btn btn-info btn-sm ml-1 " v-on:click ="cellStyle(depot)"> Appeler</button>             
                    <button class="btn btn-success btn-sm ml-1 " v-on:click =cellStyle(depot)>Servi</button>
                    
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
                nom : "",
                montant : "",
                tel : "",
                status:''
            },
            classe:{
                'default':'gold-star',
                'servi':'silver-star',
                'appel':'bronze-star'
              },
            update:false,
            depots :[],
            selectedDepot : null,
            clicked:false,
            servie:false,
            revele : false,
            updatedepot:null

            
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
        DeleteDepot: function(dep) {
            if (confirm('Delete ' + dep.id)) {
                axios.delete(this.$store.state.url+`/depot/${dep.id}`, {
                    headers :{
                        "Authorization" : `Bearer ${this.$store.state.user.access}`}
                    })
                    .then( response => {
                        this.fetchData()
                        return response
                    });
                }
            },
        cellStyle({row, column}){
            if(column.property === 'status'){
                switch(row.status) {
                    case 'default':
                        return {
                            background: 'red',
                            color: '#FFFFFF'
                        };
                        break;
                    case 'servi':
                        return {
                            background: 'blue',
                            color: '#FFFFFF'
                        };
                        break;
                    case 'appel':
                        return {
                            background: 'yellow',
                            color: '#FFFFFF'
                        };
                    break;
                }
          }
        }
    },
      
}
</script>
<style>
@import url("//unpkg.com/element-ui@2.4.11/lib/theme-chalk/index.css");
.tr {
    background-color: #20c997;
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