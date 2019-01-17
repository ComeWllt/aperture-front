<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card :style="{ 'bottom': '35px' }" class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login form</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field :error="error" v-model="username" :rules="[requiredRule]" prepend-icon="person" name="login" label="Login" type="text" required @keyup.enter="login"/>
              <v-text-field :error="error" v-model="password" :rules="[requiredRule]" prepend-icon="lock" name="password" label="Password" type="password" required @keyup.enter="login"/>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="primary" @click.native="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SUBMIT_AUTHENTICATION } from '@/store/constants/action-types';
import { ILoginPayload } from '@/interfaces/loginConfig';

@Component
export default class LoginView extends Vue {
  public $refs!: {
    form: HTMLFormElement;
  };

  @namespace('LoginModule').State('failedToAuthenticate')
  private error!: boolean;
  @namespace('LoginModule').Action(SUBMIT_AUTHENTICATION)
  private signIn!: (payload: ILoginPayload) => Promise<void>;

  private valid: boolean = true;
  private username: string = '';
  private password: string = '';
  private requiredRule = (v: string) => !!v || 'This field is required';
  private login() {
    if (this.$refs.form.validate()) {
      this.signIn({
        username: this.username,
        password: this.password,
      }).catch(error => console.error(error));
    }
  }
}
</script>

<style scoped>
</style>
