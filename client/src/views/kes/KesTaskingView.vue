<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-vue-next";
import AppDataTable from "@/components/AppDataTable.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { Column } from "@/components/AppDataTable.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();
const caseId = route.params.id;

const taskStatusMap: Record<string, { label: string; color: string }> = {
  pending: { label: "Belum Mula", color: "bg-slate-100 text-slate-700 ring-slate-300/60" },
  "in-progress": { label: "Dalam Proses", color: "bg-sky-50 text-sky-700 ring-sky-300/60" },
  completed: { label: "Selesai", color: "bg-emerald-50 text-emerald-700 ring-emerald-300/60" },
  overdue: { label: "Lewat Tarikh", color: "bg-rose-50 text-rose-700 ring-rose-300/60" },
};

const columns: Column[] = [
  { key: "task", label: "Tugasan", sortable: true },
  { key: "assignedTo", label: "Ditugaskan Kepada", sortable: true },
  { key: "dueDate", label: "Tarikh Akhir", sortable: true },
  { key: "status", label: "Status" },
  { key: "actions", label: "Tindakan", width: "100px" },
];

const rows = [
  {
    id: 1,
    task: "Sediakan Notis Sebutan kepada pihak-pihak",
    assignedTo: "Puan Noraini binti Hassan",
    dueDate: "2026-03-25",
    status: "completed",
  },
  {
    id: 2,
    task: "Semak kelengkapan Penyata Tuntutan",
    assignedTo: "Encik Hafiz bin Osman",
    dueDate: "2026-03-28",
    status: "in-progress",
  },
  {
    id: 3,
    task: "Sediakan fail perbicaraan untuk Pengerusi",
    assignedTo: "Puan Noraini binti Hassan",
    dueDate: "2026-04-01",
    status: "pending",
  },
  {
    id: 4,
    task: "Maklumkan tarikh perbicaraan kepada pihak-pihak",
    assignedTo: "Encik Hafiz bin Osman",
    dueDate: "2026-03-22",
    status: "completed",
  },
  {
    id: 5,
    task: "Tempah Bilik Bicara 1 untuk 5-6 April 2026",
    assignedTo: "Puan Salmah binti Yusof",
    dueDate: "2026-03-20",
    status: "completed",
  },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Pengurusan Kes', to: '/admin/kes' }, { label: 'Tugasan' }]" />
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
          @click="router.push(`/admin/kes/${caseId}`)"
        >
          <ArrowLeft class="h-4 w-4" />
        </button>
        <div>
          <h1 class="page-title">Tugasan Kes</h1>
          <p class="mt-0.5 text-sm text-slate-500">MP(S)/1-0201/2026</p>
        </div>
      </div>
      <button
        class="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
      >
        <Plus class="h-4 w-4" />
        Tambah Tugasan
      </button>
    </div>

    <!-- Table -->
    <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <AppDataTable :columns="columns" :rows="rows">
        <template #cell-task="{ value }">
          <span class="font-medium text-slate-900">{{ value }}</span>
        </template>

        <template #cell-status="{ value }">
          <AppStatusBadge :status="(value as string)" :status-map="taskStatusMap" />
        </template>

        <template #cell-actions="{ row }">
          <div class="flex items-center gap-1">
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              title="Sunting"
            >
              <Pencil class="h-4 w-4" />
            </button>
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600"
              title="Padam"
            >
              <Trash2 class="h-4 w-4" />
            </button>
          </div>
        </template>
      </AppDataTable>
    </div>
  </div>
</AdminLayout>
</template>
