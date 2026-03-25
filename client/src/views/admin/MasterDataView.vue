<script setup lang="ts">
import { ref, computed } from "vue";
import { Plus, Pencil, Trash2 } from "lucide-vue-next";
import AppDataTable from "@/components/AppDataTable.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { Column } from "@/components/AppDataTable.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const activeTab = ref("mahkamah");

const tabs = [
  { key: "mahkamah", label: "Mahkamah" },
  { key: "bilik", label: "Bilik Mahkamah" },
  { key: "jenisKes", label: "Jenis Kes" },
  { key: "jenisDokumen", label: "Jenis Dokumen" },
  { key: "jawatan", label: "Jawatan" },
];

const columns: Column[] = [
  { key: "name", label: "Nama", sortable: true },
  { key: "code", label: "Kod", sortable: true },
  { key: "status", label: "Status", width: "120px" },
  { key: "actions", label: "Tindakan", width: "120px" },
];

const mockData: Record<string, Record<string, unknown>[]> = {
  mahkamah: [
    { id: 1, name: "Mahkamah Tinggi Kuala Lumpur", code: "MTKL", status: "active" },
    { id: 2, name: "Mahkamah Tinggi Shah Alam", code: "MTSA", status: "active" },
    { id: 3, name: "Mahkamah Sesyen Petaling Jaya", code: "MSPJ", status: "active" },
    { id: 4, name: "Mahkamah Majistret Ampang", code: "MMA", status: "inactive" },
  ],
  bilik: [
    { id: 1, name: "Bilik Bicara 1", code: "BB-01", status: "active" },
    { id: 2, name: "Bilik Bicara 2", code: "BB-02", status: "active" },
    { id: 3, name: "Bilik Bicara 3", code: "BB-03", status: "inactive" },
    { id: 4, name: "Bilik Sebutan A", code: "BS-A", status: "active" },
    { id: 5, name: "Bilik Sebutan B", code: "BS-B", status: "active" },
  ],
  jenisKes: [
    { id: 1, name: "Sivil", code: "SV", status: "active" },
    { id: 2, name: "Jenayah", code: "JN", status: "active" },
    { id: 3, name: "Rayuan Sivil", code: "RS", status: "active" },
    { id: 4, name: "Rayuan Jenayah", code: "RJ", status: "active" },
    { id: 5, name: "Kebankrapan", code: "KB", status: "inactive" },
  ],
  jenisDokumen: [
    { id: 1, name: "Writ Saman", code: "WS", status: "active" },
    { id: 2, name: "Saman Pemula", code: "SP", status: "active" },
    { id: 3, name: "Afidavit", code: "AF", status: "active" },
    { id: 4, name: "Notis Usul", code: "NU", status: "inactive" },
  ],
  jawatan: [
    { id: 1, name: "Hakim", code: "HKM", status: "active" },
    { id: 2, name: "Pendaftar", code: "PND", status: "active" },
    { id: 3, name: "Penolong Pendaftar", code: "PP", status: "active" },
    { id: 4, name: "Pentadbir Mahkamah", code: "PM", status: "active" },
  ],
};

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-emerald-50 text-emerald-700 ring-emerald-300/60" },
  inactive: { label: "Tidak Aktif", color: "bg-slate-100 text-slate-600 ring-slate-300/60" },
};

const activeRows = computed(() => mockData[activeTab.value] ?? []);
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Data Induk</h1>
        <p class="mt-1 text-sm text-slate-500">Urus data rujukan utama sistem</p>
      </div>
      <button
        class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
      >
        <Plus class="h-4 w-4" />
        Tambah Baru
      </button>
    </div>

    <div class="border-b border-slate-200">
      <nav class="-mb-px flex gap-6" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors"
          :class="
            activeTab === tab.key
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
          "
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <AppDataTable :columns="columns" :rows="activeRows" searchable>
      <template #cell-status="{ value }">
        <AppStatusBadge :status="String(value)" :status-map="statusMap" />
      </template>
      <template #cell-actions>
        <div class="flex items-center gap-2">
          <button
            class="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600"
            title="Edit"
          >
            <Pencil class="h-4 w-4" />
          </button>
          <button
            class="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
            title="Padam"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </template>
    </AppDataTable>
  </div>
</AdminLayout>
</template>
