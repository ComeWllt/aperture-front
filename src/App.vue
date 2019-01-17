<template>
  <v-app>
    <TheNavBar class="d-inline-block elevation-12"/>
    <v-content>
      <keep-alive :include="['HomeView', 'PatchNotesView']">
        <router-view/>
      </keep-alive>
    </v-content>
    <TheFooter/>
    <ErrorSnackBar/>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { FETCH_DATA } from '@/store/constants/action-types.ts';
import TheNavBar from '@/components/TheNavBar.vue';
import TheFooter from '@/components/TheFooter.vue';
import ErrorSnackBar from '@/components/ErrorSnackBar.vue';

@Component({
  components: {
    TheNavBar,
    TheFooter,
    ErrorSnackBar,
  },
})
export default class App extends Vue {
  @namespace('LoginModule').State('isLoggedIn')
  private isLoggedIn!: boolean;

  @namespace('DataModule').Action(FETCH_DATA)
  private fetchData!: () => Promise<void>;

  private created() {
    if (this.isLoggedIn) {
      this.fetchData().catch(error => console.error(error));
    }
  }
}
</script>

<style>
#app {
  font-family: Roboto, Helvetica Neue, sans-serif;
  background-color: #f5f6f8;
}
</style>
