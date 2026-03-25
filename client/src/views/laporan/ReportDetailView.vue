<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";
import {
  FileText,
  FileDown,
  Sheet,
  Filter,
  Play,
} from "lucide-vue-next";

const route = useRoute();
const reportId = computed(() => route.params.id as string);

const titleMap: Record<string, string> = {
  "statistik-kes": "Laporan Statistik Kes",
  "prestasi-mahkamah": "Laporan Prestasi Mahkamah",
  "pematuhan-sla": "Laporan Pematuhan SLA",
  "audit-trail": "Laporan Audit Trail",
  "award-bulanan": "Laporan Award Bulanan",
  "pendaftaran-kes": "Laporan Pendaftaran Kes",
};

const reportTitle = computed(() => titleMap[reportId.value] ?? "Laporan");

const dateFrom = ref("2026-01-01");
const dateTo = ref("2026-03-25");
const jenisKes = ref("");
const status = ref("");
const pengerusi = ref("");

const jenisOptions = ["Semua", "Pembuangan Tidak Adil", "Pertikaian Perdagangan", "Perjanjian Kolektif", "Lain-lain"];
const statusOptions = ["Semua", "Aktif", "Selesai", "Ditangguhkan", "Ditolak"];
const pengerusiOptions = ["Semua", "YA Dato' Ahmad", "YA Puan Siti", "YA Encik Raj", "YA Puan Mei Lin"];

const mockRows = [
  { no: 1, noKes: "MP-2026-0012", jenis: "Pembuangan Tidak Adil", pihak: "Ali bin Abu vs Syarikat ABC Sdn Bhd", tarikh: "2026-01-15", status: "Aktif", pengerusi: "YA Dato' Ahmad" },
  { no: 2, noKes: "MP-2026-0034", jenis: "Pertikaian Perdagangan", pihak: "Kesatuan Pekerja XYZ vs Industri DEF", tarikh: "2026-01-22", status: "Selesai", pengerusi: "YA Puan Siti" },
  { no: 3, noKes: "MP-2026-0056", jenis: "Pembuangan Tidak Adil", pihak: "Muthu a/l Raman vs GHI Corp", tarikh: "2026-02-03", status: "Aktif", pengerusi: "YA Encik Raj" },
  { no: 4, noKes: "MP-2026-0078", jenis: "Perjanjian Kolektif", pihak: "Kesatuan JKL vs Syarikat MNO", tarikh: "2026-02-14", status: "Ditangguhkan", pengerusi: "YA Puan Mei Lin" },
  { no: 5, noKes: "MP-2026-0091", jenis: "Pembuangan Tidak Adil", pihak: "Lim Wei vs PQR Holdings", tarikh: "2026-03-01", status: "Aktif", pengerusi: "YA Dato' Ahmad" },
  { no: 6, noKes: "MP-2026-0105", jenis: "Lain-lain", pihak: "Syed Hassan vs STU Enterprise", tarikh: "2026-03-10", status: "Selesai", pengerusi: "YA Puan Siti" },
  { no: 7, noKes: "MP-2026-0118", jenis: "Pertikaian Perdagangan", pihak: "Kesatuan VWX vs Korporasi YZ", tarikh: "2026-03-18", status: "Aktif", pengerusi: "YA Encik Raj" },
];

function statusColor(s: string) {
  switch (s) {
    case "Aktif": return "bg-blue-100 text-blue-700";
    case "Selesai": return "bg-emerald-100 text-emerald-700";
    case "Ditangguhkan": return "bg-amber-100 text-amber-700";
    case "Ditolak": return "bg-rose-100 text-rose-700";
    default: return "bg-slate-100 text-slate-600";
  }
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Dashboard & Laporan', to: '/admin/laporan' }, { label: 'Laporan' }]" />
    <!-- Header -->
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 class="page-title">{{ reportTitle }}</h1>
        <p class="mt-1 text-sm text-slate-500">ID Laporan: {{ reportId }}</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <Play class="h-4 w-4" />
          Jana
        </button>
        <button
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <FileDown class="h-4 w-4" />
          Eksport PDF
        </button>
        <button
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Sheet class="h-4 w-4" />
          Eksport Excel
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div class="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
        <Filter class="h-4 w-4 text-slate-400" />
        Penapis
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-500">Dari</label>
          <input
            v-model="dateFrom"
            type="date"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-500">Hingga</label>
          <input
            v-model="dateTo"
            type="date"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-500">Jenis Kes</label>
          <select
            v-model="jenisKes"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Semua</option>
            <option v-for="j in jenisOptions" :key="j" :value="j">{{ j }}</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-500">Status</label>
          <select
            v-model="status"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Semua</option>
            <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div>
          <label class="mb-1 block text-xs font-medium text-slate-500">Pengerusi</label>
          <select
            v-model="pengerusi"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="">Semua</option>
            <option v-for="p in pengerusiOptions" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Results Table -->
    <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-200 px-5 py-3">
        <FileText class="h-4 w-4 text-slate-400" />
        <span class="text-sm font-medium text-slate-700">Hasil Laporan</span>
        <span class="ml-auto text-xs text-slate-400">{{ mockRows.length }} rekod</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-slate-100 bg-slate-50">
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">No.</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">No. Kes</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Jenis</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Pihak-pihak</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Tarikh Daftar</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Status</th>
              <th class="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Pengerusi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in mockRows"
              :key="row.no"
              class="border-b border-slate-50 transition-colors hover:bg-slate-50"
            >
              <td class="px-4 py-3 text-slate-500">{{ row.no }}</td>
              <td class="px-4 py-3 font-medium text-blue-600">{{ row.noKes }}</td>
              <td class="px-4 py-3 text-slate-700">{{ row.jenis }}</td>
              <td class="px-4 py-3 text-slate-700">{{ row.pihak }}</td>
              <td class="px-4 py-3 text-slate-500">{{ row.tarikh }}</td>
              <td class="px-4 py-3">
                <span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium" :class="statusColor(row.status)">
                  {{ row.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-slate-700">{{ row.pengerusi }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
