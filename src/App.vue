<template>
  <v-app>
    <v-navigation-drawer app :disable-resize-watcher="true" v-model="drawerOpen">
      <v-list>
        <v-list-item
          :key="navEntry.title"
          :to="{name: navEntry.routeName}"
          v-for="navEntry of navEntries"
        >
          <v-list-item-action>
            <v-icon>{{ navEntry.svgPath }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>{{ navEntry.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark v-if="!startPage">
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click="toggleDrawerOpen"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link style="cursor: pointer" tag="span" to="/">vuemu</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          :key="navEntry.title"
          :to="{name: navEntry.routeName}"
          v-for="navEntry of navEntries"
        >
          <v-icon left>{{ navEntry.svgPath }}</v-icon>
          {{ navEntry.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container :fluid="startPage" :class="{'pa-0': startPage}">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { mdiMagnify, mdiWidgets } from "@mdi/js";
import { createComponent, value, watch } from "vue-function-api";
import { Context } from "vue-function-api/dist/types/vue";
import { Route } from "vue-router";

export default createComponent({
  setup(_, { root }: Context) {
    const navEntries = [
      {
        routeName: "categories",
        svgPath: mdiWidgets,
        title: "Browse"
      },
      {
        routeName: "search",
        svgPath: mdiMagnify,
        title: "Search"
      }
    ];

    const drawerOpen = value(false);
    const startPage = value(true);

    const toggleDrawerOpen = () => (drawerOpen.value = !drawerOpen.value);

    watch(
      () => root.$route,
      (to: Route) => {
        startPage.value = to.name === "startPage";
      }
    );

    return {
      drawerOpen,
      navEntries,
      startPage,
      toggleDrawerOpen
    };
  }
});
</script>

<style lang="scss">
html {
  // see https://github.com/vuetifyjs/vuetify/issues/864
  overflow-y: auto !important;
}
</style>
