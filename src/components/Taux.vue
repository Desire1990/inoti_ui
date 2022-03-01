<template>
    <div>        
        <div class="text-right">
            <searchbar />
             <button style="background-color:teal; color: white;" class="btn btn mt-3 md-2" @click="toggleForm" v-if="$store.state.user.groups.includes('admin')">Creer taux</button>
             <ModaleDepot v-if='new_depot' @close='close' v-bind:toggleForm="toggleForm"/>             
            <TauxList  class=" mt-3"/>
        </div>
    </div>
</template>
<script>
import TauxList from '../components/tauxList.vue'
import ModaleDepot from '../components/modal.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { TauxList, ModaleDepot, searchbar},
    data(){
        return {           
        new_depot : false,
        isModalVisible: false,
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
        },
        showModal() {
          this.isModalVisible = true;
        },
        closeModal() {
          this.isModalVisible = false;
        }
    }
}
</script>
<style>
.desos{
  top: calc(100% - 300px); 
}
</style>