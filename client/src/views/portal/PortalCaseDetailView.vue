<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import PortalLayout from "@/layouts/PortalLayout.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AppTimeline from "@/components/AppTimeline.vue";
import type { TimelineEvent } from "@/components/AppTimeline.vue";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Gavel,
  User,
  Building,
  Clock,
  Scale,
} from "lucide-vue-next";

const route = useRoute();
const caseId = route.params.id;

const caseData = {
  id: 1,
  caseNo: "MPM/4/2-1234/2026",
  caseType: "Pembuangan Tidak Adil",
  subject: "Ahmad bin Ali lwn. ABC Sdn Bhd",
  status: "hearing",
  priority: "normal",
  registeredAt: "15 Januari 2026",
  assignedChairmanName: "YA Tuan Mohd Rizal",
  claimant: {
    name: "Ahmad bin Ali",
    ic: "880512-10-5523",
    address: "No. 45, Jalan Merdeka 3, Taman Sentosa, 43000 Kajang, Selangor",
    lawyer: "Pn. Faridah binti Omar (Tetuan Omar & Associates)",
  },
  respondent: {
    name: "ABC Sdn Bhd",
    regNo: "201501012345 (1234567-K)",
    address: "Lot 12, Kawasan Perindustrian Puchong, 47100 Puchong, Selangor",
    lawyer: "En. Ramesh a/l Krishnan (Tetuan Ramesh & Co)",
  },
  nextHearing: {
    date: "28 Mac 2026",
    time: "09:00",
    venue: "Bilik Mahkamah 1, Aras 5, Putrajaya",
    type: "Perbicaraan",
  },
};

const timeline: TimelineEvent[] = [
  { id: 1, title: "Kes Didaftarkan", description: "Kes diterima dan didaftarkan dalam sistem", timestamp: "15 Jan 2026", icon: FileText, actor: "Pendaftar" },
  { id: 2, title: "Pengerusi Dilantik", description: "YA Tuan Mohd Rizal dilantik sebagai Pengerusi", timestamp: "20 Jan 2026", icon: Gavel, actor: "YDP" },
  { id: 3, title: "Notis Sebutan Dihantar", description: "Notis sebutan pertama dihantar kepada kedua-dua pihak", timestamp: "25 Jan 2026", icon: FileText, actor: "Pendaftar" },
  { id: 4, title: "Sebutan Pertama", description: "Kedua-dua pihak hadir. Tarikh perbicaraan ditetapkan.", timestamp: "10 Feb 2026", icon: Scale, actor: "YA Tuan Mohd Rizal" },
  { id: 5, title: "Perbicaraan Hari Pertama", description: "Keterangan pihak Penuntut didengar", timestamp: "5 Mac 2026", icon: Gavel, actor: "YA Tuan Mohd Rizal" },
  { id: 6, title: "Perbicaraan Hari Kedua (Akan Datang)", description: "Keterangan pihak Responden", timestamp: "28 Mac 2026", icon: Calendar, actor: "YA Tuan Mohd Rizal" },
];

const documents = [
  { name: "Borang Pemfailan Kes", date: "15 Jan 2026", type: "Pemfailan" },
  { name: "Surat Pelantikan Pengerusi", date: "20 Jan 2026", type: "Surat" },
  { name: "Notis Sebutan Pertama", date: "25 Jan 2026", type: "Notis" },
  { name: "Minit Sebutan 10/02/2026", date: "10 Feb 2026", type: "Minit" },
  { name: "Notis Perbicaraan", date: "20 Feb 2026", type: "Notis" },
];

const statusSteps = [
  { key: "registered", label: "Didaftarkan" },
  { key: "in-progress", label: "Dalam Proses" },
  { key: "hearing", label: "Perbicaraan" },
  { key: "decided", label: "Diputuskan" },
  { key: "closed", label: "Ditutup" },
];

