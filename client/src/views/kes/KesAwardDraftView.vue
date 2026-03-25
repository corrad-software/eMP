<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  Bold,
  Italic,
  List,
  Table,
  FileText,
  Save,
  Eye,
  SendHorizonal,
  ChevronDown,
} from "lucide-vue-next";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const caseId = route.params.id;

const breadcrumbs = [
  { label: "Pengurusan Kes", to: "/admin/kes" },
  { label: "MPM/4/2-0567/2025", to: `/admin/kes/${caseId as string}` },
  { label: "Penulisan Award" },
];

const caseInfo = {
  caseNo: "MPM/4/2-0567/2025",
  caseType: "Pembuangan Kerja Tidak Adil (Seksyen 20)",
  claimant: "Muhammad Hafiz bin Abdullah",
  respondent: "Syarikat Teknologi Maju Sdn Bhd",
  chairman: "YA Tuan Mohd Rizal bin Othman",
  registeredAt: "12 Februari 2025",
  subject: "Pembuangan kerja tanpa sebab munasabah dan perintah pengembalian semula",
};

const selectedTemplate = ref("");
const templates = [
  { value: "", label: "-- Pilih Templat --" },
  { value: "award-s20-reinstatement", label: "Award S.20 - Pengembalian Semula" },
  { value: "award-s20-compensation", label: "Award S.20 - Pampasan" },
  { value: "award-s20-dismissal-upheld", label: "Award S.20 - Pembuangan Dikekalkan" },
  { value: "award-s26-trade-dispute", label: "Award S.26 - Pertikaian Perdagangan" },
  { value: "award-consent", label: "Award Persetujuan" },
];

const editorContent = ref(`DALAM MAHKAMAH PERUSAHAAN MALAYSIA
KES NO: MPM/4/2-0567/2025

ANTARA

MUHAMMAD HAFIZ BIN ABDULLAH ... PIHAK MENUNTUT

DAN

SYARIKAT TEKNOLOGI MAJU SDN BHD ... PIHAK YANG KENA TUNTUT

AWARD

[Pengenalan dan latar belakang kes]

1. Pihak menuntut telah diambil bekerja oleh pihak yang kena tuntut sebagai Pengurus Kanan IT pada 5 Mac 2020 dengan gaji bulanan sebanyak RM8,500.00.

2. Pada 15 Januari 2025, pihak menuntut telah ditamatkan perkhidmatannya oleh pihak yang kena tuntut.

3. Pihak menuntut tidak berpuas hati dengan penamatan tersebut dan telah membuat representasi di bawah Seksyen 20(1) Akta Perhubungan Perusahaan 1967.

[ISU]

4. Isu utama yang perlu diputuskan oleh Mahkamah ini ialah sama ada pembuangan kerja pihak menuntut oleh pihak yang kena tuntut adalah dengan sebab atau alasan yang adil.

[FAKTA KES]

5. ...

[KEPUTUSAN]

6. ...
`);

const wordCount = ref(0);
const lastSaved = ref("25 Mac 2026, 10:45 AM");

function countWords() {
  const text = editorContent.value.trim();
  wordCount.value = text ? text.split(/\s+/).length : 0;
}
countWords();

