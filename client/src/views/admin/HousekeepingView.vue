<script setup lang="ts">
import { ref } from "vue";
import {
  Database,
  ScrollText,
  HardDrive,
  FolderOpen,
  Trash2,
  Archive,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-vue-next";
import AppStatCard from "@/components/AppStatCard.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

type ActivityLog = {
  id: number;
  action: string;
  timestamp: string;
  status: "success" | "warning" | "info";
};

const activityLog = ref<ActivityLog[]>([
  { id: 1, action: "Cache sistem dibersihkan", timestamp: "2026-03-25 09:00:00", status: "success" },
  { id: 2, action: "Log audit diarkibkan (> 90 hari)", timestamp: "2026-03-24 22:00:00", status: "success" },
  { id: 3, action: "Pangkalan data dioptimumkan", timestamp: "2026-03-24 03:00:00", status: "success" },
  { id: 4, action: "Semakan integriti selesai - 2 amaran ditemui", timestamp: "2026-03-23 15:30:00", status: "warning" },
  { id: 5, action: "Cache sistem dibersihkan", timestamp: "2026-03-22 09:00:00", status: "success" },
  { id: 6, action: "Storan dokumen disusun semula", timestamp: "2026-03-21 22:00:00", status: "info" },
]);

function formatDateTime(dt: string): string {
  return new Date(dt).toLocaleString("ms-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusIcons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Clock,
};

const statusColors = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  info: "text-blue-500",
};
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <div>
      <h1 class="page-title">Housekeeping</h1>
      <p class="mt-1 text-sm text-slate-500">Penyelenggaraan dan pemantauan kesihatan sistem</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AppStatCard
        :icon="Database"
        label="Saiz Pangkalan Data"
        value="2.4 GB"
        subtitle="SQLite / MySQL"
        color="blue"
      />
      <AppStatCard
        :icon="ScrollText"
        label="Log Audit"
        value="148,203"
        subtitle="Jumlah rekod"
        color="violet"
      />
      <AppStatCard
        :icon="HardDrive"
        label="Cache Status"
        value="128 MB"
        subtitle="Aktif - 1,247 kunci"
        color="green"
      />
      <AppStatCard
        :icon="FolderOpen"
        label="Storan Dokumen"
        value="18.7 GB"
        subtitle="72% digunakan"
        color="amber"
      />
    </div>

    <!-- Action Buttons -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Wrench class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Tindakan Penyelenggaraan</h2>
      </div>
      <div class="space-y-3 p-4">
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <Trash2 class="h-4 w-4 text-rose-500" />
          Bersihkan Cache
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <Archive class="h-4 w-4 text-amber-500" />
          Arkib Log Lama
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <Wrench class="h-4 w-4 text-blue-500" />
          Optimumkan DB
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <ShieldCheck class="h-4 w-4 text-emerald-500" />
          Semak Integriti
        </button>
      </div>
      </div>
    </article>

    <!-- Recent Activity -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Clock class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Aktiviti Terkini</h2>
      </div>
      <div class="space-y-3 p-4">
      <ul class="divide-y divide-slate-100">
        <li
          v-for="entry in activityLog"
          :key="entry.id"
          class="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
        >
          <component
            :is="statusIcons[entry.status]"
            class="mt-0.5 h-4 w-4 shrink-0"
            :class="statusColors[entry.status]"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm text-slate-700">{{ entry.action }}</p>
            <p class="mt-0.5 text-xs text-slate-400">{{ formatDateTime(entry.timestamp) }}</p>
          </div>
        </li>
      </ul>
      </div>
    </article>
  </div>
</AdminLayout>
</template>
