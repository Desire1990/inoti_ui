<template>
    <div> 
        
        <div class="text-right">
            <searchbar />
             <button class="btn btn-primary mt-3" @click="toggleForm">Nouvel approvision</button>
             <modale-depot v-bind:revele="revele" v-bind:toggleForm="toggleForm" />             
            <depot-list class=" mt-3"/>
        </div>
    </div>
</template>

<script>
import DepotList from '../components/ApprovisionList.vue'
import ModaleDepot from '../components/ModalApprovision.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { DepotList, ModaleDepot, searchbar },
    data(){
        return {
           
        revele : false
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

        toggleForm(){
            this.revele = ! this.revele
        }
    }
}
</script>