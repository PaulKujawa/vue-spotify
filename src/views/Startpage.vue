<template>
  <v-layout align-center justify-center column>
    <div>
      <svg
        data-v-f94ae6b2
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="400px"
        width="400px"
        class="v-icon notranslate v-icon--svg theme--dark"
        style="font-size: 400px; height: 400px; width: 400px;"
      >
        <path
          d="M14.5,10.37C15.54,10.37 16.38,9.53 16.38,8.5C16.38,7.46 15.54,6.63 14.5,6.63C13.46,6.63 12.63,7.46 12.63,8.5C12.63,9.53 13.47,10.37 14.5,10.37M14.5,1C18.64,1 22,4.36 22,8.5C22,10.67 21.08,12.63 19.6,14H9.4C7.93,12.63 7,10.67 7,8.5C7,4.35 10.36,1 14.5,1M6,21V22H4V21H2V15H22V21H20V22H18V21H6M4,18V19H13V18H4M15,17V19H17V17H15M19,17C18.45,17 18,17.45 18,18C18,18.55 18.45,19 19,19C19.55,19 20,18.55 20,18C20,17.45 19.55,17 19,17Z"
        />
      </svg>
    </div>
  </v-layout>
</template>

<script lang="ts">
import { mdiDiscPlayer } from "@mdi/js";
import { createComponent } from "vue-function-api";
import { Context } from "vue-function-api/dist/types/vue";

export default createComponent({
  setup(_, { root }: Context) {
    const icon = mdiDiscPlayer;

    const onInput = (_city: any) => {
      root.$router.push({ name: "categories" });
    };

    return {
      icon,
      onInput
    };
  }
});
</script>

<style lang="scss" scoped>
// opacity 0.8
//

// svg {
//   will-change: box-shadow;
//   &:hover {
//     &::before {
//       opacity: 0.04;
//       transition-duration: 0.28s;
//       transition-property: box-shadow, transform, opacity;
//       transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//     }
//   }
// }
</style>


