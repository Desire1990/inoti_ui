<template>
    <table class="table table-light text-left" >
        <thead >
            <tr>
                <th>#</th> 
                <th>NOM</th> 
                <th>DATE</th> 
                <th>MONTANT</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="transaction in transactions.results" :key="transaction.id">
                <td>{{ transaction.id }}</td>
                <td>{{ transaction.receiver }}</td>
                <td>{{new Date(transaction.date).toLocaleString() }}</td>
                <td> {{ transaction.amount.toLocaleString()}}</td>
                <td><button class="btn btn-info" >Modifier</button> 
                <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteTransaction(transaction)">
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
                receiver : "",
                amount : "",
            },
            transactions : this.$store.state.transactions
            
        }
    },
    watch:{
        "$store.state.transactions"(new_val){
            this.transactions = new_val
        }
    },
    mounted() {
        axios.get(this.$store.state.url+"/transaction/", this.header )
        .then(res => {
            this.$store.state.transactions = res.data          
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
    DeleteTransaction: function(trans) {
        if (confirm('Delete ' + trans.id)) {
            axios.delete(this.$store.state.url+`/transaction/${trans.id}`, {
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
