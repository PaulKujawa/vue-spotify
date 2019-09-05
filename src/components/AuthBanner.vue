<template>
  <v-banner v-if="error.status === 401">
    Pardon me, that's sensitive. Please introduce yourself again.
    <template v-slot:actions>
      <v-btn text :to="{name: 'login', query:   {redirect: $route.fullPath}}">Connect with Spotify</v-btn>
    </template>
  </v-banner>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

interface Props {
  error: { message: string };
}

export default createComponent<Props>({
  props: {
    error: {}
  },
  setup() {
    return {};
  }
});
</script>