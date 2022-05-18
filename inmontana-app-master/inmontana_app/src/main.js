// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app';
import './assets/style.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: 'AIzaSyCQ6z3WbaWQSdIDU9pwYJpn1OkDPaEUgHA',
  authDomain: 'inmontana-app.firebaseapp.com',
  projectId: 'inmontana-app',
  storageBucket: 'inmontana-app.appspot.com',
  messagingSenderId: '227380467101',
  appId: '1:227380467101:web:da670fd15f0d8537528b74',
  measurementId: 'G-48HNZ9P71V'
})

export const db = firebase.firestore()

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
