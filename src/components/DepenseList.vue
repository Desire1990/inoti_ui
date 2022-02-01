<template>
    <div>
    <table class="table table-light text-left" >
        <thead class="tr">
            <tr>
                <th>#</th>
                <th>MONTANT</th>
                <th>DATE</th>
                <th>MOTIF</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="depens in depenses.results" :key="depens.id" :class="classe[depens.validate]">
                <td>{{ depens.id }}</td>
                <td> {{ money(depens.montant)}}</td>
                <td>{{datetime(depens.date)}}</td>
                <td>{{(depens.motif)}}</td>
                <td>{{(depens.validate)}}</td>
                <td>
                <button class="btn btn-success btn-sm ml-1" v-on:click.once="valider(depens)" v-if='$store.state.user.groups.includes("admin")'>
                    valider
                </button> 
                <button class="btn btn-success btn-sm ml-1" v-on:click.once="rejeter(depens)" v-if='$store.state.user.groups.includes("admin")'>
                    rejeter
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
                validate:''
            },
            classe:{
                'Validé':'gold-star',
                'Attente':'bronze-star',
                'Rejeté':'bro-star'
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
            },
        valider(dep){
            if (confirm('êtes-vous sur de vouloir valider le depense de ' + dep.montant)) {
                axios.patch(this.$store.state.url+`/depense/${dep.id}`+'/',{
                    validate:'Validé'
                }, this.header)
                .then(response => {
                    const compte =(dep.account.montant_burundi)
                    const fees = (dep.montant)
                    const x = this.compte-this.fees
                    console.log(this.x)
                    axios.patch(this.$store.state.url+`/compte/`,{
                        montant_burundi:this.x
                        }, this.header)
                    this.fetchData(dep.account.montant_burundi-=dep.montant)
                    return response
                }).catch(err => {
                    console.error(err); 
                })
            }
        },         
        rejeter(dep){
            if (confirm('êtes-vous sur de vouloir rejeter le depense de ' + dep.montant)) {
                axios.patch(this.$store.state.url+`/depense/${dep.id}`+'/',{
                    validate:'Rejeté'
                }, this.header)
                .then(response => {
                    console.log(response.data)
                    this.fetchData()
                    return response
                }).catch(err => {
                    console.error(err); 
                })
            }

        },          
        }
    }
</script>
<style>
.tr {
    background-color: #20c997;
    text-align: left;
    text-decoration-color: white;
}
.gold-star {
  background-color: sandybrown;
  color:white ;
}
.bronze-star {
  background-color: #2d74e1;
  color:white ;
}
.bro-star {
  background-color: red ;
  color:white ;
}
</style>
