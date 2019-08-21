<template></template>

<script lang="ts">
import { getSpotifyAuthUrl, setPostAuthTarget } from "@/utils/auth-utils";
import { createComponent } from "vue-function-api";

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

