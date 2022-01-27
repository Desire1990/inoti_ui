<template>
    <div>
    <table class="table table-light text-left" >
        <thead class="tr">
            <tr>
                <th>#</th>
                <th>MONTANT</th>
                <th>DATE</th>
                <th>MOTIF</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="depens in depenses.results" :key="depens.id">
                <td>{{ depens.id }}</td>
                <td> {{ money(depens.montant)}}</td>
                <td>{{datetime(depens.date)}}</td>
                <td>{{(depens.motif)}}</td>
                <td>
                <button class="btn btn-success btn-sm ml-1" v-on:click="valider(depense)" v-if='$store.state.user.groups.includes("admin")'>
                    valider
                </button> 
                    <button v-else class="btn btn-danger btn-sm ml-1 " @click="DeleteDepot(depens)">
                    Delete
                </button >
                </td>
            </tr>
        </tbody>
    </table>
    <ModalDepense v-if = 'update' :updatedepot="updatedepot" @close='close'/>
    </div>
</template>

<script>

import axios from 'axios'
import ModalDepense from '../components/ModalDepense.vue'

export default {
    components:{ModalDepense,},
    data() {
        return {
            form:{
                montant:'',
                motif:''
            },
            update:false,
            updatedepot:null,
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
    },
    methods: {
        fetchData(){
            axios.get(this.$store.state.url+"/depense/", this.header )
            .then(res => {
                this.$store.state.depenses = res.data          
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
                axios.delete(this.$store.state.url+`/depense/${dep.id}`, {
                    headers :{
                        "Authorization" : `Bearer ${this.$store.state.user.access}`}
                    })
                    .then( response => {
                        this.fetchData()
                        return response
                    });
                }
            }  
        }
    }
</script>
<style>
.tr {
    background-color: #20c997;
    text-align: left;
    text-decoration-color: white;
}
</style>
