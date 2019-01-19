<template>
  <v-dialog v-model="dialog" width="650">
    <v-btn v-if="isAdmin" :disabled="isLoadingAlbum" slot="activator" color="primary" small dark fab absolute bottom right>
      <v-icon :style="{'height': 'auto'}">edit</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline primary white--text" dark primary-title>{{title}}</v-card-title>
      <v-card-text>
        <v-form v-model="form">
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-textarea :rows="6" :loading="isLoadingSumbission" auto-grow v-model="description" :rules="[requiredRule]" name="input-7-1" label="Description"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" flat @click="dialog = false">Cancel</v-btn>
        <v-btn :disabled="!form" :loading="isLoadingSumbission" color="primary" flat depressed @click="submit()">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getModule } from 'vuex-module-decorators';
import axios from 'axios';
import { namespace } from 'vuex-class';
import { GET_ALBUM_BY_TITLE } from '@/store/constants/getter-types';
import { IFormattedAlbum } from '@/interfaces/data';
import { SUBMIT_ALBUM_DESCRIPTION } from '@/store/constants/action-types';
import AdminModule from '@/store/modules/AdminModule';
import ApiCallsHelper from '@/store/helpers/ApiCallsHelper';

@Component
export default class EditAlbumDescription extends Vue {
  @namespace('LoginModule').State('isAdmin')
  private isAdmin!: boolean;
  @namespace('DataModule').State('isLoadingAlbums')
  private isLoadingAlbum!: boolean;
  @namespace('DataModule').Getter(GET_ALBUM_BY_TITLE)
  private getAlbumByTitle!: (title: string) => IFormattedAlbum;

  private dialog: boolean = false;
  private isLoadingSumbission: boolean = false;
  private newDescription: string = '';
  private form: boolean = false;
  private requiredRule = (v: string) => !!v || 'This field is required';

  get title(): string {
    return this.$route.params.albumid;
  }
  get album(): IFormattedAlbum {
    return this.getAlbumByTitle(this.title);
  }
  get description(): string {
    return this.album.description;
  }
  set description(text: string) {
    this.newDescription = text;
  }

  private async submit() {
    this.isLoadingSumbission = true;
    const adminModule = getModule(AdminModule);
    const newDescription =
      this.newDescription === '' ? this.description : this.newDescription;

    try {
      await adminModule[SUBMIT_ALBUM_DESCRIPTION]({
        albumId: this.album._id,
        newDescription,
      });
      this.isLoadingSumbission = false;
      this.dialog = false;
    } catch (error) {
      this.isLoadingSumbission = false;
    }
  }
}
</script>

<style>
.v-textarea--auto-grow textarea {
  overflow: scroll !important;
}
</style>
