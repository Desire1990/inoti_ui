<template>
    <div class="bloc-modale" >
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="emitClose">X</div>
            <div class="card-modal mt-4">

                <div class="input-group mt-3">
                    <label for="montant">TAUX</label>
                    <input class="" type="text" v-model="form.taux" name="">
                    <span v-if="errors.taux" class="text-danger">{{ errors.taux}}</span>
                </div>
                <center>
                <div class="input-group mt-3" >
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
                taux : "",

            },
            isValid:true,
            taux_id:null,
            update:false,
            errors : {},
            users : {},

            
        }
    },
    mounted() {
        if(this.updatedepot){
            this.form.taux=this.updatedepot.taux
            this.taux_id =this.updatedepot.id
        }
        console.log(this.updatedepot)         
    },
    methods: {
        fetchData(){
            axios.get(this.$store.state.url+"/taux/", this.header )
                .then(res => {
                    this.$store.state.taux = res.data          
                })
                .catch(err => {
                    console.error(err); 
                })
            
        },        
        depot(){
            axios.post(this.$store.state.url+"/taux/",{
                taux : this.form.taux
               },this.header
            ).then((response) => {
                    console.log(response.data)
                    this.fetchData()
                    this.$emit('close')
            }).catch((error) => {
              console.error(error);
            })                  
        },
        saveUpdateDepot(){
            axios.put(this.$store.state.url+"/taux/"+this.taux_id +"/", this.form, this.header)
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
        }

    }
}
</script>

<style>
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