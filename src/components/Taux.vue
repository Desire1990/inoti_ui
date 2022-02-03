<template>
    <div>        
        <div class="text-right">
            <searchbar />
             <button style="background-color:teal; color: white;" class="btn btn mt-3" @click="toggleForm" v-if="$store.state.user.groups.includes('admin')">Nouveau transfer</button>
             <ModaleDepot v-if='new_depot' @close='close' v-bind:toggleForm="toggleForm"/>             
            <DepotList  class=" mt-3"/>
        </div>
    </div>
</template>
<script>
import DepotList from '../components/tauxList.vue'
import ModaleDepot from '../components/modal.vue'
import searchbar from '../components/SearchBar.vue'
import Modal from '../components/modal.vue'
export default {
  components: { DepotList, ModaleDepot, searchbar, Modal },
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