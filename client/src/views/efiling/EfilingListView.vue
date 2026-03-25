<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { FilePlus, Eye, Pencil, Search } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { Filing, FilingStatus } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = useRouter();

const activeTab = ref<"all" | FilingStatus>("all");

const tabs: { key: "all" | FilingStatus; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "draft", label: "Draf" },
  { key: "submitted", label: "Dihantar" },
  { key: "under-review", label: "Dalam Semakan" },
  { key: "accepted", label: "Diterima" },
  { key: "rejected", label: "Ditolak" },
];

const mockFilings: Filing[] = [
  {
    id: 1,
    referenceNo: "EF-2026-000142",
    filingType: "Pembuangan Tidak Adil",
    status: "submitted",
    applicantName: "Ahmad bin Ismail",
    documents: [],
    submittedAt: "2026-03-20T09:15:00Z",
    createdAt: "2026-03-18T08:00:00Z",
    updatedAt: "2026-03-20T09:15:00Z",
  },
  {
    id: 2,
    referenceNo: "EF-2026-000138",
    filingType: "Pertikaian Perdagangan",
    status: "under-review",
    applicantName: "Siti Aminah binti Yusof",
    documents: [],
    submittedAt: "2026-03-15T14:30:00Z",
    createdAt: "2026-03-14T10:00:00Z",
    updatedAt: "2026-03-16T11:00:00Z",
  },
  {
    id: 3,
    referenceNo: "EF-2026-000135",
    filingType: "Perjanjian Kolektif",
    status: "accepted",
    applicantName: "Kesatuan Pekerja Industri Elektronik",
    caseNo: "MP-KL-2026-0089",
    documents: [],
    submittedAt: "2026-03-10T10:00:00Z",
    createdAt: "2026-03-08T09:00:00Z",
    updatedAt: "2026-03-12T16:00:00Z",
  },
  {
    id: 4,
    referenceNo: "EF-2026-000147",
    filingType: "Pembuangan Tidak Adil",
    status: "draft",
    applicantName: "Raj Kumar a/l Subramaniam",
    documents: [],
    createdAt: "2026-03-22T14:00:00Z",
    updatedAt: "2026-03-22T14:00:00Z",
  },
  {
    id: 5,
    referenceNo: "EF-2026-000130",
    filingType: "Ketidakpatuhan Award",
    status: "rejected",
    applicantName: "Lim Chee Keong",
    documents: [],
    submittedAt: "2026-03-05T08:45:00Z",
    createdAt: "2026-03-03T11:00:00Z",
    updatedAt: "2026-03-08T09:30:00Z",
  },
  {
    id: 6,
    referenceNo: "EF-2026-000149",
    filingType: "Pertikaian Perdagangan",
    status: "returned",
    applicantName: "Fatimah binti Hassan",
    documents: [],
    submittedAt: "2026-03-21T16:20:00Z",
    createdAt: "2026-03-19T10:00:00Z",
    updatedAt: "2026-03-23T10:00:00Z",
  },
];

const filteredFilings = computed(() => {
  if (activeTab.value === "all") return mockFilings;
  return mockFilings.filter((f) => f.status === activeTab.value);
});

function formatDate(dateStr?: string): string {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">e-Filing & e-Services</h1>
        <p class="mt-1 text-sm text-slate-500">Urus pemfailan kes dan perkhidmatan dalam talian</p>
      </div>
      <router-link
        to="/admin/efiling/baru"
        class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
      >
        <FilePlus class="h-4 w-4" />
        Pemfailan Baru
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
    <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">No. Rujukan</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Jenis Pemfailan</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Pemohon</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tarikh</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Tindakan</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="filing in filteredFilings" :key="filing.id" class="hover:bg-slate-50 transition-colors">
            <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-blue-600">
              <router-link :to="`/admin/efiling/${filing.id}`" class="hover:underline">
                {{ filing.referenceNo }}
              </router-link>
            </td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ filing.filingType }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ filing.applicantName }}</td>
            <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-500">{{ formatDate(filing.submittedAt ?? filing.createdAt) }}</td>
            <td class="px-4 py-3">
              <AppStatusBadge :status="filing.status" />
            </td>
            <td class="whitespace-nowrap px-4 py-3 text-right">
              <div class="flex items-center justify-end gap-1">
                <router-link
                  :to="`/admin/efiling/${filing.id}`"
                  class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  title="Lihat"
                >
                  <Eye class="h-4 w-4" />
                </router-link>
                <router-link
                  v-if="filing.status === 'under-review'"
                  :to="`/admin/efiling/${filing.id}/semak`"
                  class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  title="Semak"
                >
                  <Pencil class="h-4 w-4" />
                </router-link>
              </div>
            </td>
          </tr>
          <tr v-if="filteredFilings.length === 0">
            <td colspan="6" class="px-4 py-12 text-center text-sm text-slate-400">
              Tiada pemfailan dalam kategori ini.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</AdminLayout>
</template>
