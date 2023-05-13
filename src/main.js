import "./tailwind.css";
import { createApp } from "vue";
import DescriboCrateBuilder from "@describo/crate-builder-component";
import App from "./App.vue";
import { router } from "./routes.js";
import { store } from "./store.js";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(DescriboCrateBuilder);
router.isReady().then(() => {
    app.mount("#app");
});
