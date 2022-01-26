<template>
    <div>        
        <div class="text-right">
            <searchbar />
             <button class="btn btn-primary mt-3" @click="toggleForm">Nouveau transfer</button>
             <TransferModel v-if='new_depot' @close='close' v-bind:toggleForm="toggleForm"/>             
            <TransferList  class=" mt-3"/>
        </div>
    </div>
</template>
<script>
import TransferList from '../components/TransferList.vue'
import TransferModel from '../components/TransferModel.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { TransferList, TransferModel, searchbar },
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