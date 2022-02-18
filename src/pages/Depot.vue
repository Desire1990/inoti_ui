<template>
    <div>
        <div class="text-right">
            <searchbar />
            <button style="background-color:darkred; color: white;" class="btn btn mt-3" @click="showModal" v-if="$store.state.user.groups.includes('admin')">Change le taux!</button>
            <Modal v-show="isModalVisible" @close="closeModal" />

             <button style="background-color:teal; color: white;" class="btn btn mt-3" @click="toggleForm" v-if="$store.state.user.groups.includes('admin')">Nouveau transfer</button>
             <ModaleDepot v-if='new_depot' @close='close' v-bind:toggleForm="toggleForm"/>             
            <DepotList  class=" mt-3"/>
        </div>
    </div>
</template>
<script>
import DepotList from '../components/DepotList.vue'
import ModaleDepot from '../components/DepotModel.vue'
import searchbar from '../components/SearchBar.vue'
import Modal from '../components/modal.vue'
export default {
  components: { DepotList, ModaleDepot, searchbar, Modal },
    data(){
        return {           
        new_depot : false,
        isModalVisible: false,
        visible:false
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