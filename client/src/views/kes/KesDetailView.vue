<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Clock,
  Users,
  FileText,
  Gavel,
  Scale,
  Calendar,
  ArrowLeft,
  Download,
  Eye,
  Upload,
  MapPin,
} from "lucide-vue-next";
import type { Component } from "vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AppTimeline from "@/components/AppTimeline.vue";
import type { TimelineEvent } from "@/components/AppTimeline.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();
const caseId = route.params.id;

const activeTab = ref<"timeline" | "parties" | "documents" | "proceedings" | "decision">("timeline");

const tabs: { key: typeof activeTab.value; label: string; icon: Component }[] = [
  { key: "timeline", label: "Timeline", icon: Clock },
  { key: "parties", label: "Pihak-Pihak", icon: Users },
  { key: "documents", label: "Dokumen", icon: FileText },
  { key: "proceedings", label: "Prosiding", icon: Gavel },
  { key: "decision", label: "Keputusan", icon: Scale },
];

const caseData = {
  caseNo: "MP(S)/1-0201/2026",
  subject: "Pembuangan Kerja Tidak Adil - Ahmad bin Ismail lawan Mega Corp Sdn Bhd",
  status: "hearing",
  priority: "normal",
  assignedChairman: "YA Tuan Mohd Rizal",
  caseType: "Pembuangan Kerja Tidak Adil",
  registeredAt: "15 Januari 2026",
};

const timelineEvents: TimelineEvent[] = [
  { id: 1, title: "Kes didaftarkan", description: "Kes diterima daripada JPPM dan didaftarkan dalam sistem.", timestamp: "15 Jan 2026, 10:00 AM", actor: "Puan Noraini", icon: FileText, color: "bg-blue-100" },
  { id: 2, title: "Pengerusi ditugaskan", description: "YA Tuan Mohd Rizal dilantik sebagai Pengerusi.", timestamp: "16 Jan 2026, 2:30 PM", actor: "YDP", icon: Users, color: "bg-violet-100" },
  { id: 3, title: "Notis Sebutan dikeluarkan", description: "Notis sebutan pertama dihantar kepada kedua-dua pihak.", timestamp: "20 Jan 2026, 9:00 AM", actor: "Sistem", icon: FileText, color: "bg-slate-100" },
  { id: 4, title: "Sebutan pertama", description: "Sebutan pertama di Bilik Sebutan 3. Kedua-dua pihak hadir.", timestamp: "10 Feb 2026, 9:30 AM", actor: "YA Tuan Mohd Rizal", icon: Gavel, color: "bg-amber-100" },
  { id: 5, title: "Dokumen difailkan", description: "Penyata Tuntutan difailkan oleh pihak penuntut.", timestamp: "25 Feb 2026, 3:00 PM", actor: "Ahmad bin Ismail", icon: Upload, color: "bg-emerald-100" },
  { id: 6, title: "Dokumen difailkan", description: "Penyata Jawapan difailkan oleh pihak responden.", timestamp: "10 Mac 2026, 11:00 AM", actor: "Mega Corp Sdn Bhd", icon: Upload, color: "bg-emerald-100" },
  { id: 7, title: "Perbicaraan dijadualkan", description: "Perbicaraan hari pertama ditetapkan pada 5 April 2026.", timestamp: "15 Mac 2026, 2:00 PM", actor: "YA Tuan Mohd Rizal", icon: Calendar, color: "bg-blue-100" },
  { id: 8, title: "Sebutan kedua", description: "Sebutan kedua untuk pengurusan kes sebelum perbicaraan.", timestamp: "20 Mac 2026, 10:00 AM", actor: "YA Tuan Mohd Rizal", icon: Gavel, color: "bg-amber-100" },
];

