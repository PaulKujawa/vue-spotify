import { computed, onDestroyed, onMounted, value } from "vue-function-api";

export const getLazyImgSrc = (src: string) => {
  const observer = value<IntersectionObserver | null>(null);
  const intersected = value(false);

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

  onDestroyed(() => observer.value!.disconnect());

  return computed(() => (intersected.value ? src : ""));
};
