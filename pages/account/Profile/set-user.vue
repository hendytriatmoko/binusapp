<template>
  <div class="mt-2">
    <v-card class="pa-3">
      <center><h2>Data User</h2></center>
      <br />
      <div class="mt-2 d-flex">
        <v-text-field
          label="Pencarian"
          solo
          append-icon="mdi-magnify"
          hide-details
          dense
          v-model="search"
        >
        </v-text-field>
        <v-btn
          v-if="dataUser.role == 'Super Admin'"
          color="#0A2A62"
          @click="dialogTambahUser = true"
          class="ml-2 white--text"
        >
          <v-icon class="mr-1">mdi-plus</v-icon>
          Tambah User
        </v-btn>
      </div>
      <v-data-table
        dense
        :headers="headers"
        :items="listUser"
        :search="search"
        item-key="name"
        class="elevation-1 mt-2"
      >
        <template v-slot:[`item.action`]="{ item }">
          <div class="ma-1">
            <v-btn
              @click="(dialogHapus = true), (pickUser = item)"
              color="red lighten-1"
              small
            >
              <v-icon class="mr-1" small>mdi-delete</v-icon> Delete
            </v-btn>
            <v-btn
              @click="(dialogEdit = true), (pickUser = item)"
              color="#FCC35B"
              small
            >
              <v-icon class="mr-1" small>mdi-pencil</v-icon> Edit
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialogTambahUser" width="500px">
      <v-card>
        <v-toolbar flat dense>
          <v-toolbar-title dark><b>Tambah User </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogTambahUser = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="px-4">
          <div class="teal--text">Nama Akun</div>
          <v-text-field
            outlined
            v-model="formNama"
            hide-details
            dense
          ></v-text-field>
          <div class="teal--text mt-3">Email</div>
          <v-text-field
            outlined
            v-model="formEmail"
            hide-details
            dense
          ></v-text-field>
          <div class="teal--text mt-3">Nomor Telepon</div>
          <v-text-field
            outlined
            hide-details
            v-model="formNo"
            dense
          ></v-text-field>
          <div class="teal--text mt-3">Role</div>
          <v-autocomplete
            v-model="pickRole"
            :items="listRole"
            item-text="nama"
            hide-details
            item-value="nama"
            dense
            outlined
          ></v-autocomplete>
          <div class="teal--text mt-3">Password</div>
          <v-text-field
            outlined
            hide-details
            v-model="formPassword"
            dense
            :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          ></v-text-field>
        </div>
        <v-card-actions class="mt-2">
          <v-spacer />
          <v-btn
            :disabled="
              formNama == '' ||
              formEmail == '' ||
              formNo == '' ||
              formPassword == ''
                ? true
                : false
            "
            color="#0A2A62"
            class="white--text"
            @click="createUser()"
          >
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogHapus" max-width="300px">
      <v-card>
        <div class="pa-3">
          <center>
            <h3>Anda yakin ingin hapus user?</h3>
            <h4>"{{ pickUser.nama }}"</h4>
          </center>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue"
              outlined
              @click="(pickUser = []), (dialogHapus = false)"
              >Tidak</v-btn
            >
            <v-btn color="red" class="white--text" @click="deleteUser()"
              >Ya</v-btn
            >
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" width="500px">
      <v-card>
        <v-toolbar flat dense>
          <v-toolbar-title dark><b>Edit User </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogEdit = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="px-4">
          <div class="teal--text">Nama Akun</div>
          <v-text-field
            outlined
            v-model="pickUser.nama"
            hide-details
            dense
          ></v-text-field>
          <div class="teal--text mt-3">Email</div>
          <v-text-field
            outlined
            v-model="pickUser.email"
            hide-details
            dense
          ></v-text-field>
          <div class="teal--text mt-3">Role</div>
          <v-autocomplete
            v-model="pickUser.role"
            :items="listRole"
            item-text="nama"
            :disabled="dataUser.role != 'Super Admin' ? true : false"
            hide-details
            item-value="nama"
            dense
            outlined
          ></v-autocomplete>
          <div class="teal--text mt-3">Nomor Telepon</div>
          <v-text-field
            outlined
            hide-details
            v-model="pickUser.no_telp"
            dense
          ></v-text-field>
          <div>
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
              append-outer-icon="mdi-close"
              @click:append-outer="(ubahPassword = false), (formPassword = '')"
              v-else
            ></v-text-field>
          </div>
        </div>
        <v-card-actions class="mt-2">
          <v-spacer />
          <v-btn
            :disabled="
              pickUser.nama == '' ||
              pickUser.email == '' ||
              pickUser.no_telp == ''
                ? true
                : false
            "
            color="#0A2A62"
            class="white--text"
            @click="updateUser()"
          >
            Simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Set-user",
  components: {},
  data: () => ({
    listUser: [],
    ubahPassword: false,
    formPassword: "",
    dataUser: "",
    dialogHapus: false,
    dialogEdit: false,
    formNama: "",
    formNo: "",
    formEmail: "",
    search: "",
    pickUser: [],
    formPassword: "",
    value: true,
    dialogTambahUser: false,
    pickRole: "",
    listRole: [
      { id: 1, nama: "Super Admin" },
      { id: 2, nama: "Admin" },
      { id: 3, nama: "Super User" },
      { id: 4, nama: "User" },
    ],
    headers: [
      {
        text: "Nama",
        align: "start",
        sortable: false,
        value: "nama",
      },
      { text: "Email", value: "email" },
      { text: "No Telepon", value: "no_telp" },
      { text: "Role", value: "role" },
      { text: "Action", value: "action" },
    ],
  }),
  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setAuth: "auth/set",
    }),
    async getUser() {
      var params = new URLSearchParams();

      var request = {
        params: params,
      };
      await this.$axios
        .get("/user/v1/user/getuser", request)
        .then((response) => {
          let { data } = response.data;
          this.listUser = data;
          console.log("user", this.listUser);
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
    async updateUser() {
      let formData = new FormData();

      formData.set("id_user", this.pickUser.id_user);
      formData.set("nama", this.pickUser.nama);
      formData.set("no_telp", this.pickUser.no_telp);
      formData.set("role", this.pickUser.role);
      formData.set("email", this.pickUser.email.toLowerCase());
      if (this.formPassword != "" && this.ubahPassword != false) {
        formData.set("password", this.formPassword);
      }

      await this.$axios
        .put("/user/v1/user/update", formData)
        .then((response) => {
          this.dialogEdit = false;
          this.setAlert({
            status: true,
            color: "success",
            text: "berhasil diubah",
          });
          this.pickUser = [];
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
    async deleteUser() {
      var params = new URLSearchParams();

      params.append("id_user", this.pickUser.id_user);

      var request = {
        params: params,
      };
      await this.$axios
        .delete("/user/v1/user/delete", request)
        .then((response) => {
          console.log("respon", response.data);
          this.pickUser = [];
          this.dialogHapus = false;
          this.setAlert({
            status: true,
            color: "success",
            text: "User berhasil dihapus",
          });
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
    async createUser() {
      let formData = new FormData();

      formData.set("nama", this.formNama);
      formData.set("no_telp", this.formNo);
      formData.set("email", this.formEmail.toLowerCase());
      formData.set("password", this.formPassword);
      formData.set("role", this.pickRole);

      await this.$axios
        .post("/user/v1/user/create", formData)
        .then((response) => {
          this.formNama = "";
          this.formNo = "";
          this.formEmail = "";
          this.formPassword = "";
          this.pickRole = "";
          this.dialogTambahUser = false;
          this.setAlert({
            status: true,
            color: "success",
            text: "User berhasil dibuat",
          });
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
    this.dataUser = this.$cookies.get("user");
    console.log("ini user woy", this.dataUser);
    this.getUser();
  },
};
</script>

<style></style>
