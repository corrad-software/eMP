<script setup lang="ts">
import { ref, computed } from "vue";
import { LogIn, FileText } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { MentionSession } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";

type SessionFilter = "all" | "scheduled" | "in-progress" | "completed";

const activeTab = ref<SessionFilter>("all");

const tabs: { key: SessionFilter; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "scheduled", label: "Dijadualkan" },
  { key: "in-progress", label: "Dalam Proses" },
  { key: "completed", label: "Selesai" },
];

const mockSessions: MentionSession[] = [
  {
    id: 1,
    caseId: 101,
    caseNo: "MP-KL-2026-0045",
    status: "in-progress",
    scheduledAt: "2026-03-25T09:00:00Z",
    startedAt: "2026-03-25T09:02:00Z",
    participants: [
      { name: "YA Tuan Hakim Azman", role: "Pengerusi", present: true },
      { name: "Ahmad bin Ismail", role: "Pihak Menuntut", present: true },
      { name: "Puan Faridah (Tetuan ABC)", role: "Peguam Pihak Menuntut", present: true },
      { name: "Syarikat XYZ Sdn Bhd", role: "Pihak Menentang", present: true },
      { name: "En. Ravi (Tetuan DEF)", role: "Peguam Pihak Menentang", present: false },
    ],
    messages: [],
    decisions: [],
  },
  {
    id: 2,
    caseId: 102,
    caseNo: "MP-KL-2026-0038",
    status: "scheduled",
    scheduledAt: "2026-03-25T10:30:00Z",
    participants: [
      { name: "YA Puan Hakim Noraini", role: "Pengerusi", present: false },
      { name: "Lim Chee Keong", role: "Pihak Menuntut", present: false },
      { name: "Global Industries Sdn Bhd", role: "Pihak Menentang", present: false },
    ],
    messages: [],
  },
  {
    id: 3,
    caseId: 103,
    caseNo: "MP-JB-2026-0112",
    status: "completed",
    scheduledAt: "2026-03-24T14:00:00Z",
    startedAt: "2026-03-24T14:05:00Z",
    endedAt: "2026-03-24T15:20:00Z",
    participants: [
      { name: "YA Tuan Hakim Razak", role: "Pengerusi", present: true },
      { name: "Siti Aminah binti Yusof", role: "Pihak Menuntut", present: true },
      { name: "Puan Marina (Tetuan GHI)", role: "Peguam Pihak Menuntut", present: true },
      { name: "Mega Corp Bhd", role: "Pihak Menentang", present: true },
    ],
    messages: [],
    decisions: ["Tarikh bicara ditetapkan pada 15 April 2026", "Pihak menentang dikehendaki memfailkan penyata jawapan dalam 14 hari"],
  },
  {
    id: 4,
    caseId: 104,
    caseNo: "MP-PG-2026-0067",
    status: "in-progress",
    scheduledAt: "2026-03-25T09:30:00Z",
    startedAt: "2026-03-25T09:35:00Z",
    participants: [
      { name: "YA Tuan Hakim Faisal", role: "Pengerusi", present: true },
      { name: "Raj Kumar a/l Subramaniam", role: "Pihak Menuntut", present: true },
      { name: "Tech Solutions Sdn Bhd", role: "Pihak Menentang", present: true },
    ],
    messages: [],
    decisions: [],
  },
  {
    id: 5,
    caseId: 105,
    caseNo: "MP-KL-2026-0029",
    status: "completed",
    scheduledAt: "2026-03-23T10:00:00Z",
    startedAt: "2026-03-23T10:03:00Z",
    endedAt: "2026-03-23T11:15:00Z",
    participants: [
      { name: "YA Puan Hakim Noraini", role: "Pengerusi", present: true },
      { name: "Wong Mei Ling", role: "Pihak Menuntut", present: true },
      { name: "Sunrise Manufacturing Sdn Bhd", role: "Pihak Menentang", present: true },
    ],
    messages: [],
    decisions: ["Kes diselesaikan melalui persetujuan bersama", "Award persetujuan akan direkodkan"],
  },
  {
    id: 6,
    caseId: 106,
    caseNo: "MP-KT-2026-0091",
    status: "scheduled",
    scheduledAt: "2026-03-26T09:00:00Z",
    participants: [
      { name: "YA Tuan Hakim Azman", role: "Pengerusi", present: false },
      { name: "Fatimah binti Hassan", role: "Pihak Menuntut", present: false },
      { name: "Delta Services Sdn Bhd", role: "Pihak Menentang", present: false },
    ],
    messages: [],
  },
];

const filteredSessions = computed(() => {
  if (activeTab.value === "all") return mockSessions;
  return mockSessions.filter((s) => s.status === activeTab.value);
});

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getChairman(session: MentionSession): string {
  const chair = session.participants.find((p) => p.role === "Pengerusi");
  return chair?.name ?? "-";
}

function getRoom(caseNo: string): string {
  const rooms: Record<string, string> = {
    "MP-KL-2026-0045": "Bilik Sebutan 1",
    "MP-KL-2026-0038": "Bilik Sebutan 2",
    "MP-JB-2026-0112": "Bilik Sebutan 1 (JB)",
    "MP-PG-2026-0067": "Bilik Sebutan 1 (PG)",
    "MP-KL-2026-0029": "Bilik Sebutan 3",
    "MP-KT-2026-0091": "Bilik Sebutan 1 (KT)",
  };
  return rooms[caseNo] ?? "Bilik Sebutan 1";
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div>
      <h1 class="page-title">e-Sebutan</h1>
      <p class="mt-1 text-sm text-slate-500">Sesi sebutan dalam talian bagi kes-kes Mahkamah Perusahaan</p>
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
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">No. Kes</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tarikh / Masa</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Bilik</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Pengerusi</th>
            <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Peserta</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Tindakan</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="session in filteredSessions" :key="session.id" class="hover:bg-slate-50 transition-colors">
            <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-blue-600">
              {{ session.caseNo }}
            </td>
            <td class="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
              {{ formatDateTime(session.scheduledAt) }}
            </td>
            <td class="px-4 py-3 text-sm text-slate-700">
              {{ getRoom(session.caseNo) }}
            </td>
            <td class="px-4 py-3 text-sm text-slate-700">
              {{ getChairman(session) }}
            </td>
            <td class="px-4 py-3 text-center text-sm text-slate-700">
              {{ session.participants.length }}
            </td>
            <td class="px-4 py-3">
              <AppStatusBadge :status="session.status" />
            </td>
            <td class="whitespace-nowrap px-4 py-3 text-right">
              <router-link
                v-if="session.status === 'in-progress'"
                :to="`/admin/esebutan/${session.id}`"
                class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
              >
                <LogIn class="h-3.5 w-3.5" />
                Masuk Sesi
              </router-link>
              <router-link
                v-else-if="session.status === 'completed'"
                :to="`/admin/esebutan/${session.id}/rumusan`"
                class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
              >
                <FileText class="h-3.5 w-3.5" />
                Lihat Rumusan
              </router-link>
              <span v-else class="text-xs text-slate-400">Belum bermula</span>
            </td>
          </tr>
          <tr v-if="filteredSessions.length === 0">
            <td colspan="7" class="px-4 py-12 text-center text-sm text-slate-400">
              Tiada sesi sebutan dalam kategori ini.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</AdminLayout>
</template>
