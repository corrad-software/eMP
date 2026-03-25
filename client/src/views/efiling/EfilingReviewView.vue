<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { FileText, Eye, CheckCircle, RotateCcw, XCircle, MessageSquare, User, Building2, Briefcase, Paperclip, ClipboardList, PenLine } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AppTimeline from "@/components/AppTimeline.vue";
import type { TimelineEvent } from "@/components/AppTimeline.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const filingId = route.params.id;

const reviewNotes = ref("");

// Mock filing data
const filing = {
  referenceNo: "EF-2026-000138",
  status: "under-review" as const,
  filingType: "Pertikaian Perdagangan",
  applicantName: "Siti Aminah binti Yusof",
  applicantIc: "900712-08-6234",
  applicantEmail: "siti.aminah@email.com",
  applicantPhone: "012-9876543",
  applicantAddress: "No. 45, Jalan Mawar 3, Taman Indah, 43000 Kajang, Selangor",
  respondentName: "Global Tech Industries Sdn Bhd",
  respondentRegNo: "201501012345 (1234567-K)",
  respondentAddress: "Lot 12, Kawasan Perindustrian Puchong, 47100 Puchong, Selangor",
  caseSubject: "Pertikaian berkaitan syarat perkhidmatan dan gaji minimum",
  caseDescription: "Pekerja mendakwa syarikat gagal mematuhi perjanjian kolektif berkenaan dengan kadar gaji minimum dan elaun shift yang telah dipersetujui. Pertikaian bermula pada Januari 2026 apabila syarikat mengurangkan elaun tanpa rundingan.",
  priority: "normal" as string,
  submittedAt: "15 Mac 2026",
};

const documents = [
  { id: 1, name: "Perjanjian_Kolektif_2024.pdf", size: "1.2 MB" },
  { id: 2, name: "Surat_Aduan_Pekerja.pdf", size: "340 KB" },
  { id: 3, name: "Payslip_Jan_Feb_2026.pdf", size: "520 KB" },
  { id: 4, name: "Surat_Makluman_Syarikat.docx", size: "180 KB" },
];

const previousReviewNotes: TimelineEvent[] = [
  {
    id: 1,
    title: "Semakan Awal",
    description: "Dokumen diterima dan disemak kelengkapan. Semua dokumen wajib telah dilampirkan. Pemfailan layak untuk semakan lanjut.",
    timestamp: "16 Mac 2026, 11:00 PG",
    actor: "Pn. Noraini binti Zakaria",
    icon: MessageSquare,
    color: "bg-blue-100",
  },
  {
    id: 2,
    title: "Semakan Dokumen",
    description: "Perjanjian Kolektif disahkan sah dan masih berkuatkuasa. Payslip menunjukkan perbezaan dengan kadar yang dipersetujui.",
    timestamp: "17 Mac 2026, 3:30 PTG",
    actor: "Pn. Noraini binti Zakaria",
    icon: MessageSquare,
    color: "bg-blue-100",
  },
];

function handleAccept() {
  // UI-only mock action
  alert("Pemfailan diterima (mock)");
}

function handleReturn() {
  alert("Pemfailan dikembalikan untuk pindaan (mock)");
}

function handleReject() {
  alert("Pemfailan ditolak (mock)");
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'e-Filing', to: '/admin/efiling' }, { label: 'Semakan' }]" />
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="page-title">{{ filing.referenceNo }}</h1>
        <AppStatusBadge :status="filing.status" />
      </div>
      <router-link
        :to="`/admin/efiling/${filingId}`"
        class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
      >
        Kembali
      </router-link>
    </div>

    <!-- Applicant & Case Details -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <!-- Applicant -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <User class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Maklumat Pemohon</h2>
        </div>
        <div class="space-y-3 p-4">
          <dl class="space-y-3">
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Nama:</span><span class="text-slate-900">{{ filing.applicantName }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">No. KP:</span><span class="text-slate-900">{{ filing.applicantIc }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">E-mel:</span><span class="text-slate-900">{{ filing.applicantEmail }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">No. Telefon:</span><span class="text-slate-900">{{ filing.applicantPhone }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Alamat:</span><span class="text-slate-900">{{ filing.applicantAddress }}</span></div>
          </dl>
        </div>
      </article>

      <!-- Respondent -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Building2 class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Maklumat Responden</h2>
        </div>
        <div class="space-y-3 p-4">
          <dl class="space-y-3">
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Syarikat:</span><span class="text-slate-900">{{ filing.respondentName }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">No. Pendaftaran:</span><span class="text-slate-900">{{ filing.respondentRegNo }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Alamat:</span><span class="text-slate-900">{{ filing.respondentAddress }}</span></div>
          </dl>
        </div>
      </article>
    </div>

    <!-- Case Details -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Briefcase class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Butiran Kes</h2>
      </div>
      <div class="space-y-3 p-4">
        <dl class="space-y-3">
          <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Jenis:</span><span class="text-slate-900">{{ filing.filingType }}</span></div>
          <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Subjek:</span><span class="text-slate-900">{{ filing.caseSubject }}</span></div>
          <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Keutamaan:</span><span class="text-slate-900">{{ filing.priority === 'urgent' ? 'Segera' : 'Normal' }}</span></div>
          <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Tarikh Hantar:</span><span class="text-slate-900">{{ filing.submittedAt }}</span></div>
        </dl>
        <div class="mt-4">
          <p class="text-sm font-medium text-slate-500 mb-1">Huraian:</p>
          <p class="text-sm text-slate-700 leading-relaxed rounded-lg bg-slate-50 p-4">{{ filing.caseDescription }}</p>
        </div>
      </div>
    </article>

    <!-- Documents -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Paperclip class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Dokumen Dimuat Naik</h2>
      </div>
      <div class="space-y-3 p-4">
        <ul class="divide-y divide-slate-100">
          <li v-for="doc in documents" :key="doc.id" class="flex items-center gap-3 py-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50">
              <FileText class="h-4 w-4 text-rose-500" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-slate-700">{{ doc.name }}</p>
              <p class="text-xs text-slate-400">{{ doc.size }}</p>
            </div>
            <button class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Eye class="h-3.5 w-3.5" />
              Lihat
            </button>
          </li>
        </ul>
      </div>
    </article>

    <!-- Previous Review Notes -->
    <article v-if="previousReviewNotes.length" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <ClipboardList class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Catatan Semakan Terdahulu</h2>
      </div>
      <div class="space-y-3 p-4">
        <AppTimeline :events="previousReviewNotes" />
      </div>
    </article>

    <!-- Review Actions -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <PenLine class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Tindakan Semakan</h2>
      </div>
      <div class="space-y-3 p-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Catatan Semakan</label>
          <textarea
            v-model="reviewNotes"
            rows="4"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Tulis catatan semakan di sini..."
          />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button
            class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
            @click="handleAccept"
          >
            <CheckCircle class="h-4 w-4" />
            Terima
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 transition-colors"
            @click="handleReturn"
          >
            <RotateCcw class="h-4 w-4" />
            Kembalikan untuk Pindaan
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 transition-colors"
            @click="handleReject"
          >
            <XCircle class="h-4 w-4" />
            Tolak
          </button>
        </div>
      </div>
    </article>
  </div>
</AdminLayout>
</template>
