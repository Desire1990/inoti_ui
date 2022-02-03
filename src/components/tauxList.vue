<template v-slot:defaul>
    <div>
    <table class="table table-light text-left" >
        <thead class="tr">
            <tr style='{background-color:pink;}' >
                <th >#</th> 
                <th>TAUX</th>
                <th>DATE</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="taux in taux.results" :key="taux.id" :class="classe[taux.is_valid]">
                <td>{{ taux.id }}</td>
                <td>{{ taux.taux }}</td>
                <td>{{ taux.date }}</td>
                
                <td >
                    <button class="btn btn-info btn-sm ml-1 " @click="Update(taux)" >Modifier </button>
                    <button class="btn btn-danger btn-sm ml-1" v-on:click="Deletetaux(taux)">Effacer</button> 
                </td>
            </tr>
        </tbody> 
    </table>
    <ModaleDepot v-if="update"  :updatedepot="updatedepot" @close="close"></ModaleDepot>
    </div>

</template>

<script>

import axios from 'axios'
import ModaleDepot from '../components/modal'
export default {
    components:{ModaleDepot,},
    data() {
        return {
            form :{
                taux:''
            },
            classe:{
                'defaut':'gold-star',
                'appel':'silver-star',
                'servi':'bronze-star'
              },
            update:false,
            taux :[],
            selectedDepot : null,
            clicked:false,
            servie:false,
            revele : false,
            updatedepot:null,
            counter:0
        }
    },
    watch:{
        "$store.state.taux"(new_val){
            this.taux = new_val
        }
    },
    mounted() {
        axios.get(this.$store.state.url+"/taux/", this.header )
        .then(res => {
            this.$store.state.taux = res.data          
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
            axios.get(this.$store.state.url+"/taux/", this.header )
            .then(res => {
                this.$store.state.taux = res.data          
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
                axios.delete(this.$store.state.url+`/taux/${dep.id}`, {
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
        }


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

</style>