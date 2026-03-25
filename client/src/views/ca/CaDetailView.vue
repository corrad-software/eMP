<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  FileText,
  Eye,
  CheckCircle,
  Clock,
  Users,
  Upload,
  Send,
  Archive,
  RotateCcw,
  Calendar,
  Building2,
  Factory,
  Info,
  Paperclip,
  ClipboardCheck,
  History,
  Zap,
} from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AppTimeline from "@/components/AppTimeline.vue";
import type { TimelineEvent } from "@/components/AppTimeline.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();
const caId = route.params.id;

const caData = {
  caNo: "CA-2026-0002",
  employerName: "Global Petroleum Berhad",
  unionName: "Kesatuan Pekerja Petroleum Semenanjung",
  industry: "Minyak & Gas",
  status: "under-review" as const,
  effectiveFrom: "1 April 2026",
  effectiveTo: "31 Mac 2029",
  submittedAt: "25 Februari 2026",
  registeredAt: "-",
};

const documents = [
  { id: 1, name: "Perjanjian_Kolektif_GP_2026.pdf", size: "2.4 MB", date: "25 Feb 2026" },
  { id: 2, name: "Surat_Persetujuan_Majikan.pdf", size: "340 KB", date: "25 Feb 2026" },
  { id: 3, name: "Surat_Persetujuan_Kesatuan.pdf", size: "310 KB", date: "25 Feb 2026" },
  { id: 4, name: "Lampiran_Jadual_Gaji.pdf", size: "1.1 MB", date: "25 Feb 2026" },
];

const checklistItems = ref([
  { id: 1, label: "Dokumen Lengkap", checked: true },
  { id: 2, label: "Tandatangan Sah", checked: true },
  { id: 3, label: "Pematuhan Akta Perhubungan Perusahaan 1967", checked: false },
  { id: 4, label: "Fasal Mandatori Disertakan", checked: false },
  { id: 5, label: "Tiada Konflik dengan Undang-Undang Sedia Ada", checked: false },
]);

