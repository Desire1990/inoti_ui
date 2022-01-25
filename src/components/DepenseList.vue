<template>
    <table class="table table-light text-left" >
        <thead >
            <tr>
                <th>#</th>
                <th>NOM</th>
                <th>MONTANT</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="transaction in depenses.results" :key="transaction.id">
                <td>{{ transaction.id }}</td>
                <td>{{(transaction.user.first_name) }} {{(transaction.user.last_name) }}</td>
                <td> {{ money(transaction.montant)}}</td>
                <td>{{datetime(transaction.date)}}</td>
                <td>{{(transaction.is_valid)}}</td>
                <td><button class="btn btn-info">Modifier</button>
                    <button class="btn btn-danger">Effacer</button>
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
            depenses : this.$store.state.depenses

        }
    },
    watch:{
        "$store.state.depenses"(new_val){ 
            this.depenses = new_val
        }
    },
    mounted() {
        axios.get(this.$store.state.url+"/depense/", this.header )
        .then(res => {
            this.$store.state.depenses = res.data
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
    }

}
</script>
