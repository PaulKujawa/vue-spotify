<template>
  <v-banner v-if="error.status === 401">
    Pardon me, that's sensitive. Please introduce yourself again.
    <template v-slot:actions>
      <v-btn text :to="{name: 'login', query:   {redirect: $route.fullPath}}">Connect with Spotify</v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import { createComponent, PropType } from "vue-function-api";

export default createComponent({
  props: {
    // TODO see https://github.com/vuejs/vue-function-api/issues/15
    error: (null as any) as PropType<{ message: string }>
  },
  setup({ error }) {
    return {
      error
    };
  }
});
</script>