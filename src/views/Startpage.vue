<template>
  <v-row justify="center">
    <v-col class="image-container pa-0">
      <!-- TODO provide different image widths and eventually also a generated, inline SVG placeholder -->
      <v-img
        height="100%"
        position="center"
        :src="require('@/assets/images/unsplash-headphones.jpg')"
      />
    </v-col>

    <div class="align-center d-flex flex-column justify-space-between overlay">
      <h1 class="display-4 font-weight-thin overlay-title white--text">vuemu</h1>
      <v-btn
        class="overlay-button"
        color="white"
        outlined
        :to="{name: 'categoryList'}"
      >Connect with Spotify</v-btn>
    </div>
  </v-row>
</template>

<script lang="ts">
import { createComponent } from "vue-function-api";

export default createComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
// vuetify spacing classes only go until 3rem
$space-around: 5rem;

.image-container {
  height: 100vh;
}

.overlay {
  position: absolute;
  height: 100vh;
}

.overlay-title {
  margin-top: $space-around;
  user-select: none;
}
.overlay-button {
  margin-bottom: $space-around;
}

.row {
  position: relative;
}
</style>