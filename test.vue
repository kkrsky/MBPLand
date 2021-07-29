<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12" sm="6">
        <v-subheader v-text="'Multiple with persistent hint'"></v-subheader>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          v-model="e6"
          :items="states"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          multiple
          hint="Pick your favorite states"
          persistent-hint
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-subheader
          v-text="'Multiple (Chips) with persistent hint'"
        ></v-subheader>
      </v-col>

      <v-col cols="12" sm="6">
        <v-select
          v-model="e7"
          :items="states"
          label="Select"
          multiple
          chips
          hint="What are the target regions"
          persistent-hint
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script></script>
