<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, UserCheck, Clock, FileText, Users, ShieldCheck } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();
const caseId = route.params.id;

const ydpNotes = ref("");

const caseData = {
  id: caseId,
  referenceNo: "JPPM/2026/0234",
  caseNo: "MP(S)/1-0234/2026",
  subject: "Pembuangan Kerja Tidak Adil - Ahmad bin Ismail",
  caseType: "Pembuangan Kerja Tidak Adil",
  priority: "normal",
  receivedDate: "20 Mac 2026",
  registeredBy: "Puan Noraini binti Hassan",
  registeredAt: "21 Mac 2026, 10:30 AM",
  claimant: {
    name: "Ahmad bin Ismail",
    ic: "850614-10-5521",
    address: "No. 23, Jalan Sejahtera 5, Taman Harmoni, 43000 Kajang, Selangor",
    email: "ahmad.ismail@email.com",
  },
  respondent: {
    company: "Mega Corp Sdn Bhd",
    regNo: "200501018765",
    address: "Tingkat 15, Menara Mega, Jalan Sultan Ismail, 50250 Kuala Lumpur",
  },
};

const suggestedChairman = {
  name: "YA Puan Siti Aminah",
  activeCases: 8,
  completedThisYear: 24,
  avgDaysToResolve: 45,
  specialization: "Pembuangan Kerja",
};
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Pendaftaran Kes', to: '/admin/kes/daftar' }, { label: 'Kelulusan' }]" />
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button
        class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
        @click="router.push('/admin/kes/daftar')"
      >
        <ArrowLeft class="h-4 w-4" />
      </button>
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <h1 class="page-title">{{ caseData.caseNo }}</h1>
          <AppStatusBadge status="pending" :status-map="{ pending: { label: 'Menunggu Kelulusan', color: 'bg-amber-50 text-amber-700 ring-amber-300/60' } }" />
        </div>
        <p class="mt-0.5 text-sm text-slate-500">{{ caseData.subject }}</p>
      </div>
    </div>

    <!-- Case Summary -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <FileText class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Ringkasan Kes</h2>
      </div>
      <div class="space-y-3 p-4">
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="space-y-3">
            <div class="flex justify-between border-b border-slate-100 pb-2">
              <span class="text-sm text-slate-500">No. Rujukan JPPM</span>
              <span class="text-sm font-medium text-slate-900">{{ caseData.referenceNo }}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-2">
              <span class="text-sm text-slate-500">Jenis Kes</span>
              <span class="text-sm font-medium text-slate-900">{{ caseData.caseType }}</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-2">
              <span class="text-sm text-slate-500">Keutamaan</span>
              <span class="text-sm font-medium text-slate-900">Biasa</span>
            </div>
            <div class="flex justify-between border-b border-slate-100 pb-2">
              <span class="text-sm text-slate-500">Tarikh Terima</span>
              <span class="text-sm font-medium text-slate-900">{{ caseData.receivedDate }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-slate-500">Didaftarkan Oleh</span>
              <span class="text-sm font-medium text-slate-900">{{ caseData.registeredBy }}</span>
            </div>
          </div>

          <div class="space-y-4">
            <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Penuntut</h3>
              <p class="text-sm font-medium text-slate-900">{{ caseData.claimant.name }}</p>
              <p class="text-xs text-slate-500">IC: {{ caseData.claimant.ic }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ caseData.claimant.address }}</p>
            </div>
            <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 class="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Responden</h3>
              <p class="text-sm font-medium text-slate-900">{{ caseData.respondent.company }}</p>
              <p class="text-xs text-slate-500">Reg: {{ caseData.respondent.regNo }}</p>
              <p class="mt-1 text-xs text-slate-500">{{ caseData.respondent.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Suggested Assignment -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Users class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Cadangan Agihan Pengerusi</h2>
      </div>
      <div class="space-y-3 p-4">
        <div class="flex items-start gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <UserCheck class="h-6 w-6 text-blue-600" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold text-slate-900">{{ suggestedChairman.name }}</p>
            <p class="mt-0.5 text-xs text-slate-500">Pengkhususan: {{ suggestedChairman.specialization }}</p>
            <div class="mt-3 grid grid-cols-3 gap-4">
              <div class="rounded-lg bg-white p-3 text-center shadow-sm">
                <p class="text-lg font-bold text-blue-600">{{ suggestedChairman.activeCases }}</p>
                <p class="text-xs text-slate-500">Kes Aktif</p>
              </div>
              <div class="rounded-lg bg-white p-3 text-center shadow-sm">
                <p class="text-lg font-bold text-emerald-600">{{ suggestedChairman.completedThisYear }}</p>
                <p class="text-xs text-slate-500">Selesai (2026)</p>
              </div>
              <div class="rounded-lg bg-white p-3 text-center shadow-sm">
                <div class="flex items-center justify-center gap-1">
                  <Clock class="h-4 w-4 text-slate-400" />
                  <p class="text-lg font-bold text-slate-700">{{ suggestedChairman.avgDaysToResolve }}</p>
                </div>
                <p class="text-xs text-slate-500">Purata Hari</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- YDP Approval Section -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <ShieldCheck class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Kelulusan YDP</h2>
      </div>
      <div class="space-y-3 p-4">
        <div>
          <label class="text-sm font-medium text-slate-700">Catatan YDP</label>
          <textarea
            v-model="ydpNotes"
            rows="4"
            placeholder="Masukkan catatan atau arahan tambahan..."
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>
        <div class="flex items-center justify-end gap-3">
          <button
            class="rounded-lg border border-rose-300 bg-white px-5 py-2.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
          >
            Kembalikan
          </button>
          <button
            class="rounded-lg border border-amber-300 bg-white px-5 py-2.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50"
          >
            Tukar Agihan
          </button>
          <button
            class="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Luluskan
          </button>
        </div>
      </div>
    </article>
  </div>
</AdminLayout>
</template>
