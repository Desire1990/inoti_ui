 <template>
  <div id="body">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="main" v-if="logged_in">
      <div  class="dashboard" style="background-color:whitesmoke;">
        <Sidebar style="background-color:teal ;" />
      <router-view/>
    </div>
  </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Login from "./pages/Login.vue"
export default{
  components:{Login,Sidebar},
  computed:{
    logged_in() {
      return this.$store.state.user != null;
    }
  },
  mounted(){
    var user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.state.user = user;
    } else {
      console.warn("il y'a pas de session");
    }
  },
  watch:{
    "$store.state.user":{
      deep: true,
      handler(new_user){
        localStorage.setItem('user', JSON.stringify(new_user));
      }
    }
  },
};
</script>
<style>
.dashboard {
    display: grid;
    grid-template-columns: 1fr 5fr;
    background-color: teal;
    height: 100vh;
    width: 100vw;
    position: fixed;
}

.content {
    background-color: white;
    border-radius: 10px;
    margin: 6px 6px 6px 0px;
}
</style>