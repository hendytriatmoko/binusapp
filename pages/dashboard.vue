<template>
  <div>
  <v-container grid-list-md>
    <app-bar />
    <first-section />
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md6>
          <v-layout row wrap>
            <v-flex>
              <v-card :style="'border: 1px solid #EDEDED; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; '">
                <v-card-title primary class="title">File Resource</v-card-title>
                <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto sint adipisci beatae, repellat eligendi soluta voluptas maiores dolorem officiis repudiandae eveniet mollitia nisi ut deleniti harum dolores dolore quae.</v-card-text>
                <v-container>
                  <v-file-input 
                    :style="'box-shadow: none;'" 
                    prepend-icon="" 
                    outlined label="Input File Resource"
                    v-model="file"
                    @change="updateFile()"
                    truncate-length="15"
                  >
                  </v-file-input>
                </v-container>
              
                <v-card-actions>
                  <v-spacer/>
                    <v-btn 
                      @click="readInput()" 
                      color="#0A2A62" 
                      class="white--text mr-5 my-5 py-5 px-10"
                      :style="'font-size: 12px; width: 130px'"
                    >
                      Read
                      <v-icon 
                        class="ml-2"
                        :style="'font-size: 14px'"
                      >
                        mdi-note
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card :style="'border: 1px solid #EDEDED; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; '">
                <v-card-title class="title">Read Resource</v-card-title>
                <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto sint adipisci beatae, repellat eligendi soluta voluptas maiores dolorem officiis repudiandae eveniet mollitia nisi ut deleniti harum dolores dolore quae.}</v-card-text>
                <v-container>
                  <v-textarea 
                    v-model="putusan1" 
                    label="Read Source" 
                    outlined
                  >
                  </v-textarea>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn 
                      color="#0A2A62" 
                      @click="dataPutusan()" 
                      class="white--text mr-5 my-5 py-5 px-10"
                      :style="'font-size: 12px; width: 130px'"
                    >
                      Execute 
                      <v-icon 
                        class="ml-2"
                        :style="'font-size: 14px'"
                      >
                        mdi-send
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                  
                  </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex d-flex xs12 sm6 md6>
          <v-card :style="'border: 2px solid #D8D9CF; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; min-height: 50vh'">
            <v-card-title primary class="title">Characterization Results</v-card-title>
            <v-card-text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iusto sint adipisci beatae, repellat eligendi soluta
              voluptas maiores dolorem officiis repudiandae eveniet mollitia nisi ut deleniti harum dolores dolore quae.
            </v-card-text>
              <v-container>
              <v-card-actions :style="'display-content: center;'"> 
                <v-card 
                  v-if="done==false" 
                  width="100%" 
                  style="margin:0 auto" 
                  height="81vh"
                  class="pa-2" 
                  :style="'box-shadow: none; border: 1px dashed grey;'" 
                >
                <!-- flex-direction: column; display: flex !important; -->
                <!-- flex-grow: 1; overflow: auto; -->
                  <center v-if="loading">
                    <v-progress-circular
                      indeterminate
                      color="#34AAE2"
                    >
                    </v-progress-circular>
                    <span class="ml-4">
                      Please wait a moment
                    </span>
                  </center>
                </v-card>
                <v-card v-if="done"
                  width="100%" 
                  style="margin:0 auto" 
                  class="pa-2"
                  height="81vh" 
                  :style="'box-shadow: none; border: 1px dashed grey; flex-direction: column; display: flex !important;'">
                  <v-card-text :style="'flex-grow: 1; overflow: auto;'">
                  <div ref="testHtml">
                    <div class="text-center">Karakterisasi Putusan Hakim <br> <span v-if="nomorPutusan != ''" class="red--text">{{ nomorPutusan }}</span> </div>
                    <br>
                    <div>
                      <div v-if="perbuatanTerdakwa != ''">
                        Kaidah Yurisprudensi: <br>
                        <span class="red--text">{{ perbuatanTerdakwa }}</span>. <br><br>
                      </div>
                      Anotasi Oleh: <br>
                      <!-- <div class="text-center">
                        <span class="red--text">{{ 'JUDUL' }}</span>
                        <br><br>
                      </div> -->
                      <div v-if="primair != '' || subsidiair != '' || subsidair != ''">
                        <div v-if="primair != ''">
                          <span class="red--text">{{ primair }}</span>;
                        </div>
                        <div v-if="subsidiair != ''">
                          <br>
                          <span class="red--text">{{ subsidiair }}</span>
                        </div>
                        <div v-if="subsidair != ''">
                          <br>
                          <span class="red--text">{{ subsidair }}</span>
                        </div>
                        <br>
                      </div>
                      <div v-if="pertimbanganDakwaan != ''">
                        Majelis Hakim Kasasi memberikan pertimbangan hukum untuk terdakwa.
                        <br>
                        Dalam pertimbangannya, 
                        <span class="red--text">{{ pertimbanganDakwaan }}</span>
                        <br><br>
                      </div>
                      <div v-if="yurisprudensi != ''">
                        <span class="red--text">{{ yurisprudensi }}</span>.
                        <br><br>
                      </div>
                        <!-- <span class="red--text">{{ 'FAKTA PERSIDANGAN' }}</span>
                        <br><br>
                        Selain itu, majelis hakim juga menyatakan dalam pertimbangannya bahwa <span class="red--text">{{ 'judex facti' }}</span>
                        <br><br> -->
                      <div v-if="faktorPemberat != '' || faktorPeringan != ''">
                        <table style="width:100%">
                          <tr>
                            <th v-if="faktorPemberat != ''">Faktor Pemberat</th>
                            <th v-if="faktorPeringan != ''">Faktor Peringan</th>
                          </tr>
                          <tr>
                            <td v-if="faktorPemberat != ''"><span class="red--text">{{ faktorPemberat }}</span></td>
                            <td v-if="faktorPeringan != ''"><span class="red--text">{{ faktorPeringan }}</span></td>
                          </tr>
                        </table>
                        <br>
                      </div>
                      <div v-if="pasalKasasi != ''">
                        Menimbang bahwa karena Terdakwa dipidana, maka dibebani untuk membayar biaya perkara pada tingkat kasasi.
                        <span class="red--text">{{ pasalKasasi }}</span>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                </v-card>
              </v-card-actions> 
              <v-card-actions>
                <v-spacer/>
                <v-btn 
                  outlined 
                  color="#0A2A62" 
                  @click="download()" 
                  v-if="done==true" 
                  class="mr-5 my-5 py-5 px-10"
                  :style="'font-size: 12px; width: 130px'"
                >
                  Download 
                  <v-icon
                    class="ml-2"
                    :style="'font-size: 14px'"
                  >
                    mdi-download
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    
    <TesttVue />
  </v-container>
  <footer-section />
</div>
</template>

