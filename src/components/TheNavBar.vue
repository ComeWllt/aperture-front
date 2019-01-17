<template>
  <v-toolbar color="primary" dark>
    <v-toolbar-title>
      <span :style="{'cursor':'pointer'}" @click="onRouteClick('')">Aperture</span>
      &nbsp;
      <span class="caption">{{ version }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items v-if="isLoggedIn">
      <v-btn flat @click="onRouteClick('example')">Example</v-btn>
    </v-toolbar-items>
    <v-btn v-if="isLoggedIn" icon @click="onRouteClick('patch-notes')">
      <v-icon>build</v-icon>
    </v-btn>
    <v-btn v-if="isLoggedIn" icon @click="logout">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import pkg from '../../package.json';
import { namespace } from 'vuex-class';
import { SIGN_OUT } from '@/store/constants/mutation-types';

@Component
export default class TheNavBar extends Vue {
  @namespace('LoginModule').State('isLoggedIn')
  private isLoggedIn!: boolean;
  @namespace('LoginModule').Mutation(SIGN_OUT)
  private logout!: () => void;

  private onRouteClick(route: string): void {
    this.$router.push(`/${route}`);
  }
  get version(): string {
    return pkg.version;
  }
}
</script>

<style scoped>
</style>
