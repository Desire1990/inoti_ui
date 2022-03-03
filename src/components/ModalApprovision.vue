 <template>
    <div class="bloc-modale" >
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="emitClose">X</div>
            <div class="card-modal mt-4">
            <div v-if="updateApprovision"><center>
                <h4>Modifier l'approvision</h4>
            </center></div>
            <div v-else><center>
                <h4>Nouvel approvision</h4>
            </center></div><hr>
                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input class="" type="number" placeholder="montant en $" v-model="form.montant" name="">
                    <span v-if="errors.montant" class="text-danger">{{ errors.montant}}</span>
                </div>

                <div class="input-group mt-3">
                    <label for="montant">MONTANT_RECU</label>
                    <input class="" type="number" placeholder="montant en fbu" v-model="form.montant_recu" name="">
                    <span v-if="errors.montant_recu" class="text-danger">{{ errors.montant_recu}}</span>
                </div>
                <br/>
                <center>
                <div class="input-group mt-3">
                     <button style="background-color: teal; color: white;" v-if="updateApprovision" @click="saveUpdate">Modifier</button>
                    <button style="background-color: teal; color: white;" v-else @click="approvision" class="btn btn-info">Valider</button>
                </div>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props:{updateApprovision:Object},
    data() {
        return {
            form :{
                montant : "",
                montant_recu : "",
            },
            approvisions : this.$store.state.approvisions,
            users : {},
            update:false,
            approvision_id:null
            
        }
    },
    mounted(){
        if(this.updateApprovision){
            this.form.montant = this.updateApprovision.montant
            this.form.montant_recu = this.updateApprovision.montant_recu
            this.approvision_id=this.updateApprovision.id
        }
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
            axios.get(this.$store.state.url+"/approvision/", this.header )
                .then(res => {
                    this.$store.state.approvisions = res.data          
                })
                .catch(err => {
                    console.error(err); 
                })
            
        },
        approvision(){
            axios.post(this.$store.state.url+"/approvision/",{
                montant: this.form.montant,
                montant_recu:this.form.montant_recu
            },this.header
            ).then((response) => {
                    console.log(response.data)
                    this.fetchData()
                    this.$emit('close')
            }).catch((error) => {
              console.error(error);
            })                  

        },
        saveUpdate(){
            axios.put(this.$store.state.url+"/approvision/"+this.approvision_id +"/", this.form, this.header)
            .then(response => {
                console.log(response.data)
                this.fetchData()
                this.$emit('close')
            }).catch(err => {
                console.error(err); 
            })

        },
        emitClose(){
            this.$emit('close')
            console.log('not closed')
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
    top:10%;
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