const timelineEvents: TimelineEvent[] = [
  {
    id: 1, title: "Permohonan diterima", description: "Dokumen perjanjian kolektif diterima melalui e-Filing.",
    timestamp: "25 Feb 2026, 10:30 AM", actor: "Sistem", icon: Send, color: "bg-blue-100",
  },
  {
    id: 2, title: "Semakan dokumen dimulakan", description: "Pegawai pendaftar mula menyemak kelengkapan dokumen.",
    timestamp: "28 Feb 2026, 9:00 AM", actor: "Puan Noraini", icon: FileText, color: "bg-amber-100",
  },
  {
    id: 3, title: "Pengesahan tandatangan", description: "Tandatangan majikan dan kesatuan disahkan.",
    timestamp: "5 Mac 2026, 2:15 PM", actor: "Puan Noraini", icon: CheckCircle, color: "bg-emerald-100",
  },
  {
    id: 4, title: "Semakan undang-undang", description: "Fasal-fasal perjanjian sedang disemak untuk pematuhan undang-undang.",
    timestamp: "10 Mac 2026, 10:00 AM", actor: "Encik Hafiz", icon: FileText, color: "bg-violet-100",
  },
  {
    id: 5, title: "Maklum balas diperlukan", description: "Beberapa fasal memerlukan pindaan. Surat maklum balas dihantar.",
    timestamp: "15 Mac 2026, 3:30 PM", actor: "Encik Hafiz", icon: RotateCcw, color: "bg-orange-100",
  },
  {
    id: 6, title: "Menunggu respons pihak", description: "Menunggu pindaan daripada pihak majikan dan kesatuan.",
    timestamp: "20 Mac 2026, 9:00 AM", actor: "Sistem", icon: Clock, color: "bg-slate-100",
  },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Perjanjian Kolektif', to: '/admin/kes/ca' }, { label: caData.caNo }]" />
    <!-- Header -->
    <div class="flex items-start gap-3">
      <button
        class="mt-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
        @click="router.push('/admin/kes/ca')"
      >
        <ArrowLeft class="h-4 w-4" />
      </button>
      <div class="flex-1">
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="page-title">{{ caData.caNo }}</h1>
          <AppStatusBadge :status="caData.status" />
        </div>
        <p class="mt-1 text-sm text-slate-600">
          {{ caData.employerName }} <span class="text-slate-400">lwn.</span> {{ caData.unionName }}
        </p>
      </div>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Left column (2/3) -->
      <div class="space-y-6 lg:col-span-2">
        <!-- Maklumat CA -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <Info class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Maklumat CA</h2>
          </div>
          <div class="space-y-3 p-4">
          <div class="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div class="space-y-3">
              <div>
                <span class="flex items-center gap-1.5 text-slate-500">
                  <Building2 class="h-3.5 w-3.5" /> Majikan
                </span>
                <p class="mt-0.5 font-medium text-slate-900">{{ caData.employerName }}</p>
              </div>
              <div>
                <span class="flex items-center gap-1.5 text-slate-500">
                  <Users class="h-3.5 w-3.5" /> Kesatuan
                </span>
                <p class="mt-0.5 font-medium text-slate-900">{{ caData.unionName }}</p>
              </div>
              <div>
                <span class="flex items-center gap-1.5 text-slate-500">
                  <Factory class="h-3.5 w-3.5" /> Industri
                </span>
                <p class="mt-0.5 font-medium text-slate-900">{{ caData.industry }}</p>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <span class="flex items-center gap-1.5 text-slate-500">
                  <Calendar class="h-3.5 w-3.5" /> Tarikh Kuat Kuasa
                </span>
                <p class="mt-0.5 font-medium text-slate-900">{{ caData.effectiveFrom }} - {{ caData.effectiveTo }}</p>
              </div>
              <div>
                <span class="flex items-center gap-1.5 text-slate-500">
                  <Send class="h-3.5 w-3.5" /> Tarikh Dihantar
                </span>
                <p class="mt-0.5 font-medium text-slate-900">{{ caData.submittedAt }}</p>
              </div>
              <div>
                <span class="flex items-center gap-1.5 text-slate-500">
                  <CheckCircle class="h-3.5 w-3.5" /> Tarikh Pendaftaran
                </span>
                <p class="mt-0.5 font-medium text-slate-900">{{ caData.registeredAt }}</p>
              </div>
            </div>
          </div>
          </div>
        </article>

        <!-- Dokumen -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <Paperclip class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Dokumen</h2>
          </div>
          <ul class="divide-y divide-slate-100">
            <li v-for="doc in documents" :key="doc.id" class="flex items-center justify-between px-6 py-3">
              <div class="flex items-center gap-3">
                <FileText class="h-4 w-4 text-slate-400" />
                <div>
                  <p class="text-sm font-medium text-slate-900">{{ doc.name }}</p>
                  <p class="text-xs text-slate-400">{{ doc.size }} &middot; {{ doc.date }}</p>
                </div>
              </div>
              <button
                class="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Eye class="h-3.5 w-3.5" />
                Lihat
              </button>
            </li>
          </ul>
        </article>

        <!-- Semakan -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <ClipboardCheck class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Semakan</h2>
          </div>
          <div class="space-y-3 p-4">
          <ul class="space-y-3">
            <li v-for="item in checklistItems" :key="item.id" class="flex items-center gap-3">
              <input
                :id="`check-${item.id}`"
                v-model="item.checked"
                type="checkbox"
                class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-slate-200"
              />
              <label :for="`check-${item.id}`" class="text-sm text-slate-700" :class="{ 'line-through text-slate-400': item.checked }">
                {{ item.label }}
              </label>
            </li>
          </ul>
          </div>
        </article>
      </div>

      <!-- Right column (1/3) -->
      <div class="mx-auto max-w-7xl space-y-4">
        <!-- Timeline -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <History class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Kronologi</h2>
          </div>
          <div class="space-y-3 p-4">
            <AppTimeline :events="timelineEvents" />
          </div>
        </article>

        <!-- Action Buttons -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
            <Zap class="h-4 w-4 text-blue-600" />
            <h2 class="text-sm font-semibold text-slate-900">Tindakan</h2>
          </div>
          <div class="space-y-3 p-4">
          <div class="space-y-2">
            <button
              class="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
            >
              <CheckCircle class="h-4 w-4" />
              Luluskan Pendaftaran
            </button>
            <button
              class="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
            >
              <RotateCcw class="h-4 w-4" />
              Kembalikan
            </button>
            <button
              class="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <Archive class="h-4 w-4" />
              Arkib
            </button>
          </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
