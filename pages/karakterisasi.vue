<template>
  <div>
    <app-bar/>
    <div class="ma-6">
        <div>
            <h2>KARAKTERISASI</h2>
        </div>
        <br>
        <div>
            <div v-if="!$route.query.id">
                <div class="d-flex">
                    <v-file-input
                        show-size
                        outlined
                        v-model="file"
                        hide-details
                        dense
                        label="File input"
                    ></v-file-input>
                    <v-btn class="ml-3 white--text" color="#0A2A62" @click="getTextLive(), terbaca = false">
                        READ
                        <v-icon>mdi-file-move-outline</v-icon>
                    </v-btn>
                </div>
                <br>
            </div>
            <div v-if="terbaca == false" class="d-flex" style="margin:0 auto;width:400px">
                <v-progress-circular
                    indeterminate
                    color="red"
                    size="30"
                ></v-progress-circular>
                <h3 class="ml-3">Mohon tunggu, sedang membaca file ...</h3>
            </div>
            <div>
                <v-textarea
                clearable
                height="300px"
                dense
                v-if="terbaca == true"
                hide-details
                v-model="textFile"
                background-color="amber lighten-4"
                color="orange orange-darken-4"
                outlined
                ></v-textarea>
            </div>
        </div>
    </div>
    <center v-if="terbaca == true">
        <v-btn @click="startMethod()" color="#0A2A62" class="white--text">Execute <v-icon class="ml-2">mdi-send-outline</v-icon></v-btn>
    </center>
    <div class="ma-6" v-if="done">
        <v-card class="mt-3">
            <v-row class="mx-1">
                <v-col cols="12" md="8" sm="8">
                    <v-card id="goPdf" class="px-4">
                        <div ref="testHtml">
                        <v-card-title>
                            <v-spacer />
                            <h6>Tanggal Putusan : {{tanggalPutusan != null ? tanggalPutusan : '-'}}</h6>
                        </v-card-title>
                        <center style="margin-top: 30px;margin-bottom: 30px;">
                            <h2>Karakterisasi Putusan Hakim</h2>
                            <h4>Nomor Putusan: {{nomorPutusan != null ? nomorPutusan : '-'}}</h4>
                        </center>
                        <br>
                        <h5>Anotasi Oleh</h5>
                        <!-- <center>
                            <h4>Karakterisasi Putusan Hakim</h4>
                        </center> -->
                        <br>
                        <!-- <h5>Pembuka</h5> -->
                        <div>
                            <p>{{ 
                                'Pemeriksaan perkara tindak pidana korupsi dalam persidangan dimohonkan oleh '
                                + dimohonkanOleh
                            }}</p>
                        </div>
                        <br>
                        <center>
                            <table>
                                <tr valign="top">
                                    <td style="width:150px">Nama</td>
                                    <td style="width:30px">:</td>
                                    <td style="width:300px">{{ namaTerdakwa != null ? namaTerdakwa : '-'}}</td>
                                </tr>
                                <tr valign="top">
                                    <td>Umur</td>
                                    <td >:</td>
                                    <td>{{ umurTerdakwa != null ? umurTerdakwa : '-'}}</td>
                                </tr>
                                <tr valign="top">
                                    <td>Jenis Kelamin</td>
                                    <td>:</td>
                                    <td>{{ genderTerdakwa != null ? genderTerdakwa : '-'}}</td>
                                </tr>
                                <tr valign="top">
                                    <td>Tempat Tinggal</td>
                                    <td>:</td>
                                    <td>{{ tempatTinggal != null ? tempatTinggal : '-'}}</td>
                                </tr>
                                <tr valign="top">
                                    <td>Pekerjaan</td>
                                    <td>:</td>
                                    <td>{{ pekerjaanTerdakwa != null ? pekerjaanTerdakwa : '-'}}</td>
                                </tr>
                            </table>
                        </center>
                        
                        <div class="mt-3">Dalam persidangan, bunyi dakwaan yang diberikan kepada terdakwa ialah sebagai berikut:</div>
                        <div style="text-align:justify"><b>Primair :</b> <span>{{primair != null ? primair : '-'}}</span></div>
                        <div style="text-align:justify"><b>Subsidair :</b> <span>{{subsidair != null ? subsidair : '-'}}</span></div>
                        <div style="text-align:justify"><b>Lebih Subsidair :</b> <span>{{lebihSubsidair != null ? lebihSubsidair : '-'}}</span></div>
                        <br>
                        <div v-if="tuntuanPidanaNama != null" style="text-align:justify">
                            Kemudian bunyi dari pembacaan tuntutan pidana <span>{{ tuntuanPidanaNama }}</span>
                        </div>
                        <div v-if="tuntuanPidanaArray != null" style="text-align:justify">
                            <div v-for="(item,index) in tuntuanPidanaArray" :key="index">
                                <div v-if="index+1 != tuntuanPidanaArray.length">{{ index+1 + '. ' +item }}</div>
                            </div>
                        </div>
                        <br>
                        <div v-if="amarPNNama != null" style="text-align:justify">
                            Berdasarkan perjalanan hukum yang telah berjalan, terdapat beberapa pembacaan putusan
                             yang telah dikeluarkan oleh pengadilan. Pada proses pengadilan yang pertama dibacakan 
                             putusan pengadilan tindak pidana korupsi pada pengadilan negeri
                             <span>{{ amarPNNama }}</span>
                        </div>
                        <br>
                        <div v-if="amarPNArray != null" style="text-align:justify">
                            <center>
                                <h5>Ammar Pengadilan Negeri</h5>
                            </center>
                            <div v-for="(item,index) in amarPNArray" :key="index">
                                <div v-if="index+1 != amarPNArray.length">{{ index+1 + '. ' +item }}</div>
                            </div>
                        </div>
                        <br>
                        <div style="text-align:justify">
                            Kemudian 
                            <span v-if="amarPTNama != ''">
                                {{  
                                    'pengadilan dilanjutkan pada tingkat selanjutnya yang terdapat beberapa penyampaian dari pembacaan putusan pengadilan tindak pidana korupsi pada pengadilan tinggi '
                                    + amarPTNama
                                }}
                            </span>
                            <span v-else>
                                proses pengadilan tidak dilanjutkan ke pengadilan tinggi
                            </span>
                        </div>
                        <br>
                        <div v-if="amarPTArray != null" style="text-align:justify">
                            <center>
                                <h5>Ammar Pengadilan Tinggi</h5>
                            </center>
                            <div v-for="(item,index) in amarPTArray" :key="index">
                                <div v-if="index+1 != amarPTArray.length">{{ index+1 + '. ' +item }}</div>
                            </div>
                        </div>
                        <br>
                        <div v-if="akta != null" style="text-align:justify">
                            <div>Terdapat beberapa pembacaan akta permohonan kasasi yang berbunyi sebagai berikut:</div>
                            <div v-for="(item,index) in akta" :key="index">
                                <div>{{index+1 + '. ' +item}}</div>
                            </div>
                        </div>
                        <br>
                        <div v-if="memori != null" style="text-align:justify">
                            <div>Terdapat beberapa pembacaan memori kasasi yang berbunyi sebagai berikut:</div>
                            <div v-for="(item,index) in memori" :key="index">
                                <div>{{index+1 + '. ' +item}}</div>
                            </div>
                        </div>
                        <br>
                        <div v-if="alasanKasasiArrayNew != null" style="text-align:justify">
                            Terdapat pertimbangan berdasarkan alasan kasasi <span>{{ alasanKasasiArrayNew[0] }}</span>
                            <div v-for="(item,index) in alasanKasasiArrayNew" :key="index">
                                <div v-if="index+1 != alasanKasasiArrayNew.length && index != 0" class="mt-2">{{ item }}</div>
                            </div>
                        </div>
                        <br>
                        <div v-if="pekerjaanTerdakwa != null" style="text-align:justify">
                            Terdakwa sebagai <span>{{pekerjaanTerdakwa}}</span> memiliki faktor pertimbangan hukum :
                        </div>
                        <center>
                            <table id="faktor" class="mt-3">
                                <tr id="faktor" valign="top">
                                    <th id="faktor" style="width:50%">Faktor yang Memberatkan</th>
                                    <th id="faktor" style="width:50%">Faktor yang Meringankan</th>
                                </tr>
                                <tr id="faktor" style="text-align:justify" valign="top">
                                    <td id="faktor" class="px-2">
                                        <div v-if="faktorPemberatArray != null">
                                            <div v-for="(item,index) in faktorPemberatArray" :key="index">
                                                <div v-if="index+1 != faktorPemberatArray.length">{{index+1 + '. ' +item}}</div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p> - </p>
                                        </div>
                                    </td>
                                    <td id="faktor" class="px-2">
                                        <div v-if="faktorPeringanArray != null">
                                            <div v-for="(item,index) in faktorPeringanArray" :key="index">
                                                <div v-if="index+1 != faktorPeringanArray.length">{{index+1 + '. ' +item}}</div>
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p> - </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </center>
                        <br>
                        <div v-if="amarMengadili != null" style="text-align:justify">
                            <center>
                                <h5>MENGADILI</h5>
                            </center>
                            Berdasarkan fakta peradilan yang ada, Mahkamah agung telah mempertimbangkan untuk 
                            <div v-for="(item,index) in amarMengadiliArray" :key="index">
                                <center v-if="item.includes('mengadili sendiri')">
                                    <br>
                                    <h5>MENGADILI SENDIRI</h5>
                                </center>
                                <div v-if="index+1 != amarMengadiliArray.length">{{ item == '' ? item : '-'+item}}</div>
                            </div>
                        </div>
                        <br>
                        <div v-if="akhirPutusan != null" style="text-align:justify">
                            {{'Demikianlah diputuskan '+ akhirPutusan}}
                        </div>
                        </div>
                    </v-card>
                    <br>
                    <v-card id="resumePdf" class="px-4 py-5">
                        <center style="margin-top: 30px;margin-bottom: 30px;">
                            <h2>Resume</h2> 
                        </center>

                        <center>
                            <table>
                                <tr valign="top">
                                    <td style="width:150px">Nama</td>
                                    <td style="width:30px">:</td>
                                    <td style="width:300px">{{ namaTerdakwa != null ? namaTerdakwa : '-'}}</td>
                                </tr>
                                <tr valign="top">
                                    <td>Pekerjaan</td>
                                    <td>:</td>
                                    <td>{{ pekerjaanTerdakwa != null ? pekerjaanTerdakwa : '-'}}</td>
                                </tr>
                            </table>
                        </center>
                        <div class="my-5">
                            <div v-if="primair != null" class="my-5">
                                <h4><b>Primair</b></h4>
                                <div style="text-align:justify"><i>"......</i> <i>{{primair != null ? primair : '-'}}</i><i>......"</i></div>
                            </div>
                            <div v-if="subsidair != null" class="my-5">
                                <h4><b>Subsidair</b></h4>
                                <div style="text-align:justify"><i>"......</i>  <i>{{subsidair != null ? subsidair : '-'}}</i><i>......"</i></div>
                            </div>
                            <div v-if="lebihSubsidair != null" class="my-5">
                                <h4><b>Lebih Subsidair</b></h4>
                                <div style="text-align:justify"><i>"......</i>  <i>{{lebihSubsidair != null ? lebihSubsidair : '-'}}</i><i>......"</i></div>
                            </div>
                        </div>
                        <div v-if="akta != null" class="my-5">
                            <h4><b>Permohonan Kasasi</b></h4>
                            <div style="text-align:justify">
                                <div v-for="(item,index) in akta" :key="index">
                                    <div><i>"......</i><i>{{index+1 + '. ' +item}}</i><i>......"</i></div>
                                </div>
                            </div>
                        </div>
                        <div v-if="memori != null" class="my-5">
                            <h4><b>Memori Kasasi</b></h4>
                            <div style="text-align:justify">
                                <div v-for="(item,index) in memori" :key="index">
                                    <div><i>"......</i><i>{{index+1 + '. Membaca memori' +item}}</i><i>......"</i></div>
                                </div>
                            </div>
                        </div>
                        <!-- <div v-if="amarPNArray != null" class="my-5">
                            <h4><b>Amar Putusan Pengadilan Negeri</b></h4>
                            <div v-for="(item,index) in amarPNArray" :key="index">
                                <div v-if="index+1 != amarPNArray.length"><i>"......{{ index+1 + '. ' +item }}......"</i></div>
                            </div>
                        </div> -->
                        <!-- <div v-if="amarPTArray != null" class="my-5">
                            <h4><b>Amar Putusan Pengadilan Tinggi</b></h4>
                            <div v-for="(item,index) in amarPTArray" :key="index">
                                <div v-if="index+1 != amarPTArray.length"><i>"......{{ index+1 + '. ' +item }}......"</i></div>
                            </div>
                        </div> -->
                        <div v-if="amarMengadili != null" class="my-5">
                            <h4><b>Amar Putusan Mahkamah Agung</b></h4>
                            <div v-for="(item,index) in amarMengadiliArray" :key="index">
                                <center v-if="item.includes('mengadili sendiri')">
                                    <br>
                                    <h5>MENGADILI SENDIRI</h5>
                                </center>
                                <div v-if="index+1 != amarMengadiliArray.length"><i>{{ item == '' ? item : '"......'+item+'......"'}}</i></div>
                            </div>
                        </div>
                    </v-card>
                    <br>
                    <!-- <v-card class="pa-2">
                        <h3>Resume :</h3>
                        <div>nomor : {{nomorPutusan}}</div>
                        <div>tanggal : {{tanggalPutusan}}</div>
                        <div>nama : {{namaTerdakwa}}</div>
                        <div>usia : {{umurTerdakwa}}</div>
                        <div>gender : {{genderTerdakwa}}</div>
                        <div>tempat tinggal : {{tempatTinggal}}</div>
                        <div>pekerjaan : {{pekerjaanTerdakwa}}</div><br>
                        <div>dimohonkan oleh : {{dimohonkanOleh}}</div><br>
                        <div>dakwaan : {{dakwaan}}</div><br>
                        <div>primair : {{primair}}</div><br>
                        <div>subsidair : {{subsidair}}</div><br>
                        <div v-if="lebihSubsidair">lebih subsidair : {{lebihSubsidair}}</div><br>
                        <div v-if="amarPN">Amar PN : {{amarPN}}</div><br>
                        <div v-if="amarPT">Amar PT : {{amarPT}}</div><br>
                        <div>
                            <h3>Akta</h3>
                            <div v-for="(item,index) in akta" :key="index">
                                <div>{{item}}</div><br>
                            </div>
                        </div>
                        <div>
                            <h3>Alasan kasasi</h3>
                            <div>{{alasanKasasi}}</div>
                        </div><br>
                        <div>
                            <h3>Faktor hukuman</h3>
                            <div>{{faktorHukuman}}</div>
                        </div><br>
                        <div>
                            <h3>Faktor pemberat</h3>
                            <div>{{faktorPemberat}}</div>
                        </div><br>
                        <div>
                            <h3>Faktor peringan</h3>
                            <div>{{faktorPeringan}}</div>
                        </div><br>
                        <div>
                            <h3>amar mengadili</h3>
                            <div>{{amarMengadili}}</div>
                        </div><br>
                        <div>
                            <h3>akhir putusan</h3>
                            <div>{{akhirPutusan}}</div>
                        </div><br>
                    </v-card> -->
                </v-col>
                <v-col cols="12" md="4" sm="4">
                    <v-row>
                        <v-col cols="12" md="6" sm="6">
                            <v-card class="pa-2">
                                <center>
                                    Putusan <br> <h3>{{ wordOfPutusan.length }}</h3> Kata
                                </center>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                            <v-card class="pa-2">
                                <center>
                                    Karakterisasi <br> <h3>{{ wordOfKarakterisasi+200 }}</h3> Kata
                                </center>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                            <v-card class="pa-2">
                                <center>
                                    <h3>Efisiensi</h3>
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
                            <v-btn @click="downloadPdf()" color="#0A2A62" class="white--text" width="100%">
                                Download karakterisasi
                                <v-icon class="ml-2">mdi-download</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </div>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
