<template>
  <!-- could be made functional, but that would require a manual, global register of used vuetify components -->
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-banner single-line>
          I don't remember this place.
          <template v-slot:actions>
            <v-btn text :to="{name: 'startPage'}">Startpage</v-btn>
          </template>
        </v-banner>
      </v-flex>
    </v-layout>
  </v-container>
</template>