const parties = {
  claimant: {
    name: "Ahmad bin Ismail",
    type: "Penuntut",
    ic: "850614-10-5521",
    address: "No. 23, Jalan Sejahtera 5, Taman Harmoni, 43000 Kajang, Selangor",
    email: "ahmad.ismail@email.com",
    phone: "012-3456789",
    lawyer: "Encik Razak bin Yusof",
    firm: "Razak & Associates",
  },
  respondent: {
    name: "Mega Corp Sdn Bhd",
    type: "Responden",
    regNo: "200501018765",
    address: "Tingkat 15, Menara Mega, Jalan Sultan Ismail, 50250 Kuala Lumpur",
    email: "legal@megacorp.com.my",
    phone: "03-21234567",
    lawyer: "Puan Faridah binti Ali",
    firm: "Faridah & Partners",
  },
};

const documents = [
  { id: 1, type: "Borang 1", name: "Borang_1_Ahmad_Ismail.pdf", uploadedBy: "Puan Noraini", date: "15 Jan 2026", size: "245 KB" },
  { id: 2, type: "Penyata Tuntutan", name: "Penyata_Tuntutan_Penuntut.pdf", uploadedBy: "Ahmad bin Ismail", date: "25 Feb 2026", size: "1.2 MB" },
  { id: 3, type: "Penyata Jawapan", name: "Penyata_Jawapan_Responden.pdf", uploadedBy: "Mega Corp Sdn Bhd", date: "10 Mac 2026", size: "890 KB" },
  { id: 4, type: "Notis Sebutan", name: "Notis_Sebutan_1.pdf", uploadedBy: "Sistem", date: "20 Jan 2026", size: "120 KB" },
  { id: 5, type: "Ikatan Dokumen", name: "Ikatan_Dokumen_Penuntut.pdf", uploadedBy: "Ahmad bin Ismail", date: "18 Mac 2026", size: "3.5 MB" },
];

const proceedings = [
  { id: 1, date: "10 Feb 2026", type: "Sebutan", venue: "Bilik Sebutan 3", chairman: "YA Tuan Mohd Rizal", status: "completed" },
  { id: 2, date: "20 Mac 2026", type: "Sebutan", venue: "Bilik Sebutan 2", chairman: "YA Tuan Mohd Rizal", status: "completed" },
  { id: 3, date: "5 Apr 2026", type: "Perbicaraan", venue: "Bilik Bicara 1", chairman: "YA Tuan Mohd Rizal", status: "scheduled" },
  { id: 4, date: "6 Apr 2026", type: "Perbicaraan", venue: "Bilik Bicara 1", chairman: "YA Tuan Mohd Rizal", status: "scheduled" },
];

const decision = {
  hasDecision: false,
  awardNo: null as string | null,
  awardDate: null as string | null,
  summary: null as string | null,
};

// ── Case lifecycle progress ──
const lifecycleSteps = [
  { key: "registered", label: "Didaftarkan" },
  { key: "in_progress", label: "Dalam Proses" },
  { key: "hearing", label: "Perbicaraan" },
  { key: "decided", label: "Diputuskan" },
  { key: "closed", label: "Ditutup" },
];

