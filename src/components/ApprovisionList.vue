 <template>
    <div>
    <table class="table table-light text-left" >
        <thead class="tr">
            <tr>
                <th>#</th> 
                <th v-if="$store.state.user.groups.includes('admin')">MONTANT</th> 
                <th>DATE</th> 
                <th>MONTANT RECU</th>
                <th>STATUS</th>
                <th>ACTIONS</th> 
            </tr>
        </thead>
        <tbody>
            <tr class="text-left" v-for="(depot,index) in approvisions.results" :key="depot.id" :class="classe[depot.validate]">
                <td>{{ index+1 }}</td>
                <td v-if="$store.state.user.groups.includes('admin')">{{ money(depot.montant)}} $</td>
                <td>{{datetime(depot.date) }}</td>
                <td> {{ money(depot.montant_recu) }} Fbu</td>
                <td> {{ (depot.validate) }}</td>
                <td><button class="btn btn-info btn-sm ml-1" @click="Update(depot)" v-if="$store.state.user.groups.includes('admin')">
                    Modifier
                </button>
                <button class="btn btn-danger btn-sm ml-1" v-on:click="DeleteApprovision(depot)" v-if="$store.state.user.groups.includes('admin')">
                    Effacer
                </button>
                <button v-else class="btn btn-info btn-sm ml-1" v-on:click="Valider(depot)">
                    Valider
                </button>
                </td>
            </tr>
        </tbody> 
    </table>
    <center>
      <div class="buttons">
        <button class="btn btn-info btn-sm ml-1 " @click="loadPrev()" v-if="showPrevButton">Prev</button>
        <button class="btn btn-info btn-sm ml-1 " @click="loadNext()" v-if="showNextButton">Next  </button>
    </div>
    </center>
      
        <ModaleApprovision v-if="update"  :updateApprovision="updateApprovision" @close="close"></ModaleApprovision>
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
            classe:{
                Attente:'gold-star',
                Validé:'bronze-star'
            },
            update:false,
            selectedDepot : null,
            approvisions : this.$store.state.approvisions,
            updateApprovision:null,
            currentPage: 1,
            showNextButton: false,
            showPrevButton: false
            
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
        }),
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
            axios.get(this.$store.state.url+`/approvision/?page=${this.currentPage}`, this.header)
            .then(response => {
                this.$store.state.approvisions = response.data 
                console.log(response.data) 
                if (response.data.next) {
                    this.showNextButton = true
                }

                if (response.data.previous) {
                    this.showPrevButton = true
                }

                this.approvisions = response.data.results
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
            this.updateApprovision=depot
            console.log(this.depot)
        },

        DeleteApprovision: function(depense) {
            if (confirm('Delete ' + depense.id)) {
                axios.delete(this.$store.state.url+`/approvision/${depense.id}`, this.header)
                    .then( response => {
                        console.log('deleted'+ depense.id)
                        this.fetchData()
                        return response   
                    });
                }
            }, 
        Valider(approvision){
            if (confirm('êtes-vous sur de vouloir valider l\'appprovision' + approvision.id)) {
                axios.patch(this.$store.state.url+`/approvision/${approvision.id}`+'/',{
                    validate : 'Validé'
                }, this.header)
                .then(response => {
                    console.log(response.data)
                    this.fetchData()
                }).catch(err => {
                    console.error(err); 
                })
            }
        },


    }
      
}
</script>
<style scoped>
.tr {
    background-color: #20c997;
    text-align: left;
    text-decoration-color: white;
}
.gold-star {
  background-color:white;
  color:black ;
}

.bronze-star {
  background-color: teal;
  color:white ;
}

</style>