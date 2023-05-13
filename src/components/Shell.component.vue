<template>
    <div class="flex flex-col">
        <navbar-component />
        <div class="p-2">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import NavbarComponent from "./Navbar.component.vue";
</script>
