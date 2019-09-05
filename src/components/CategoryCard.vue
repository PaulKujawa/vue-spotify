<template>
  <v-card hover :to="{name: 'category', params: {id: category.id}}">
    <v-img aspect-ratio="1" :src="imageUrl">
      <template v-slot:placeholder>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1 1" width="100%">
          <rect fill="#131618" height="1" width="1" />
        </svg>
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
import { createComponent } from "@vue/composition-api";

interface Props {
  category: Category;
}

export default createComponent<Props>({
  props: {
    category: {}
  },
  setup({ category }: Props) {
    const imageUrl = getLazyImgSrc(category.icons[0].url);

    return {
      imageUrl
    };
  }
});
</script>
