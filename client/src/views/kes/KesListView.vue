<script setup lang="ts">
import { useRouter } from "vue-router";
import { Pencil, Eye } from "lucide-vue-next";
import AppSearchBar from "@/components/AppSearchBar.vue";
import AppDataTable from "@/components/AppDataTable.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { Column } from "@/components/AppDataTable.vue";
import type { CaseRecord } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = useRouter();

const filters = [
  {
    key: "caseType",
    label: "Jenis Kes",
    options: [
      { value: "unfair-dismissal", label: "Pembuangan Kerja" },
      { value: "trade-dispute", label: "Pertikaian Perdagangan" },
      { value: "collective-agreement", label: "Perjanjian Kolektif" },
      { value: "non-compliance", label: "Ketidakpatuhan" },
    ],
  },
  {
    key: "status",
    label: "Status",
    options: [
      { value: "registered", label: "Berdaftar" },
      { value: "in-progress", label: "Dalam Proses" },
      { value: "hearing", label: "Perbicaraan" },
      { value: "decided", label: "Diputuskan" },
      { value: "closed", label: "Ditutup" },
    ],
  },
  {
    key: "chairman",
    label: "Pengerusi",
    options: [
      { value: "rizal", label: "YA Tuan Mohd Rizal" },
      { value: "siti", label: "YA Puan Siti Aminah" },
      { value: "kamal", label: "YA Tuan Kamal Ariffin" },
    ],
  },
];

const columns: Column[] = [
  { key: "caseNo", label: "No. Kes", sortable: true },
  { key: "subject", label: "Perkara", sortable: true },
  { key: "caseType", label: "Jenis", sortable: true },
  { key: "status", label: "Status" },
  { key: "assignedChairmanName", label: "Pengerusi", sortable: true },
  { key: "registeredAt", label: "Tarikh Daftar", sortable: true },
  { key: "actions", label: "Tindakan", width: "120px" },
];

const caseTypeLabels: Record<string, string> = {
  "unfair-dismissal": "Pembuangan Kerja",
  "trade-dispute": "Pertikaian Perdagangan",
  "collective-agreement": "Perjanjian Kolektif",
  "non-compliance": "Ketidakpatuhan",
  other: "Lain-lain",
};

const rows: (CaseRecord & Record<string, unknown>)[] = [
  {
    id: 1, caseNo: "MP(S)/1-0201/2026", subject: "Pembuangan Kerja - Ahmad bin Ismail", caseType: "unfair-dismissal",
    status: "hearing", priority: "normal", parties: [], referenceNo: "JPPM/2026/0201",
    registeredAt: "2026-01-15", assignedChairmanName: "YA Tuan Mohd Rizal",
    assignedChairmanId: 1, createdAt: "2026-01-15", updatedAt: "2026-03-20",
  },
  {
    id: 2, caseNo: "MP(S)/1-0202/2026", subject: "Pertikaian Gaji - Syarikat XYZ Sdn Bhd", caseType: "trade-dispute",
    status: "in-progress", priority: "urgent", parties: [], referenceNo: "JPPM/2026/0202",
    registeredAt: "2026-01-20", assignedChairmanName: "YA Puan Siti Aminah",
    assignedChairmanId: 2, createdAt: "2026-01-20", updatedAt: "2026-03-18",
  },
  {
    id: 3, caseNo: "MP(S)/1-0203/2026", subject: "Pembuangan Kerja - Lim Wei Shen", caseType: "unfair-dismissal",
    status: "decided", priority: "normal", parties: [], referenceNo: "JPPM/2026/0203",
    registeredAt: "2025-11-05", assignedChairmanName: "YA Tuan Kamal Ariffin",
    assignedChairmanId: 3, createdAt: "2025-11-05", updatedAt: "2026-03-10",
  },
  {
    id: 4, caseNo: "MP(S)/1-0204/2026", subject: "Ketidakpatuhan Award - Mega Industries", caseType: "non-compliance",
    status: "registered", priority: "normal", parties: [], referenceNo: "JPPM/2026/0204",
    registeredAt: "2026-02-10", assignedChairmanName: "YA Tuan Mohd Rizal",
    assignedChairmanId: 1, createdAt: "2026-02-10", updatedAt: "2026-03-15",
  },
  {
    id: 5, caseNo: "MP(S)/1-0205/2026", subject: "Perjanjian Kolektif - Kesatuan Pekerja Elektronik", caseType: "collective-agreement",
    status: "in-progress", priority: "normal", parties: [], referenceNo: "JPPM/2026/0205",
    registeredAt: "2026-02-15", assignedChairmanName: "YA Puan Siti Aminah",
    assignedChairmanId: 2, createdAt: "2026-02-15", updatedAt: "2026-03-12",
  },
  {
    id: 6, caseNo: "MP(S)/1-0206/2026", subject: "Pembuangan Kerja - Rajeswari a/p Muthu", caseType: "unfair-dismissal",
    status: "closed", priority: "normal", parties: [], referenceNo: "JPPM/2026/0206",
    registeredAt: "2025-09-01", assignedChairmanName: "YA Tuan Kamal Ariffin",
    assignedChairmanId: 3, createdAt: "2025-09-01", updatedAt: "2026-02-28",
  },
  {
    id: 7, caseNo: "MP(S)/1-0207/2026", subject: "Pertikaian Perdagangan - Global Tech Sdn Bhd", caseType: "trade-dispute",
    status: "hearing", priority: "urgent", parties: [], referenceNo: "JPPM/2026/0207",
    registeredAt: "2026-03-01", assignedChairmanName: "YA Tuan Mohd Rizal",
    assignedChairmanId: 1, createdAt: "2026-03-01", updatedAt: "2026-03-22",
  },
  {
    id: 8, caseNo: "MP(S)/1-0208/2026", subject: "Pembuangan Kerja - Tan Boon Keat", caseType: "unfair-dismissal",
    status: "registered", priority: "normal", parties: [], referenceNo: "JPPM/2026/0208",
    registeredAt: "2026-03-18", assignedChairmanName: "YA Puan Siti Aminah",
    assignedChairmanId: 2, createdAt: "2026-03-18", updatedAt: "2026-03-20",
  },
];

function goToCase(row: Record<string, unknown>) {
  router.push(`/admin/kes/${row.id}`);
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div>
      <h1 class="page-title">Pengurusan Kes</h1>
      <p class="mt-1 text-sm text-slate-500">Senarai semua kes yang didaftarkan dalam sistem.</p>
    </div>

    <!-- Search & Filters -->
    <AppSearchBar placeholder="Cari no. kes, perkara, pihak..." :filters="filters" />

    <!-- Table -->
    <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <AppDataTable :columns="columns" :rows="rows" clickable @row-click="goToCase">
        <template #cell-caseNo="{ value }">
          <span class="font-medium text-blue-600">{{ value }}</span>
        </template>

        <template #cell-caseType="{ value }">
          {{ caseTypeLabels[value as string] ?? value }}
        </template>

        <template #cell-status="{ value }">
          <AppStatusBadge :status="(value as string)" />
        </template>

        <template #cell-actions="{ row }">
          <div class="flex items-center gap-1">
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              title="Lihat"
              @click.stop="router.push(`/admin/kes/${row.id}`)"
            >
              <Eye class="h-4 w-4" />
            </button>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              title="Sunting"
              @click.stop
            >
              <Pencil class="h-4 w-4" />
            </button>
          </div>
        </template>
      </AppDataTable>
    </div>
  </div>
</AdminLayout>
</template>
