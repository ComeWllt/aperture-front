<template>
  <v-container grid-list-xl text-md-center>
    <Loader v-if="isLoading"/>
    <Gallery v-else :photos="portfolio.photos" :album-title="portfolio.title"/>
    <BackButton/>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import BackButton from '@/components/BackButton.vue';
import Gallery from '@/components/Gallery.vue';
import Loader from '@/components/Loader.vue';
import { GET_PORTFOLIO } from '@/store/constants/getter-types';
import { IPortfolio } from '@/interfaces/data';

@Component({ components: { BackButton, Gallery, Loader } })
export default class PortfolioView extends Vue {
  @namespace('DataModule').State('isLoadingPortfolio')
  private isLoading!: boolean;
  @namespace('DataModule').Getter(GET_PORTFOLIO)
  private portfolio!: IPortfolio[];
}
</script>

<style scoped>
</style>
