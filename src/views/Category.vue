<template>
  <v-layout column>
    <v-flex>
      <h1 class="display-1 grey--text text-center">Spotify category</h1>
    </v-flex>

    <v-flex>
      <v-progress-linear color="secondary" indeterminate v-if="res.pending"></v-progress-linear>
    </v-flex>

    <div v-if="res.data">{{ res.data }}</div>
  </v-layout>
</template>

<script lang="ts">
import { fetchCategory } from "@/repositories/category-repository";
import { createComponent } from "vue-function-api";
import { Context } from "vue-function-api/dist/types/vue";

export default createComponent({
  setup(_, { root }: Context) {
    // TODO handle missing query parameter

    // TODO when recipes link each other, implement smth like switchMap
    // see https://github.com/vuejs/rfcs/blob/function-apis/active-rfcs/0000-function-api.md#effect-cleanup
    const categoryId = root.$route.params.id;

    // TODO show error like 404
    const res = fetchCategory(categoryId);

    return {
      res
    };
  }
});
</script>
