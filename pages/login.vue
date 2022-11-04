<template>
  <div>
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card 
            elevation="4" 
            light tag="section" 
            style="margin: 23vh auto !important; border: none !important; box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;"
          >

            <v-card-title>
              <v-layout align-center justify-space-between>
                <h3 class="headline">
                  {{ platformName }}
                </h3>
                <v-flex>
                  <v-img style="border:1px solid red" :alt="platformName" width="200" class="ml-3" contain position="center right" src="/logo.svg"></v-img>
                </v-flex>
              </v-layout>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form>
                <v-text-field
                  outline
                  label="Username"
                  type="text"
                  v-model="username">
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
              <v-btn color="info" flat>
                Forgot password?
              </v-btn>

              <v-spacer></v-spacer>
              
              <v-btn color="info" :large="$vuetify.breakpoint.smAndUp">
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
            <p class="caption my-3">Powered by <a href="#">StaffCircle</a></p>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
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
  },
  created(){
    // this.getUser()
  },
}
</script>
