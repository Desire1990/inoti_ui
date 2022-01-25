<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="toggleForm">X</div>
            <div class="card-modal mt-4">

                <div class="input-group mt-3">
                    <label for="montant">NOM</label>
                    <input class="" type="text" v-model="form.receiver" name="">
                    <span v-if="errors.receiver" class="text-danger">{{ errors.receiver}}</span>
                </div>

                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input class="" type="number" v-model="form.amount" name="">
                    <span v-if="errors.amount" class="text-danger">{{ errors.amount}}</span>
                </div>
                
                <div class="input-group mt-0">
                    <label for="montant"> </label>
                    <button @click="saveEpargne" class="btn btn-info">Valider</button>
                </div>
                
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
                receiver : "",
                amount : "",
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
                
                axios.get(this.$store.state.url+"/transaction/" , this.header)
                     .then(response => {
                        console.log(response.data.results) 

                        const id = response.data.results[0].id

                        if(id){
                               axios.post(this.$store.state.url+"/transaction/",{
                                receiver : this.form.receiver,
                                amount : this.form.amount,
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