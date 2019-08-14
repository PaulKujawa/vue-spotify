<template>
  <v-layout column>
    <v-flex>
      <h1 class="display-1">Categories</h1>
    </v-flex>

    <v-flex v-if="res.pending">
      <v-progress-linear color="secondary" indeterminate></v-progress-linear>
    </v-flex>

    <v-layout row wrap v-if="res.data && res.data.categories.items.length">
      <v-flex v-for="category of res.data.categories.items" :key="category.id" xs6 md4 lg3 xl2>
        <category-card :category="category"></category-card>
      </v-flex>
    </v-layout>

    <v-flex>
      <auth-banner :error="res.error" v-if="res.error"></auth-banner>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import AuthBanner from "@/components/AuthBanner.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import { fetchCategories } from "@/repositories/category-repository";
import { mdiLogin } from "@mdi/js";
import { createComponent } from "vue-function-api";

export default createComponent({
  components: { AuthBanner, CategoryCard },
  setup() {
    const res = fetchCategories();

    return {
      mdiLogin,
      res
    };
  }
});
</script>
