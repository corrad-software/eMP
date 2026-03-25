<script setup lang="ts">
import { ref } from "vue";
import { Settings, Clock, Bell, Save } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const slaThresholds = ref({
  sebutan: 14,
  perbicaraan: 30,
  penghantaranNotis: 7,
  eskalasi: 3,
});

const alerts = ref({
  email: true,
  sms: false,
  dashboard: true,
  autoEscalation: true,
});

const triggerColumns = [
  { key: "trigger", label: "Pencetus" },
  { key: "action", label: "Tindakan" },
  { key: "time", label: "Masa" },
  { key: "status", label: "Status" },
];

const triggerRows = ref([
  { trigger: "Kes Baru Didaftarkan", action: "Hantar Notis Sebutan", time: "24 jam", status: "active" },
  { trigger: "Tarikh Perbicaraan Ditetapkan", action: "Hantar Notis Perbicaraan", time: "48 jam", status: "active" },
  { trigger: "SLA Hampir Tamat", action: "Eskalasi ke Penyelia", time: "2 jam", status: "active" },
  { trigger: "Notis Gagal Dihantar", action: "Cuba Semula & Maklumkan", time: "1 jam", status: "inactive" },
]);

const triggerStatusMap: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-emerald-50 text-emerald-700 ring-emerald-300/60" },
  inactive: { label: "Tidak Aktif", color: "bg-slate-100 text-slate-600 ring-slate-300/60" },
};
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Pengurusan Notis', to: '/admin/notis' }, { label: 'Tetapan' }]" />
    <!-- Page Header -->
    <div>
      <h1 class="page-title">Tetapan Notis</h1>
      <p class="mt-1 text-sm text-slate-500">Konfigurasi enjin notis dan peringatan</p>
    </div>

    <!-- Ambang SLA -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Clock class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Ambang SLA</h2>
      </div>
      <div class="space-y-3 p-4">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Sebutan (hari)</label>
          <input
            v-model.number="slaThresholds.sebutan"
            type="number"
            min="1"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Perbicaraan (hari)</label>
          <input
            v-model.number="slaThresholds.perbicaraan"
            type="number"
            min="1"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Penghantaran Notis (hari)</label>
          <input
            v-model.number="slaThresholds.penghantaranNotis"
            type="number"
            min="1"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Eskalasi (hari)</label>
          <input
            v-model.number="slaThresholds.eskalasi"
            type="number"
            min="1"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
      </div>
      </div>
    </article>

    <!-- Tetapan Peringatan -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Bell class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Tetapan Peringatan</h2>
      </div>
      <div class="space-y-3 p-4">
      <div class="space-y-4">
        <label class="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
          <div>
            <p class="text-sm font-medium text-slate-900">Peringatan Emel</p>
            <p class="text-xs text-slate-500">Hantar peringatan melalui emel</p>
          </div>
          <button
            type="button"
            role="switch"
            :aria-checked="alerts.email"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
            :class="alerts.email ? 'bg-blue-600' : 'bg-slate-200'"
            @click="alerts.email = !alerts.email"
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200"
              :class="alerts.email ? 'translate-x-5' : 'translate-x-0'"
            />
          </button>
        </label>

        <label class="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
          <div>
            <p class="text-sm font-medium text-slate-900">Peringatan SMS</p>
            <p class="text-xs text-slate-500">Hantar peringatan melalui SMS</p>
          </div>
          <button
            type="button"
            role="switch"
            :aria-checked="alerts.sms"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
            :class="alerts.sms ? 'bg-blue-600' : 'bg-slate-200'"
            @click="alerts.sms = !alerts.sms"
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200"
              :class="alerts.sms ? 'translate-x-5' : 'translate-x-0'"
            />
          </button>
        </label>

        <label class="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
          <div>
            <p class="text-sm font-medium text-slate-900">Peringatan Dashboard</p>
            <p class="text-xs text-slate-500">Papar peringatan pada dashboard</p>
          </div>
          <button
            type="button"
            role="switch"
            :aria-checked="alerts.dashboard"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
            :class="alerts.dashboard ? 'bg-blue-600' : 'bg-slate-200'"
            @click="alerts.dashboard = !alerts.dashboard"
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200"
              :class="alerts.dashboard ? 'translate-x-5' : 'translate-x-0'"
            />
          </button>
        </label>

        <label class="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
          <div>
            <p class="text-sm font-medium text-slate-900">Eskalasi Automatik</p>
            <p class="text-xs text-slate-500">Eskalasi automatik apabila SLA dilanggar</p>
          </div>
          <button
            type="button"
            role="switch"
            :aria-checked="alerts.autoEscalation"
            class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
            :class="alerts.autoEscalation ? 'bg-blue-600' : 'bg-slate-200'"
            @click="alerts.autoEscalation = !alerts.autoEscalation"
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200"
              :class="alerts.autoEscalation ? 'translate-x-5' : 'translate-x-0'"
            />
          </button>
        </label>
      </div>
      </div>
    </article>

    <!-- Templat Pencetus -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Settings class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Templat Pencetus</h2>
      </div>
      <div class="space-y-3 p-4">
      <div class="overflow-x-auto rounded-lg border border-slate-200">
        <table class="min-w-full divide-y divide-slate-200 text-sm">
          <thead class="bg-slate-50">
            <tr>
              <th
                v-for="col in triggerColumns"
                :key="col.key"
                class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 bg-white">
            <tr v-for="(row, i) in triggerRows" :key="i">
              <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">{{ row.trigger }}</td>
              <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{{ row.action }}</td>
              <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{{ row.time }}</td>
              <td class="whitespace-nowrap px-4 py-3">
                <AppStatusBadge :status="row.status" :status-map="triggerStatusMap" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </article>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button
        class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
      >
        <Save class="h-4 w-4" />
        Simpan Tetapan
      </button>
    </div>
  </div>
</AdminLayout>
</template>
