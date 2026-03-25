<script setup lang="ts">
import { ref } from "vue";
import { Bookmark, Star } from "lucide-vue-next";
import AppSearchBar from "@/components/AppSearchBar.vue";
import type { AwardResult } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";

const searchPerformed = ref(true);

const filters = [
  {
    key: "tahun",
    label: "Tahun",
    options: [
      { value: "2026", label: "2026" },
      { value: "2025", label: "2025" },
      { value: "2024", label: "2024" },
      { value: "2023", label: "2023" },
    ],
  },
  {
    key: "jenisKes",
    label: "Jenis Kes",
    options: [
      { value: "unfair-dismissal", label: "Pembuangan Kerja" },
      { value: "trade-dispute", label: "Pertikaian Perdagangan" },
      { value: "collective-agreement", label: "Perjanjian Kolektif" },
    ],
  },
  {
    key: "pengerusi",
    label: "Pengerusi",
    options: [
      { value: "rizal", label: "YA Tuan Mohd Rizal" },
      { value: "siti", label: "YA Puan Siti Aminah" },
      { value: "kamal", label: "YA Tuan Kamal Ariffin" },
    ],
  },
];

const results: AwardResult[] = [
  {
    id: 1, caseNo: "MP(S)/1-0150/2025", awardNo: "Award No. 245/2025", title: "Ahmad bin Hassan lwn. Syarikat ABC Sdn Bhd",
    snippet: "Mahkamah mendapati bahawa <mark>pembuangan kerja</mark> pekerja adalah tanpa sebab yang adil. Pihak majikan gagal membuktikan bahawa terdapat alasan yang munasabah untuk <mark>pembuangan</mark> tersebut...",
    chairmanName: "YA Tuan Mohd Rizal", decidedAt: "2025-11-15", relevanceScore: 95, highlights: ["pembuangan kerja", "tanpa sebab"], caseType: "Pembuangan Kerja", year: 2025,
  },
  {
    id: 2, caseNo: "MP(S)/1-0098/2025", awardNo: "Award No. 189/2025", title: "Rajesh a/l Kumar lwn. XYZ Manufacturing Sdn Bhd",
    snippet: "Pekerja telah diberhentikan selepas 15 tahun berkhidmat tanpa notis yang mencukupi. Mahkamah memutuskan bahawa <mark>pembuangan kerja</mark> ini adalah tidak adil dan memerintahkan pampasan...",
    chairmanName: "YA Puan Siti Aminah", decidedAt: "2025-08-22", relevanceScore: 88, highlights: ["pembuangan kerja", "pampasan"], caseType: "Pembuangan Kerja", year: 2025,
  },
  {
    id: 3, caseNo: "MP(S)/1-0210/2024", awardNo: "Award No. 312/2024", title: "Lim Mei Ling lwn. Global Services Sdn Bhd",
    snippet: "Isu utama adalah sama ada <mark>pembuangan</mark> pekerja semasa tempoh percubaan adalah sah. Mahkamah mendapati bahawa majikan tidak mengikuti prosedur yang betul...",
    chairmanName: "YA Tuan Kamal Ariffin", decidedAt: "2024-12-10", relevanceScore: 82, highlights: ["pembuangan", "tempoh percubaan"], caseType: "Pembuangan Kerja", year: 2024,
  },
  {
    id: 4, caseNo: "MP(S)/1-0055/2025", awardNo: "Award No. 102/2025", title: "Kesatuan Pekerja Elektronik lwn. ElectroCorp Sdn Bhd",
    snippet: "Pertikaian mengenai terma <mark>perjanjian kolektif</mark> berkaitan dengan waktu kerja dan elaun syif. Mahkamah memerintahkan kedua-dua pihak merundingkan semula terma...",
    chairmanName: "YA Tuan Mohd Rizal", decidedAt: "2025-05-30", relevanceScore: 74, highlights: ["perjanjian kolektif", "waktu kerja"], caseType: "Pertikaian Perdagangan", year: 2025,
  },
  {
    id: 5, caseNo: "MP(S)/1-0180/2024", awardNo: "Award No. 278/2024", title: "Siti Fatimah binti Mohd lwn. HRTech Solutions Sdn Bhd",
    snippet: "Pekerja mendakwa beliau di<mark>buang kerja</mark> secara konstruktif apabila majikan menurunkan pangkat beliau tanpa alasan. Mahkamah bersetuju bahawa tindakan majikan merupakan...",
    chairmanName: "YA Puan Siti Aminah", decidedAt: "2024-10-05", relevanceScore: 70, highlights: ["buang kerja", "konstruktif"], caseType: "Pembuangan Kerja", year: 2024,
  },
];

const savedSearches = [
  { id: 1, query: "pembuangan kerja tanpa sebab", date: "2026-03-20" },
  { id: 2, query: "pampasan pekerja kontrak", date: "2026-03-18" },
  { id: 3, query: "pertikaian perdagangan kesatuan", date: "2026-03-15" },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div>
      <h1 class="page-title">Carian Pintar (Award)</h1>
      <p class="mt-1 text-sm text-slate-500">Cari award, keputusan, dan dokumen mahkamah menggunakan kata kunci atau soalan.</p>
    </div>

    <!-- Search -->
    <AppSearchBar
      placeholder="Cari menggunakan kata kunci atau soalan..."
      :filters="filters"
      @search="searchPerformed = true"
    />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
      <!-- Results -->
      <div class="space-y-4 lg:col-span-3">
        <p v-if="searchPerformed" class="text-sm text-slate-500">{{ results.length }} keputusan ditemui</p>

        <div
          v-for="result in results"
          :key="result.id"
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-blue-600">{{ result.awardNo }}</span>
                <span class="text-xs text-slate-400">|</span>
                <span class="text-xs text-slate-500">{{ result.caseNo }}</span>
              </div>
              <h3 class="mt-1 text-sm font-semibold text-slate-900">
                <router-link :to="`/admin/carian/${result.id}`" class="hover:text-blue-600">{{ result.title }}</router-link>
              </h3>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <p class="mt-2 text-sm leading-relaxed text-slate-600" v-html="result.snippet"></p>
            </div>
          </div>

          <!-- Relevance & Meta -->
          <div class="mt-3 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3">
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-slate-500">Relevan:</span>
              <div class="h-1.5 w-20 rounded-full bg-slate-200">
                <div class="h-1.5 rounded-full bg-blue-500" :style="{ width: `${result.relevanceScore}%` }"></div>
              </div>
              <span class="text-xs font-medium text-slate-700">{{ result.relevanceScore }}%</span>
            </div>
            <span class="text-xs text-slate-400">|</span>
            <span class="text-xs text-slate-500">{{ result.chairmanName }}</span>
            <span class="text-xs text-slate-400">|</span>
            <span class="text-xs text-slate-500">{{ result.decidedAt }}</span>
            <span class="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{{ result.caseType }}</span>
          </div>
        </div>
      </div>

      <!-- Saved Searches Sidebar -->
      <div class="lg:col-span-1">
        <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 class="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Bookmark class="h-4 w-4 text-slate-400" />
            Carian Tersimpan
          </h3>
          <div class="mt-3 space-y-2">
            <div
              v-for="saved in savedSearches"
              :key="saved.id"
              class="cursor-pointer rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50"
            >
              <div class="flex items-start gap-2">
                <Star class="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <div>
                  <p class="text-xs font-medium text-slate-700">{{ saved.query }}</p>
                  <p class="mt-0.5 text-[10px] text-slate-400">{{ saved.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