const currentStepIndex = computed(() => {
  const idx = statusSteps.findIndex((s) => s.key === caseData.status);
  return idx >= 0 ? idx : 0;
});
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <!-- Back link -->
      <router-link
        to="/portal/carian"
        class="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-700"
      >
        <ArrowLeft class="h-4 w-4" />
        {{ locale === 'bm' ? 'Kembali ke Carian' : 'Back to Search' }}
      </router-link>

      <!-- Case Header -->
      <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl font-bold text-slate-900">{{ caseData.caseNo }}</h1>
              <AppStatusBadge :status="caseData.status" />
            </div>
            <p class="mt-1 text-slate-600">{{ caseData.subject }}</p>
            <div class="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
              <span class="flex items-center gap-1"><Gavel class="h-3.5 w-3.5" /> {{ caseData.caseType }}</span>
              <span class="flex items-center gap-1"><Calendar class="h-3.5 w-3.5" /> {{ locale === 'bm' ? 'Didaftarkan' : 'Registered' }}: {{ caseData.registeredAt }}</span>
              <span class="flex items-center gap-1"><User class="h-3.5 w-3.5" /> {{ caseData.assignedChairmanName }}</span>
            </div>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="mt-5 flex items-center gap-0">
          <template v-for="(step, i) in statusSteps" :key="step.key">
            <div class="flex items-center gap-1.5">
              <span
                class="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
                :class="i < currentStepIndex ? 'bg-emerald-500 text-white' : i === currentStepIndex ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-400'"
              >{{ i + 1 }}</span>
              <span class="hidden text-xs sm:inline" :class="i <= currentStepIndex ? 'font-medium text-slate-700' : 'text-slate-400'">{{ step.label }}</span>
            </div>
            <div v-if="i < statusSteps.length - 1" class="mx-2 h-0.5 flex-1" :class="i < currentStepIndex ? 'bg-emerald-400' : 'bg-slate-200'" />
          </template>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="mt-6 grid gap-6 lg:grid-cols-3">
        <!-- Left: Parties + Documents -->
        <div class="space-y-6 lg:col-span-1">
          <!-- Next Hearing -->
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {{ locale === 'bm' ? 'Prosiding Seterusnya' : 'Next Proceeding' }}
            </p>
            <p class="mt-2 text-lg font-bold text-slate-900">{{ caseData.nextHearing.date }}</p>
            <p class="text-sm text-slate-600">{{ caseData.nextHearing.time }} · {{ caseData.nextHearing.type }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ caseData.nextHearing.venue }}</p>
          </div>

          <!-- Claimant -->
          <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User class="h-4 w-4 text-blue-600" />
              <h3 class="text-sm font-semibold text-slate-900">{{ locale === 'bm' ? 'Penuntut' : 'Claimant' }}</h3>
            </div>
            <dl class="mt-3 space-y-2 text-sm">
              <div><dt class="text-xs text-slate-400">{{ locale === 'bm' ? 'Nama' : 'Name' }}</dt><dd class="font-medium text-slate-800">{{ caseData.claimant.name }}</dd></div>
              <div><dt class="text-xs text-slate-400">{{ locale === 'bm' ? 'No. KP' : 'IC No.' }}</dt><dd class="text-slate-600">{{ caseData.claimant.ic }}</dd></div>
              <div><dt class="text-xs text-slate-400">{{ locale === 'bm' ? 'Peguam' : 'Lawyer' }}</dt><dd class="text-slate-600">{{ caseData.claimant.lawyer }}</dd></div>
            </dl>
          </div>

          <!-- Respondent -->
          <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building class="h-4 w-4 text-amber-600" />
              <h3 class="text-sm font-semibold text-slate-900">{{ locale === 'bm' ? 'Responden' : 'Respondent' }}</h3>
            </div>
            <dl class="mt-3 space-y-2 text-sm">
              <div><dt class="text-xs text-slate-400">{{ locale === 'bm' ? 'Syarikat' : 'Company' }}</dt><dd class="font-medium text-slate-800">{{ caseData.respondent.name }}</dd></div>
              <div><dt class="text-xs text-slate-400">{{ locale === 'bm' ? 'No. Pendaftaran' : 'Reg. No.' }}</dt><dd class="text-slate-600">{{ caseData.respondent.regNo }}</dd></div>
              <div><dt class="text-xs text-slate-400">{{ locale === 'bm' ? 'Peguam' : 'Lawyer' }}</dt><dd class="text-slate-600">{{ caseData.respondent.lawyer }}</dd></div>
            </dl>
          </div>
        </div>

        <!-- Right: Timeline + Documents -->
        <div class="space-y-6 lg:col-span-2">
          <!-- Timeline -->
          <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
              <Clock class="h-4 w-4 text-slate-500" />
              <h3 class="text-sm font-semibold text-slate-900">{{ locale === 'bm' ? 'Kronologi Kes' : 'Case Timeline' }}</h3>
            </div>
            <div class="p-4">
              <AppTimeline :events="timeline" />
            </div>
          </div>

          <!-- Documents -->
          <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
              <FileText class="h-4 w-4 text-blue-600" />
              <h3 class="text-sm font-semibold text-slate-900">{{ locale === 'bm' ? 'Dokumen Awam' : 'Public Documents' }}</h3>
            </div>
            <div class="divide-y divide-slate-100">
              <div v-for="doc in documents" :key="doc.name" class="flex items-center gap-3 px-4 py-3">
                <FileText class="h-4 w-4 shrink-0 text-slate-400" />
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-slate-700">{{ doc.name }}</p>
                  <p class="text-xs text-slate-400">{{ doc.type }} · {{ doc.date }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PortalLayout>
</template>
