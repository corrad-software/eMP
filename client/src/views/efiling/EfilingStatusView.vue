<script setup lang="ts">
import { useRoute } from "vue-router";
import { FileText, Download, Save, Send, CheckCircle, Search, Clock, FileCheck, ListOrdered, Paperclip, Info } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AppTimeline from "@/components/AppTimeline.vue";
import type { TimelineEvent } from "@/components/AppTimeline.vue";
import type { FilingDocument } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const filingId = route.params.id;

// Mock filing data
const filing = {
  id: Number(filingId),
  referenceNo: "EF-2026-000142",
  filingType: "Pembuangan Tidak Adil",
  status: "under-review" as const,
  applicantName: "Ahmad bin Ismail",
  applicantIc: "880515-01-5577",
  respondentName: "Syarikat Maju Jaya Sdn Bhd",
  caseNo: "-",
  submittedAt: "20 Mac 2026",
  createdAt: "18 Mac 2026",
};

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Draf Disimpan",
    description: "Pemfailan dimulakan dan disimpan sebagai draf.",
    timestamp: "18 Mac 2026, 8:00 PG",
    actor: "Ahmad bin Ismail",
    icon: Save,
    color: "bg-slate-100",
  },
  {
    id: 2,
    title: "Dihantar",
    description: "Pemfailan telah dihantar kepada Pendaftar untuk semakan.",
    timestamp: "20 Mac 2026, 9:15 PG",
    actor: "Ahmad bin Ismail",
    icon: Send,
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Dalam Semakan",
    description: "Pemfailan sedang disemak oleh Pendaftar. Dokumen lengkap.",
    timestamp: "21 Mac 2026, 10:30 PG",
    actor: "Pn. Noraini binti Zakaria",
    icon: Search,
    color: "bg-amber-100",
  },
  {
    id: 4,
    title: "Dokumen Diterima",
    description: "Semua dokumen sokongan telah disahkan lengkap dan sah.",
    timestamp: "22 Mac 2026, 2:00 PTG",
    actor: "Pn. Noraini binti Zakaria",
    icon: FileCheck,
    color: "bg-emerald-100",
  },
  {
    id: 5,
    title: "Menunggu Pendaftaran Kes",
    description: "Pemfailan diluluskan. Menunggu nombor kes ditetapkan.",
    timestamp: "Belum selesai",
    actor: "-",
    icon: Clock,
    color: "bg-slate-50",
  },
];

const documents: FilingDocument[] = [
  { id: 1, filename: "surat_penamatan.pdf", originalName: "Surat Penamatan Perkhidmatan.pdf", mimeType: "application/pdf", size: 245_760, url: "#", uploadedAt: "2026-03-18T08:10:00Z" },
  { id: 2, filename: "surat_tawaran.pdf", originalName: "Surat Tawaran Kerja.pdf", mimeType: "application/pdf", size: 189_440, url: "#", uploadedAt: "2026-03-18T08:12:00Z" },
  { id: 3, filename: "payslip_3bulan.pdf", originalName: "Payslip 3 Bulan Terakhir.pdf", mimeType: "application/pdf", size: 512_000, url: "#", uploadedAt: "2026-03-18T08:15:00Z" },
];

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'e-Filing', to: '/admin/efiling' }, { label: 'Status Pemfailan' }]" />
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="page-title">{{ filing.referenceNo }}</h1>
          <AppStatusBadge :status="filing.status" />
        </div>
        <p class="mt-1 text-sm text-slate-500">{{ filing.filingType }}</p>
      </div>
      <router-link
        to="/admin/efiling"
        class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
      >
        Kembali ke Senarai
      </router-link>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Left: Timeline -->
      <div class="lg:col-span-2 space-y-6">
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <ListOrdered class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Perkembangan Pemfailan</h2>
          </div>
          <div class="space-y-3 p-4">
            <AppTimeline :events="timelineEvents" />
          </div>
        </article>

        <!-- Documents -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <Paperclip class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Dokumen</h2>
          </div>
          <div class="space-y-3 p-4">
            <ul class="divide-y divide-slate-100">
              <li v-for="doc in documents" :key="doc.id" class="flex items-center gap-3 py-3">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                  <FileText class="h-4 w-4 text-rose-500" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-medium text-slate-700">{{ doc.originalName }}</p>
                  <p class="text-xs text-slate-400">{{ formatSize(doc.size) }}</p>
                </div>
                <button class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  <Download class="h-3.5 w-3.5" />
                  Muat Turun
                </button>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <!-- Right: Details panel -->
      <div class="mx-auto max-w-7xl space-y-4">
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <Info class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Maklumat Pemfailan</h2>
          </div>
          <div class="space-y-3 p-4">
            <dl class="space-y-4">
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Jenis</dt>
                <dd class="mt-1 text-sm font-medium text-slate-900">{{ filing.filingType }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Pemohon</dt>
                <dd class="mt-1 text-sm font-medium text-slate-900">{{ filing.applicantName }}</dd>
                <dd class="text-xs text-slate-500">{{ filing.applicantIc }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Responden</dt>
                <dd class="mt-1 text-sm font-medium text-slate-900">{{ filing.respondentName }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Tarikh Hantar</dt>
                <dd class="mt-1 text-sm font-medium text-slate-900">{{ filing.submittedAt }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">No. Kes</dt>
                <dd class="mt-1 text-sm font-medium text-slate-900">{{ filing.caseNo }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium uppercase tracking-wider text-slate-400">Tarikh Mula</dt>
                <dd class="mt-1 text-sm font-medium text-slate-900">{{ filing.createdAt }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
