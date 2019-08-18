<template>
  <v-banner single-line v-if="error.status === 401">
    Pardon me, that's sensitive.
    <template v-slot:actions>
      <v-btn text :to="{name: 'login', query:   {redirect: $route.fullPath}}">Login</v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import { FetchResponseError } from "@/utils/fetch-utils";
import { createComponent, PropType } from "vue-function-api";

export default createComponent({
  props: {
    // TODO see https://github.com/vuejs/vue-function-api/issues/15
    error: (null as any) as PropType<FetchResponseError>
  },
  setup({ error }) {
    return {
      error
    };
  }
});
</script>