const currentStepIndex = computed(() => {
  const statusMap: Record<string, number> = {
    registered: 0,
    in_progress: 1,
    hearing: 2,
    decided: 3,
    closed: 4,
  };
  return statusMap[caseData.status] ?? 0;
});
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Pengurusan Kes', to: '/admin/kes' }, { label: caseData.caseNo }]" />
    <!-- Header -->
    <div class="flex items-start gap-3">
      <button
        class="mt-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
        @click="router.push('/admin/kes')"
      >
        <ArrowLeft class="h-4 w-4" />
      </button>
      <div class="flex-1">
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="page-title">{{ caseData.caseNo }}</h1>
          <AppStatusBadge :status="caseData.status" />
          <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {{ caseData.priority === 'urgent' ? 'Segera' : 'Biasa' }}
          </span>
        </div>
        <p class="mt-1 text-sm text-slate-600">{{ caseData.subject }}</p>
        <div class="mt-2 flex items-center gap-4 text-xs text-slate-500">
          <span class="flex items-center gap-1"><Users class="h-3.5 w-3.5" /> {{ caseData.assignedChairman }}</span>
          <span class="flex items-center gap-1"><Calendar class="h-3.5 w-3.5" /> Didaftar: {{ caseData.registeredAt }}</span>
        </div>
      </div>
      <div class="flex gap-2">
        <router-link
          :to="`/admin/kes/${caseId}/timeline`"
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Clock class="mr-1.5 inline h-4 w-4" />
          Timeline Penuh
        </router-link>
        <router-link
          :to="`/admin/kes/${caseId}/tugasan`"
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Tugasan
        </router-link>
      </div>
    </div>

    <!-- Case Lifecycle Progress -->
    <div class="rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div class="flex items-center">
        <template v-for="(step, idx) in lifecycleSteps" :key="step.key">
          <!-- Step circle + label -->
          <div class="flex flex-col items-center">
            <div
              class="flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors"
              :class="idx < currentStepIndex
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : idx === currentStepIndex
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 bg-white text-slate-400'"
            >
              <svg v-if="idx < currentStepIndex" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <span
              class="mt-1.5 whitespace-nowrap text-[11px] font-medium"
              :class="idx <= currentStepIndex ? 'text-slate-800' : 'text-slate-400'"
            >{{ step.label }}</span>
          </div>
          <!-- Connector line -->
          <div
            v-if="idx < lifecycleSteps.length - 1"
            class="mb-5 h-0.5 flex-1 mx-1.5"
            :class="idx < currentStepIndex ? 'bg-emerald-500' : 'bg-slate-200'"
          />
        </template>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="border-b border-slate-200">
      <nav class="flex gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors"
          :class="activeTab === tab.key
            ? 'border-blue-600 text-blue-600'
            : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'"
          @click="activeTab = tab.key"
        >
          <component :is="tab.icon" class="h-4 w-4" />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab: Timeline -->
    <article v-if="activeTab === 'timeline'" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Clock class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Kronologi Kes</h2>
      </div>
      <div class="space-y-3 p-4">
        <AppTimeline :events="timelineEvents" />
      </div>
    </article>

    <!-- Tab: Pihak-Pihak -->
    <div v-if="activeTab === 'parties'" class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Penuntut -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Users class="h-4 w-4 text-blue-600" />
          <h3 class="text-sm font-semibold text-slate-900">{{ parties.claimant.type }}</h3>
        </div>
        <div class="space-y-3 p-4 text-sm">
          <div><span class="text-slate-500">Nama:</span> <span class="ml-2 font-medium text-slate-900">{{ parties.claimant.name }}</span></div>
          <div><span class="text-slate-500">No. KP:</span> <span class="ml-2 text-slate-700">{{ parties.claimant.ic }}</span></div>
          <div><span class="text-slate-500">Alamat:</span> <span class="ml-2 text-slate-700">{{ parties.claimant.address }}</span></div>
          <div><span class="text-slate-500">E-mel:</span> <span class="ml-2 text-slate-700">{{ parties.claimant.email }}</span></div>
          <div><span class="text-slate-500">Telefon:</span> <span class="ml-2 text-slate-700">{{ parties.claimant.phone }}</span></div>
          <hr class="border-slate-100" />
          <div><span class="text-slate-500">Peguam:</span> <span class="ml-2 font-medium text-slate-900">{{ parties.claimant.lawyer }}</span></div>
          <div><span class="text-slate-500">Firma:</span> <span class="ml-2 text-slate-700">{{ parties.claimant.firm }}</span></div>
        </div>
      </article>

      <!-- Responden -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Users class="h-4 w-4 text-amber-600" />
          <h3 class="text-sm font-semibold text-slate-900">{{ parties.respondent.type }}</h3>
        </div>
        <div class="space-y-3 p-4 text-sm">
          <div><span class="text-slate-500">Syarikat:</span> <span class="ml-2 font-medium text-slate-900">{{ parties.respondent.name }}</span></div>
          <div><span class="text-slate-500">No. Pendaftaran:</span> <span class="ml-2 text-slate-700">{{ parties.respondent.regNo }}</span></div>
          <div><span class="text-slate-500">Alamat:</span> <span class="ml-2 text-slate-700">{{ parties.respondent.address }}</span></div>
          <div><span class="text-slate-500">E-mel:</span> <span class="ml-2 text-slate-700">{{ parties.respondent.email }}</span></div>
          <div><span class="text-slate-500">Telefon:</span> <span class="ml-2 text-slate-700">{{ parties.respondent.phone }}</span></div>
          <hr class="border-slate-100" />
          <div><span class="text-slate-500">Peguam:</span> <span class="ml-2 font-medium text-slate-900">{{ parties.respondent.lawyer }}</span></div>
          <div><span class="text-slate-500">Firma:</span> <span class="ml-2 text-slate-700">{{ parties.respondent.firm }}</span></div>
        </div>
      </article>
    </div>

    <!-- Tab: Dokumen -->
    <article v-if="activeTab === 'documents'" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="border-b border-slate-100 px-4 py-2.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <FileText class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Dokumen Kes</h2>
          </div>
          <button class="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800">
            <Upload class="h-4 w-4" />
            Muat Naik
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-100 text-left">
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Jenis</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Nama Fail</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Dimuat Naik Oleh</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Tarikh</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Saiz</th>
              <th class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Tindakan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="doc in documents" :key="doc.id" class="hover:bg-slate-50">
              <td class="px-6 py-3">
                <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">{{ doc.type }}</span>
              </td>
              <td class="px-6 py-3">
                <div class="flex items-center gap-2">
                  <FileText class="h-4 w-4 text-slate-400" />
                  <span class="font-medium text-slate-900">{{ doc.name }}</span>
                </div>
              </td>
              <td class="px-6 py-3 text-slate-600">{{ doc.uploadedBy }}</td>
              <td class="px-6 py-3 text-slate-600">{{ doc.date }}</td>
              <td class="px-6 py-3 text-slate-500">{{ doc.size }}</td>
              <td class="px-6 py-3 text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Lihat">
                    <Eye class="h-4 w-4" />
                  </button>
                  <button class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Muat Turun">
                    <Download class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- Tab: Prosiding -->
    <article v-if="activeTab === 'proceedings'" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Gavel class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Sesi Prosiding</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-100 text-left">
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Tarikh</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Jenis</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Tempat</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Pengerusi</th>
              <th class="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="proc in proceedings" :key="proc.id" class="hover:bg-slate-50">
              <td class="px-6 py-3 font-medium text-slate-900">
                <div class="flex items-center gap-2">
                  <Calendar class="h-4 w-4 text-slate-400" />
                  {{ proc.date }}
                </div>
              </td>
              <td class="px-6 py-3 text-slate-700">{{ proc.type }}</td>
              <td class="px-6 py-3 text-slate-600">
                <div class="flex items-center gap-1.5">
                  <MapPin class="h-3.5 w-3.5 text-slate-400" />
                  {{ proc.venue }}
                </div>
              </td>
              <td class="px-6 py-3 text-slate-700">{{ proc.chairman }}</td>
              <td class="px-6 py-3">
                <AppStatusBadge :status="proc.status" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- Tab: Keputusan -->
    <article v-if="activeTab === 'decision'" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Scale class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Keputusan / Award</h2>
      </div>
      <div class="space-y-3 p-4">
      <div v-if="!decision.hasDecision" class="flex flex-col items-center justify-center py-12 text-center">
        <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Scale class="h-7 w-7 text-slate-400" />
        </div>
        <p class="text-sm font-medium text-slate-600">Kes ini belum mempunyai keputusan.</p>
        <p class="mt-1 text-xs text-slate-400">Keputusan akan dipaparkan setelah perbicaraan selesai.</p>
      </div>
      <div v-else class="space-y-4">
        <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p class="text-sm font-semibold text-emerald-800">Award No: {{ decision.awardNo }}</p>
          <p class="mt-1 text-xs text-emerald-600">Tarikh: {{ decision.awardDate }}</p>
          <p class="mt-2 text-sm text-slate-700">{{ decision.summary }}</p>
        </div>
      </div>
      </div>
    </article>
  </div>
</AdminLayout>
</template>
