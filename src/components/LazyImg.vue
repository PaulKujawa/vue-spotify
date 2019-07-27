<template>
  <v-img ref="el" v-bind="$attrs" :src="lazySrc"></v-img>
</template>

<script lang="ts">
import {
  computed,
  createComponent,
  onDestroyed,
  onMounted,
  value
} from "vue-function-api";
import { Context } from "vue-function-api/dist/types/vue";

// TODO migrate component to utility function
export default createComponent({
  props: ["src"], // TODO see https://github.com/vuejs/vue-function-api/issues/15
  setup({ src }: any, { refs }: Context) {
    const observer = value<IntersectionObserver | null>(null);
    const intersected = value(false);

    onMounted(() => {
      observer.value = new IntersectionObserver(
        ([element]) => {
          if (element.isIntersecting) {
            intersected.value = true;
            observer.value!.disconnect();
          }
        },
        {
          rootMargin: "120px"
        }
      );

      // workaround: `ref="el"` in template's root element
      observer.value!.observe((refs.el as any).$el);
    });

    onDestroyed(() => {
      observer.value!.disconnect();
    });

    const lazySrc = computed(() => {
      return intersected.value ? src : "";
    });

    return { lazySrc };
  }
});
</script>
