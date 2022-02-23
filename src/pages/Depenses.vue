<template>
    <div>        
        <div class="text-right">
            <br>
            <searchbar />
             <button class="btn btn-primary mt-3" @click="toggleForm" >Nouvelle depense</button>
             <ModalDepense v-if='new_depense' @close='close' v-bind:toggleForm="toggleForm"/>             
            <DepenseList  class=" mt-3"/>
        </div>
    </div>
</template>
<script>
import DepenseList from '../components/DepenseList.vue'
import ModalDepense from '../components/ModalDepense.vue'
import searchbar from '../components/SearchBar.vue'
export default {
  components: { DepenseList, ModalDepense, searchbar },
    data(){
        return {           
        new_depense : false
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
            this.new_depense=false
        },
        toggleForm(){
            this.new_depense =true
        }
    }
}
</script>