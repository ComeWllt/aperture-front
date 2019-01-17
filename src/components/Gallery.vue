<template>
  <div>
    <div class="text-xs-center">
      <v-dialog v-model="dialog" :lazy="true" :scrollable="true" :light="true">
        <Carousel :index="index" :close-dialog="closeDialog" :photos="photos" :album-title="albumTitle"/>
        <v-btn v-if="index>0" :style="{'bottom': '50%', 'left': '50px'}" class="hidden-xs-only" color="accent" dark fab fixed @click="index -= 1">
          <v-icon :style="{'height': 'auto'}">chevron_left</v-icon>
        </v-btn>
        <v-btn v-if="index<photos.length-1" :style="{'bottom': '50%', 'right': '50px'}" class="hidden-xs-only" color="accent" dark fab fixed @click="index += 1">
          <v-icon :style="{'height': 'auto'}">chevron_right</v-icon>
        </v-btn>
      </v-dialog>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="500">
      <v-layout row wrap>
        <v-container v-masonry :origin-top="false" :origin-left="false" class="masonry-container" transition-duration="0.3s" item-selector=".item">
          <v-flex v-masonry-tile v-for="i in numberOfPhotosToDisplay" :key="i" xs12 sm6 md4 lg3>
            <v-hover>
              <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 24 : 2}`" :style="{'cursor':'pointer'}" height="90%" @click.native="selectPhoto(i)">
                <img :src="`https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/v1/${albumTitle}%20-%20min/${photos[i-1]}`" width="100%" height="100%" class="item">
              </v-card>
            </v-hover>
          </v-flex>
        </v-container>
        <v-container v-if="busy" class="pa-5 ma-5">
          <v-progress-circular :size="50" :width="5" indeterminate color="accent"/>
        </v-container>
        <v-container v-if="photos.length > 0 && photos.length === numberOfPhotosToDisplay" class="pb-0 mb-0">This is the bottom
          <v-icon small>arrow_downward</v-icon>
        </v-container>
      </v-layout>
    </div>
  </div>
</template>

<script lang="ts">
import secrets from '@/assets/secrets.json';
import { Vue, Component, Prop } from 'vue-property-decorator';
import Carousel from '@/components/Carousel.vue';

@Component({ components: { Carousel } })
export default class Gallery extends Vue {
  @Prop({
    type: Array,
    default() {
      return [];
    },
  })
  private photos!: string[];
  @Prop({ type: String, default: '' }) private albumTitle!: string;

  private cloudName: string = secrets.cloudinary.cloud_name;
  private placeholder = require('@/assets/placeholder.png');
  private busy: boolean = false;
  private number: number = 20;
  private dialog: boolean = false;
  private index: number = 0;

  get numberOfPhotosToDisplay(): number {
    if (this.photos.length === 0) {
      return 0;
    }
    if (this.photos.length < 20) {
      return this.photos.length;
    }
    return this.number;
  }

  private selectPhoto(i: number): void {
    this.dialog = true;
    this.index = i - 1;
  }
  private loadMore(): void {
    if (this.numberOfPhotosToDisplay < this.photos.length) {
      this.busy = true;
      const diff = this.photos.length - this.numberOfPhotosToDisplay;
      this.number += diff < 10 ? diff : 10;
      setTimeout(() => {
        this.busy = false;
      }, 1000);
    }
  }
  private closeDialog(): void {
    this.dialog = false;
  }
}
</script>

<style scoped>
.masonry-container {
  padding: 0px !important;
  line-height: 0;
}
</style>

<style >
.v-dialog {
  box-shadow: none !important;
}

.v-overlay--active:before {
  opacity: 0.9 !important;
}

.v-overlay:before {
  background-color: #fffafa !important;
}
</style>
