// src/main.ts
import { createApp } from "vue";
import { createPinia } from "pinia"; // Import Pinia
import "remixicon/fonts/remixicon.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia()); // Use Pinia
app.use(router);

app.mount("#app");
