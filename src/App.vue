<template>
  <v-app :class="{ 'gradient-bg': startPage }">
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

    <v-app-bar app color="primary" v-if="!startPage">
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon class="white--text" @click="toggleDrawerOpen"></v-app-bar-nav-icon>
      </span>

      <v-toolbar-title>
        <router-link class="white--text" style="cursor: pointer" tag="span" to="/">{{ appTitle }}</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          class="white--text"
          text
          :key="navEntry.title"
          :to="{name: navEntry.routeName}"
          v-for="navEntry of navEntries"
        >
          <v-icon class="white--text" left>{{ navEntry.svgPath }}</v-icon>
          {{ navEntry.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container grid-list-lg :fill-height="startPage">
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
    const appTitle = "vuemu";
    const navEntries = value([
      {
        routeName: "categoryList",
        svgPath: mdiWidgets,
        title: "Browse"
      },
      {
        routeName: "search",
        svgPath: mdiMagnify,
        title: "Search"
      }
    ]);
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
      appTitle,
      drawerOpen,
      navEntries,
      startPage,
      toggleDrawerOpen
    };
  }
});
</script>

<style lang="scss" scoped>
.gradient-bg {
  // pink, orange, cyan, teal lighten3
  background: linear-gradient(
    -45deg,
    #e694b0,
    #f7cd8b,
    #96dce8,
    #91c9c3
  ) !important;
  background-size: 400% 100% !important;
  animation: Gradient 5s ease infinite alternate;
}

@keyframes Gradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
</style>

