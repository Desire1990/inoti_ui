<template>
    <div class="bloc-modale" >
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="emitClose">X</div>
            <div class="card-modal mt-4">
            <div v-if="updatedepot"><center>
                <h4>Modifier taux</h4>
            </center></div>
            <div v-else><center>
                <h4 class="col-md-8 mt-4 p-2" style="background-color: teal; color: white;" >Nouveau taux</h4>
            </center></div><hr>
                <div class="input-group mt-3">
                    <label for="montant">TAUX</label>
                    <input class="" type="text" v-model="form.taux" name="">
                    <span v-if="errors.taux" class="text-danger">{{ errors.taux}}</span>
                </div>
                <center>
                <div class="input-group mt-3" >
                    <button style="background-color: teal; color: white;" v-if="updatedepot" @click="saveUpdate">Modifier</button>
                    <button style="background-color: teal; color: white;" v-else @click="depot">Valider</button>
                </div>
                </center>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import { ValidationProvider } from 'vee-validate';
export default {
    props:{updatedepot:Object},
    components:{ValidationProvider,},
    data() {
        return {
            form :{
                taux : ""
            },
            isValid:true,
            depot_id:null,
            update:false,
            
        }
    },
    mounted() {
        if(this.updatedepot){
            this.form.taux=this.updatedepot.taux
        }      
    },
    methods: {

        fetchData(){
            axios.get(this.$store.state.url+"/taux/", this.header )
                .then(res => {
                    this.$store.state.taux = res.data          
                })
                .catch(err => {
                    console.error(err); 
                }
            )
            
        },        
        depot(){
            axios.post(this.$store.state.url+"/taux/",{
                taux : this.form.taux,
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
            axios.put(this.$store.state.url+"/taux/"+this.depot_id +"/", this.form, this.header)
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
        },
    }
}
</script>

<style scoped>
.error{
  color:red;
}
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
    top:25%;
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
/*.desos{
    background-color: teal;
    color: white;
    width: 70%;
}*/
</style>