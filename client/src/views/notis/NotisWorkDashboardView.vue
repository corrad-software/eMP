<script setup lang="ts">
import { ref } from "vue";
import AppStatCard from "@/components/AppStatCard.vue";
import AppDataTable from "@/components/AppDataTable.vue";
import type { Column } from "@/components/AppDataTable.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import {
  Bell,
  AlertTriangle,
  Clock,
  FileText,
  Send,
  CheckCircle,
} from "lucide-vue-next";

const urgentItems = ref([
  {
    id: 1,
    priority: "kritikal",
    title: "Notis Sebutan Kes Jenayah",
    caseNo: "KES-2026-0451",
    dueDate: "25 Mac 2026",
  },
  {
    id: 2,
    priority: "kritikal",
    title: "Perintah Mahkamah - Penyerahan Dokumen",
    caseNo: "KES-2026-0389",
    dueDate: "25 Mac 2026",
  },
  {
    id: 3,
    priority: "tinggi",
    title: "Notis Perbicaraan Semula",
    caseNo: "KES-2026-0412",
    dueDate: "26 Mac 2026",
  },
  {
    id: 4,
    priority: "tinggi",
    title: "Saman Keterangan Saksi",
    caseNo: "KES-2026-0478",
    dueDate: "27 Mac 2026",
  },
  {
    id: 5,
    priority: "biasa",
    title: "Notis Penangguhan Kes",
    caseNo: "KES-2026-0502",
    dueDate: "28 Mac 2026",
  },
]);

const priorityStyles: Record<string, { bg: string; text: string; label: string }> = {
  kritikal: { bg: "bg-rose-100", text: "text-rose-700", label: "Kritikal" },
  tinggi: { bg: "bg-amber-100", text: "text-amber-700", label: "Tinggi" },
  biasa: { bg: "bg-blue-100", text: "text-blue-700", label: "Biasa" },
};

const tableColumns: Column[] = [
  { key: "caseNo", label: "No. Kes", sortable: true },
  { key: "type", label: "Jenis Notis", sortable: true },
  { key: "recipient", label: "Penerima" },
  { key: "sendDate", label: "Tarikh Hantar", sortable: true },
  { key: "status", label: "Status" },
  { key: "action", label: "Tindakan", width: "120px" },
];

const tableRows = ref([
  {
    caseNo: "KES-2026-0451",
    type: "Notis Sebutan",
    recipient: "Ahmad bin Ismail",
    sendDate: "24 Mac 2026",
    status: "submitted",
  },
  {
    caseNo: "KES-2026-0389",
    type: "Perintah Mahkamah",
    recipient: "Siti Aminah binti Hassan",
    sendDate: "23 Mac 2026",
    status: "submitted",
  },
  {
    caseNo: "KES-2026-0412",
    type: "Notis Perbicaraan",
    recipient: "Tan Wei Ming",
    sendDate: "—",
    status: "pending",
  },
  {
    caseNo: "KES-2026-0478",
    type: "Saman Keterangan",
    recipient: "Rajesh a/l Kumar",
    sendDate: "—",
    status: "draft",
  },
  {
    caseNo: "KES-2026-0502",
    type: "Notis Penangguhan",
    recipient: "Lim Bee Lan",
    sendDate: "22 Mac 2026",
    status: "submitted",
  },
  {
    caseNo: "KES-2026-0519",
    type: "Notis Sebutan",
    recipient: "Mohd Faizal bin Yusof",
    sendDate: "—",
    status: "pending",
  },
]);
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Page Header -->
    <div>
      <h1 class="page-title">Pengurusan Notis</h1>
      <p class="mt-1 text-sm text-slate-500">Dashboard kerja harian</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AppStatCard
        :icon="CheckCircle"
        label="Tugasan Hari Ini"
        :value="12"
        color="blue"
        subtitle="tugasan aktif"
      />
      <AppStatCard
        :icon="AlertTriangle"
        label="Peringatan SLA"
        :value="3"
        trend="down"
        :change-percent="-15"
        color="red"
        subtitle="hampir tamat tempoh"
      />
      <AppStatCard
        :icon="FileText"
        label="Kes Baru"
        :value="5"
        color="green"
        subtitle="hari ini"
      />
      <AppStatCard
        :icon="Send"
        label="Notis Belum Dihantar"
        :value="8"
        color="amber"
        subtitle="menunggu tindakan"
      />
    </div>

    <!-- Tugasan Mendesak -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Bell class="h-4 w-4 text-rose-500" />
        <h2 class="text-sm font-semibold text-slate-900">Tugasan Mendesak</h2>
        <span class="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700">{{ urgentItems.length }}</span>
      </div>
      <ul class="divide-y divide-slate-100">
        <li
          v-for="item in urgentItems"
          :key="item.id"
          class="flex items-center gap-4 px-4 py-3"
        >
          <span
            class="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
            :class="[priorityStyles[item.priority].bg, priorityStyles[item.priority].text]"
          >
            {{ priorityStyles[item.priority].label }}
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium text-slate-900">{{ item.title }}</p>
            <p class="text-xs text-slate-500">{{ item.caseNo }}</p>
          </div>
          <div class="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock class="h-3.5 w-3.5" />
            <span>{{ item.dueDate }}</span>
          </div>
          <button
            class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
          >
            <Send class="h-3.5 w-3.5" />
            Tindakan
          </button>
        </li>
      </ul>
    </article>

    <!-- Senarai Notis -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <FileText class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Senarai Notis</h2>
        <span class="ml-1 text-xs text-slate-500">{{ tableRows.length }} rekod</span>
      </div>
      <div class="p-4">
      <AppDataTable :columns="tableColumns" :rows="tableRows" searchable>
        <template #cell-status="{ value }">
          <AppStatusBadge :status="String(value)" />
        </template>
        <template #cell-action>
          <button
            class="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <FileText class="h-3.5 w-3.5" />
            Lihat
          </button>
        </template>
      </AppDataTable>
      </div>
    </article>
  </div>
</AdminLayout>
</template>
