<template>
  <v-layout column>
    <v-flex>
      <h1 class="display-1 grey--text text-center">Categories</h1>
    </v-flex>

    <v-flex>
      <v-progress-linear color="secondary" indeterminate v-if="res.pending"></v-progress-linear>
    </v-flex>

    <template v-if="res.data && res.data.categories.items.length">
      <v-layout row wrap>
        <v-flex v-for="category of res.data.categories.items" :key="category.id" xs6 md4 lg3 xl2>
          <category-card :category="category"></category-card>
        </v-flex>
      </v-layout>
    </template>
  </v-layout>
</template>

<script lang="ts">
import CategoryCard from "@/components/CategoryCard.vue";
import { fetchCategories } from "@/repositories/category-repository";
import { createComponent } from "vue-function-api";

export default createComponent({
  components: { CategoryCard },
  setup() {
    // TODO show error
    const res = fetchCategories();

    return {
      res
    };
  }
});
</script>
