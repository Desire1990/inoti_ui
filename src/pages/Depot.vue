<template>
    <div>        
        <div class="text-right">
            <searchbar />
             <button class="btn btn-primary mt-3" @click="toggleForm">Nouveau transfer</button>
             <ModaleDepot v-if='new_depot' @close='close' v-bind:toggleForm="toggleForm"/>             
            <DepotList  class=" mt-3"/>
        </div>
    </div>
</template>
<script>
import DepotList from '../components/DepotList.vue'
import ModaleDepot from '../components/DepotModel.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { DepotList, ModaleDepot, searchbar },
    data(){
        return {           
        new_depot : false
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
            this.new_depot=false
        },
        toggleForm(){
            this.new_depot =true
        }
    }
}
</script>