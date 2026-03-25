<script setup lang="ts">
import { ref } from "vue";
import { Link, Settings, RefreshCw } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

type Integration = {
  id: number;
  name: string;
  description: string;
  status: "connected" | "disconnected";
  lastSync: string;
  endpoint: string;
};

const integrations = ref<Integration[]>([
  {
    id: 1,
    name: "MyDigital ID",
    description: "Pengesahan identiti digital untuk log masuk warganegara dan kakitangan.",
    status: "connected",
    lastSync: "2026-03-25 09:15:00",
    endpoint: "https://api.mydigitalid.gov.my/v2/****",
  },
  {
    id: 2,
    name: "JPPM",
    description: "Integrasi Jabatan Pendaftaran Pertubuhan Malaysia untuk pengesahan entiti.",
    status: "connected",
    lastSync: "2026-03-25 08:30:00",
    endpoint: "https://api.jppm.gov.my/v1/****",
  },
  {
    id: 3,
    name: "MyGovUC Mail Relay",
    description: "Relay e-mel rasmi kerajaan untuk notifikasi dan surat-menyurat.",
    status: "disconnected",
    lastSync: "2026-03-24 16:45:00",
    endpoint: "https://mail.govuc.gov.my/relay/****",
  },
  {
    id: 4,
    name: "SMS Gateway",
    description: "Gerbang SMS untuk penghantaran notifikasi segera kepada pihak-pihak.",
    status: "connected",
    lastSync: "2026-03-25 09:00:00",
    endpoint: "https://sms.gateway.gov.my/api/****",
  },
]);

const statusMap: Record<string, { label: string; color: string }> = {
  connected: { label: "Disambung", color: "bg-emerald-50 text-emerald-700 ring-emerald-300/60" },
  disconnected: { label: "Terputus", color: "bg-rose-50 text-rose-700 ring-rose-300/60" },
};

function formatDateTime(dt: string): string {
  return new Date(dt).toLocaleString("ms-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <div>
      <h1 class="page-title">Tetapan Integrasi</h1>
      <p class="mt-1 text-sm text-slate-500">Konfigurasi dan pantau sambungan sistem luaran</p>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="item in integrations"
        :key="item.id"
        class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div class="mb-4 flex items-start justify-between">
          <div class="flex items-start gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ring-1"
              :class="
                item.status === 'connected'
                  ? 'bg-emerald-50 text-emerald-600 ring-emerald-200/60'
                  : 'bg-slate-50 text-slate-500 ring-slate-200/60'
              "
            >
              <Link class="h-5 w-5" />
            </div>
            <div>
              <h3 class="font-semibold text-slate-900">{{ item.name }}</h3>
              <AppStatusBadge :status="item.status" :status-map="statusMap" class="mt-1" />
            </div>
          </div>
        </div>

        <p class="mb-4 text-sm leading-relaxed text-slate-500">{{ item.description }}</p>

        <div class="mb-4 space-y-2 text-sm">
          <div class="flex items-center gap-2 text-slate-500">
            <RefreshCw class="h-3.5 w-3.5" />
            <span>Sinkronisasi terakhir: {{ formatDateTime(item.lastSync) }}</span>
          </div>
          <div class="flex items-center gap-2 text-slate-500">
            <Settings class="h-3.5 w-3.5" />
            <span class="font-mono text-xs">{{ item.endpoint }}</span>
          </div>
        </div>

        <button
          class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Settings class="h-3.5 w-3.5" />
          Konfigurasi
        </button>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
