<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { FilePlus, Eye, Pencil } from "lucide-vue-next";
import AppDataTable from "@/components/AppDataTable.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { Column } from "@/components/AppDataTable.vue";
import type { CollectiveAgreement, CollectiveAgreementStatus } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = useRouter();

const activeTab = ref<"all" | CollectiveAgreementStatus>("all");

const tabs: { key: "all" | CollectiveAgreementStatus; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "submitted", label: "Dihantar" },
  { key: "under-review", label: "Dalam Semakan" },
  { key: "registered", label: "Berdaftar" },
  { key: "action-required", label: "Tindakan Diperlukan" },
  { key: "archived", label: "Diarkib" },
];

const columns: Column[] = [
  { key: "caNo", label: "No. CA", sortable: true },
  { key: "employerName", label: "Majikan", sortable: true },
  { key: "unionName", label: "Kesatuan", sortable: true },
  { key: "industry", label: "Industri", sortable: true },
  { key: "status", label: "Status" },
  { key: "submittedAt", label: "Tarikh", sortable: true },
  { key: "actions", label: "Tindakan", width: "120px" },
];

const mockRows: (CollectiveAgreement & Record<string, unknown>)[] = [
  {
    id: 1, caNo: "CA-2026-0001", employerName: "Syarikat Elektronik Maju Sdn Bhd",
    unionName: "Kesatuan Pekerja Industri Elektronik", industry: "Elektronik",
    status: "submitted", submittedAt: "2026-03-10", createdAt: "2026-03-10", updatedAt: "2026-03-10",
  },
  {
    id: 2, caNo: "CA-2026-0002", employerName: "Global Petroleum Berhad",
    unionName: "Kesatuan Pekerja Petroleum Semenanjung", industry: "Minyak & Gas",
    status: "under-review", submittedAt: "2026-02-25", createdAt: "2026-02-25", updatedAt: "2026-03-05",
  },
  {
    id: 3, caNo: "CA-2025-0048", employerName: "Hotel Seri Angkasa Sdn Bhd",
    unionName: "Kesatuan Pekerja Hotel & Restoran", industry: "Perhotelan",
    status: "registered", submittedAt: "2025-11-15", registeredAt: "2026-01-20",
    effectiveFrom: "2026-02-01", effectiveTo: "2029-01-31",
    createdAt: "2025-11-15", updatedAt: "2026-01-20",
  },
  {
    id: 4, caNo: "CA-2026-0003", employerName: "Penerbangan Nusantara Berhad",
    unionName: "Kesatuan Pekerja Penerbangan Malaysia", industry: "Penerbangan",
    status: "action-required", submittedAt: "2026-01-18", createdAt: "2026-01-18", updatedAt: "2026-03-12",
  },
  {
    id: 5, caNo: "CA-2024-0031", employerName: "Kilang Tekstil Utara Sdn Bhd",
    unionName: "Kesatuan Pekerja Tekstil Kedah", industry: "Tekstil",
    status: "archived", submittedAt: "2024-06-10", registeredAt: "2024-09-01",
    effectiveFrom: "2024-10-01", effectiveTo: "2027-09-30",
    createdAt: "2024-06-10", updatedAt: "2025-12-01",
  },
  {
    id: 6, caNo: "CA-2026-0004", employerName: "Bank Mutiara Berhad",
    unionName: "Kesatuan Pekerja Bank Perdagangan", industry: "Perbankan",
    status: "submitted", submittedAt: "2026-03-18", createdAt: "2026-03-18", updatedAt: "2026-03-18",
  },
];

const filteredRows = computed(() => {
  if (activeTab.value === "all") return mockRows;
  return mockRows.filter((r) => r.status === activeTab.value);
});

function formatDate(dateStr?: string): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function goToDetail(row: Record<string, unknown>) {
  router.push(`/admin/kes/ca/${row.id}`);
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Perjanjian Kolektif</h1>
        <p class="mt-1 text-sm text-slate-500">Pengurusan pendaftaran dan semakan perjanjian kolektif.</p>
      </div>
      <router-link
        to="/admin/kes/ca/baru"
        class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
      >
        <FilePlus class="h-4 w-4" />
        Daftar CA Baru
      </router-link>
    </div>

    <!-- Filter Tabs -->
    <div class="border-b border-slate-200">
      <nav class="-mb-px flex gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors"
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

    <!-- Table -->
    <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <AppDataTable :columns="columns" :rows="filteredRows" searchable clickable @row-click="goToDetail">
        <template #cell-caNo="{ value }">
          <span class="font-medium text-blue-600">{{ value }}</span>
        </template>

        <template #cell-status="{ value }">
          <AppStatusBadge :status="(value as string)" />
        </template>

        <template #cell-submittedAt="{ value }">
          {{ formatDate(value as string) }}
        </template>

        <template #cell-actions="{ row }">
          <div class="flex items-center gap-1">
            <button
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
              title="Lihat"
              @click.stop="router.push(`/admin/kes/ca/${row.id}`)"
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
