<template>
  <v-card class="elevation-2">
    <v-card-title primary-title class="text-sm-left">
      <div class="headline">{{ title }}</div>
      <v-spacer/>
      <span class="grey--text">{{ date }}</span>
    </v-card-title>
    <v-divider/>
    <v-card-text :key="index" v-for="(line, index) in description.split('\n')" class="text-xs-left">{{ line }}</v-card-text>
    <EditAlbumDescription/>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import EditAlbumDescription from '@/components/EditAlbumDescription.vue';

@Component({ components: { EditAlbumDescription } })
export default class AlbumDetails extends Vue {
  @Prop({ type: String, required: true }) private title!: string;
  @Prop({ type: String, required: true }) private date!: string;
  @Prop({ type: String, required: true }) private description!: string;
}
</script>

<style scoped>
</style>
