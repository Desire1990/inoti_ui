 <template>
    <div>
    <div class="form-inline my-2 my-lg-0" style="margin-left: 3%;">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="search_term" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" v-on:click.prevent="getData()">Search</button>
      </div>
      <br>
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
                <td v-if="depens.validate!='Validé'">
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
                <td v-else></td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="tf">
              <th>Total</th>
              <th>{{(money(total()))}} Fbu</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
        </tfoot>
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
            showPrevButton: false,
            search_term:'',
            loading:false
        }
    },
    watch:{
        "$store.state.depenses"(new_val){
            this.depenses = new_val
        }
    },
    mounted() {
        this.getTransfer(),
        this.getData()
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
        total(){
            let total = 0;
            for(let item of this.depenses.results){
                if (item.validate=='Validé'){
                    total += item.montant;
                }
            }
            return total;
        },
        getData: function() {
          let api_url = this.$store.state.url+"/depense/"
          if(this.search_term!==''||this.search_term!==null) {
            api_url = this.$store.state.url+`/depense/?search=${this.search_term}`
          }
          this.loading = true;
          axios.get(api_url, this.header)
              .then((response) => {
                this.$store.state.depenses = response.data
                console.log(response.data) 
                this.loading = false;
              })
              .catch((err) => {
                this.loading = false;
                console.log(err);
              })
        },
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
                axios.delete(this.$store.state.url+`/depense/${dep.id}/`, this.header)
                    .then( res => {
                        console.log(res)
                        this.getTransfer()
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
                    this.getTransfer()
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
                    this.getTransfer()
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
.tf {
    background-color: thistle;
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
