<template></template>

<script lang="ts">
import { getPostAuthTarget, mapSpotifyAuthRes } from "@/utils/auth-utils";
import { createComponent } from "@vue/composition-api";

export default createComponent({
  setup(_: any, { root }: any) {
    const spotifyResponse = mapSpotifyAuthRes(window.location.hash);

    if ("access_token" in spotifyResponse) {
      root.$store.commit("authenticate", spotifyResponse);
    }

    root.$router.push(getPostAuthTarget());

    return {};
  }
});
</script>
