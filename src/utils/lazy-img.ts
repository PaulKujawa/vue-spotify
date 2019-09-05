import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref
} from "@vue/composition-api";

export const getLazyImgSrc = (src: string) => {
  const observer = ref<IntersectionObserver | null>(null);
  const intersected = ref<boolean>(false);

  // TODO see https://github.com/vuejs/vue-function-api/issues/39
  onMounted(function(this: any) {
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

    observer.value!.observe(this.$el);
  });

  onBeforeUnmount(() => observer.value!.disconnect());

  return computed(() => (intersected.value ? src : ""));
};
