import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import secrets from '@/assets/secrets.json';

Vue.use(VueGoogleMaps, {
  load: {
    key: secrets.googleMapsApiKey,
    libraries: 'places',
  },
});
