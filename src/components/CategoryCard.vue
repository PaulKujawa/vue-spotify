<template>
  <v-card color="accent" hover :to="{name: 'category', params: {id: category.id}}">
    <v-img aspect-ratio="1" :src="imageUrl">
      <template v-slot:placeholder>
        <v-layout>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 1" width="100%">
            <rect fill="#131618" height="1" width="1" />
          </svg>
        </v-layout>
      </template>
    </v-img>

    <v-card-title class="justify-center">
      <h3 class="headline">{{ category.name }}</h3>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Category } from "@/models/category";
import { getLazyImgSrc } from "@/utils/lazy-img";
import { createComponent, PropType } from "vue-function-api";

export default createComponent({
  props: {
    // TODO see https://github.com/vuejs/vue-function-api/issues/15
    category: (null as any) as PropType<Category>
  },
  setup({ category }) {
    const imageUrl = getLazyImgSrc(category.icons[0].url);

    return {
      category,
      imageUrl
    };
  }
});
</script>
