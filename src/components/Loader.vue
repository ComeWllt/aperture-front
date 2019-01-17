<template>
  <v-layout fill-height align-center justify-center ma-5 pa-5>
    <v-progress-circular :size="80" :width="8" indeterminate color="accent"/>
  </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Loader extends Vue {}
</script>

<style scoped>
</style>
