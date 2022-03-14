<template>
    <div>   
            <h1  class="form-inline my-2 my-lg-0" style="margin-left: 30%;">Liste de tous les depenses</h1>
        <div class="text-right">
             <button class="btn btn-primary mt-3 mr-2" @click="toggleForm" >Nouvelle depense</button>
             <ModalDepense v-if='new_depense' @close='close' v-bind:toggleForm="toggleForm"/>             
            <DepenseList/>
        </div>
    </div>
</template>
<script>
import DepenseList from '../components/DepenseList.vue'
import ModalDepense from '../components/ModalDepense.vue'
export default {
  components: { DepenseList, ModalDepense,  },
    data(){
        return {           
        new_depense : false
        }
    },
    computed:{
        header(){
            return{
                headers:{
                    "Authorization" : `Bearer  ${this.$store.state.user.access }`

                }
            }
        }
    },
    methods: {
        close(){
            this.new_depense=false
        },
        toggleForm(){
            this.new_depense =true
        }
    }
}
</script>