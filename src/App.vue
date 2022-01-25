 <template>
  <div id="body">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <div class="main" v-if="logged_in">
      <router-view/>
    </div>
    <div v-else>
      <Login/>
    </div>
  </div>
</template>

<script>
import Login from "./pages/Login.vue"
export default{
  components:{Login,},
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
  }
};
</script>