<template>
    <div>        
        <div class="text-right">
            <searchbar />
             <button class="btn btn-primary mt-3" @click="toggleForm">Nouvelle depense</button>
             <ModalDepense v-if='new_depot' @close='close'/>             
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