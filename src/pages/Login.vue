<template  >
<center>
    <div class="col-md-6" >
        <div class="vertical-center ">
            <div class="inner-block">
                <form class="login">
                    <center>
                        <h1>Sign In</h1>
                    </center>

                    <div class="form-group">
                        <label><h3>Username</h3></label>
                        <input type="text" name="username" placeholder="username" class="form-control form-control-lg" required id="id_username" v-model='username' autocomplete="on" />
                    </div>

                    <div class="form-group">
                        <label><h3>Password</h3></label>
                        <input type="password" placeholder="password" class="form-control form-control-lg" name="password" required id="id_password" v-model='password' autocomplete="on" />
                    </div>
                    <label for="id_password" v-if='logs.length>0' style="color:red">{{logs}}</label>

                    <button type="submit" class="btn btn-dark btn-lg btn-block" @click.prevent='signIn'>Sign In</button>

                    <p class="forgot-password text-right mt-2 mb-4">
                        <router-link to="/forgot-password"><strong>Forgot password ?</strong></router-link>
                    </p>

                    <div class="social-icons">
                        <ul>
                            <li><a href="#"><i class="fa fa-google" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                        </ul>
                    </div>
                    <center>
                Developped by <b><a href="https://github.com/Desire1990">Desos</a></b>
                    </center>

                </form>
            </div>
        </div>
    </div>
</center>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            logs:'',
            username:'',
            password:'',
            url:this.$store.state.url           
        }
    },
    methods:{
        signIn(){
            this.logs = "loging in..."
            axios.post(this.url+"/login/", {
                "username": this.username,
                "password": this.password
            }).then((response) => {
                this.$store.state.user = response.data;
            }).catch((error) => {
                if (!error.response) {
                    this.logs = JSON.stringify(error.response.data)
                } else {
                    this.logs = "erreur de connectivité";
                }
            });
        }
    }
};
</script>
<style>
    .login{
        background-image: url('data:image/jpeg;base64,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');
        color:#000;
    }
</style>