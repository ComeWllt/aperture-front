<template>
  <v-container grid-list-xl text-md-center>
    <v-layout row wrap>
      <Loader v-if="isLoading"/>
      <v-flex v-for="album in albums" v-else :key="album.id" xs12 sm6 lg4>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 13 : 3}`" :style="{'cursor':'pointer'}" @click.native="goToAlbumPage(album)">
            <v-img :src="`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/AlbumCovers/${album.albumCover}`" :lazy-src="placeholder">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate/>
              </v-layout>
            </v-img>
            <v-card-title primary-title class="text-xs-left">
              <div>
                <div class="headline">{{ album.title }}</div>
                <span class="grey--text">{{ album.formattedDate }}</span>
              </div>
              <v-spacer/>
              <v-chip color="secondary" text-color="white">
                {{ album.photos.length }}
                <v-icon right>photo</v-icon>
              </v-chip>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import secrets from '@/assets/secrets.json';
import { GET_FORMATTED_ALBUMS } from '@/store/constants/getter-types';
import { IAlbum } from '@/interfaces/data';
import Loader from '@/components/Loader.vue';

@Component({ components: { Loader } })
export default class AlbumsView extends Vue {
  private cloudName: string = secrets.cloudinary.cloud_name;
  private placeholder = require('@/assets/placeholder.png');

  @namespace('DataModule').State('isLoadingAlbums')
  private isLoading!: boolean;
  @namespace('DataModule').Getter(GET_FORMATTED_ALBUMS)
  private albums!: IAlbum[];

  private goToAlbumPage(album: IAlbum) {
    this.$router.push(`/albums/${album.title}`);
  }
}
</script>

<style scoped>
</style>
