<template>
    <div> 
        <h1  class="form-inline my-2 my-lg-0" style="margin-left: 20%;color: teal;">Liste de tous les approvisions</h1>
        <div class="text-right">
             <button class="btn btn-primary mt-3 mr-2" @click="toggleForm" v-if='$store.state.user.groups.includes("admin")'>Nouvel approvision</button>
             <ModalApprovision v-if='new_approvision' @close='close' v-bind:toggleForm="toggleForm"/>             
            <ApprovisionList class=" mt-3"/>
        </div>
    </div>
</template>

<script>
import ApprovisionList from '../components/ApprovisionList.vue'
import ModalApprovision from '../components/ModalApprovision.vue'
export default {
  components: { ApprovisionList, ModalApprovision,  },
    data(){
        return {
           
        new_approvision : false
        } 
    },
    mounted() {
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
            this.new_approvision=false
        },

        toggleForm(){
            this.new_approvision = true
        }
    }
}
</script>