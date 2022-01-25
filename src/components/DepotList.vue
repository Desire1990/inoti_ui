<template>
    <div>
    <table class="table table-light text-left" >
        <thead >
            <tr style='{background-color:pink;}'>
                <th>#</th> 
                <th>MONTANT($)</th>
                <th>NOM DU BENEFICIER</th> 
                <th>TELEPHONE</th> 
                <th>DATE</th>                 
                <th>MONTANT</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-bind:class="{'blue': !clicked && !servie, 'red': clicked, 'yellow':servie}" v-for="depot in depots.results" :key="depot.id"  >
                <td>{{ depot.id }}</td>
                <td> {{ money(depot.montant)}} $</td>
                <td>{{ depot.nom }}</td>
                <td>{{ depot.tel }}</td>
                <td>{{datetime(depot.date) }}</td>
                
                <td> {{ money(depot.montant_fbu)}} Fbu</td>
                
                <td><button class="btn btn-info btn-sm ml-1 " @click="Update(depot)">
                    Modifier
                </button>
                <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteDepot(depot)">
                    Effacer
                </button>   
                <button  v-on:click ="clicked = !clicked">Appeler</button>             
                <button  v-on:click ="servie = !servie">Servi</button>
                
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
                tel : ""
            },
            update:false,
            depots : this.$store.state.depots,
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
                        this.$store.state.depots = response.data
                        console.log(response.data);
                    });
                }
            },
        yellowClick(){
            this.servie=true
        },
        blueClick(){
            this.clicked=true
        }
    },
      
}
</script>
<style>
.red {
    background-color: red;
}
.yellow {
    background-color: yellow;
}
.blue {
    background-color: white;
}
</style>
