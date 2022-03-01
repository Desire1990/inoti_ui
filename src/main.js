import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import { ValidationProvider, extend } from "vee-validate"
import '@/main.css'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.component("ValidationProvider", ValidationProvider);


Vue.config.productionTip = false
Vue.mixin({
	computed:{
        header(){
            return {
                headers: {
                    Authorization: `Bearer ${this.$store.state.user.access}`,
                },
            };
        }

    },
	methods: {
		money(x) {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
		},
		datetime(x) {
			let date = new Date(x);
			return new Intl.DateTimeFormat(
				'en-GB',
				{ dateStyle: 'short', timeStyle: 'short' }
			).format(date)
		},
		currency(value) {
				return new Intl.NumberFormat("en-US",
						{ style: "currency", currency: "USD" }).format(value);
		}
	},
})
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

