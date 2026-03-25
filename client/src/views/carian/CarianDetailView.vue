<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Download, Printer, BookmarkPlus, ArrowLeft } from "lucide-vue-next";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();

const awardId = computed(() => Number(route.params.id) || 1);

const award = {
  id: awardId.value,
  awardNo: "Award No. 245/2025",
  caseNo: "MP(S)/1-0150/2025",
  title: "Ahmad bin Hassan lwn. Syarikat ABC Sdn Bhd",
  caseType: "Pembuangan Kerja",
  chairmanName: "YA Tuan Mohd Rizal bin Abdul Rahman",
  decidedAt: "15 November 2025",
  claimant: "Ahmad bin Hassan",
  respondent: "Syarikat ABC Sdn Bhd",
  claimantLawyer: "Pn. Norashikin binti Yusof (Tetuan Norashikin & Co.)",
  respondentLawyer: "En. David Tan Wei Ming (Tetuan David Tan & Associates)",
};

const awardText = `<p class="mb-4">Ini adalah award yang dikeluarkan di bawah Seksyen 30(5) Akta Perhubungan Perusahaan 1967 berkenaan dengan rujukan Menteri Sumber Manusia bertarikh 15 Januari 2025.</p>

<p class="mb-4">Pihak Yang Menuntut, Ahmad bin Hassan, telah berkhidmat dengan Pihak Syarikat selama 12 tahun sebagai Pengurus Operasi. Pada 1 Ogos 2024, beliau telah diberitahu secara lisan oleh Pengarah Urusan bahawa perkhidmatan beliau tidak lagi diperlukan dan diminta untuk mengosongkan meja beliau pada hari tersebut. Tiada surat rasmi <mark>pembuangan kerja</mark> dikeluarkan pada masa tersebut.</p>

<p class="mb-4">Mahkamah telah meneliti keterangan yang dikemukakan oleh kedua-dua pihak. Pihak Syarikat mendakwa bahawa Pihak Yang Menuntut telah melakukan kesalahan serius berkaitan dengan pengurusan projek utama yang menyebabkan kerugian kepada syarikat. Walau bagaimanapun, Mahkamah mendapati bahawa dakwaan ini tidak disokong oleh bukti dokumentasi yang mencukupi. Tiada surat tunjuk sebab atau siasatan dalaman dijalankan sebelum <mark>pembuangan</mark> dilaksanakan.</p>

<p class="mb-4">Berdasarkan prinsip yang ditetapkan dalam kes <em>Milan Auto Sdn Bhd lwn. Wong Seh Yen [1995] 3 MLJ 537</em>, beban pembuktian terletak kepada majikan untuk membuktikan bahawa <mark>pembuangan kerja</mark> adalah dengan sebab atau alasan yang adil. Dalam kes ini, Pihak Syarikat gagal memenuhi beban tersebut. Mahkamah juga mendapati bahawa prosedur yang sepatutnya tidak dipatuhi, bertentangan dengan prinsip keadilan asasi.</p>

<p class="mb-4"><strong>AWARD:</strong> Mahkamah dengan ini memerintahkan Pihak Syarikat membayar pampasan sebanyak RM85,000.00 (Ringgit Malaysia Lapan Puluh Lima Ribu sahaja) sebagai ganti pengembalian semula, dengan mengambil kira tempoh perkhidmatan dan gaji terakhir Pihak Yang Menuntut. Bayaran hendaklah dibuat dalam tempoh 30 hari dari tarikh award ini.</p>`;

const relatedAwards = [
  { id: 2, awardNo: "Award No. 189/2025", title: "Rajesh a/l Kumar lwn. XYZ Manufacturing" },
  { id: 3, awardNo: "Award No. 312/2024", title: "Lim Mei Ling lwn. Global Services" },
  { id: 5, awardNo: "Award No. 278/2024", title: "Siti Fatimah lwn. HRTech Solutions" },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Carian Pintar', to: '/admin/carian' }, { label: 'Butiran Award' }]" />
    <!-- Back -->
    <button
      class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      @click="router.push('/admin/carian')"
    >
      <ArrowLeft class="h-4 w-4" />
      Kembali ke Carian
    </button>

    <!-- Header -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-blue-600">{{ award.awardNo }}</span>
          <span class="text-sm text-slate-400">|</span>
          <span class="text-sm text-slate-500">{{ award.caseNo }}</span>
        </div>
        <h1 class="mt-1 text-xl font-bold text-slate-900">{{ award.title }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <button class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Download class="h-4 w-4" />
          Muat Turun PDF
        </button>
        <button class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <Printer class="h-4 w-4" />
          Cetak
        </button>
        <button class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
          <BookmarkPlus class="h-4 w-4" />
          Simpan ke Senarai
        </button>
      </div>
    </div>

    <!-- Two-Column Layout -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Left: Full Award Text -->
      <div class="lg:col-span-2">
        <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-base font-semibold text-slate-900">Teks Award Penuh</h2>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="prose prose-sm max-w-none text-slate-700" v-html="awardText"></div>
        </div>
      </div>

      <!-- Right: Metadata Sidebar -->
      <div class="space-y-4 lg:col-span-1">
        <!-- Metadata Card -->
        <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="mb-4 text-sm font-semibold text-slate-900">Maklumat Award</h3>
          <dl class="space-y-3">
            <div>
              <dt class="text-xs font-medium text-slate-500">No. Award</dt>
              <dd class="mt-0.5 text-sm text-slate-900">{{ award.awardNo }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-slate-500">No. Kes</dt>
              <dd class="mt-0.5 text-sm text-slate-900">{{ award.caseNo }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-slate-500">Jenis Kes</dt>
              <dd class="mt-0.5 text-sm text-slate-900">{{ award.caseType }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-slate-500">Pengerusi</dt>
              <dd class="mt-0.5 text-sm text-slate-900">{{ award.chairmanName }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium text-slate-500">Tarikh Keputusan</dt>
              <dd class="mt-0.5 text-sm text-slate-900">{{ award.decidedAt }}</dd>
            </div>
            <div class="border-t border-slate-100 pt-3">
              <dt class="text-xs font-medium text-slate-500">Pihak-Pihak</dt>
              <dd class="mt-1 space-y-1">
                <p class="text-sm text-slate-900"><span class="text-xs text-slate-500">Pihak Menuntut:</span> {{ award.claimant }}</p>
                <p class="text-xs text-slate-500">{{ award.claimantLawyer }}</p>
                <p class="mt-1 text-sm text-slate-900"><span class="text-xs text-slate-500">Pihak Menentang:</span> {{ award.respondent }}</p>
                <p class="text-xs text-slate-500">{{ award.respondentLawyer }}</p>
              </dd>
            </div>
          </dl>
        </div>

        <!-- Related Awards -->
        <div class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="mb-3 text-sm font-semibold text-slate-900">Award Berkaitan</h3>
          <div class="space-y-2">
            <router-link
              v-for="related in relatedAwards"
              :key="related.id"
              :to="`/admin/carian/${related.id}`"
              class="block rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50"
            >
              <p class="text-xs font-semibold text-blue-600">{{ related.awardNo }}</p>
              <p class="mt-0.5 text-xs text-slate-600">{{ related.title }}</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
