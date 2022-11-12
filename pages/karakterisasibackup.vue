<template>
  <div>
    <app-bar/>
    <div class="ma-6">
        <div>
            <h2>KARAKTERISASI</h2>
        </div>
        <br>
        <div>
            <!-- <div class="d-flex">
                <v-file-input
                    show-size
                    outlined
                    v-model="file"
                    hide-details
                    dense
                    label="File input"
                ></v-file-input>
                <v-btn class="ml-3 white--text" color="#0A2A62" @click="readInput()">
                    READ
                    <v-icon>mdi-file-move-outline</v-icon>
                </v-btn>
            </div>
            <br> -->
            <div>
                <v-textarea
                clearable
                height="300px"
                dense
                hide-details
                v-model="textFile"
                background-color="amber lighten-4"
                color="orange orange-darken-4"
                outlined
                ></v-textarea>
            </div>
        </div>
    </div>
    <center>
        <v-btn @click="startMethod()" color="#0A2A62" class="white--text">Execute <v-icon class="ml-2">mdi-send-outline</v-icon></v-btn>
    </center>
    <div class="ma-6" v-if="done">
        <v-card class="mt-3">
            <v-row class="mx-1">
                <v-col cols="12" md="8" sm="8">
                    <v-card class="pa-2">
                        <center>
                            Karakterisasi Putusan Hakim <br>
                            {{ nomorPutusan }}
                        </center>

                        <b>Kaidah Yurisprudensi :</b>
                        <div v-if="yurisprudensi != null">
                            {{ 'Yurisprudensi ' + yurisprudensi }}
                        </div>
                        <br>
                        <b>Dakwaan</b>
                        <div v-if="primair != ''">
                            PRIMAIR : {{ primair }}
                        </div>
                        <div v-if="subsidair != ''">
                            SUBSIDAIR : {{ subsidair }}
                        </div>
                        <br>
                        <div>
                            {{ 'Majelis hakim kasasi memberikan pertimbangan hukum untuk terdakwa atas permohonan dari '+ dimohonkanOleh + ' pada sidang putusan.' }}
                            {{ 'Terdakwa bernama ' +  namaTerdakwa + ' dengan umur ' + umurTerdakwa +' yang berjenis kelamin ' + genderTerdakwa + ', yang bekerja sebagai ' + pekerjaanTerdakwa + ' diajukan didepan persidangan pengadilan tindak pidana korupsi.'}}
                        </div>
                        <br>
                        <div v-if="kerugianNegara != ''">
                            {{ 'Kerugian keuangan negara ' + kerugianNegara + 'rupiah'}}
                        </div>
                        <br>
                        <div>
                            {{ 'Terdakwa sebagai ' + pekerjaanTerdakwa + ' memiliki faktor pertimbangan hukum:' }}
                        </div>
                        <div v-if="faktorPemberat != '' || faktorPeringan != ''">
                            <table style="width:100%">
                            <tr>
                                <th v-if="faktorPemberat != ''">Faktor Pemberat</th>
                                <th v-if="faktorPeringan != ''">Faktor Peringan</th>
                            </tr>
                            <tr>
                                <td v-if="faktorPemberat != ''"><span >{{ faktorPemberat }}</span></td>
                                <td v-if="faktorPeringan != ''"><span >{{ faktorPeringan }}</span></td>
                            </tr>
                            </table>
                            <br>
                        </div>

                        <br>
                        <h3>Resume :</h3>
                        <div>nomor : {{nomorPutusan}}</div>
                        <div>tanggal : {{tanggalPutusan}}</div>
                        <div>nama : {{namaTerdakwa}}</div>
                        <div>usia : {{umurTerdakwa}}</div>
                        <div>gender : {{genderTerdakwa}}</div>
                        <div>pekerjaan : {{pekerjaanTerdakwa}}</div>
                        <div>pemohon Kasasi : {{pemohonKasasi != '' ? pemohonKasasi : '-'}}</div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" sm="4">
                    <v-row>
                        <v-col cols="12" md="6" sm="6">
                            <v-card class="pa-2">
                                <center>
                                    Putusan <br> <h3>{{ textFile.length }}</h3> karakter
                                </center>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                            <v-card class="pa-2">
                                <center>
                                    Karakterisasi <br> <h3>{{ count }}</h3> word
                                </center>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-card class="pa-2">
                                <center>
                                    <h3>Efektivitas</h3>
                                    <round-slider
                                    class="mx-2 mt-3"
                                    v-model="efektivitas"
                                    value="50"
                                    start-angle="315"
                                    end-angle="+270"
                                    line-cap="round"
                                    read-only="true"
                                    radius="40"
                                    :tooltip-format="tooltipVal2"
                                    width="10"
                                    rangeColor="#305F72"
                                    />
                                </center>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <!-- <v-card class="pa-2"> -->
                                <!-- <h3>Time Result : 0,8 Second</h3>
                                <div>
                                    milisecond: {{ milliseconds }} <br>
                                    second: {{ seconds }} <br>
                                    minutes: {{ minutes }} <br>
                                    hours: {{ hours }} <br>
                                </div> -->
                            <!-- </v-card> -->
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'karakterisasi',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue')
  },
  data: () => ({
    file:'',
    textFile:'',
    nomorPutusan:'',
    tanggalPutusan:'',
    namaTerdakwa:'',
    umurTerdakwa:'',
    genderTerdakwa:'',
    pekerjaanTerdakwa:'',
    pemohonKasasi:'',

    yurisprudensi:'',
    primair:'',
    subsidair:'',
    dimohonkanOleh:'',
    kerugianNegara:'',
    faktorPemberat:'',
    faktorPeringan:'',    
    count:0,

    efektivitas:0,
    milliseconds:0,
    seconds:0,
    minutes:0,
    hours:0,
    getStopwatch:'',
    stopwatch:false,
    done:false,

    dataFile:[]
  }),
  methods: {
    readInput(){
      const file = this.file
      const reader = new FileReader()
      reader.onload = e => this.textFile = e.target.result
      reader.readAsText(file)
    console.log('jalan', this.textFile)
    },
    tooltipVal2(args) {
      return args.value + "%";
    },

    // data
    getNoPutusan(){
        var text = this.cutTextLower('nomor','demi')
        this.nomorPutusan = text[0]
        this.count += this.nomorPutusan.length
        // console.log('nomor', this.nomorPutusan)
    },
    getTanggalPutusan(){
        var text = this.cutText('Demikianlah','oleh')
        // var text2 = text[0].match(new RegExp(`(?<=hari\s*).*?(?=\s*oleh)`,'gs'))
        var i = text[0].search('hari ')
        this.tanggalPutusan = text[0].substr(i+5).replace('tanggal','')
        this.count += this.tanggalPutusan.length
        // console.log('tanggal', this.tanggalPutusan)
    },
    getNamaTerdakwa(){
        var nama = this.cutTextLower('nama','tempat')
        this.namaTerdakwa = nama[0].replace(':','').replace(';','')
        this.count += this.namaTerdakwa.length
        // console.log('nama', this.namaTerdakwa)
    },
    getUmurTerdakwa(){
        var umur = this.cutTextLower('tanggal lahir','jenis')
        var i = umur[0].search('/')
        umur = umur[0].substr(0,i)
        this.umurTerdakwa = umur.replace(':','').replace(';','')
        this.count += this.umurTerdakwa.length
        // console.log('lahir', this.umurTerdakwa)
    },
    getGenderTerdakwa(){
        var gender = this.cutTextLower('jenis kelamin','indonesia')
        this.genderTerdakwa = gender[0].replace(':','').replace('kebangsaan','').replace(':','').replace('kewarganegaraan','')
        // console.log('gender', this.genderTerdakwa)
    },
    getPekerjaanTerdakwa(){
        var pekerjaan = this.cutTextLower('pekerjaan','terdakwa')
        this.pekerjaanTerdakwa = pekerjaan[0].replace(':','')
        this.count += this.pekerjaanTerdakwa.length
        // console.log('pekerjaan', this.pekerjaanTerdakwa)
    },
    getPemohonKasasi(){
        var pemohon = this.cutTextLower('membaca memori','sebagai pemohon kasasi')
        if (pemohon != null) {
            if (pemohon[0].includes('penuntut umum')) {
                this.pemohonKasasi = 'Jaksa Penuntut Umum (JPU)'
            }else{
                this.pemohonKasasi = 'Terdakwa'
            }            
        }
        // console.log('pemohon', pemohon[0])
    },
    getYurisprudensi(){
        var yurisprudensi = this.cutTextLower('yurisprudensi',';')
        if (yurisprudensi != null) {
            this.yurisprudensi = yurisprudensi[0]            
        }else{
            this.yurisprudensi = null
        }
        this.count += this.yurisprudensi.length
        // console.log('yurisprudensi', yurisprudensi)
    },
    getPrimair(){
        var primair = this.cutTextLower('primair',';')
        this.primair = primair[0]
        this.primair = this.primair.replace(':','')
        this.count += this.primair.length
        // console.log('primair', primair)
    },
    getSubsidair(){
        var subsidair = this.cutTextLower('subsidair',';')
        // this.primair = primair[0]
        // this.primair = this.primair.replace(':','')
        // this.count += this.primair.length
        for (let i = 0; i < subsidair.length; i++) {
            if (subsidair[i].includes('pasal 3')) {
                this.subsidair = subsidair[i]
            }
        }
        this.subsidair = this.subsidair.replace(':','')
        this.count += this.subsidair.length
        // console.log('subsidair', subsidair)
    },
    getDimohonkanOleh(){
        var dimohonkanOleh = this.cutTextLower('dimohonkan oleh',':')
        this.dimohonkanOleh = dimohonkanOleh[0]
        this.dimohonkanOleh = this.dimohonkanOleh.replace(':','')
        this.count += this.dimohonkanOleh.length
        // console.log('dimohonkanOleh', dimohonkanOleh)
    },
    getKerugianNegara(){
        var kerugianNegara = this.cutTextLower('kerugian keuangan negara','rupiah')
        this.kerugianNegara = kerugianNegara[0]
        this.count += this.kerugianNegara.length
        // console.log('kerugianNegara', this.kerugianNegara)
    },
    getFaktorPemberat(){
        var faktorPemberat = this.cutTextLower('keadaan yang memberatkan:','keadaan yang meringankan')
        this.faktorPemberat = faktorPemberat[0]
        this.count += this.faktorPemberat.length
        // console.log('faktorPemberat', faktorPemberat)
    },
    getFaktorPeringan(){
        var faktorPeringan = this.cutTextLower('keadaan yang meringankan:','menimbang bahwa')
        this.faktorPeringan = faktorPeringan[0]
        this.count += this.faktorPeringan.length
        // console.log('faktorPeringan', faktorPeringan)
    },


    // cutter
    cutTextLower(text1,text2){
        var text = this.textFile.toLowerCase().match(new RegExp(`(?<=${text1}\s*).*?(?=\s*${text2})`,'gs'))
        return text
    },
    cutText(text1,text2){
        var text = this.textFile.match(new RegExp(`(?<=${text1}\s*).*?(?=\s*${text2})`,'gs'))
        return text
    },

    getTimer(){
        this.milliseconds+=10;

        if(this.milliseconds == 1000 && this.stopwatch == true){
            this.milliseconds = 0;
            this.seconds++;

            if(this.seconds == 60){
                this.seconds = 0;
                this.minutes++;

                if(this.minutes == 60){
                    this.minutes = 0;
                    this.hours++;
                }
            }
        }
    },
    getEfektivitas(){
        var efektivitas = (this.count/this.textFile.length)*100
        this.efektivitas = 100 - efektivitas.toFixed(2)
        console.log('ef', this.efektivitas)
    },

    // start
    startMethod(){
        this.stopwatch = true
        this.getNoPutusan()
        this.getTanggalPutusan()
        this.getNamaTerdakwa()
        this.getUmurTerdakwa()
        this.getGenderTerdakwa()
        this.getPekerjaanTerdakwa()
        this.getPemohonKasasi()
        this.getYurisprudensi()
        this.getPrimair()
        this.getSubsidair()
        this.getDimohonkanOleh()
        this.getKerugianNegara()
        this.getFaktorPemberat()
        this.getFaktorPeringan()
        this.getEfektivitas()
        this.done = true
    },

    async getFile(id){
      var params = new URLSearchParams();
      
      params.append("id_file", id);

      var request = {
          params: params
      };
      await this.$axios
        .get('/user/v1/file/getfile',request)
        .then((response) => {
          let { data } = response.data
          this.dataFile = data[0]
          this.getText(this.dataFile.file)
        //   console.log('list file', this.dataFile)
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
    async getText(direktori){
      let formData = new FormData()

      formData.append('file', direktori)

      await this.$axios
        .post('/user/v1/file/gettext', formData)
        .then((response) => {
          let { data } = response.data
          this.textFile = data.text
        //   console.log('tambah file', data)
          
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
    // this.cutTextLower('nomor','demi')
    console.log('route', this.$route.query.id)
    if (this.$route.query.id) {
        console.log('ada id nya')
        this.getFile(this.$route.query.id)
    }else{
        console.log('tidak ada id nya')
    }
  },
}
</script>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>