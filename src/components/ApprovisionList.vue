<template>
    <table class="table table-light text-left" >
        <thead >
            <tr>
                <th>#</th> 
                <th>MONTANT($)</th> 
                <th>DATE</th> 
                <th>MONTANT_RECU(en Fbu)</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="depot in approvisions.results" :key="depot.id">
                <td>{{ depot.id }}</td>
                <td>{{ money(depot.montant)}}</td>
                <td>{{datetime(depot.date) }}</td>
                <td> {{ money(depot.montant_recu)}}</td>
                <td><button class="btn btn-info btn-sm ml-1">
                    Modifier
                </button>
                <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteApprovision(depot)">
                    Effacer
                </button>
                </td>
            </tr>
        </tbody> 
    </table>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            form :{
                nom : "",
                amount : "",
            },
            approvisions : this.$store.state.approvisions
            
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
    DeleteApprovision: function(trans) {
        if (confirm('Delete ' + trans.id)) {
            axios.delete(this.$store.state.url+`/approvision/${trans.id}`, {
                headers :{
                    "Authorization" : `Bearer ${this.$store.state.user.access}`}
                })
                .then( response => {
                    this.mounted();
                    return response
                });
            }
        }
    },
      
}
</script>
