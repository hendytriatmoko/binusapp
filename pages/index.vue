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
                            full-width
                            show-week
                            event-color="green lighten-1"
                            show-adjacent-months
                        ></v-date-picker>
                    </v-card>
                    <v-card class="mt-3 pa-2">
                        <h3 class="title">File Resource</h3>
                        <v-file-input
                            label="File input"
                            outlined
                            hide-details=""
                            dense
                        ></v-file-input>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn small>
                                Upload
                                <v-icon class="ml-2" small>mdi-share</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" md="8" sm="8">
                    <v-row>
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
                    </v-row>
                    <v-card class="mt-3 pa-3">
                        <div class="d-flex">
                            <v-text-field
                                label="Pencarian"
                                solo
                                append-icon="mdi-magnify"
                                hide-details
                                v-model="search"
                            >

                            </v-text-field>
                            <v-btn class="ml-3">26 Oktober 2022</v-btn>
                        </div>
                        <v-data-table
                            dense
                            :headers="headers"
                            :search="search"
                            :items="tableFile"
                            item-key="name"
                            class="elevation-1 mt-2"
                        >
                            <template v-slot:[`item.putusan`]="{ item }">
                                <v-icon :color="item.putusan == 'Y' ? 'green' : 'red'">{{item.putusan == 'Y' ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
                            </template>
                            <template v-slot:[`item.karakterisasi`]="{ item }">
                                <v-icon :color="item.karakterisasi == 'Y' ? 'green' : 'red'">{{item.karakterisasi == 'Y' ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline' }}</v-icon>
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <v-btn color="#1C94C7" width="100px" class="ma-2" x-small v-if="item.karakterisasi == 'Y'">
                                    Download
                                    <v-icon class="ml-2" small>mdi-download</v-icon>
                                </v-btn>
                                <v-btn color="#FCC35B" width="100px" v-else class="ma-2" x-small>
                                    Execute
                                    <v-icon class="ml-2" small>mdi-send</v-icon>
                                </v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue'
export default {
  name: 'awal',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue')
  },
  data: () => ({
    search:'',
    tableFile: [
        {
          nama: 'Putusan 803',
          putusan: 'Y',
          karakterisasi: 'Y',
        },
        {
          nama: 'Putusan 57',
          putusan: 'Y',
          karakterisasi: 'N',
        },
        {
          nama: 'Putusan 59',
          putusan: 'Y',
          karakterisasi: 'Y',
        },
        {
          nama: 'Putusan 463',
          putusan: 'Y',
          karakterisasi: 'N',
        },
        {
          nama: 'Putusan 818',
          putusan: 'Y',
          karakterisasi: 'Y',
        },
        {
          nama: 'Putusan 832',
          putusan: 'Y',
          karakterisasi: 'N',
        },
    ],
    headers: [
        {
          text: 'Nama',
          align: 'start',
          sortable: false,
          value: 'nama',
        },
        { text: 'Putusan', value: 'putusan' },
        { text: 'Karakterisasi', value: 'karakterisasi' },
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
  },
  created(){
    // this.getUser()
  },
}
</script>