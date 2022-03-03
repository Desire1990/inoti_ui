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
            <tr class="text-left" v-for="(t, index) in taux.results " :key="t.id" >
                <td>{{ index+1 }}</td>
                <td>{{ money(t.taux)}} Fbu</td>
                <td>{{ datetime(t.date) }}</td>
                
                <td >
                    <button class="btn btn-info btn-sm ml-1 " @click="Update(t)" >Modifier </button>
                    <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteTaux(t)">Effacer</button> 
                </td>
            </tr>
        </tbody> 
    </table>
    <Mo v-if="update"  :updatedepot="updatedepot" @close="close"></Mo>
    </div>

</template>
<script>

import axios from 'axios'
import Mo from '../components/modal'
export default {
    components:{Mo,},
    data() {
        return {
            form :{
                is_valid:''
            },
            classe:{
                defaut:'gold-star',
                appel:'silver-star',
                servi:'bronze-star'
              },
            update:false,
            taux :[],
            selectedDepot : null,
            clicked:false,
            servie:false,
            revele : false,
            updatedepot:null,
            counter:0,
            currentPage: 1,
            num_depot :0,
            query: '',
            currentPage: 1,
            showNextButton: false,
            showPrevButton: false
        }
    },
    watch:{
        "$store.state.taux"(new_val){
            this.taux = new_val
        }
    },
    mounted() {
        this.getTransfer()
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
        getTransfer() {
            axios.get(this.$store.state.url+`/taux/?page=${this.currentPage}`, this.header)
            .then(response => {
                this.$store.state.taux = response.data 
                console.log(response.data) 
                if (response.data.next) {
                    this.showNextButton = true
                }

                if (response.data.previous) {
                    this.showPrevButton = true
                }

                this.taux = response.data.results
            })
            .catch(error => {
                console.log(error)
            })
        },
        loadNext() {
            this.currentPage += 1
            this.getTransfer()
        },
        loadPrev() {
            this.currentPage -= 1
            this.getTransfer()
        },
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
        DeleteTaux: function(dep) {
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
        },

    },
      
}
</script>
<style scoped>
.tr {
    background-color: teal;
    text-align: left;
    color: white;
}
.gold-star {
  background-color:white;
  color:black ;
}

.silver-star {
  background-color: green;
  color:black ;
}

.bronze-star {
  background-color: yellow;
  color:black ;
}

</style>