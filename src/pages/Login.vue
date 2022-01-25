<template>
<center>
    <div class="col-md-6">
        <div class="vertical-center">
            <div class="inner-block">
                <form>
                    <h3>Sign In</h3>

                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="username" class="form-control form-control-lg" required id="id_username" v-model='username' autocomplete="on" />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control form-control-lg" name="password" required id="id_password" v-model='password' autocomplete="on" />
                    </div>
                    <label for="id_password" v-if='logs.length>0' style="color:red">{{logs}}</label>

                    <button type="submit" class="btn btn-dark btn-lg btn-block" @click.prevent='signIn'>Sign In</button>

                    <p class="forgot-password text-right mt-2 mb-4">
                        <router-link to="/forgot-password">Forgot password ?</router-link>
                    </p>

                    <div class="social-icons">
                        <ul>
                            <li><a href="#"><i class="fa fa-google"></i></a></li>
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
