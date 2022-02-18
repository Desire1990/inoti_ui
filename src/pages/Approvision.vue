<template>
    <div> 
        
        <div class="text-right">
            <searchbar />
             <button class="btn btn-primary mt-3" @click="toggleForm">Nouvel approvision</button>
             <ModalApprovision v-if='new_approvision' @close='close' v-bind:toggleForm="toggleForm"/>             
            <ApprovisionList class=" mt-3"/>
        </div>
    </div>
</template>

<script>
import ApprovisionList from '../components/ApprovisionList.vue'
import ModalApprovision from '../components/ModalApprovision.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { ApprovisionList, ModalApprovision, searchbar },
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