<template>
  <v-container grid-list-xl text-md-center>
    <v-layout align-center row wrap>
      <v-flex xs12 sm6>
        <AlbumDetails :title="album.title" :date="album.formattedDate" :description="album.description"/>
      </v-flex>
      <v-flex xs12 sm6>
        <AlbumMap :location="album.location"/>
      </v-flex>
    </v-layout>
    <Loader v-if="isLoading"/>
    <Gallery :photos="album.photos" :album-title="album.title"/>
    <BackButton/>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { GET_ALBUM_BY_TITLE } from '@/store/constants/getter-types';
import BackButton from '@/components/BackButton.vue';
import AlbumDetails from '@/components/AlbumDetails.vue';
import AlbumMap from '@/components/AlbumMap.vue';
import Gallery from '@/components/Gallery.vue';
import Loader from '@/components/Loader.vue';
import { IFormattedAlbum } from '@/interfaces/data';

@Component({
  components: {
    BackButton,
    AlbumDetails,
    AlbumMap,
    Gallery,
    Loader,
  },
})
export default class SingleAlbumView extends Vue {
  @namespace('DataModule').State('isLoadingAlbums')
  private isLoading!: boolean;
  @namespace('DataModule').Getter(GET_ALBUM_BY_TITLE)
  private getAlbumByTitle!: (title: string) => IFormattedAlbum;

  get album(): IFormattedAlbum {
    const title = this.$route.params.albumid;
    return this.getAlbumByTitle(title);
  }
}
</script>

<style scoped>
</style>
