<template>
  <v-container grid-list-md fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar color="deep-purple" dark>
            <v-toolbar-title>ลงชื่อเข้าใช้</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              <p class="display-3 font-weight-black">NCX-RTANC</p>
              <google-signin-button @sign="onSigned" client_id="86808832530-8iq9hla0o0qhq7225ltn8rvog1ei9plo.apps.googleusercontent.com"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import GoogleSigninButton from '@/components/GoogleSigninButton'
export default {
  name: 'SigninTeacher',
  components: { GoogleSigninButton },
  methods: {
    onSigned (googleUser) {
      const profile = googleUser.getBasicProfile()
      const user = {
        id_token: googleUser.getAuthResponse().id_token,
        access_token: googleUser.getAuthResponse().access_token,
        avatar: profile.getImageUrl(),
        fullname: profile.getName(),
        email: profile.getEmail()
      }
      console.log(user)
      this.$store.dispatch('signin', user)
      axios.defaults.headers.common['Authorization'] = this.$store.getters.user.access_token
      this.$router.push('Subject')
    }
  }
}
</script>