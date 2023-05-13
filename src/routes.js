import { createRouter, createWebHashHistory } from "vue-router";
import ShellComponent from "./components/Shell.component.vue";
import DashboardComponent from "./components/Dashboard.component.vue";
import DescriptionComponent from "./components/Description.component.vue";
import RenderCrateComponent from "./components/RenderCrate.component.vue";

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "root",
            component: ShellComponent,
            children: [
                {
                    path: "dashboard",
                    name: "dashboard",
                    component: DashboardComponent,
                },
                {
                    path: "describe",
                    name: "describe",
                    component: DescriptionComponent,
                },
            ],
        },
        {
            path: "/render",
            name: "render",
            component: RenderCrateComponent,
        },
    ],
});
