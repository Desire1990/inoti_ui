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
        getAll(){
              if (this.search_term!==''||this.search_term!=null){
                api_url=this.$store.state.url+`/depot/?search=${this.search_term}`
              }
              this.loading=true
              this.$http.get(api_url)
              .then((response) => {
                this.depots=response.data
                this.loading=false
              }).catch((error) => {
                this.loading=false
                console.error(error);
              })
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
        Delete(depense) {
            if (confirm('Delete ' + depense.id)) {
                axios.delete(this.$store.state.url+`/depense/${depense.id}`, {
                    headers :{
                        "Authorization" : `Bearer ${this.$store.state.user.access}`

                    }})
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
