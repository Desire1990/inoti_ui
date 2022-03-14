<template>
    <div>
        <h1  class="form-inline my-2 my-lg-0" style="margin-left: 30%;">Liste de tous les transfers</h1>
        <div class="text-right">
            <button style="background-color:skyblue; color: black;" class="btn btn mt-3 mr-2" @click="showModal" v-if="$store.state.user.groups.includes('admin')">Changez le taux!</button>
            <Modal v-show="isModalVisible" @close="closeModal" />
             <button style="background-color:teal; color: white;" class="btn btn mt-3 mr-3" @click="toggleForm" v-if="$store.state.user.groups.includes('admin')">Nouveau transfer</button>
             <ModaleDepot v-if='new_depot' @close='close' v-bind:toggleForm="toggleForm"/>             
            <DepotList  class=" mt-3"/>
        </div>
    </div>
</template>
<script>
import DepotList from '../components/DepotList.vue'
import ModaleDepot from '../components/DepotModel.vue'
import Modal from '../components/modal.vue'
export default {
  components: { DepotList, ModaleDepot, Modal },
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