<script>
import { jsPDF } from "jspdf";
import { mapActions } from 'vuex'
import FirstSectionVue from "~/components/FirstSection/FirstSection.vue";
import Footer from "~/components/Footer/Footer.vue";
import TesttVue from "~/components/Testt/Testt.vue";
// import extractText from 'office-text-extractor'
export default {
  name: 'IndexPage',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
      'first-section': FirstSectionVue,
      'footer-section' : Footer,
      TesttVue
  },
  data: () => ({
    putusan1:`PUTUSAN
Nomor 803 K/Pid.Sus/2018
DEMI KEADILAN BERDASARKAN KETUHANAN YANG MAHA ESA 
MAHKAMAH AGUNG
Memeriksa perkara tindak pidana korupsi pada tingkat kasasi yang dimohonkan oleh Penuntut Umum pada Kejaksaan Negeri Ogan Komering Ulu telah memutus perkara Terdakwa:
Nama	:	EKO SAPUTRA, Amd bin ROMZI;
Tempat Lahir	:	Baturaja;
Umur/Tanggal Lahir	:	33 tahun/7 Agustus 1983
Jenis Kelamin	:	Laki-Laki
Kebangsaan	:	Indonesia
Tempat Tinggal	:	Jl. Kapten M. Nur Lrg. Taman Sari I No. 308 A RT. 002/003 Kelurahan Sukaraya, Kecamatan Baturaja Timur, Kabupaten OKU dan Jl. Moh. Hatta Lrg Duku, Kelurahan Kemalaraja, Kecamatan Baturaja Timur, Kabupaten OKU;
Agama	:	Islam
Pekerjaan	:	Wiraswasta
Terdakwa tersebut berada dalam tahanan Rumah Tahanan Negara (Rutan) sejak tanggal 4 Mei 2017 sampai dengan sekarang;
Terdakwa diajukan di depan persidangan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang karena didakwa dengan dakwaan sebagai berikut:
PRIMAIR	:	Perbuatan Terdakwa sebagaimana diatur dan diancam pidana dalam Pasal 2 Ayat (1) Undang-Undang Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi sebagaimana diubah dan ditambah dengan Undang-Undang Republik Indonesia Nomor 20 Tahun 2001 tentang Perubahan atas Undang-Undang Republik Indonesia Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi jo. Pasal 55 Ayat (1) ke-1 KUHPidana;
SUBSIDIAIR	:	Perbuatan Terdakwa sebagaimana diatur dan diancam pidana dalam Pasal 3 Undang-Undang Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi sebagaimana diubah dan ditambah dengan UndangUndang Republik Indonesia Nomor 20 Tahun 2001 tentang Perubahan atas Undang-Undang Republik Indonesia Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi jo. Pasal 55 Ayat (1) ke-1 KUHPidana;
Mahkamah Agung tersebut; 
Membaca Tuntutan Pidana Penuntut Umum pada Kejaksaan Negeri Ogan Komering Ulu tanggal 18 September 2017 sebagai berikut:
1.	Menyatakan Terdakwa Eko Saputra, Amd bin Romzi terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana “Setiap orang turut serta melakukan perbuatan secara melawan hukum memperkaya diri sendiri atau orang lain, atau suatu korporasi, yang dapat merugikan keuangan Negara atau Perekonomian Negara” sebagaimana diatur dan diancam pidana dalam Pasal 2 Ayat (1) tentang Pemberantasan Tindak Pidana Korupsi sebagaimana diubah dan ditambah dengan UndangUndang Republik Indonesia Nomor 20 Tahun 2001 tentang Perubahan atas Undang-Undang Republik Indonesia Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi jo. Pasal 55 Ayat (1) ke-1 KUHPidana sebagaimana dalam surat dakwaan;Menjatuhkan pidana terhadap Terdakwa berupa pidana penjara selama 6 (enam) tahun 6 (enam) bulan dikurangi selama Terdakwa berada dalam tahanan sementara, Denda sebesar Rp200.000.000,00 (dua ratus juta rupiah) subsidair 6 (enam) bulan kurungan;
2.	enjatuhkan pidana terhadap diri Terdakwa Eko Saputra, Amd bin Romzi dengan pidana penjara selama 6 (enam) tahun dan menghukum Terdakwa dengan pidana denda sebesar Rp200.000.000,00 (dua ratus juta rupiah) subsidiair 3 (tiga) bulan kurungan dengan dikurangi selama Terdakwa berada dalam tahanan sementara dan dengan perintah Terdakwa tetap ditahan;
3.	Membayar uang pengganti sebesar Rp146.611.382,00 (seratus empat puluh enam juta enam ratus sebelas ribu tiga ratus delapan puluh dua rupiah) dan jika Terdakwa tidak dapat membayar uang pengganti paling lama dalam waktu 1 (satu) bulan setelah putusan pengadilan memperoleh kekuatan hukum tetap, maka harta bendanya dapat disita oleh Jaksa dan dilelang untuk menutupi uang pengganti tersebut, dalam hal Terdakwa tidak mempunyai harta benda yang mencukupi untuk membayar uang pengganti maka diganti dengan pidana penjara selama 2 (dua) tahun dan 6 (enam) bulan;
4.	Menyatakan barang bukti berupa: 
1.	1 (satu) lembar Faktur Pembelian Bahan Kain, No. Nota : 2937A yang dikeluarkan oleh PT. SAVANA LESTARI. tanggal 29 Desember 2015; 
2.	2(dua) lembar Print Out Rekening Giro PT SAVANA LESTARI, Nomor Rek : 3353034908. periode tanggal 30-11-2015 sampai dengan 31-12-2015; 
3.	1 (satu) lembar copy legalisir Surat Pesanan (SP) Nomor : 043/TSSJ-E/XII/2015 dari CV TEMBULUN SS JUNYOR kepada Direktur PT. SAVANA LESTARI tanggal 14 Desember 2015; 
4.	1 (satu) lembar copy Legalisir Surat Konfirmasi Order Nomor : 254/SAVANA/XII/15 dari PT SAVANA LESTARI kepada CV TEMBULUN SS JUNYOR tanggal 15 Desember 2015; 
5.	5 (lima) lembar copy Legalisir Dokumen Pelaksanaan Perubahan Anggaran Satuan Kerja Perangkat Daerah (DPPA SKPD) Tahun 2015 Nomor : 1.22/01/01/03/02/5/2 tanggal 04 November 2015; 
6.	5 (lima) lembar copy Legalisir Surat Keputusan Kepala BPMPD Kab OKU Nomor : 410/400.b/KPTS/XXXV/2015 tentang Pembentukan Panitia Pelaksana Kegiatan Pengadaan Pakaian Dinas; 
7.	8 (delapan) lembar copy Legalisir Surat Keputusan Bupati OKU Nomor : 567/KPTS/XII/2014 tentang Pengangkatan Pejabat Pengguna Anggaran, Bendahara Penerimaan dan Bendahara Pengeluaran Pada SKPD di Lingkungan Pemerintah Kab. OKU TA. 2015 tanggal 15 Desember 2014;
8.	4 (empat) lembar copy Legalisir Rencana Umum Pengadaan (RUP) Kegiatan Pengadaan Pakaian Dinas pada Badan Pemberdayaan Masyarakat dan Pemerintahan Desa Tahun Anggaran 2015; 
9.	1 (satu) lembar copy Legalisir Harga Perkiraan Sendiri (HPS) Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU pada Badan Pemberdayaan Masyarakat dan Pemerintahan Desa Kab OKU tanggal 09 Oktober 2015; 
10.	2 (dua) lembar copy Legalisir Spesifikasi Tekhnis Bahan Kain Pengadaaan Pakaian Dinas dengan jumlah bahan kain 1774 potong tanggal 10 November 2015; 
11.	3 (tiga) lembar copy Legalisir Buku Kas Umum Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa Dan BPD pada Badan Pemberdayaan Masyarakat dan Pemerintahan Desa Tahun 2015; 1
12.	1 (satu) bundel copy Legalisir Surat Perjanjian (Kontrak) Nomor : 027/717/PDH Desa/XXXV/2015 tanggal 18 Desember 2015 Kegiatan Pengadaan Pakaian Dinas Aparatur Pemerintahan Desa (Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa, dan BPD); 
13.	1 (satu) bundel copy Legalisir Dokumen Serah Terima Barang Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa, dan BPD Kab OKU TA. 2015 yang di dalamnya terdiri dari surat-surat : • 
1.	Copy Legalisir Laporan Hasil Pemeriksaan dalam Rangka Serah Terima Barang Nomor : 027/723/panriksa/XXXV/2015 tanggal 22 Desember pada Kegiatan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU TA. 2015; 
2.	Copy Legalisir Berita Acara Serah Terima Barang Pekerjaan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU Tahun 2015 Nomor : 027/724/PDH Desa/XXXV/2015 tanggal 22 Desember 2015; 
3.	Copy Legalisir Berita Acara Penilaian Hasil Pekerjaan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU Tahun 2015 Nomor : 027/722/Panriksa/XXXV/2015 tanggal 22 Desember 2015; 
4.	Copy Legalisir Berita Acara Pemeriksaan Barang Pekerjaan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU Tahun 2015 Nomor : 027/721/Panriksa/XXXV/2015 tanggal 22 Desember 2015; 
5.	Copy Legalisir Laporan Pemeriksaan secara Visual Pekerjaan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU Tahun 2015 tanggal 22 Desember 2015; 
6.	Copy Legalisir Laporan Pemeriksaan Administrasi Pekerjaan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU Tahun 2015 tanggal 22 Desember 2015; 
7.	Copy Legalisir Notulen Rapat pekerjaan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU Tahun 2015 tanggal 22 Desember 2015; 
8.	Copy Legalisir Daftar Hadir Panitia Pemeriksa Barang Pekerjaan Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Kab OKU Tahun 2015 tanggal 22 Desember 2015; 
9.	Copy Legalisir Undangan Mengadakan Rapat Pemeriksaan/ Penerimaan Barang Nomor : 027/720/Panriksa/XXXV/2015 tanggal 21 Desember 2015; 
10.	Copy Legalisir Surat Prihal Pemeriksaan Hasil Pekerjaan dalam rangka Serah terima Barang Nomor : 027/719/PDH Desa/ XXXV/2015 tanggal 21 Desember 2015; 
11.	Copy Legalisir Surat Prihal Pemeriksaan dan Serah Terima Hasil Pekerjaan Pengadaan Barang Nomor : 027/718/PDH Desa/XXXV/2015 tanggal 21 Desember 2015;
14.	1 (satu) bundel copy Legalisir Dokumen Pencairan Dana Dalam Kegiatan Pengadaan Pakaian Dinas Aparatur Pemerintahan Desa Tahun 2015 yang di dalam nya terdiri dari:
1.	Copy Legalisir Tanda Pembayaran Lumpsum Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015; 
2.	Copy Legalisir Surat Penyediaan Dana (SPD) Nomor : 0395/SPD/1.22.01 tahun 2015 tanggal 04 November 2015; 
3.	Copy Legalisir Rencana Penggunaan Dana SPD Nomor : 0395/SPD/1.22.01 tahun 2015 tanggal 04 November 2015; 
4.	Copy Legalisir Surat Pengantar Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0040/SPP-LS/G/1.22.01/2015 Tahun 2015 tanggal 22 Desember 2015; 
5.	Copy Legalisir Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0040/SPP-LS/G/1.22.01/2015 Tahun 2015 tanggal 22 Desember 2015; 
6.	Copy Legalisir Ringkasan Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0040/SPP-LS/G/1.22.01/2015 Tahun 2015 tanggal 22 Desember 2015; 
7.	Copy Legalisir Rincian Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0040/SPP-LS/G/1.22.01/2015 Tahun 2015 tanggal 22 Desember 2015; 
8.	Copy Legalisir Surat Perintah Membayar (SPM) Nomor : 0040/SPM-LS/1.22.01 /2015 tanggal 22 Desember 2015; 
9.	Copy Legalisir Surat Perintah Pencairan Dana (SP2D) Nomor : 2823/SP2D-LS/141.300.0001 tanggal 22 Desember 2015; 
10.	Copy Legalisir Daftar Penguji Nomor: 1200/SP2DUJI/141.300.0001/2015 tanggal 22 Desember 2015; 
11.	Copy Legalisir Surat Setoran Pajak (SSP) CV Tembulun SS Junyor terhadap Pajak Penghasilan (PPH) Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015; 
12.	Copy Legalisir Surat Permohonan Pencairan Dana Nomor : 900/730/XXXV/2015 tanggal 22 Desember 2015 pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD; 
13.	Copy Legalisir Surat Keterangan Pengajuan SPP-LS pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 22 Desember 2015; 
14.	Copy Legalisir Surat Pernyataan Pengguna Anggaran/PPK Sdr Drs. WIBISONO, MM pada kegiatan pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 22 Desember 2015; 
15.	Copy Legalisir Ringkasan Kontrak pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 22 Desember 2015; 
16.	Copy Legalisir Surat Pernyataan Tanggungjawab Belanja-LS Nomor: 900/731/XXXV/2015 pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 22 Deesember 2015; 
17.	Copy Legalisir Surat Permintaan Pembayaran (SPP) Nomor: 732/SPP-LS/1.22.01/2015 pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 22 Desember 2015; 
18.	Copy Legalisir Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)-LS Nomor: 900/733/XXXV/2015 pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 22 Desember 2015; 
19.	Copy Legalisir Kwitansi Pembayaran pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD dari Bendahara Pengeluaran Sdr HARYADI kepada CV Tembulun SS Junyor Sdr EKO SAPUTRA tanggal 22 Desember 2015;
20.	Copy Legalisir Berita AcaraPembayaran Uang Lonsump Nomor : 735/BA-KEU/XXXV/2015 pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 16 November 2015; 
21.	Copy Legalisir Daftar Rincian Pajak pada kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD;
15.	1 (satu) Bundel Dokumen Pencairan Dana dalam Kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD yang di dalamnya terdiri dari:
1.	Copy Legalisir Tanda Pembayaran Uang Lumpsum Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD Tangggal 30 Desembe 2015; 
2.	Copy Legalisir Surat Perintah Pencairan Dana (SP2D) Nomor: 2921/SP2D-LS/141.300.0001 tanggal 23 Desember 2015; 
3.	Copy Legalisir Daftar Penguji Nomor: 1212/SP2DUJI/141.300.0001/2015 tanggal 23 Desember 2015; 
4.	Copy Legalisir Surat Permohonan Pencairan Dana Nomor : 900/737/XXXV/2015 tanggal 23 Desember 2015 pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD pada uang Lump sum Upah Jahit; 
5.	Copy Legalisir Berita Acara Pembayaran Uang Lompsum Nomor: 742/BA-KEU/XXXV/2015 tanggal 22 Desember 2015; 
6.	Copy Legalisir Copy Legalisir Kwitansi Pembayaran pada Kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015;
7.	Copy Legalisir Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)-LS Nomor: 900/740/XXXV/2015 pada Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015;
8.	Copy Legalisir Surat Permintaan Pembayaran (SPP) Nomor: 739/SPP-LS/1.22.01/2015 pada Kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015;
9.	Copy Legalisir Surat Pernyataan Tanggungjawab Belanja-LS Nomor: 900/738/XXXV/2015 pada Kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015; 
10.	Copy Legalisir Ringkasan Kontrak pada Kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015; 
11.	Copy Legalisir Daftar Rincian Pajak pada Kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD; 
12.	Copy Legalisir Surat Keterangan Pengajuan SPP-LS pada kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 23 Desember 2015; 
13.	Copy Legalisir Surat Pengantar Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0041/SPP-LS/G/1.22.01/2015 Tahun 2015 tanggal 23 Desember 2015; 
14.	Copy Legalisir Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0041/SPP-LS/G/1.22.01/2015 Tahun 2015 tanggal 23 Desember 2015; 
15.	Copy Legalisir Rincian Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0041/SPP-LS/G/1.22.01/2015 Tahun 2015 tanggal 23 Desember 2015;
16.	Copy Legalisir Surat Perintah Membayar (SPM) Nomor: 0041/SPM-LS/1.22.01/2015 tanggal 23 Desember 2015; 
17.	Copy Legalisir Surat Setoran Pajak (SSP) Bendahara Pengluaran BPMPD Kab OKU terhadap Pajak Upah Jahit Pengadaan Bahan Kain Pakaian Dinas Kepala Desa, Perangkat Desa Dan BPD tanggal 28 Desember 2015; 
18.	Copy Legalisir Surat Pernyataan Pengguna Anggaran/PPK Sdr Drs. WIBISONO, MM pada kegiatan pada Kegiatan Upah Jahit Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa dan BPD tanggal 22 Desember 2015;
16.	1 (satu) Bundel Dokumen Pencaiaran Dana dari Dana Ganti Uang (GU) pada Kegiatan Pengadaan Pakaian Dinas Apratur Pemerintahan Desa TA 2015 yang dalamnya terdiri dari:
1.	Copy Legalisir Surat Permohonan Penerbitan Surat Perintah Pencairan Dan (SP2D) NIHIL Nomor: 900/751/XXXV/2015 tanggal 28 Desember 2015;
2.	Copy Legalisir Surat Permohonan Penerbitan Surat Perintah Pencairan Dan (SP2D) NIHIL Nomor: 900/750/XXXV/2015 tanggal 28 Desember 2015;
3.	Copy Legalisir Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) Nomor: 900/752/XXXV/2015 tanggal 28 Desember 2015; 
4.	Copy Legalisir Surat Pengantar Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor : 0042/SPP-GU/NIHIL/1.22.01/2015 Tahun 2015 tanggal 28 Desember 2015;
5.	Copy Legalisir Rincian Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0042/ SPP-GU/NIHIL/1.22.01/2015 Tahun 2015 tanggal 28 Desember 2015;
6.	Copy Legalisir Surat Permintaan Pembayaran Langsung Barang dan Jasa (SPP-LS Barang dan Jasa Nomor: 0042/SPP-GU/NIHIL/1.22.01/2015 Tahun 2015 tanggal 28 Desember 2015; 
7.	Copy Legalisir Surat Perintah Membayar (SPM) Nomor: 0042/SPM-GU/NIHIL/1.22.01/2015 tanggal 28 Desember 2015; 
8.	Copy Legalisir Surat Keputusan Kepala BPMPD Kab OKU Nomor: 410/948/KPTS/XXXV/2015 tentang Penetapan NamaNama Aparatur Pemerintah Desa Penerima Bahan Kain dan uang ahit Pakaian Dinas Dalam Kab. OKU tanggl 23-Desember 2016;
9.	Copy Legalisir Surat Perintah Pencairan Dana (SP2D) Nomor: 3109/SP2D-GU NIHIL/141.300.0001 tanggal 28 Desember 2015;
17.	1 (satu) Lembar Copy Legalisir Surat Pernyataan dari CV Tembulun SS Junyor tanggal 11 Desember 2015 tentang Kesanggupan Melaksanakan Pekerjaan Pengadaan Pakaian Dinas Aparatur Pemerintahan Desa Kab OKU Tahun 2015;
18.	1 (satu) Lembar Copy Legalisir Surat dari BPMPD Kab. OKU yang di tanda tangani Kepala BPMPD Kab OKU Sdr Drs. WIBISONO, MM kepada Pak Monang Napitupulu tentang Pekerjaan Pengadaan Pakaian Dinas Perangkat Desa di BPMPD Tahun 2015 di Kondisikan kepada Pak Monang Napitupulu; 
19.	1 (satu) Lembar Copy Legalisir Surat Permohonan Uji Kain Nomor: 027/671/XXXV/2015 tanggal 29 Oktober 2015; 
20.	3 (tiga) Lembar Copy Legalisir Laporan Hasil Uji Laboratorium dari Unit Industri Kerajinan dan Tekstil Dinas Perindustrian dan Energi Provinsi DKI Jakarta tanggal 10 November 2015;
21.	1 (satu) Lembar Copy Legalisir Surat Pernyatan dari Sdr EKO SAPUTRA selaku Direktur CV Tembulun SS Junyor tanggal 22 Desember 2015 tentang kekurangan bahan kain yang diadakan sesuai kontrak Nomor: 027/717/PDH Desa/XXXV/2015 tanggal 18 Desember 2015;
22.	1 (satu) Lembar Copy Legalisir Surat Permohonan Biaya Kegiatan Pengadaan Pakaian Dinas Kepala Desa, Perangkat Desa Dan BPD dari PPTK kepada Kepala BPMPD Kab. OKU;
23.	1 (satu) Lembar Copy Legalisir Nota Dinas dari Tim Pemeriksa/ Penerima Barang BPMPD Kab Oku kepada Kepala BPMPD Kab OKU tentang Laporan Hasil Pemeriksaan Bahan Kain Pakaian Dinas Perangkat Desa dan BPD Kab OKU tanggal 22 Desember 2015;
24.	1 (satu) Lembar Copy Legalisir Berita Acara Pemeriksaan Hasil Pekerjaan Pengadaan Bahan kain Pakaian Dinas Kepala Desa, 
25.	1 (satu) Lembar Asli Kwitansi Pembayaran dari Bendahara Pengeluaran Pembantu (Dra. ESPARIZA) kepada Sdr. Drs. WIBISONO, MM dengan jumlah uang sebesar Rp98.000.000,00 (sembilan puluh delapan juta rupiah) tertanggal 03 Desember 2015; 
26.	Satu bundel fotokopi legalisir berkas dokumen penawaran CV. Duta Sarana Sejahtera Nomor: 20/DSS/S-Pen/XII/2015, tanggal 03 Desember 2015;
27.	Satu bundel fotokopi legalisir berkas dokumen penawaran CV. PUTRA BERSAUDARA Nomor : 090/CV-PB/XII/2015, tanggal 01 Desember 2015; 
28.	Satu bundel fotokopi legalisir berkas dokumen penawaran CV. SARANA SUKSES SEJAHTERA Nomor : 14/S3/SPn/XII/2015, tanggal 03 Desember 2015; 
29.	Satu bundel fotokopi legalisir berkas dokumen penawaran CV. B PRODUCTION Nomor: 075/XII/CV.BP/2015, tanggal 01 Desember 2015; 
30.	Satu bundel fotokopi legalisir berkas dokumen penawaran CV. Tembulun SS Junyor Nomor : 024/CV.TSJ/XII/2015, tanggal 02 Desember 2015; 
31.	Satu bundel fotocofy legalisir berkas dokumen penawaran CV. MAHAMERU Nomor : 122/CV.M-Pb/XI/2015, tanggal 18 November 2015; 
32.	Satu bundel fotokopi legalisir berkas dokumen penawaran CV. CIPTA BUSANA Nomor : 082/CV.CB/XII/2015, tanggal 01 Desember 2015; 
33.	Satu bundel fotokopi legalisir berkas dokumen penawaran PT. MUTIARA BUNGA BANGSA Nomor : 005/SPH-ULG/OKU/MBB/XII/ 2015, tanggal 03 Desember 2015;
34.	Satu bundel fotokopi legalisir berkas Standar Dokumen Pengadaan Secara Elektronik/Pengadaan Barang, Metode e-Lelang Sederhana dengan Pascakualifikasi Nomor: 03/pokja IV barang/XI/BPMPD/ 2015, tanggal 16 November 2015;
35.	Satu bundel fotokopi legalisir berkas SUMMARY REPORT Kode Lelang 919401 dengan Nama Kegiatan Lelang Pengadaan Pakaian Dinas Aparatur Pemerintah Desa;
36.	Satu bundel fotokopi legalisir berkas Proses Pelelangan Pemilihan Langsung Pengadaan Barang, yang didalamnya terdapat suratsurat berupa:
1.	Fotokopi legalisir Surat dari Kabag Perlengkapan selaku Kepala ULP Nomor: 027/65/ULP/XI/2015, tanggal 13 November 2015. Perihal Pemilihan Penyedia Barang/Jasa;
2.	Fotokopi legalisir SK Bupati OKU Nomor: 66/KPTS/XI/2015, tanggal 3 Maret 2015. Tentang Kelompok Kerja Unit Layanan Pengadaan Barang/Jasa Kabupaten Ogan Komering Ulu berikut lampiran Surat Susunan Kelompok Kerja ULP Kab. OKU; 
3.	Fotokopi legalisir lembar Penelitian Administrasi CV. B PRODUCTION, tanpa tanggal Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU;
4.	Fotokopi legalisir lembar Evaluasi Kualifikasi CV. B PRODUCTION dan CV. Tembulun SS Junyor, tanpa tanggal Desember 2015 yang ditandatangani Pokja IV ULP Kab. OKU; 
5.	Fotokopi legalisir lembar Koreksi Aritmatik CV. B PRODUCTION, tanpa tanggal Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU; 
6.	Fotokopi legalisir Berita Acara Hasil Evaluasi Penawaran Nomor: 18.919401/Pokja IV.Barang/IX/2015, tanggal 01 Desember 2015, yang ditandatangani oleh Pokja IV ULP Kab. OKU; 
7.	Fotokopi legalisir Berita Acara Hasil Pelelangan (BAHP) Nomor : 19.919401/Pokja IV.Barang/XI/2015, tanggal 01 Desember 2015, yang ditandatangani oleh Pokja IV ULP Kab. OKU;
8.	Fotokopi legalisir Surat dari Pokja IV ULP Kab. OKU Nomor: 20.919401/Pokja IV.Barang/XI/2015, tanggal 05 Desember 2015. Perihal Undangan Pembuktian Kualifikasi;
9.	Fotokopi legalisir Berita Acara Pembuktian Kualifikasi Nomor: 20.919401/Pokja IV.Barang/XI/2015, tanggal 07 Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU;
10.	Fotokopi legalisir Berita Acara Pembuktian Kualifikasi Nomor: 20.919401/Pokja IV.Barang/XII/2015, tanggal 07 Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU;
11.	Fotokopi legalisir Surat Penetapan Pemenang Lelang Nomor: 21.919401/Pokja IV.Barang/XI/2015, tanggal 08 Desember 2015, ditandatangani oleh AZHARI.ST selaku ketua pokja; 
12.	Fotokopi legalisir Surat Pengumuman Pemenang Lelang Nomor : 22.881401/Pokja IV.Barang/IX/2015, tanggal 08 Desember 2015, ditandatangani oleh AZHARI, ST selaku Ketua Pokja;
37.	Satu bundel fotokopi legalisir berkas Proses Pelelangan Pemilihan Langsung Pengadaan Barang, yang didalamnya terdapat suratsurat berupa:
1.	Fotokopi legalisir Surat dari Kabag Perlengkapan Selaku Kepala ULP Nomor: 027/65/ULP/XI/2015, tanpa tanggal November 2015. Perihal Pemilihan Penyedia Barang/Jasa;
2.	Fotokopi legalisir SK Bupati OKU Nomor: 66/KPTS/XI/2015, tanggal 3 Maret 2015. Tentang Kelompok Kerja Unit Layanan Pengadaan Barang/Jasa Kabupaten Ogan Komering Ulu berikut lampiran Surat Susunan Kelompok Kerja ULP Kab. OKU; 
3.	Fotokopi legalisir lembar Penelitian Administrasi CV. Tembulun SS Junyor, tanpa tanggal Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU;
4.	Fotokopi legalisir lembar Evaluasi Kualifikasi CV. Tembulun SS Junyor, tanpa tanggal Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU;
5.	Fotokopi legalisir lembar Koreksi Aritmatik CV. Tembulun SS Junyor, tanpa tanggal Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU; 
6.	Fotokopi legalisir Berita Acara Hasil Evaluasi Penawaran Nomor: 18.919401/Pokja IV.Barang/XII/2015, tanggal 14 Desember 2015, yang ditandatangani oleh Pokja IV ULP Kab. OKU; 
7.	Fotokopi legalisir Berita Acara Hasil Pelelangan (BAHP) Nomor : 19.919401/Pokja IV.Barang/XII/2015, tanggal 14 Desember 2015, yang ditandatangani oleh Pokja IV ULP Kab. OKU; 
8.	Fotokopi legalisir Surat dari Pokja IV ULP Kab. OKU Nomor: 20.919401/Pokja IV.Barang/XI/2015, tanggal 12 Desember 2015. Perihal Undangan Pembuktian Kualifikasi; 
9.	Fotokopi legalisir Berita Acara Pembuktian Kualifikasi Nomor: 20.919401/Pokja IV.Barang/XI/2015, tanggal 14 Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU dan ZULFIKRI/CV Tembulun SS Junyor; 
10.	Fotokopi legalisir Berita Acara Pembuktian Kualifikasi Nomor: 20.919401/Pokja IV.Barang/XII/2015, tanggal 14 Desember 2015 yang ditandatangani oleh Pokja IV ULP Kab. OKU; 
11.	Fotokopi legalisir Berita Acara Klarifikasi dan Negoisasi Teknis dan Biaya Nomor: 11.2.919401/Pokja IV.Barang/XII/2015, tanggal 14 Desember 2015;
12.	Fotokopi legalisir Surat Penetapan Pemenang Lelang Nomor: 22.881401/Pokja IV.Barang/XII/2015, tanggal 15 Desember 2015, ditandatangani oleh AZHARI, ST selaku Ketua Pokja;
13.	Fotokopi legalisir Surat Pengumuman Pemenang Lelang Nomor: 21.919401/Pokja IV.Barang/XII/2015, tanggal 15 Desember 2015, ditandatangani oleh AZHARI, ST selaku Ketua Pokja;
38.	1 (satu) lembar asli Slip Tanda Terima Uang, sejumlah Rp75.000.000,00 (tujuh puluh lima juta rupiah) dari CV. TEMBULUN SS JUNYOR (Sdr EKO) kepada PT. SAVANA LESTARI JAKARTA, untuk pembayaran DP seragam bahan clip (biru 773 stell x 3meter dan pemda 1.001 stell x 3 meter); 
39.	1 (satu) lembar asli Slip Bukti Setoran Tunai Bank BCA, uang sebesar Rp94.850.000,00 dari Sdr EKO SAPUTRA (CV. Tembulun SS Junyor) kepada PT. Savana Lestari (No Rek : 335.303.4908), tanggal 22-12-2015;
40.	1 (satu) lembar asli Surat Jalan (Pengiriman Barang) dari PT. Savana Lestari, kepada/Tujuan CV. Tembulun SS Junyor, tanggal 15 Desember 2015;
41.	1 (satu) lembar asli Surat Jalan (Pengiriman Barang) dari PT. Savana Lestari, kepada/Tujuan CV. Tembulun SS Junyor, tgl 19 Desember 2015; 
42.	1 (satu) lembar asli Surat Jalan (Pengiriman Barang) dari PT. Savana Lestari, kepada/Tujuan CV. Tembulun SS Junyor/Baturaja Palembang, tgl 28 Desember 2015; 
43.	1 (satu) lembar asli Surat Jalan (Pengiriman Barang) dari PT. Savana Lestari, kepada/Tujuan CV. Tembulun SS Junyor/Baturaja Palembang, tgl 29 Desember 2015; 
44.	6 (enam) lembar asli Slip Bukti Setor Tunai Via ATM dari Sdr EKO SAPUTRA (CV. Tembulun SS Junyor) kepada PT. Savana Lestari. tanggal 24 Desember 2015, terdiri dari: 
1.	Transaksi setoran uang sebesar Rp1.800.000,00 (satu juta delapan ratus ribu rupiah) pada pukul 17:20:45 WIB; • Transaksi setoran uang sebesar Rp2.500.000,00 (dua juta lima ratus ribu rupiah) pada pukul 17:22:01 WIB;
2.	Transaksi setoran uang sebesar Rp2.500.000,00 (dua juta lima ratus ribu rupiah) pada pukul 17:23:07 WIB; 
3.	Transaksi setoran uang sebesar Rp2.500.000,00 (dua juta lima ratus ribu rupiah) pada pukul 17:24:09 WIB; • Transaksi setoran uang sebesar Rp2.350.000,00 (dua juta tiga ratus lima puluh ribu rupiah) pada pukul 17:25:10 WIB; • Transaksi setoran uang sebesar Rp2.500.000,00 (dua juta lima ratus ribu rupiah) pada pukul 17:26:11 WIB;
45.	7 (tujuh) lembar asli Slip Bukti Setor Tunai Via ATM dari Sdr EKO SAPUTRA (CV. Tembulun SS Junyor) kepada PT. Savana Lestari. tanggal 25 Desember 2015, terdiri dari :
1.	Transaksi setoran uang sebesar Rp2.500.000,00 (dua juta lima ratus ribu rupiah) pada pukul 10:47:26 WIB; 
2.	Transaksi setoran uang sebesar Rp2.500.000,00 (dua juta lima ratus ribu rupiah) pada pukul 10:48:30 WIB; 
3.	Transaksi setoran uang sebesar Rp4.900.000,00 (empat juta sembilan ratus ribu rupiah) pada pukul 10:49:37 WIB; 
4.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 10:50:56 WIB;
5.	Transaksi setoran uang sebesar Rp4.100.000,00 (empat juta seratus ribu rupiah) pada pukul 11:09:12 WIB; 
6.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 11:10:14 WIB; 
7.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 11:11:24 WIB;
46.	9 (sembilan) lembar asli Slip Bukti Setor Tunai Via ATM dari Sdr EKO SAPUTRA (CV. Tembulun SS Junyor) kepada PT. Savana Lestari tanggal 26 Desember 2015, terdiri dari:
1.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 12:41:30 WIB;
2.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 12:42:39 WIB;
3.	Transaksi setoran uang sebesar Rp4.000.000,00 (empat juta rupiah) pada pukul 12:43:52 WIB;
4.	Transaksi setoran uang sebesar Rp4.400.000,00 (empat juta empat ratus ribu rupiah) pada pukul 12:45:11 WIB; 
5.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 12:46:22 WIB;
6.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 12:48:04 WIB;
7.	Transaksi setoran uang sebesar Rp5.000.000,00 (lima juta rupiah) pada pukul 12:51:28 WIB; 
8.	Transaksi setoran uang sebesar Rp2.600.000,00 (dua juta enam ratus ribu rupiah) pada pukul 12:52:40 WIB;
9.	Transaksi setoran uang sebesar Rp1.700.000,00 (satu juta tujuh ratus ribu rupiah) pada pukul 12:53:47 WIB;
47.	1(satu) lembar asli Print Out Bank Sumsel an CV. Tembulun SS Junyor Nomor Rekening 141-30-50742 tanggal 01 Desember 2015 sampai dengan 01 Agustus 2016;
48.	1 (satu) lembar asli Cek Bank Sumsel Babel No. Cek CD 083313 tertanggal 23 Desember 2015. Yang di tanda tangani dan berstampel CV Tembulun SS Junyor dengan nilai Rp35.000.000,00 (tiga puluh lima juta rupiah); 
49.	1 (satu) lembar fotokopi legalisir Surat Nomor : 22.A/Pokja IV.Barang/XII/2015 tanggal 11 Desember 2015 tentang Laporan Sementara Hasil Evaluasi Ulang Pokja IV Barang ULP Kab. OKU kepada Kaban BPMD selaku PA/PPK; 
50.	1 (satu) lembar legalisir Surat Nomor: 01.1/PPK-PMD/XXXV/2015 tanggal 08 Desember 2015 tentang Sanggahan Hasil Penetapan Pemenang dari Kepala BPMPD Kab. OKU selaku PA/PPK kepada Ketua Pokja IV ULP Kab. OKU;
51.	1 (satu) lembar legalisir Surat Nomor : 021.1/PPK-PMD/XXXV/2015 tanggal 14 Desember 2015 tentang Laporan Hasil Evaluasi Ulang Sementara dari Kepala BPMPD Kab. OKU selaku PA/PPK kepada Ketua Pokja IV ULP Kab. OKU;
Dikembalikan kepada yang berhak;
5.	Menetapkan agar Terdakwa, membayar biaya perkara sebesar Rp5.000,00 (lima ribu rupiah);
Membaca Putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang Nomor 25/Pid.Sus-TPK/2017/PN Plg tanggal 6 November 2017 yang amar lengkapnya sebagai berikut:
1.	Menyatakan Terdakwa Eko Saputra, Amd bin Romzi tidak terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana sebagaimana dakwaan Primair Penuntut Umum; 
2.	Membebaskan Terdakwa oleh karena itu dari dakwaan tersebut Primair Penuntut Umum; 
3.	Menyatakan Terdakwa Eko Saputra, Amd bin Romzi terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana Korupsi Secara Bersama-sama sebagaimana dakwaan Subsidair Penuntut Umum;
4.	Menjatuhkan pidana terhadap Terdakwa tersebut oleh karena itu dengan pidana penjara selama 2 (dua) tahun pidana, dan denda sebesar Rp100.000.000,00 (seratus juta rupiah), dengan ketentuan apabila denda tidak dibayar maka diganti dengan pidana kurungan selama 2 (dua) bulan; Menghukum Terdakwa untuk membayar uang pengganti sebesar Rp146.611.382,00 (seratus empat puluh enam juta enam ratus sebelas ribu tiga ratus delapan puluh dua rupiah), dengan ketentuan apabila Terdakwa tidak membayar uang pengganti paling lama dalam waktu 1 (satu) bulan setelah putusan ini memperoleh kekuatan hukum tetap, maka harta benda Terdakwa tersebut dapat disita oleh Jaksa dengan dilelang untuk mencukupi uang pengganti tersebut; dan dalam hal Terdakwa tidak mempunyai harta benda yang mencukupi untuk membayar uang pengganti tersebut, maka diganti dengan pidana penjara selama 2 (dua) bulan; 
5.	Menetapkan masa penangkapan dan penahanan yang telah dijalani Terdakwa, dikurangkan seluruhnya dari pidana yang dijatuhkan; 
6.	Menetapkan Terdakwa tetap ditahan;
7.	Menetapkan barang bukti berupa: Barang bukti Nomor 1 sampai dengan Nomor 51, selengkapnya sebagaimana dalam Tuntutan Penuntut Umum; dan barang bukti nomor 52 berupa Uang tunai sejumlah Rp26.611.382,00 (dua puluh enam juta enam ratus sebelas ribu tiga ratus delapan puluh dua rupiah) yang dititipkan Terdakwa kepada Jaksa Penuntut Umum sebagaimana Bukti Titipan; Dikembalikan kepada Penuntut Umum untuk dijadikan sebagai barang bukti dalam perkara atas nama Terdakwa lainnya yaitu perkara Nomor 26 atas nama Terdakwa Drs. Wibisono, MM.;
8.	Membebankan biaya perkara sebesar Rp5.000,00 (lima ribu rupiah) kepada Terdakwa; Membaca Putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Tinggi Palembang Nomor 13/PID.SUS-TPK/2017/PT PLG tanggal 16 Januari 2018 yang amar lengkapnya sebagai berikut : 
1.	Menerima permintaan banding dari Jaksa Penuntut Umum; 
2.	Menguatkan Putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang tanggal 6 November 2017 Nomor 25/Pid.Sus-TPK/2017/PN Plg yang dimintakan banding tersebut; 
3.	Memerintahkan agar Terdakwa tetap berada dalam tahanan;
4.	Membebankan biaya perkara kepada Terdakwa dalam kedua tingkat peradilan yang dalam tingkat banding sebesar Rp5.000,00 (lima ribu rupiah);
Membaca Akta Permohonan Kasasi Nomor 02/Akta.Pid.SusTPK/2018/PN Plg yang dibuat oleh Panitera pada Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang, yang menerangkan bahwa pada tanggal 26 Januari 2018, Penuntut Umum pada Kejaksaan Negeri Ogan Komering Ulu mengajukan permohonan kasasi terhadap putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Tinggi Palembang tersebut; Membaca Memori Kasasi (tanpa tanggal) Januari 2018 dari Penuntut Umum pada Kejaksaan Negeri Ogan Komering Ulu tersebut sebagai Pemohon Kasasi, yang diterima di Kepaniteraan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang pada tanggal 7 Februari 2018; 
Membaca pula surat-surat lain yang bersangkutan; 
Menimbang bahwa putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Tinggi Palembang tersebut telah diberitahukan kepada Penuntut Umum pada Kejaksaan Negeri Ogan Komering Ulu pada tanggal 26 Januari 2018 dan Penuntut Umum tersebut mengajukan permohonan kasasi pada tanggal 26 Januari 2018 serta memori kasasinya telah diterima di Kepaniteraan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang pada tanggal 7 Februari 2018. Dengan demikian, permohonan kasasi beserta dengan alasan-alasannya telah diajukan dalam tenggang waktu dan dengan cara menurut undang-undang, oleh karena itu permohonan kasasi Penuntut Umum tersebut secara formal dapat diterima; 
Menimbang bahwa alasan kasasi yang diajukan Pemohon Kasasi/Penuntut Umum dalam memori kasasi selengkapnya termuat dalam berkas perkara; 
Menimbang bahwa terhadap alasan kasasi yang diajukan Pemohon Kasasi/Penuntut Umum tersebut, Mahkamah Agung berpendapat sebagai berikut: 
Bahwa alasan kasasi Pemohon Kasasi/Penuntut Umum dapat dibenarkan karena judex facti salah menerapkan hukum dalam mengadili perkara Terdakwa a quo dengan pertimbangan sebagai berikut:
1.	Bahwa alasan permohonan kasasi Penuntut Umum mengenai adanya kesalahan penerapan hukum atau penerapan hukum tidak sebagaimana mestinya mengenai hukum pembuktian tentang dakwaan Penuntut Umum yang dinyatakan terbukti yang dilakukan oleh judex facti (Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang dan Pengadilan Tindak Pidana Korupsi pada Pengadilan Tinggi Palembang dapat dibenarkan karena judex facti telah salah menerapkan hukum dalam mengadili Terdakwa dalam perkara a quo; 
2.	Bahwa putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Tinggi Palembang yang menguatkan putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang karena Terdakwa terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana korupsi secara bersama-sama sebagaimana dalam dakwaan subsidair, berdasarkan pertimbangan hukum yang salah; 
Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang salah menerapkan hukum atau menerapkan hukum tidak sebagaimana mestinya karena menyimpulkan bahwa dakwaan Penuntut Umum yang terbukti adalah dakwaan subsidair, bukan dakwaan primair berdasarkan pertimbangan bahwa apabila dicermati dasar hukum dan fakta-fakta hukum diatas, maka jelas kerugian keuangan Negara yang ditimbulkan oleh Terdakwa Eko Saputra, A.Md. sebesar Rp27.169.800,00 (dua puluh tujuh juta seratus enam puluh sembilan ribu delapan ratus rupiah), sehingga ini bukanlah masuk kwalifikasi memperkaya diri sendiri sebagaimana dalam Pasal 2 ayat (1) bila dihubungkan dengan Hasil Rumusan Rapat Kamar Mahkamah Agung Republik Indonesia, Tangerang 8 s/d 10 Maret 2012, dan oleh karenanya maka Terdakwa harus dinyatakan tidak terbukti melakukan Tindak Pidana Korupsi sebagaimana dalam dakwaan Primair Penuntut Umum; oleh karena Majelis Hakim telah menyatakan tidak terbukti melakukan Tindak Pidana Korupsi sebagaimana dalam dakwaan Primair Penuntut Umum, maka Terdakwa harus dibebaskan dakwaan Primair Penunut Umum tersebut; Bahwa pertimbangan judex facti tersebut jelas keliru karena judex facti salah memahami konsep perbedaan ketentuan Pasal 2 Ayat (1) dengan Pasal 3 Undang-Undang Nomor 31 Tahun 1999 sebagaimana telah diubah dengan Undang-Undang Nomor 20 Tahun 2001 mengenai unsurunsur Pasal 2 ayat (1) dan pasal 3 Undang-undang tindak pidana korupsi; Menurut Yurisprudensi Mahkamah Agung dan Kebijakan Kamar Pidana Mahkamah Agung RI yang menentukan bahwa perbedaan Pasal 2 Ayat (1) dan Pasal 3 Undang-Undang Nomor 31 Tahun 1999 sebagaimana telah diubah dengan Undang-Undang Nomor 20 Tahun 2001 tidak terletak pada unsur subyek pelaku tindak pidana dan unsur melawan hukum, tetapi pada unsur menguntungkan diri sendiri, orang lain atau korporasi dan unsur memperkaya diri sendiri, orang lain atau korporasi, dan unsur besar kecilnya kerugian negara yang ditimbulkan oleh tindak pidana korupsi; Jika kerugian negara itu relatif besar, maka masuk kualifikasi pelanggaran Pasal 2 Ayat (1) Undang-Undang Nomor 31 Tahun 1999 sebagaimana telah diubah dengan Undang-Undang Nomor 20 Tahun 2001, namun jika kerugian negara yang ditimbulkan tindak pidana korupsi relatif kecil, maka masuk kualifikasi Pasal 3  UndangUndang Nomor 31 Tahun 1999 sebagaimana telah diubah dengan Undang-Undang Nomor 20 Tahun 2001; Dengan demikian, berdasarkan fakta hukum persidangan:
	Terdakwa selaku Direktur CV. Tembulun SS Junyor yang bergerak di bidang jasa konstruksi dan bangunan sipil mengikuti kegiatan Pengadaan Bahan Pakaian Dinas Aparatur Pemerintahan Desa yang dianggarkan dalam APBD Kabupaten OKU tahun 2015 senilai Rp603.160.000,00 (enam ratus tiga juta seratus enam puluh ribu rupiah) disamping upah jahit sebesar Rp283.840.000,00 (dua ratus delapan puluh tiga juta delapan ratus empat puluh ribu rupiah) sehingga seluruhnya berjumlah Rp985.000.000,00 (sembilan ratus delapan puluh lima juta rupiah);
	Terdakwa dinyatakan sebagai pemenang tender Pengadaan Barang/ Jasa secara elektornik, walaupun tidak layak karena secara teknis dalam dokumen penawaran terdapat kekurangan/tidak melampirkan surat dukungan berupa STNK armada pengangkutan dan tidak melampirkan surat dukungan Distributor;
	Perusahaan Terdakwa juga tidak memiliki Surat Ijin Usaha Perdagangan, tidak dapat menunjukkan asli surat hasil pengujian laboratorium bahan kain yang ditawarkan, dan spesifikasi barang tidak sesuai dengan spesifikasi yang dipersyaratkan oleh PPK;
	Setelah dilakukan pengujian, bahan kain yang digunakan oleh Terdakwa untuk melaksanakan Pengadaan Pakaian Dinas tersebut ternyata tidak memenuhi spesifikasi PPK sehingga menurut perhitungan BPKP Perwakilan Provinsi Sumatra Selatan menimbulkan kerugian keuangan Negara sebesar Rp319.611.382,00 (tiga ratus sembilan belas juta enam ratus sebelas ribu tiga ratus delapan puluh dua rupiah);
3.	Bahwa fakta hukum yang benar yang terungkap di persidangan tersebut bersesuaian secara yuridis dengan unsur-unsur tindak pidana yang terdapat dalam Pasal 2 ayat (1) Undang-Undang Nomor 31 Tahun 1999 sebagaimana dubah dengan Undang-Undang Nomor 20 Tahun 2001 yang didakwakan Penuntut Umum dalam dakwaan primair yang terdiri dari unsur setiap orang, dengan sengaja memperkaya diri sendiri atau orang lain atau suatu korporasi dan unsur merugikan keuangan negara atau perekonomian negara, sehingga Terdakwa dinyatakan terbukti melakukan tindak pidana korupsi sebagaimana dakwaan primair;
4.	Bahwa karena Terdakwa adalah subyek hukum yang mampu bertanggung jawab atas perbuatan yang dilakukannya, tidak ada alasan pembenar dan alasan pemaaf dalam diri dan perbuatan Terdakwa, maka Terdakwa harus dinyatakan terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana korupsi dan oleh karena itu Terdakwa dijatuhi pidana yang setimpal dengan perbuatannya; 
Menimbang bahwa berdasarkan pertimbangan di atas, perbuatan Terdakwa telah memenuhi unsur-unsur pidana dalam Pasal 2 Ayat (1) Undang-Undang Republik Indonesia Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi sebagaimana diubah dan ditambah dengan Undang-Undang Republik Indonesia Nomor 20 Tahun 2001 tentang Perubahan atas Undang-Undang Republik Indonesia Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi jo. Pasal 55 Ayat (1) ke-1 KUHPidana sebagaimana didakwakan dalam dakwaan Primair, oleh karena itu Terdakwa tersebut telah terbukti bersalah dan dijatuhi pidana; 
Menimbang bahwa dengan demikian terdapat cukup alasan untuk mengabulkan permohonan kasasi dari Pemohon Kasasi/Penuntut Umum tersebut dan membatalkan Putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Tinggi Palembang Nomor 13/Pid.Sus-TPK/2017/PT PLG tanggal 16 Januari 2018 yang menguatkan Putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang Nomor 25/Pid.SusTPK/2017/PN Plg tanggal 6 November 2017 untuk kemudian Mahkamah Agung mengadili sendiri perkara ini dengan amar putusan sebagaimana yang akan disebutkan di bawah ini; Menimbang bahwa sebelum menjatuhkan pidana Mahkamah Agung akan mempertimbangkan keadaan yang memberatkan dan meringankan bagi Terdakwa;
Keadaan yang memberatkan: 
	Perbuatan Terdakwa tidak mendukung program pemerintah dalam pemberantasan tindak pidana korupsi di tanah air;
	Perbuatan Terdakwa mengakibatkan timbulnya kerugian keuangan negara yang nilainya relatif besar;
Keadaan yang meringankan:
	Terdakwa mempunyai tanggungan keluarga; 
	Menimbang bahwa karena Terdakwa dipidana, maka dibebani untuk membayar biaya perkara pada tingkat kasasi;
Mengingat Pasal 2 Ayat (1) Undang-Undang Republik Indonesia Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi sebagaimana diubah dan ditambah dengan Undang-Undang Republik Indonesia Nomor 20 Tahun 2001 tentang Perubahan atas Undang-Undang Republik Indonesia Nomor 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi jo. Pasal 55 Ayat (1) ke-1 KUHPidana, Undang-Undang Nomor 8 Tahun 1981 tentang Hukum Acara Pidana, Undang-Undang Nomor 48 Tahun 2009 tentang Kekuasaan Kehakiman dan Undang-Undang Nomor 14 Tahun 1985 tentang Mahkamah Agung sebagaimana telah diubah dengan Undang-Undang Nomor 5 Tahun 2004 dan Perubahan Kedua dengan Undang-Undang Nomor 3 Tahun 2009 serta peraturan perundangundangan lain yang bersangkutan;


MENGADILI:
	Mengabulkan permohonan kasasi dari Pemohon Kasasi/Penuntut Umum pada Kejaksaan Negeri Ogan Komering Ulu tersebut;
	Membatalkan Putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Tinggi Palembang Nomor 13/Pid.Sus-TPK/2017/PT PLG tanggal 16 Januari 2018 yang menguatkan Putusan Pengadilan Tindak
	Pidana Korupsi pada Pengadilan Negeri Palembang Nomor 25/Pid.SusTPK/2017/PN Plg tanggal 6 November 2017 tersebut;
MENGADILI SENDIRI:
1.	Menyatakan Terdakwa Eko Saputra, Amd bin Romzi terbukti secara sah dan meyakinkan bersalah melakukan tindak pidana korupsi secara bersama-sama; 
2.	Menjatuhkan pidana kepada Terdakwa oleh karena itu dengan pidana penjara selama 4 (empat) tahun dan pidana denda sebesar Rp200.000.000,00 (dua ratus juta rupiah) dengan ketentuan apabila pidana denda tersebut tidak dibayar, maka diganti dengan pidana kurungan selama 6 (enam) bulan;
3.	Menjatuhkan pidana tambahan kepada Terdakwa untuk membayar uang pengganti sebesar Rp146.611.382,00 (seratus empat puluh enam juta enam ratus sebelas ribu tiga ratus delapan puluh dua rupiah), jika Terpidana tidak membayar uang pengganti paling lama dalam waktu 1 (satu) bulan sesudah putusan pengadilan yang telah memperoleh kekuatan hukum tetap, maka harta bendanya dapat disita oleh Jaksa dan dilelang untuk menutupi uang pengganti tersebut, dalam hal Terpidana tidak mempunyai harta benda yang mencukupi untuk membayar uang pengganti, maka dipidana dengan pidana penjara selama 1 (satu) tahun; 
4.	Menetapkan masa penahanan yang telah dijalani oleh Terdakwa dikurangkan seluruhnya dari pidana yang dijatuhkan;
5.	Menetapkan Terdakwa tetap ditahan; 
6.	Menetapkan barang bukti berupa: 
Barang bukti Nomor 1 sampai dengan Nomor 52 yang selengkapnya sebagaimana tersebut dalam amar Putusan Pengadilan Tindak Pidana Korupsi pada Pengadilan Negeri Palembang Nomor 25/Pid.SusTPK/2017/PN Plg tanggal 6 November 2017; Dikembalikan kepada Penuntut Umum untuk dijadikan sebagai barang bukti dalam perkara atas nama Terdakwa lainnya yaitu Perkara No. 26 atas nama Terdakwa Drs. Wibisono, MM;
7.	Membebankan kepada Terdakwa untuk membayar biaya perkara pada tingkat kasasi sebesar Rp2.500,00 (dua ribu lima ratus rupiah);
Demikianlah diputuskan dalam rapat musyawarah Majelis Hakim pada hari Rabu, tanggal 4 Juli 2018 oleh Dr. Salman Luthan, S.H., M.H. Hakim Agung yang ditetapkan oleh Ketua Mahkamah Agung sebagai Ketua Majelis, H. Syamsul Rakan Chaniago, S.H., M.H. dan Prof. Dr. Krisna Harahap, S.H., M.H., Hakim-Hakim ad hoc Tindak Pidana Korupsi pada Mahkamah Agung sebagai Hakim-Hakim Anggota, putusan tersebut diucapkan dalam sidang terbuka untuk umum pada hari dan tanggal itu juga, oleh Ketua Majelis yang dihadiri Hakim-Hakim Anggota serta Dwi Sugiarto, S.H., M.H., Panitera Pengganti dengan tidak dihadiri oleh Penuntut Umum dan Terdakwa.
Hakim - Hakim Anggota,	Ketua Majelis,
ttd./H. Syamsul Rakan Chaniago,S.H.,M.H. 	ttd./Dr. Salman Luthan,S.H.,M.H.
ttd./Prof. Dr. Krisna Harahap,S.H.,M.H.	

Panitera Pengganti,
ttd./Dwi Sugiarto, S.H., M.H.
Untuk salinan Mahkamah Agung RI a.n. Panitera Panitera Muda Pidana Khusus

Suharto, S.H., M.Hum. 
NIP. 19600613 1985031 002


Hal. 17 dari 17 hal. Putusan Nomor 57 K/Pid.Sus/2018`,
  nomorPutusan:'',
  perbuatanTerdakwa:'',
  judul:'',
  primair:'',
  file:'',
  subsidiair:'',
  subsidair:'',
  pertimbanganDakwaan:'',
  yurisprudensi:'',
  faktorPemberat:'',
  faktorPeringan:'',
  pasalKasasi:'',
  done:false,
  loading:false,
  value:0,
  }),

  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async dataPutusan(){
      // console.log('putusan', this.putusan1)
      this.done = false
      this.loading = true
      setTimeout(() => {
        this.getNoPutusan()
        this.getPerbuatanTerdakwa()
        this.getPrimSub()
        this.getPertimbanganDakwaan()
        this.getYurisprudensi()
        this.getFaktorPemberat()
        this.getFaktorPeringan()
        this.getPasalKasasi()
        this.done = true
        this.loading = false
      }, 5000)
    },
    getNoPutusan(){
      let x = this.putusan1.toLowerCase().search('nomor')
      let y = this.putusan1.substr(x).toLowerCase().search('demi')
      this.nomorPutusan = this.putusan1.slice(x, x+y);
      // console.log('x', x)
      // console.log('y', y)
      // console.log('nomor putusan', this.nomorPutusan)
    },
    getPerbuatanTerdakwa(){
      let x = this.putusan1.toLowerCase().search('menyatakan terdakwa')
      let y = this.putusan1.substr(x).toLowerCase().search(';')
      this.perbuatanTerdakwa = this.putusan1.slice(x, x+y);
      console.log('x', x)
      console.log('y', y)
      console.log('perbuatanTerdakwa', this.perbuatanTerdakwa)
    },
    getPrimSub(){
      let x = this.putusan1.toLowerCase().search('primair')
      let y = this.putusan1.substr(x).toLowerCase().search(';')
      this.primair = this.putusan1.slice(x, x+y);

      let f = this.putusan1.toLowerCase().search('subsidiair')
      let g = this.putusan1.substr(f).toLowerCase().search(';')
      this.subsidiair = this.putusan1.slice(f, f+g);

      let a = this.putusan1.toLowerCase().search('subsidair')
      let b = this.putusan1.substr(a).toLowerCase().search(';')
      this.subsidair = this.putusan1.slice(a, a+b);
    },
    getPertimbanganDakwaan(){
      
      if (this.putusan1.toLowerCase().search('tidak membebaskan terdakwa') == -1) {
        let x = this.putusan1.toLowerCase().search('membebaskan terdakwa')
        let y = this.putusan1.substr(x).toLowerCase().search(';')
        this.pertimbanganDakwaan = this.putusan1.slice(x, x+y);
      }else{
        let x = this.putusan1.toLowerCase().search('tidak membebaskan terdakwa')
        let y = this.putusan1.substr(x).toLowerCase().search(';')
        this.pertimbanganDakwaan = this.putusan1.slice(x, x+y);
      }
      // console.log('dd', this.pertimbanganDakwaan)
    },
    getYurisprudensi(){
      let x = this.putusan1.toLowerCase().search('yurisprudensi')
      let y = this.putusan1.substr(x).toLowerCase().search(';')
      this.yurisprudensi = this.putusan1.slice(x, x+y);
    },
    getFaktorPemberat(){
      let x = this.putusan1.toLowerCase().search('keadaan yang memberatkan:')
      let y = this.putusan1.substr(x).toLowerCase().search('keadaan yang meringankan')
      this.faktorPemberat = this.putusan1.slice(x, x+y);
    },
    getFaktorPeringan(){
      let x = this.putusan1.toLowerCase().search('keadaan yang meringankan:')
      let y = this.putusan1.substr(x).toLowerCase().search('menimbang bahwa')
      this.faktorPeringan = this.putusan1.slice(x, x+y);
    },
    getPasalKasasi(){
      if (this.putusan1.toLowerCase().search('mengingat pasal') != -1) {
        let x = this.putusan1.toLowerCase().search('mengingat pasal')
        let y = this.putusan1.substr(x).toLowerCase().search(';')
        this.pasalKasasi = this.putusan1.slice(x, x+y);
      }
      if(this.putusan1.toLowerCase().search('memperhatikan pasal') != -1){
        let x = this.putusan1.toLowerCase().search('memperhatikan pasal')
        let y = this.putusan1.substr(x).toLowerCase().search(';')
        this.pasalKasasi = this.putusan1.slice(x, x+y);
      }
    },

    async download(){
        var doc = new jsPDF('p', 'px', [700,900]);
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
            margin:[20,15,20,15],
            callback: function(doc) {
                doc.save(nama);
            },
            x: 10,
            y: 10,
        });
    },
    async updateFile(){
      // const pdf = require("pdf-extraction");
      // console.log('hhg', [this.file])
      // const text = await new Response(this.file).text();
      // console.log('text', text)
      // const fs = require('fs')
      // const pdfparse = require('pdf-parse')
      // const pdfFile = fs.readFileSync('/static/karakterisasi (11).pdf')
      // pdfparse(pdfFile).then(function(data){
      //   console.log(data.text)
      // })
    },
    readInput(){
      const file = this.file
      const reader = new FileReader()
      reader.onload = e => this.putusan1 = e.target.result
      reader.readAsText(this.file)
    }
  },
  created(){
    // this.getUser()
  },
}
</script>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
