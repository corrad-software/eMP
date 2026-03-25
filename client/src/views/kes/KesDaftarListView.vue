<script setup lang="ts">
import { useRouter } from "vue-router";
import { Plus, AlertTriangle, Eye, Pencil } from "lucide-vue-next";
import AppDataTable from "@/components/AppDataTable.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { Column } from "@/components/AppDataTable.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = useRouter();

const columns: Column[] = [
  { key: "referenceNo", label: "No. Rujukan JPPM", sortable: true },
  { key: "subject", label: "Perkara", sortable: true },
  { key: "caseType", label: "Jenis Kes", sortable: true },
  { key: "receivedDate", label: "Tarikh Terima", sortable: true },
  { key: "status", label: "Status" },
  { key: "actions", label: "Tindakan", width: "120px" },
];

const caseTypeLabels: Record<string, string> = {
  "unfair-dismissal": "Pembuangan Kerja",
  "trade-dispute": "Pertikaian Perdagangan",
  "non-compliance": "Ketidakpatuhan",
  "collective-agreement": "Perjanjian Kolektif",
};

const rows = [
  {
    id: 1,
    referenceNo: "JPPM/2026/0234",
    subject: "Pembuangan Kerja Tidak Adil - Ahmad bin Ismail",
    caseType: "unfair-dismissal",
    receivedDate: "2026-03-20",
    status: "pending",
    isDuplicate: false,
  },
  {
    id: 2,
    referenceNo: "JPPM/2026/0235",
    subject: "Pertikaian Gaji Minimum - Syarikat ABC Sdn Bhd",
    caseType: "trade-dispute",
    receivedDate: "2026-03-19",
    status: "registered",
    isDuplicate: false,
  },
  {
    id: 3,
    referenceNo: "JPPM/2026/0236",
    subject: "Pembuangan Kerja - Nur Aisyah binti Razak",
    caseType: "unfair-dismissal",
    receivedDate: "2026-03-18",
    status: "pending",
    isDuplicate: true,
  },
  {
    id: 4,
    referenceNo: "JPPM/2026/0237",
    subject: "Ketidakpatuhan Award - Mega Industries Sdn Bhd",
    caseType: "non-compliance",
    receivedDate: "2026-03-17",
    status: "registered",
    isDuplicate: false,
  },
  {
    id: 5,
    referenceNo: "JPPM/2026/0238",
    subject: "Pertikaian Kolektif - Kesatuan Pekerja Elektronik",
    caseType: "collective-agreement",
    receivedDate: "2026-03-16",
    status: "pending",
    isDuplicate: false,
  },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="page-title">Pendaftaran Kes</h1>
      <button
        class="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
        @click="router.push('/admin/kes/daftar/baru')"
      >
        <Plus class="h-4 w-4" />
        Daftar Kes Baru
      </button>
    </div>

    <!-- Table -->
    <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <AppDataTable :columns="columns" :rows="rows" searchable>
        <template #cell-referenceNo="{ row }">
          <div class="flex items-center gap-2">
            <span class="font-medium text-slate-900">{{ row.referenceNo }}</span>
            <span
              v-if="row.isDuplicate"
              class="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-600"
              title="Kemungkinan pendaftaran berganda"
            >
              <AlertTriangle class="h-3 w-3" />
            </span>
          </div>
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
              @click="router.push(`/admin/kes/daftar/${row.id}/lulusan`)"
            >
              <Eye class="h-4 w-4" />
            </button>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              title="Sunting"
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
