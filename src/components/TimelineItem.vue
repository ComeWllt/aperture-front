<template>
  <v-timeline-item color="secondary" large>
    <span slot="opposite">{{ date }}</span>
    <v-card class="elevation-2">
      <v-card-title class="headline">{{ version }}</v-card-title>
      <v-card-text>
        <ul>
          <li v-for="descriptionLine in description" :key="descriptionLine" style="list-style-position: outside">{{ descriptionLine }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class TimeLineItem extends Vue {
  @Prop({ type: String, required: true }) private date!: string;
  @Prop({ type: String, required: true }) private version!: string;
  @Prop({ type: Array, required: true }) private description!: string[];
}
</script>

<style scoped>
</style>
