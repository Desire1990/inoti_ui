<template>
    <div> 
        
        <div class="text-right">
            <searchbar />
             <button class="btn btn-primary mt-3" @click="toggleForm">Nouvelle transaction</button>
             <modal-transaction v-bind:revele="revele" v-bind:toggleForm="toggleForm" />             
            <transaction-list class=" mt-3"/>
        </div>
    </div>
</template>

<script>
import TransactionList from '../components/TransactionList.vue'
import ModalTransaction from '../components/TransactionModal.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { TransactionList, ModalTransaction, searchbar },
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