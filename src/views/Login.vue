<template></template>

<script lang="ts">
import { createComponent } from "vue-function-api";
import { getSpotifyAuthUrl, setPostAuthTarget } from "@/utils/auth-utils";

export default createComponent({
  setup(_: any, { root }: any) {
    const redirectedFrom = root.$route.query.redirect;

    if (redirectedFrom) {
      setPostAuthTarget(redirectedFrom);
    }

    window.location.replace(getSpotifyAuthUrl());

    return {};
  }
});
</script>