function onInput() {
  countWords();
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-4">
      <!-- Breadcrumb -->
      <AppBreadcrumb :items="breadcrumbs" />

      <!-- Header -->
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-xl font-bold text-slate-900">{{ caseInfo.caseNo }}</h1>
            <span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              Draf Award
            </span>
          </div>
          <p class="mt-1 text-sm text-slate-500">{{ caseInfo.subject }}</p>
        </div>
      </div>

      <!-- Two-column layout -->
      <div class="grid gap-4 lg:grid-cols-[1fr_320px]">
        <!-- Left: Editor -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <!-- Toolbar -->
          <div class="flex items-center gap-1 border-b border-slate-100 px-4 py-2.5">
            <button
              class="rounded p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              title="Bold"
            >
              <Bold class="h-4 w-4" />
            </button>
            <button
              class="rounded p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              title="Italic"
            >
              <Italic class="h-4 w-4" />
            </button>
            <div class="mx-1 h-5 w-px bg-slate-200" />
            <button
              class="rounded p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              title="List"
            >
              <List class="h-4 w-4" />
            </button>
            <button
              class="rounded p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              title="Table"
            >
              <Table class="h-4 w-4" />
            </button>
            <div class="mx-1 h-5 w-px bg-slate-200" />
            <button
              class="rounded p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              title="Page Break"
            >
              <FileText class="h-4 w-4" />
            </button>
          </div>
          <!-- Editor area -->
          <div class="p-4">
            <textarea
              v-model="editorContent"
              class="min-h-[600px] w-full resize-y rounded-lg border border-slate-300 px-4 py-3 font-mono text-sm shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
              @input="onInput"
            />
          </div>
        </article>

        <!-- Right: Sidebar -->
        <div class="space-y-4">
          <!-- Maklumat Kes -->
          <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 px-4 py-2.5">
              <h3 class="text-sm font-semibold text-slate-700">Maklumat Kes</h3>
            </div>
            <div class="space-y-3 px-4 py-3 text-sm">
              <div>
                <span class="text-xs font-medium text-slate-400">Jenis Kes</span>
                <p class="text-slate-700">{{ caseInfo.caseType }}</p>
              </div>
              <div>
                <span class="text-xs font-medium text-slate-400">Pihak Menuntut</span>
                <p class="text-slate-700">{{ caseInfo.claimant }}</p>
              </div>
              <div>
                <span class="text-xs font-medium text-slate-400">Pihak Yang Kena Tuntut</span>
                <p class="text-slate-700">{{ caseInfo.respondent }}</p>
              </div>
              <div>
                <span class="text-xs font-medium text-slate-400">Pengerusi</span>
                <p class="text-slate-700">{{ caseInfo.chairman }}</p>
              </div>
              <div>
                <span class="text-xs font-medium text-slate-400">Tarikh Didaftarkan</span>
                <p class="text-slate-700">{{ caseInfo.registeredAt }}</p>
              </div>
            </div>
          </article>

          <!-- Templat -->
          <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 px-4 py-2.5">
              <h3 class="text-sm font-semibold text-slate-700">Templat</h3>
            </div>
            <div class="space-y-3 px-4 py-3">
              <div class="relative">
                <select
                  v-model="selectedTemplate"
                  class="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 pr-8 text-sm shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
                >
                  <option v-for="t in templates" :key="t.value" :value="t.value">
                    {{ t.label }}
                  </option>
                </select>
                <ChevronDown class="pointer-events-none absolute right-2.5 top-2.5 h-4 w-4 text-slate-400" />
              </div>
              <button
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                :disabled="!selectedTemplate"
                :class="{ 'cursor-not-allowed opacity-50': !selectedTemplate }"
              >
                Guna Templat
              </button>
            </div>
          </article>

          <!-- Tindakan -->
          <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 px-4 py-2.5">
              <h3 class="text-sm font-semibold text-slate-700">Tindakan</h3>
            </div>
            <div class="space-y-2 px-4 py-3">
              <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                <Save class="h-4 w-4" />
                Simpan Draf
              </button>
              <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                <Eye class="h-4 w-4" />
                Pratonton
              </button>
              <button class="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                <SendHorizonal class="h-4 w-4" />
                Hantar untuk Semakan
              </button>
            </div>
          </article>
        </div>
      </div>

      <!-- Bottom: Word count and last saved -->
      <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs text-slate-500 shadow-sm">
        <span>{{ wordCount }} perkataan</span>
        <span>Terakhir disimpan: {{ lastSaved }}</span>
      </div>
    </div>
  </AdminLayout>
</template>
