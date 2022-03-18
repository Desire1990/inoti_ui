<template>
    <div class="sidebar">
    <div class="title"> 
        <button @click="loggout"  class="btn btn-danger btn-sm ml-1 loggout">
            logout
        </button>                   
           <center><h3 style="padding:10px 10px 10px 10px;">INOTI UI</h3> </center>
         </div>
        <div class="menu-items">
            <router-link to="/" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <h6>Dashboard</h6>
                </div>
                
            </router-link>
            <router-link to="/transfer" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <h6>Transfer</h6>
                </div>
            </router-link>

            <router-link to="/approvision" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <h6>Approvision</h6>
                </div>
            </router-link>
            <router-link to="/depense" active-class="active" tag="button" exact class="side-btn">
                <div class="link-container">
                    <h6>Depenses</h6>
                </div>
            </router-link>
            <router-link to="/stat" active-class="active" tag="button" exact class="side-btn" v-if="$store.state.user.groups.includes('admin')">
                <div class="link-container">
                    <h6>Statistique</h6>
                </div>
            </router-link>
        </div>

    </div>
</template>
<script>
export default {
  methods:{
    loggout(){
      if (confirm("êtes vous sur de vouloir se deconnecter?")) {
        this.$store.state.user = null;
      }
    },

  }
   
}
</script>

<style>
.title {
    color: white;
    font-size: 24px;
    margin-top: 10px;
}

.menu-items {
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    margin-left: 6px;
}

.menu-items > * {
    margin-top: 60px;
}

.side-btn {
    border: none;
    padding: 16px 0px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: transparent;
}

.side-btn:focus {
    outline: none;
}

.side-btn.active {
    position: relative;
    background-color: white;
    color: teal;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 30px 0 0 30px;
}

.side-btn.active::before {
    top: -30px;
}

.side-btn.active::after {
    bottom: -30px;
}
/*
.side-btn.active::before, .side-btn.active::after {
    position: absolute;
    content: "";
    right: 0;
    height: 30px;
    width: 30px;
    background-color: white;
}

.side-btn.active .link-container::before {
    top: -60px;
}

.side-btn.active .link-container::after {
    bottom: -60px;
    z-index: 99;
}

.side-btn.active .link-container::before, .side-btn.active .link-container::after {
    position: absolute;
    content: " ";
    right: 0px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: teal;
}*/
</style>