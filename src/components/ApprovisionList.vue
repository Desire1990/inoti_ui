<template>
    <div>
    <table class="table table-light text-left" >
        <thead class="tr">
            <tr>
                <th>#</th> 
                <th>MONTANT</th> 
                <th>DATE</th> 
                <th>MONTANTRECU</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="depot in approvisions.results" :key="depot.id">
                <td>{{ depot.id }}</td>
                <td>{{ money(depot.montant)}} $</td>
                <td>{{datetime(depot.date) }}</td>
                <td> {{ money(depot.montant_recu) }} Fbu</td>
                <td><button class="btn btn-info btn-sm ml-1" @click="Update(depot)">
                    Modifier
                </button>
                <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteApprovision(depot)">
                    Effacer
                </button>
                </td>
            </tr>
        </tbody> 
    </table>
        <ModaleApprovision v-if="update"  :updatedepot="updatedepot" @close="close"></ModaleApprovision>
    </div>
</template>

<script>

import axios from 'axios'
import ModaleApprovision from '../components/ModalApprovision'

export default {
    components:{ModaleApprovision,},
    data() {
        return {
            form :{
                nom : "",
                amount : "",
            },
            update:false,
            selectedDepot : null,
            approvisions : this.$store.state.approvisions,
            updatedepot:null
            
        }
    }, 
    watch:{
        "$store.state.approvisions"(new_val){
            this.approvisions = new_val
        }
    },
    mounted() {
        axios.get(this.$store.state.url+"/approvision/", this.header )
        .then(res => {
            this.$store.state.approvisions = res.data          
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
            axios.get(this.$store.state.url+"/approvision/", this.header )
            .then(res => {
                this.$store.state.approvisions = res.data          
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
            this.update=true
            this.updatedepot=depot
            console.log(this.depot)
        },

        DeleteApprovision: function(trans) {
            if (confirm('Delete ' + trans.id)) {
                axios.delete(this.$store.state.url+`/approvision/${trans.id}`, {
                    headers :{
                        "Authorization" : `Bearer ${this.$store.state.user.access}`}
                    })
                    .then( response => {
                        this.fetchData()
                        return response   
                    });
                }
            }
        },
      
}
</script>
<style >
.tr {
    background-color: #20c997;
    text-align: left;
    text-decoration-color: white;
}
</style>