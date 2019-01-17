<template>
  <v-card class="elevation-3">
    <v-card-text>
      <gmap-map :center="location" :zoom="9" :options="{disableDefaultUI: true}" style="width:100%;  height: 350px;">
        <gmap-marker v-if="location.city" :position="location"/>
      </gmap-map>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AlbumMap extends Vue {
  @Prop({
    type: Object,
    default() {
      return { lat: 48.855542, lng: 2.345661 };
    },
  })
  private location!: { lat: number; lng: number };
}
</script>

<style scoped>
</style>
