<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="toggleForm">X</div>
            <div class="card-modal mt-2">

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
                    <label for="montant"> </label>
                    <button @click="saveEpargne" class="btn btn-info">Valider</button>
                </div>
                </center>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    props:["revele","toggleForm"],

    data() {
        return {
            form :{
                montant : "",
                montant_recu : "",
            },
            errors : {},
            users : {}
            
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
        saveEpargne(){
                
                axios.get(this.$store.state.url+"/approvision/" , this.header)
                     .then(response => {
                        console.log(response.data.results) 

                        const id = response.data.results[0].id

                        if(id){
                               axios.post(this.$store.state.url+"/approvision/",{
                                montant : this.form.montant,
                                montant_recu : this.form.montant_recu,
                               },this.header)
                            .then(response => {
                                console.log(response.data)
                                console.log("success!")
                                this.revele = false

                            })
                            .catch(err => {
                                console.error("Error ",err); 
                                console.log("Error!")
                    
                        })

                        }

                       

                     })

              
                
            }
        },
    
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