import { ref } from 'vue';
export default {
  name: 'karakterisasi',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue')
  },
  data: () => ({
    file:'',
    textFile:'',
    nomorPutusan:null,
    tanggalPutusan:null,
    namaTerdakwa:null,
    umurTerdakwa:null,
    genderTerdakwa:null,
    pekerjaanTerdakwa:null,
    tempatTinggal:null,
    pemohonKasasi:null,
    dakwaan:null,
    primair:null,
    subsidair:null,
    lebihSubsidair:null,

    tuntuanPidana:null,
    tuntuanPidanaNama:null,
    tuntuanPidanaArray:null,

    amarPN:null,
    amarPNNama:null,
    amarPNArray:null,

    amarPT:null,
    amarPTNama:null,
    amarPTArray:null,

    akta:null,

    alasanKasasi:null,
    alasanKasasiArray:null,
    alasanKasasiArrayNew:null,

    faktorHukuman:null,
    faktorPemberat:null,
    faktorPemberatArray:null,
    faktorPeringan:null,
    faktorPeringanArray:null, 
    amarMengadili:null,
    amarMengadiliArray:null,
    akhirPutusan:null,

    yurisprudensi:'',
    dimohonkanOleh:'',
    kerugianNegara:'',   
    count:0,

    wordOfPutusan:0,
    wordOfKarakterisasi:0,

    efektivitas:0,
    getStopwatch:'',
    stopwatch:false,
    done:false,
    terbaca:null,

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
        if (text != null) {
            this.nomorPutusan = text[0]       
            var countSplit = this.nomorPutusan.split(' ')
            this.wordOfKarakterisasi += countSplit.length
        }
    },
    getTanggalPutusan(){
        var text = this.cutText('Demikianlah','oleh')
        if (text != null) {
            var i = text[0].search('hari ')
            this.tanggalPutusan = text[0].substr(i+5).replace('tanggal','')

            var countSplit = this.tanggalPutusan.split(' ')
            this.wordOfKarakterisasi += countSplit.length
        }
    },
    getNamaTerdakwa(){
        var nama = this.cutTextLower('nama',';')
        if (nama != null) {
            this.namaTerdakwa = nama[0].replace(':','')   

            var countSplit = this.namaTerdakwa.split(' ')
            this.wordOfKarakterisasi += countSplit.length         
        }
        // console.log('nama', this.namaTerdakwa)
    },
    getUmurTerdakwa(){
        var umur = this.cutTextLower('tanggal lahir',';')
        if (umur != null) {
            var i = umur[0].search('/')
            umur = umur[0].substr(0,i)
            this.umurTerdakwa = umur.replace(':','').replace(';','')    

            var countSplit = this.umurTerdakwa.split(' ')
            this.wordOfKarakterisasi += countSplit.length           
        }
        // console.log('lahir', this.umurTerdakwa)
    },
    getGenderTerdakwa(){
        var gender = this.cutTextLower('jenis kelamin',';')
        if (gender != null) {
            this.genderTerdakwa = gender[0].replace(':','')   

            var countSplit = this.genderTerdakwa.split(' ')
            this.wordOfKarakterisasi += countSplit.length                
        }
        // console.log('gender', this.genderTerdakwa)
    },
    getPekerjaanTerdakwa(){
        var pekerjaan = this.cutTextLower('pekerjaan','terdakwa')
        if (pekerjaan != null) {
            this.pekerjaanTerdakwa = pekerjaan[0].replace(':','')    

            var countSplit = this.pekerjaanTerdakwa.split(' ')
            this.wordOfKarakterisasi += countSplit.length            
        }
        // console.log('pekerjaan', this.pekerjaanTerdakwa)
    },
    getDimohonkanOleh(){
        var dimohonkanOleh = this.cutTextLower('dimohonkan oleh','telah memutus perkara terdakwa')
        if (dimohonkanOleh != null) {
            this.dimohonkanOleh = dimohonkanOleh[0]
            this.dimohonkanOleh = this.dimohonkanOleh.replace(':','')  

            var countSplit = this.dimohonkanOleh.split(' ')
            this.wordOfKarakterisasi += countSplit.length    
        }
        // console.log('dimohonkanOleh', dimohonkanOleh)
    },
    getTempatTinggal(){
        var tempatTinggal = this.cutTextLower('tempat tinggal',';')
        if (tempatTinggal != null) {
            this.tempatTinggal = tempatTinggal[0]
            this.tempatTinggal = this.tempatTinggal.replace(':','')

            var countSplit = this.tempatTinggal.split(' ')
            this.wordOfKarakterisasi += countSplit.length   
        }
    },
    getDakwaan(){
        var dakwaan = this.cutTextLower('sebagai berikut:','mahkamah agung tersebut')
        if (dakwaan != null) {
            this.dakwaan = dakwaan[0]            
            this.getPrimair()

            var countSplit = this.dakwaan.split(' ')
            this.wordOfKarakterisasi += countSplit.length   
        }
        this.getSubsidair()
        this.getLebihSubsidair()
        // console.log('primair', primair)
    },
    getPrimair(){
        var primair = this.dakwaan.toLowerCase().match(new RegExp(`(?<=primair\s*).*?(?=\s*;)`,'gs'))
        if (primair != null) {
            this.primair = primair[0]
            this.primair = this.primair.replace(':','')            
        }
    },
    getSubsidair(){
        var subsidair = this.dakwaan.toLowerCase().match(new RegExp(`(?<=subsidair\s*).*?(?=\s*;)`,'gs'))
        if (subsidair != null) {
            this.subsidair = subsidair[0]
            this.subsidair = this.subsidair.replace(':','')            
        }
    },
    getLebihSubsidair(){
        var lebihSubsidair = this.dakwaan.toLowerCase().match(new RegExp(`(?<=lebih subsidair\s*).*?(?=\s*;)`,'gs'))
        if (lebihSubsidair != null) {
            this.lebihSubsidair = lebihSubsidair[0]
            this.lebihSubsidair = this.lebihSubsidair.replace(':','')            
        }
    },
    getTuntutanPidana(){
        var tuntuanPidana = this.cutTextLower('membaca tuntutan pidana','barang bukti berupa')
        if (tuntuanPidana != null) {
            this.tuntuanPidana = tuntuanPidana[0]
            let x = this.tuntuanPidana.toLowerCase().search(':')
            this.tuntuanPidanaNama = this.tuntuanPidana.slice(0, x+1);
            this.tuntuanPidanaArray = this.tuntuanPidana.substr(x+1).split(";");

            var countSplit = this.tuntuanPidana.split(' ')
            this.wordOfKarakterisasi += countSplit.length   
        }
    },
    getAmarPN(){
        var amarPN = this.cutTextLower('membaca putusan pengadilan tindak pidana korupsi pada pengadilan negeri','membaca putusan pengadilan tindak pidana korupsi pada pengadilan tinggi')
        if (amarPN != null) {
            this.amarPN = amarPN[0]
            let x = this.amarPN.toLowerCase().search(':')
            this.amarPNNama = this.amarPN.slice(0, x+1);
            this.amarPNArray = this.amarPN.substr(x+1).split(";");

            var countSplit = this.amarPN.split(' ')
            this.wordOfKarakterisasi += countSplit.length   
        }
        // this.dakwaan = this.dakwaan.replace(':','')
        // this.count += this.amarPN.length
    },
    getAmarPT(){
        var amarPT = this.cutTextLower('membaca putusan pengadilan tindak pidana korupsi pada pengadilan tinggi','membaca')
        if (amarPT != null) {
            this.amarPT = amarPT[0]
            let x = this.amarPT.toLowerCase().search(':')
            this.amarPTNama = this.amarPT.slice(0, x+1);
            this.amarPTArray = this.amarPT.substr(x+1).split(";");

            var countSplit = this.amarPT.split(' ')
            this.wordOfKarakterisasi += countSplit.length   
        }
        // this.dakwaan = this.dakwaan.replace(':','')
        // this.count += this.amarPN.length
    },
    getAkta(){
        var akta = this.cutTextLower('membaca akta',';')
        if (akta != null) {
            this.akta = akta           
            // this.akta = this.akta.replace(':','')
            // console.log(akta)
            for (let i = 0; i < akta.length; i++) {

                var countSplit = this.akta[i].split(' ')
                this.wordOfKarakterisasi += countSplit.length   
            }
        }
    },
    getMemori(){
        var memori = this.cutTextLower('membaca memori',';')
        if (memori != null) {
            this.memori = memori           
            // this.memori = this.memori.replace(':','')
            // console.log(memori)
            for (let i = 0; i < memori.length; i++) {

                var countSplit = this.memori[i].split(' ')
                this.wordOfKarakterisasi += countSplit.length   
            }
        }
    },
    getAlasanKasasi(){
        var alasanKasasi = this.cutTextLower('menimbang bahwa terhadap alasan kasasi','menimbang bahwa')
        if (alasanKasasi != null) {
            this.alasanKasasi = alasanKasasi[0]
            this.alasanKasasiArray = this.alasanKasasi.split(":");
            for (let i = 0; i < this.alasanKasasiArray.length; i++) {
                this.alasanKasasiArray[i] = this.alasanKasasiArray[i]+' :'
            }
            this.alasanKasasiArrayNew = []
            for (let i = 0; i < this.alasanKasasiArray.length; i++) {
                var data = null
                data = this.alasanKasasiArray[i].split(";");
                for (let j = 0; j < data.length; j++) {
                    if (data[j].includes(':')) {
                        this.alasanKasasiArrayNew.push(data[j])                        
                    }else{
                        this.alasanKasasiArrayNew.push(j+1 + '. ' +data[j])     
                    }
                }
            }
        }
        console.log('this.alasanKasasiArray new', this.alasanKasasiArrayNew)

            var countSplit = this.alasanKasasi.split(' ')
            this.wordOfKarakterisasi += countSplit.length  
    },
    getFaktorHukuman(){
        var faktorHukuman = this.cutTextLower('keadaan yang memberatkan','menimbang bahwa')
        if (faktorHukuman != null) {
            this.faktorHukuman = faktorHukuman[0]
            this.getFaktorPemberat()

            var countSplit = this.faktorHukuman.split(' ')
            this.wordOfKarakterisasi += countSplit.length  
        }
        // console.log('faktorhukuman', faktorHukuman)
    },
    getFaktorPemberat(){
        if (this.faktorHukuman.includes('keadaan yang meringankan')) {
            var faktorPemberat = this.faktorHukuman.toLowerCase().match(new RegExp(`(?<=keadaan yang memberatkan\s*).*?(?=\s*keadaan yang meringankan)`,'gs'))
            if (faktorPemberat != null) {
                this.faktorPemberat = faktorPemberat[0]  
                this.faktorPemberat = this.faktorPemberat.replace(':','')
                this.faktorPemberatArray = this.faktorPemberat.split(";");
            }
            this.getFaktorPeringan()
        }else{
            let x = this.faktorHukuman.toLowerCase().search('keadaan yang memberatkan')
            this.faktorPemberat = this.faktorHukuman.substr(x)
            this.faktorPemberat = this.faktorPemberat.replace(':','')  
            this.faktorPemberatArray = this.faktorPemberat.split(";");
            
        }
    },
    getFaktorPeringan(){
        let x = this.faktorHukuman.toLowerCase().search('keadaan yang meringankan')
        this.faktorPeringan = this.faktorHukuman.substr(x)
        this.faktorPeringan = this.faktorPeringan.replace(':','').replace('keadaan yang meringankan','') 
        this.faktorPeringanArray = this.faktorPeringan.split(";");
        // console.log('ind',x)
        // console.log('indad',this.faktorPeringan)
    },
    getAmarMengadili(){
        var amarMengadili = this.cutTextLower('undangan lain yang bersangkutan','demikianlah diputuskan')
        if (amarMengadili != null) {
            this.amarMengadili = amarMengadili[0]
            this.amarMengadiliArray = this.amarMengadili.split(";");

            var countSplit = this.amarMengadili.split(' ')
            this.wordOfKarakterisasi += countSplit.length  
        }
        // console.log('amarMengadili', this.amarMengadili)
    },
    getAkhirPutusan(){
        var akhirPutusan = this.cutTextLower('demikianlah diputuskan','panitera pengganti')
        if (akhirPutusan != null) {
            this.akhirPutusan = akhirPutusan[0]

            var countSplit = this.akhirPutusan.split(' ')
            this.wordOfKarakterisasi += countSplit.length  
        }
        // console.log('akhirPutusan', this.akhirPutusan)
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
    getKerugianNegara(){
        var kerugianNegara = this.cutTextLower('kerugian keuangan negara','rupiah')
        this.kerugianNegara = kerugianNegara[0]
        this.count += this.kerugianNegara.length
        // console.log('kerugianNegara', this.kerugianNegara)
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
        var efektivitas = ((this.wordOfKarakterisasi+200)/this.wordOfPutusan.length)*100
        this.efektivitas = 100 - efektivitas.toFixed(2)
        console.log('ef', this.efektivitas)
    },
    downloadPdfs(){
        var doc = new jsPDF('p', 'mm', [297, 210], 'a4');
        doc.setFontSize(5);
     
        let margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
        
        // doc.html(this.$refs.testHtml, 40, 80,{
        //     'width' : 522
        // });
        var nama = 'karakterisasi.pdf'
        // doc.save('test.pdf');
        doc.html(this.$refs.testHtml, {
            margin:[20,20,20,20],
            
            callback: function(doc) {
                doc.save(nama);
            },
            x: 10,
            y: 10,
        });
    },
    downloadPdf(){
        var doc = new jsPDF('p', 'px', [990,1100]);
        let margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
        
        // doc.html(this.$refs.testHtml, 40, 80,{
        //     'width' : 522
        // });
        var nama = 'karakterisasi.pdf'
        // doc.save('test.pdf');
        doc.html(this.$refs.testHtml, {
            margin:[40,40,40,40],
            callback: function(doc) {
                doc.save(nama);
            },
            x: 10,
            y: 10,
        });
    },

    // start
    async startMethod(){
        this.wordOfKarakterisasi = 0
        this.wordOfPutusan = 0
        await this.clearSpam()
        this.getNoPutusan()
        this.getTanggalPutusan()
        this.getNamaTerdakwa()
        this.getUmurTerdakwa()
        this.getGenderTerdakwa()
        this.getTempatTinggal()
        this.getPekerjaanTerdakwa()
        this.getDimohonkanOleh()
        this.getDakwaan()
        this.getAmarPN()
        this.getAmarPT()
        this.getAkta()
        this.getMemori()
        this.getAlasanKasasi()
        this.getFaktorHukuman()
        this.getAmarMengadili()
        this.getAkhirPutusan()
        this.getTuntutanPidana()
        // this.getPemohonKasasi()
        // this.getYurisprudensi()
        // this.getSubsidair()
        // this.getKerugianNegara()
        // this.getFaktorPemberat()
        // this.getFaktorPeringan()
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
          this.terbaca = true
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
    },
    async getTextLive(){
        this.nomorPutusan = null
        this.tanggalPutusan = null
        this.namaTerdakwa = null
        this.umurTerdakwa = null
        this.genderTerdakwa = null
        this.pekerjaanTerdakwa = null
        this.tempatTinggal = null
        this.pemohonKasasi = null
        this.dakwaan = null
        this.primair = null
        this.subsidair = null
        this.lebihSubsidair = null

        this.tuntuanPidana = null
        this.tuntuanPidanaNama = null
        this.tuntuanPidanaArray = null

        this.amarPN = null
        this.amarPNNama = null
        this.amarPNArray = null

        this.amarPT = null
        this.amarPTNama = null
        this.amarPTArray = null

        this.akta = null

        this.memori = null

        this.alasanKasasi = null
        this.alasanKasasiArray = null
        this.alasanKasasiArrayNew = null

        this.faktorHukuman = null
        this.faktorPemberat = null
        this.faktorPemberatArray = null
        this.faktorPeringan = null
        this.faktorPeringanArray = null
        this.amarMengadili = null
        this.amarMengadiliArray = null
        this.akhirPutusan = null
        this.done = false
      
      let formData = new FormData()

      formData.append('file', this.file)

      await this.$axios
        .post('/user/v1/file/gettextlive', formData)
        .then((response) => {
          let { data } = response.data
          this.textFile = data.text
          this.terbaca = true
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
    },
    async clearSpam(){
        this.wordOfPutusan = this.textFile.split(' ')
        var dataSpam = this.cutText('Hal','putusan.mahkamahagung.go.id')
        for (let i = 0; i < dataSpam.length; i++) {
            dataSpam[i] = 'Hal'+dataSpam[i]+'putusan.mahkamahagung.go.id'
        }
        for (let j = 0; j < dataSpam.length; j++) {
            this.textFile = this.textFile.replace(dataSpam[j],'')
        }
        console.log('data spam', dataSpam[3])
    }
  },
  created(){
    // this.getUser()
    // this.cutTextLower('nomor','demi')
    console.log('route', this.$route.query.id)
    if (this.$route.query.id) {
        console.log('ada id nya')
        this.terbaca = false
        this.getFile(this.$route.query.id)
    }else{
        console.log('tidak ada id nya')
    }
  },
}
</script>
<style>
#faktor {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>