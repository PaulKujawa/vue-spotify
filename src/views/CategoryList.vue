<template>
  <v-row>
    <v-col cols="12">
      <h1 class="display-1">Categories</h1>
    </v-col>

    <v-col cols="12" v-if="res.pending">
      <v-progress-linear color="secondary" indeterminate></v-progress-linear>
    </v-col>

    <template v-if="res.data && res.data.categories.items.length">
      <v-col
        cols="6"
        md="4"
        lg="3"
        xl="2"
        v-for="category of res.data.categories.items"
        :key="category.id"
      >
        <category-card :category="category"></category-card>
      </v-col>
    </template>

    <v-col>
      <auth-banner :error="res.error" v-if="res.error"></auth-banner>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import AuthBanner from "@/components/AuthBanner.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import { fetchCategories } from "@/repositories/category-repository";
import { mdiLogin } from "@mdi/js";
import { createComponent } from "@vue/composition-api";

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
