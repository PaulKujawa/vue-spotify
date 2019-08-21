<template>
  <v-row>
    <v-flex>
      <h1 class="display-1">Spotify category</h1>
    </v-flex>

    <v-flex v-if="res.pending">
      <v-progress-linear color="secondary" indeterminate></v-progress-linear>
    </v-flex>

    <div v-if="res.data">{{ res.data }}</div>

    <auth-banner :error="res.error" v-if="res.error"></auth-banner>
  </v-row>
</template>

<script lang="ts">
import AuthBanner from "@/components/AuthBanner.vue";
import { fetchCategory } from "@/repositories/category-repository";
import { createComponent } from "vue-function-api";
import { Context } from "vue-function-api/dist/types/vue";

export default createComponent({
  components: { AuthBanner },
  setup(_, { root }: Context) {
    // TODO handle missing query parameter

    const categoryId = root.$route.params.id;

    // TODO show error like 404
    const res = fetchCategory(categoryId);

    return {
      res
    };
  }
});
</script>
