<template>
  <v-card class="elevation-2">
    <v-card-title primary-title class="text-sm-left">
      <div class="headline">{{ title }}</div>
      <v-spacer/>
      <span class="grey--text">{{ date }}</span>
    </v-card-title>
    <v-divider/>
    <v-card-text class="text-xs-left">{{ description }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AlbumDetails extends Vue {
  @Prop({ type: String, default: 'Loading...' }) private title!: string;
  @Prop({ type: String, default: '' }) private date!: string;
  @Prop({ type: String, default: '' }) private description!: string;
}
</script>

<style scoped>
</style>
