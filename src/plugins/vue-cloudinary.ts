import Vue from 'vue';
import VueCloudinary from 'vue-cloudinary';
import secrets from '@/assets/secrets.json';

Vue.use(VueCloudinary, {
  cloud_name: secrets.cloudinary.cloud_name,
  api_key: secrets.cloudinary.api_key,
  api_secret: secrets.cloudinary.api_secret,
});
