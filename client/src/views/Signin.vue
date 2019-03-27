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
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">แจ้งเตือน</v-card-title>
        <v-card-text>ไม่พบ Account ของท่านในระบบ, ท่านต้องการลงทะเบียนเข้าใช้ระบบหรือไม่?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog = false;signOut();">ไม่ต้องการ</v-btn>
          <v-btn color="primary" @click="dialog = false" :to="{ path: '/register' }">ต้องการ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
import api from '@/services'
import GoogleSigninButton from '@/components/GoogleSigninButton'
export default {
  name: 'SigninTeacher',
  components: { GoogleSigninButton },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    async onSigned (googleUser) {
      try {
        const profile = googleUser.getBasicProfile()
        const user = {
        id_token: googleUser.getAuthResponse().id_token,
        avatar: profile.getImageUrl(),
        fullname: profile.getName(),
        email: profile.getEmail(),
        userId: null,
        role: null,
        deptId: null,
        stdId: null,
        token: null
      }
      this.$store.dispatch('signin', user)
      const response = await api.signin(user.id_token)
      // axios.defaults.headers.common['Authorization'] = this.$store.getters.user.access_token
      // this.$router.push('Subject')
      } catch (error) {
        if (error.response.status == 401) {
          this.dialog = true
        }
      }
    },
    signOut () {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(x => {
        this.$store.dispatch('signout')
        this.$router.push('/')
        console.log('Signout')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>