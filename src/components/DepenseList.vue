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
            <tr class="text-left" v-for="(depens, index) in depenses.results" :key="depens.id" :class="classe[depens.validate]">
                <td>{{ index+1 }}</td>
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
                    <button v-else class="btn btn-danger btn-sm ml-1 " @click="Delete(depens)">
                    Delete
                </button >
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
    <ModalDepense v-if = 'update' :updatedepense="updatedepense" @close='close'/>
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
                validate:'',
            },
            classe:{
                'Validé':'gold-star',
                'Attente':'bronze-star',
                'Rejeté':'bro-star'
              },
            update:false,
            updatedepense:null,
            depenses : this.$store.state.depenses,
            currentPage: 1,
            showNextButton: false,
            showPrevButton: false
        }
    },
    watch:{
        "$store.state.depenses"(new_val){
            this.depenses = new_val
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
            axios.get(this.$store.state.url+`/depense/?page=${this.currentPage}`, this.header)
            .then(response => {
                this.$store.state.depenses = response.data 
                console.log(response.data) 
                if (response.data.next) {
                    this.showNextButton = true
                }

                if (response.data.previous) {
                    this.showPrevButton = true
                }

                this.depenses = response.data.results
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
        Update(depense){
            this.update = true
            this.updatedepense=depense
            console.log(this.depense)

        },
        Delete: function(dep) {
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
        rejeter(depense){
            if (confirm('êtes-vous sur de vouloir rejeter le depense de ' + depense.montant)) {
                axios.patch(this.$store.state.url+`/depense/${depense.id}`+'/',{
                    validate:'Rejeté'
                }, this.header)
                .then(response => {
                    console.log(response.data)
                    this.fetchData()
                }).catch(err => {
                    console.error(err); 
                })
            }
        },        
        valider(depense){
            if (confirm('êtes-vous sur de vouloir valider le depense de ' + depense.montant)) {
                axios.patch(this.$store.state.url+`/depense/${depense.id}`+'/',{
                    validate:'Validé'
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
