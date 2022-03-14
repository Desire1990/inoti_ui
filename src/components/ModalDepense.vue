 <template>
    <div class="bloc-modale" >
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="emitClose">X</div>
            <div class="card-modal mt-4">
            <div v-if="updatedepense"><center>
                <h4>Modifier la depense</h4>
            </center></div>
            <div v-else><center>
                <h4>Nouvelle depense</h4>
            </center></div><hr>
                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input class="" type="number" v-model="form.montant" name="">
                    <span v-if="errors.montant" class="text-danger">{{ errors.montant}}</span>
                </div>
<!--                 <div class="input-group mt-3">
                    <label for="status">VALIDATE</label>
                    <div class="control">
                        <select v-model="form.validate">
                          <option value="Attente">Attente</option>
                          <option value="appel">Valide</option>
                          <option value="Rejeté">Rejeté</option>
                        </select>
                    </div>

                    <span v-if="errors.status" class="text-danger">{{ errors.status}}</span>
                </div> 
 -->
                <div class="input-group mt-3">
                    <label for="montant">MOTIF</label>
                    <textarea class="" type="" v-model="form.motif" name=""/>
                    <span v-if="errors.motif" class="text-danger">{{ errors.motif}}</span>
                </div>
              
                <center>
                <div class="input-group mt-3">
                    <button style="background-color: teal; color: white;" v-if="updatedepense" @click="saveUpdate">Modifier</button>
                    <button style="background-color: teal; color: white;" v-else @click="depot">Valider</button>
                </div>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props:{updatedepense:Object},
    data() {
        return {
            form :{
                montant : "",
                motif : "",
                validate:''
            },
            depot_id:null,
            update:false,
            users : {},
            depense_id:null
            
        }
    },

    mounted() {
        if(this.updatedepense){
            this.form.montant=this.updatedepense.montant
            this.form.motif=this.updatedepense.motif
            this.form.validate=this.updatedepense.validate
            this.depense_id=this.updatedepense.id

        }
        console.log(this.updatedepense)         
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
                })
                .catch(err => {
                    console.error(err); 
                })
            
        },
        depot(){
            axios.post(this.$store.state.url+"/depense/",this.form, this.header
            ).then((response) => {
                    console.log(response.data)
                    this.fetchData()
                    this.$emit('close')
            }).catch((error) => {
              console.error(error);
            })                  

        },
        saveUpdate(){
            axios.put(this.$store.state.url+"/depense/"+this.depense_id +"/", this.form, this.header
            ).then((response) => {
                    console.log(response.data)
                    this.fetchData()
                    this.$emit('close')
            }).catch((error) => {
              console.error(error);
            })                  

        },
        emitClose(){
            this.$emit('close')
        }
        }

}
</script>

<style scoped>

.input-group{
    display: flex;
    justify-content: space-around;
}
.input-group label{
    display: inline-block;
    width: 100px;
    text-align: left;
}

/** POUR LE MODAL */
.bloc-modale{
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay{
    position: fixed;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

}

.modale{
    position:fixed;
    top:20%;
    height: auto;
}
.card-modal
{
    padding: 20px;
    width: auto;
    
    
}  

.close-btn{
    position: absolute;
    top:5px;
    right:5px;
    cursor:pointer;
   
}
</style>