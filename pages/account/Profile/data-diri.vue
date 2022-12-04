<template>
  <div class="mt-2">
    <v-card class="pa-3">
      <center><h2>Data Diri</h2></center>
      <br />
      <v-card>
        <v-container>
          <div class="teal--text">Nama Akun</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahNama"
          >
            <div>{{ dataUser.nama }}</div>

            <v-btn
              text
              @click="(ubahNama = true), (formNama = dataUser.nama)"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>
          <v-text-field
            v-model="formNama"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahNama = false"
            @click:append="updateUser('nama', formNama)"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>
      <v-card class="mt-2">
        <v-container>
          <div class="teal--text">Email</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahEmail"
          >
            <div>{{ dataUser.email }}</div>

            <v-btn
              text
              @click="(ubahEmail = true), (formNama = dataUser.email)"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>
          <v-text-field
            v-model="formEmail"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahEmail = false"
            @click:append="updateUser('email', formEmail)"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>
      <v-card class="mt-2">
        <v-container>
          <div class="teal--text">Nomor Telepon</div>
          <div class="d-flex align-center justify-space-between" v-if="!ubahNo">
            <div>{{ dataUser.no_telp }}</div>

            <v-btn
              text
              @click="(ubahNo = true), (formNama = dataUser.no_telp)"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>
          <v-text-field
            v-model="formNo"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahNo = false"
            @click:append="updateUser('no_telp', formNo)"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>
      <v-card class="mt-2">
        <v-container>
          <div class="teal--text">Role</div>
          <div class="d-flex align-center justify-space-between">
            <div>{{ dataUser.role }}</div>
          </div>
        </v-container>
      </v-card>
      <v-card class="mt-2">
        <v-container>
          <div class="teal--text mt-3">Password</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahPassword"
          >
            <div>Ubah Password ?</div>

            <v-btn
              text
              @click="ubahPassword = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>
          <v-text-field
            v-model="formPassword"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahPassword = false, formPassword = ''"
            @click:append="updateUser('password', formPassword)"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Data-diri",
  components: {},
  data: () => ({
    ubahNama: false,
    formNama: "",

    ubahEmail: false,
    formEmail: "",

    ubahNo: false,
    formNo: "",

    ubahPassword:false,
    formPassword:"",

    dataUser: [],
    dataUserId: [],
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
    }),
    async getUser() {
      var params = new URLSearchParams();

      params.append("id_user", this.dataUserId.id_user);

      var request = {
        params: params,
      };
      await this.$axios
        .get("/user/v1/user/getuser", request)
        .then((response) => {
          let { data } = response.data;
          this.dataUser = data[0];
          console.log("user", this.dataUser);
          //   for (let i = 0; i < this.listFile.length; i++) {
          //     this.arrayDate.push(this.listFile[i].created_at.substring(0, 10))
          //   }
          // console.log('list file', this.listFile)
          // console.log('list tgl', this.arrayDate)
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
    async updateUser(param, value) {
      let formData = new FormData();

      formData.set(param, value);
      formData.set("id_user", this.dataUser.id_user);

      await this.$axios
        .put("/user/v1/user/update", formData)
        .then((response) => {
          // console.log('result', response.data)
          let { data } = response.data;
          this.dataUser = data[0];
          this.setAuth(data[0]);
          this.$cookies.set("user", JSON.stringify(data[0]));
          this.setAlert({
            status: true,
            color: "success",
            text: param + " berhasil diubah",
          });
          this.ubahNama = false;
          this.ubahEmail = false;
          this.ubahNo = false;
          this.ubahPassword = false;
          this.formPassword = ''
          //   this.$router.push('/')
          this.getUser();
        })
        .catch((error) => {
          let responses = error.response.data;
          this.setAlert({
            status: true,
            color: "error",
            text: responses.api_message,
          });
        });
    },
  },
  created() {
    // this.getUser()
    this.dataUserId = this.$cookies.get("user");
    this.getUser();
    // console.log('user', this.dataUserId)
  },
};
</script>

<style></style>
