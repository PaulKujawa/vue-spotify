<template>
  <!-- could be made functional, but that would require a manual, global register of used vuetify components -->
  <v-container>
    <v-row>
      <v-col>
        <v-banner single-line>
          I don't remember this place.
          <template v-slot:actions>
            <v-btn text :to="{name: 'startPage'}">Startpage</v-btn>
          </template>
        </v-banner>
      </v-col>
    </v-row>
  </v-container>
</template>
