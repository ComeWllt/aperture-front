<template>
  <v-container class="pa-5 ma-5">
    <v-progress-circular :size="80" :width="8" indeterminate color="accent"/>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {}
</script>

<style scoped>
</style>
