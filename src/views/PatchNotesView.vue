<template>
  <v-container fluid grid-list-lg fill-height>
    <v-layout align-center justify-center column fill-height>
      <v-timeline>
        <TimeLineItem v-for="parsedNote in parsedNotes" :key="parsedNote.version" :version="parsedNote.version" :description="parsedNote.description" :date="parsedNote.date"/>
      </v-timeline>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TimeLineItem from '@/components/TimelineItem.vue';
import { IParsedPatchNote, IPatchNote } from '@/interfaces/patchNotes';
import patchNoteFile from '@/assets/patchNotes.json';

@Component({
  components: {
    TimeLineItem,
  },
})
export default class PatchNotesView extends Vue {
  private parsedNotes: IParsedPatchNote[] = [];

  private created() {
    const patchNotes: IPatchNote = patchNoteFile;
    const parsedNotes: IParsedPatchNote[] = [];

    Object.keys(patchNotes).forEach(version => {
      const noteObject = patchNotes[version];
      parsedNotes.push({
        version,
        date: noteObject.date,
        description: noteObject.description,
      });
    });

    this.parsedNotes = parsedNotes;
  }
}
</script>

<style scoped>
</style>
