<template>
  <v-card :key="index" color="transparent" @click.native="closeDialog()">
    <v-img :style="{'min-height': '200px'}" :contain="true" :src="src" max-width="100%" max-height="100%" min-height="300px">
      <v-layout slot="placeholder" align-center justify-center ma-0 fill-height>
        <v-progress-circular :size="80" :width="7" indeterminate color="accent"/>
      </v-layout>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import secrets from '@/assets/secrets.json';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Carousel extends Vue {
  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  private photos!: string[];
  @Prop({ type: String, default: '' }) private albumTitle!: string;
  @Prop({ type: Function, required: true }) private closeDialog!: () => void;
  @Prop({ type: Number, required: true }) private index!: number;

  private cloudName: string = secrets.cloudinary.cloud_name;

  get src(): string {
    return `https://res.cloudinary.com/${
      this.cloudName
    }/image/upload/f_auto,q_auto/v1/${this.albumTitle}/${
      this.photos[this.index]
    }`;
  }
}
</script>

<style scoped>
</style>
