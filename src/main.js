import { createApp } from "vue";
// import "./style.css";
import './assets/stylesheets/main.scss';
import store from './store'

import App from "./App.vue";

console.log('dfmgfmdkfml')
const app = createApp(App)

app.use(store)

app.mount('#app')
