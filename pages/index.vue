<template>
  <div>
    <app-bar/>
    <div class="ma-6">
        <div>
            <h2>DASHBOARD</h2>
        </div>
        <div class="mt-6">
            <v-row>
                <v-col cols="12" md="4" sm="4">
                    <v-card flat class="rounded-lg">
                        <v-date-picker
                            no-title
                            ref="picker"
                            v-model="pickDate"
                            full-width
                            :events="arrayDate"
                            @click:date="getFile()"
                            show-week
                            event-color="red lighten-1"
                            show-adjacent-months
                        ></v-date-picker>
                    </v-card>
                    <v-card class="mt-3 pa-2">
                        <h3 class="title">File Upload</h3>
                        <v-text-field
                            label="Nama"
                            outlined
                            v-model="namaFile"
                            hide-details=""
                            dense
                        ></v-text-field>
                        <v-file-input
                            class="mt-2"
                            label="File input"
                            v-model="file"
                            outlined
                            hide-details=""
                            dense
                        ></v-file-input>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn @click="tambahFile()" :disabled="namaFile == '' || file == null ? true : false" class="white--text" color="#1976D2" small>
                                Upload
                                <v-icon class="ml-2" small>mdi-share</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" md="8" sm="8">
                    <!-- <v-row>
                        <v-col v-for="item in summary" :key="item.name" cols="12" md="6" sm="6">
                            <v-card class="rounded-lg">
                            <div class="d-flex  justify-space-between">
                                <div>
                                <v-card-title
                                    ><b>{{ item.angka }}</b></v-card-title
                                >

                                <v-card-subtitle>{{ item.name }}</v-card-subtitle>
                                </div>

                                <v-avatar class="ma-3" size="50" :color="item.bg_color">
                                <v-icon :color="item.color" x-large>{{ item.icon }}</v-icon>
                                </v-avatar>
                            </div>
                            </v-card>
                        </v-col>
                    </v-row> -->
                    <v-card class="mt-3 pa-3">
                      <center>
                        <h3>File Putusan</h3>
                      </center>
                        <div class="mt-2 d-flex">
                            <v-text-field
                                label="Pencarian"
                                solo
                                @keyup="getFile()"
                                append-icon="mdi-magnify"
                                hide-details
                                v-model="search"
                            >

                            </v-text-field>
                            <v-menu offset-y>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  class="ml-3"
                                  v-if="pickDate != ''"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  {{ pickDate | dateFormat }}
                                  <v-icon class="ml-2">mdi-chevron-down</v-icon>
                                </v-btn>
                                <v-btn
                                  v-else
                                  class="ml-3"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  All Files
                                  <v-icon class="ml-2">mdi-chevron-down</v-icon>
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item
                                  @click="pickDate = '',getFile()"
                                >
                                  Semua
                                </v-list-item>
                              </v-list>
                            </v-menu>
                            <!-- <v-btn class="ml-3" v-if="pickDate != ''">{{ pickDate | dateFormat }}</v-btn>
                            <v-btn class="ml-3" v-else>All Files</v-btn> -->
                        </div>
                        <v-data-table
                            dense
                            :headers="headers"
                            :items="listFile"
                            item-key="name"
                            class="elevation-1 mt-2"
                        >
                            <template v-slot:[`item.putusan`]="{ }">
                                <v-icon color="green">mdi-check-circle-outline</v-icon>
                            </template>
                            <template v-slot:[`item.karakterisasi`]="{ item }">
                                <v-icon :color="item.karakterisasi == 'Y' ? 'green' : 'red'">{{item.karakterisasi == 'Y' ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
                            </template>
                            <template v-slot:[`item.created_at`]="{ item }">
                                {{ item.created_at | dateTimeFormat }}
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                              <div class="ma-1">
                                <v-btn @click="direktoriFile = item.file,namaHapusFile = item.nama_file,idHapusFile = item.id_file,dialogHapus = true" color="red lighten-1" small>
                                    <v-icon small>mdi-delete</v-icon> Delete
                                </v-btn>
                                <v-btn color="#FCC35B" @click="goKarakterisasi(item.id_file)" small>
                                    <v-icon small>mdi-send</v-icon> Excecute
                                </v-btn>
                              </div>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
    <v-dialog v-model="dialogHapus" max-width="300px">
      <v-card>
        <div class="pa-3">
          <center>
            <h3>Anda yakin ingin hapus file?</h3>
            <h4>"{{namaHapusFile}}"</h4>
          </center>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="blue" outlined @click="direktoriFile = '',dialogHapus = false,namaHapusFile = '',idHapusFile = ''">Tidak</v-btn>
            <v-btn color="red" class="white--text" @click="deleteFile()">Ya</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from 'vuex'
export default {
  name: 'awal',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue')
  },
  filters: {
    dateTimeFormat: (date) => {
      return moment(date).format("DD MMM YYYY HH:mm");
    },
    dateFormat: (date) => {
      return moment(date).format("DD MMM YYYY ");
    },
  },
  data: () => ({
    search:'',
    namaFile:'',
    file:null,
    pickDate:'',
    listFile:[],
    arrayDate:[],
    namaHapusFile:'',
    idHapusFile:'',
    direktoriFile:'',
    dialogHapus:false,
    headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'nama_file',
        },
        { text: 'Putusan', value: 'putusan' },
        { text: 'Tanggal', value: 'created_at' },
        { text: 'Action', value: 'action' },
      ],
    summary: [
        {
          icon: "mdi-account-multiple",
          name: "Putusan",
          id: "putusan",
          color: "#3377FF",
          bg_color: "rgba(51, 119, 255, 0.1)",
          angka: "5"
        },
        {
          icon: "mdi-account-multiple",
          name: "Karakterisasi",
          id: "karakterisasi",
          color: "#FCC35B",
          bg_color: "rgba(252, 195, 91, 0.1)",
          angka: "5"
        },
      ],
  }),
  methods: {
      ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async getFile(){
      var params = new URLSearchParams();
      
      if (this.pickDate != '') {
        params.append("created_at", this.pickDate);        
      }
      if (this.search != '') {
        params.append("search", this.search);        
      }

      var request = {
          params: params
      };
      await this.$axios
        .get('/user/v1/file/getfile',request)
        .then((response) => {
          let { data } = response.data
          this.listFile = data
          for (let i = 0; i < this.listFile.length; i++) {
            this.arrayDate.push(this.listFile[i].created_at.substring(0, 10))
          }
          // console.log('list file', this.listFile)
          // console.log('list tgl', this.arrayDate)
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async tambahFile(){
      let formData = new FormData()

      formData.append('nama_file', this.namaFile)
      formData.append('file', this.file)

      await this.$axios
        .post('/user/v1/file/create', formData)
        .then((response) => {
          // console.log('tambah file', response)
          this.getFile()
          this.namaFile = ''
          this.file = null
          this.setAlert({
            status: true,
            color: 'success',
            text: 'File berhasil ditambah',
          })
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async deleteFile(){
      var params = new URLSearchParams();

      params.append('file', this.direktoriFile)
      params.append('id_file', this.idHapusFile)

      var request = {
          params: params
      };
      await this.$axios
        .delete('/user/v1/file/delete',request)
        .then((response) => {
          console.log('respon', response.data)
          this.dialogHapus = false
          this.namaHapusFile = ''
          this.idHapusFile = ''
          this.direktoriFile = ''
          this.setAlert({
            status: true,
            color: 'success',
            text: 'File dihapus',
          })
          this.getFile()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async goKarakterisasi(id){
      this.$router.push('/karakterisasi?id='+id)
    }
  },
  async created(){
    await this.getFile()
    // this.arrayDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    // console.log('date arr', this.arrayDate)
  },
}
</script>