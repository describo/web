import "./tailwind.css";
import "@element-plus/theme-chalk/dist/index.css";
import "@fortawesome/fontawesome-free/js/all";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";

import { createApp } from "vue";
import DescriboCrateBuilder from "@describo/crate-builder-component";
// import DescriboCrateBuilder from "../../crate-builder-component/src/crate-builder/index.js";
import App from "./App.vue";
import { router } from "./routes.js";
import { store } from "./store.js";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(DescriboCrateBuilder);
app.mount("#app");
