<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md4 offset-md4>
          <v-card 
            elevation="4" 
            light tag="section" 
            style="margin: 15vh auto !important; border: none !important; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;"
          >

            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  {{ platformName }}
                </h3>
                <v-flex>
                  <v-img style="margin: 20px;" :alt="platformName" width="150" class="mx-auto" contain position="center right" src="/binuslogo.png"></v-img>
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <p>Sign in with your email and password:</p>
              <v-form>
                <v-text-field
                  outline
                  label="Email"
                  type="text"
                  v-model="email">
                </v-text-field>

                <v-text-field
                  outline
                  hide-details
                  label="Password"
                  :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'" 
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  v-model="password"
                 >
                </v-text-field>
              </v-form>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <!-- <v-btn color="info" flat>
                Forgot password?
              </v-btn> -->

              <v-spacer></v-spacer>
              
              <v-btn small color="info" @click="login()">
                <v-icon left>mdi-lock</v-icon>
                Login
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        
        <v-flex sm12 md6 offset-md3>
          <v-layout align-center justify-space-between>
            <p class="caption my-3">
              <a href="#">Privacy Policy</a>
              |
              <a href="#">Terms of Service</a>
            </p>
            <p class="caption my-3">Powered by <a href="#">Binus University</a></p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Login',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
  },
  data: () => ({
    listUser:[],
    email:'',
    password:'',
    value:true,
  }),
  methods: {
      ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async login(){
      let formData = new FormData()

      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$axios
        .post('/user/v1/user/signin', formData)
        .then((response) => {
          // console.log('result', response.data)
          let { data } = response.data
          this.setAuth(data[0])
          this.$cookies.set('user', JSON.stringify(data[0]))
          this.setAlert({
            status: true,
            color: 'success',
            text: 'Selamat Datang ' + data[0].nama,
          })
          this.$router.push('/')
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    }
  },
  created(){
    // this.getUser()
  },
}
</script>
