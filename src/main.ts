import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {createRouter, createMemoryHistory} from "vue-router";
import GameManagerView from "./pages/GameManagerView.vue";
import GameView from "./pages/GameView.vue";
import StartScreen from "./pages/StartScreen.vue";
import CreationView from "./pages/CreationView.vue";

const routes = [
    {path: '/manager', component: GameManagerView, name: "manager"},
    {path: "/game", component: GameView, name: "game"},
    {path: "/creator", component: CreationView, name: "creation"},
    {path: "/", component: StartScreen, name: "main"},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

library.add(fas);

createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
