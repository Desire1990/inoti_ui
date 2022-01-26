<template>
    <div class="bloc-modale" >
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="emitClose">X</div>
            <div class="card-modal mt-4">

                <div class="input-group mt-3">
                    <label for="montant">NOM</label>
                    <input class="" type="text" v-model="form.nom" name="">
                    <span v-if="errors.nom" class="text-danger">{{ errors.nom}}</span>
                </div>

                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input class="" type="number" v-model="form.montant" name="">
                    <span v-if="errors.montant" class="text-danger">{{ errors.montant}}</span>
                </div>
                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input class="" type="number" v-model="form.montant_fbu" name="">
                    <span v-if="errors.montant_fbu" class="text-danger">{{ errors.montant_fbu}}</span>
                </div>
                <div class="input-group mt-3">
                    <label for="montant">TAUX</label>
                    <input class="" type="number" v-model="form.taux" name="">
                    <span v-if="errors.taux" class="text-danger">{{ errors.taux}}</span>
                </div>
                <div class="input-group mt-3">
                    <label for="montant">TELEPHONE</label>
                    <input class="" type="text" v-model="form.tel" name="">
                    <span v-if="errors.tel" class="text-danger">{{ errors.tel}}</span>
                </div>               
                <center>
                <div class="input-group mt-3">
                    <button v-if="updatedepot" @click="saveUpdateDepot">Modifier</button>
                    <button v-else @click="depot">Valider</button>
                </div>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props:{updatedepot:Object},
    data() {
        return {
            form :{
                nom : "",
                montant : "",
                montant_fbu : "",
                taux : "",
                tel : ""
            },
            depot_id:null,
            update:false,
            errors : {},
            users : {}
            
        }
    },
    mounted() {
        if(this.updatedepot){
            this.form.nom=this.updatedepot.nom
            this.form.montant=this.updatedepot.montant
            this.form.montant_fbu=this.updatedepot.montant_fbu
            this.form.taux=this.updatedepot.taux
            this.form.tel=this.updatedepot.tel
            this.depot_id =this.updatedepot.id
        }
        console.log(this.updatedepot)         
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
        depot(){
            axios.post(this.$store.state.url+"/depot/",{
                nom : this.form.nom,
                montant : this.form.montant,
                montant_fbu : this.form.montant_fbu,
                taux : this.form.taux,
                tel : this.form.tel
               },this.header
            ).then((response) => {
                    console.log(response.data)
                    this.$store.state.depots = response.data 
                    this.$emit('close')
            }).catch((error) => {
              console.error(error);
            })                  
        },
        saveUpdateDepot(){
            axios.put(this.$store.state.url+"/depot/"+this.depot_id +"/", this.form, this.header)
            .then(response => {
                console.log(response.data)
                this.$store.state.depots = response.data     
                this.$emit('close')
            }).catch(err => {
                console.error(err); 
            })
        },
        emitClose(){
            this.$emit('close')
        }
    }
}
</script>

<style>
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
    top:30%;
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