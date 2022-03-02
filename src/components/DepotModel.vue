<template>
    <div class="bloc-modale" >
        <div class="overlay"> </div>
        <div class="modale card ">
            <div class="btn btn-danger close-btn" @click="emitClose">X</div>
            <div class="card-modal mt-4">
            <div v-if="updatedepot"><center>
                <h4 class="desos">Modifier transfer</h4>
            </center></div>
            <div v-else><center>
                <h4 class="desos">Nouveau transfer</h4>
            </center></div><hr>

                <div class="input-group mt-3">
                    <label for="montant">NOM</label>
                    <input class="" type="text" v-model="form.nom" name="">
                    <span v-if="errors.nom" class="text-danger">{{ errors.nom}}</span>
                </div>

                <div class="input-group mt-3">
                    <label for="montant">MONTANT</label>
                    <input :value="form.montant" @change="updateMontant" class="" type="number">
                    <span v-if="errors.montant" class="text-danger">{{ errors.montant}}</span>
                </div>                
                <div class="input-group mt-3">
                    <label for="montant_fbu">MONTANT(Fbu)</label>
                    <input v-model='form.montant_fbu' type="number" step="any" class="form-control" name="montant_fbu" id="montant_fbu" placeholder="montant en Fbu">
                    <span v-if="errors.montant" class="text-danger">{{ errors.montant}}</span>
                </div>         
                <div class="input-group mt-3">
                    <label for="tel">TELEPHONE</label>
                        <ValidationProvider :rules="{required:true, regex:/^((\+)257|)?[6-7][1-2, 7-9]\d{6}$/ }" v-slot="{ errors }">
                          <input placeholder="+25779462806 or 79462806" v-validate="'between:8, 12'" name="form.tel" type="text" v-model="form.tel" >
                          <p style="color:red">{{ errors[0] }}</p>
                        </ValidationProvider>
                </div>                
                <center>
                <div class="input-group mt-3" >
                    <button style="background-color: teal; color: white;" v-if="updatedepot" @click="saveUpdateDepot">Modifier</button>
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
                nom : "",
                montant :'',
                montant_fbu:'',
                tel : ""
            },
            isValid:true,
            depot_id:null,
            update:false,
            last:''
            
        }
    },
    mounted() {
        if(this.updatedepot){
            this.form.nom=this.updatedepot.nom
            this.form.montant=this.updatedepot.montant
            this.form.montant_fbu=this.updatedepot.montant_fbu
            this.form.tel=this.updatedepot.tel
            this.form.status=this.updatedepot.status
            this.form.taux=this.updatedepot.taux.taux
            this.depot_id =this.updatedepot.id
        } 
        this.getTaux()     
    },
    methods: {
        updateMontant(event) {
            this.form.montant = event.target.value
            this.form.montant_fbu = this.form.montant * this.last.taux
        },
        getTaux(){
            axios.get(this.$store.state.url+"/taux/", this.header )
                .then(response => {
                    this.$store.state.taux = response.data.results
                    this.last = response.data.results[response.data.results.length-1]
                    console.log(this.last.taux)           
                })
                .catch(err => {
                    console.error(err); 
                }
            )
        },

        fetchData(){
            axios.get(this.$store.state.url+"/depot/", this.header )
                .then(res => {
                    this.$store.state.depots = res.data          
                })
                .catch(err => {
                    console.error(err); 
                }
            )
            
        },        
        depot(){
            axios.post(this.$store.state.url+"/depot/",{
                nom : this.form.nom,
                montant : this.form.montant,
                montant_fbu : this.form.montant_fbu,
                status : this.form.status,
                tel : this.form.tel
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
            axios.put(this.$store.state.url+"/depot/"+this.depot_id +"/", this.form, this.header)
            .then(response => {
                console.log(response.data)
                this.fetchData()
                this.$emit('close')
            }).catch(err => {
                console.error(err); 
            })
        },
        change(e){
            const number=e.target.value
            this.isNumberValid(number)
        },

        emitClose(){
            this.$emit('close')
        },
        validatePhone(event){
            var regex='/^((\+)257|)?[6-7][1-2, 7-9]\d{6}$/'
            return re.test(event)
        }
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