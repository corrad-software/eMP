<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { Download, Printer, ChevronDown, ChevronUp, CheckCircle, XCircle, Users, Gavel, BarChart3, MessageSquare } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AppTimeline from "@/components/AppTimeline.vue";
import type { TimelineEvent } from "@/components/AppTimeline.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const sessionId = Number(route.params.id);

const caseNo = "MP-KL-2026-0045";
const sessionDate = "25 Mac 2026";
const sessionTime = "9:00 pagi - 9:45 pagi";

const participants = [
  { name: "YA Tuan Hakim Azman", role: "Pengerusi", present: true },
  { name: "Ahmad bin Ismail", role: "Pihak Menuntut", present: true },
  { name: "Puan Faridah (Tetuan ABC)", role: "Peguam Pihak Menuntut", present: true },
  { name: "Syarikat XYZ Sdn Bhd", role: "Pihak Menentang", present: true },
  { name: "En. Ravi (Tetuan DEF)", role: "Peguam Pihak Menentang", present: false },
];

const decisions = [
  "Pihak menentang diarahkan memfailkan penyata jawapan dalam tempoh 14 hari daripada tarikh hari ini.",
  "Tarikh sebutan seterusnya ditetapkan pada 22 April 2026, jam 9:00 pagi.",
  "Kedua-dua pihak diarahkan mengemukakan ikatan dokumen sebelum tarikh sebutan.",
];

const sessionStats = {
  startTime: "09:02",
  endTime: "09:45",
  duration: "43 minit",
  totalMessages: 14,
};

const showChatLog = ref(false);

const chatLogEvents: TimelineEvent[] = [
  { id: 1, title: "Sesi dimulakan", description: "Sesi sebutan telah dimulakan oleh sistem.", timestamp: "09:02", actor: "Sistem" },
  { id: 2, title: "Peserta memasuki sesi", description: "YA Tuan Hakim Azman, Ahmad bin Ismail, Puan Faridah telah memasuki sesi.", timestamp: "09:03", actor: "Sistem" },
  { id: 3, title: "Pengesahan kehadiran", description: "Pengerusi mengesahkan kehadiran pihak-pihak.", timestamp: "09:04", actor: "YA Tuan Hakim Azman" },
  { id: 4, title: "Peguam pihak menuntut hadir", description: "Puan Faridah mengesahkan kehadiran bagi pihak menuntut.", timestamp: "09:05", actor: "Puan Faridah (Tetuan ABC)" },
  { id: 5, title: "Pihak menentang memasuki sesi", description: "Syarikat XYZ Sdn Bhd memasuki sesi. Peguam tidak hadir kerana masalah teknikal.", timestamp: "09:06", actor: "Sistem" },
  { id: 6, title: "Perbincangan penyata tuntutan", description: "Pengerusi bertanya status pemfailan penyata tuntutan.", timestamp: "09:08", actor: "YA Tuan Hakim Azman" },
  { id: 7, title: "Pengesahan pemfailan", description: "Penyata tuntutan telah difailkan pada 10 Mac 2026 bersama dokumen sokongan.", timestamp: "09:10", actor: "Puan Faridah (Tetuan ABC)" },
  { id: 8, title: "Keputusan: Penyata Jawapan", description: "Pihak menentang diarahkan memfailkan penyata jawapan dalam 14 hari.", timestamp: "09:15", actor: "YA Tuan Hakim Azman" },
  { id: 9, title: "Keputusan: Tarikh Sebutan", description: "Tarikh sebutan seterusnya ditetapkan pada 22 April 2026.", timestamp: "09:20", actor: "YA Tuan Hakim Azman" },
  { id: 10, title: "Sesi ditamatkan", description: "Sesi sebutan telah ditamatkan oleh Pengerusi.", timestamp: "09:45", actor: "Sistem" },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'e-Sebutan', to: '/admin/esebutan' }, { label: 'Rumusan' }]" />
    <!-- Header -->
    <div>
      <router-link to="/admin/esebutan" class="text-sm text-slate-500 hover:text-slate-700">&larr; Kembali ke Senarai</router-link>
      <div class="mt-3 flex items-center gap-4">
        <h1 class="page-title">Rumusan Sebutan</h1>
        <AppStatusBadge status="completed" />
      </div>
      <p class="mt-1 text-sm text-slate-500">{{ caseNo }} &middot; {{ sessionDate }}, {{ sessionTime }}</p>
    </div>

    <!-- Kehadiran -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Users class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Kehadiran</h2>
      </div>
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
              <th class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Peranan</th>
              <th class="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="p in participants" :key="p.name" class="hover:bg-slate-50">
              <td class="px-6 py-3 text-sm font-medium text-slate-800">{{ p.name }}</td>
              <td class="px-6 py-3 text-sm text-slate-600">{{ p.role }}</td>
              <td class="px-6 py-3 text-center">
                <span
                  class="inline-flex items-center gap-1 text-sm font-medium"
                  :class="p.present ? 'text-emerald-600' : 'text-rose-500'"
                >
                  <CheckCircle v-if="p.present" class="h-4 w-4" />
                  <XCircle v-else class="h-4 w-4" />
                  {{ p.present ? "Hadir" : "Tidak Hadir" }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <!-- Keputusan -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Gavel class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Keputusan</h2>
      </div>
      <ol class="divide-y divide-slate-100">
        <li v-for="(decision, idx) in decisions" :key="idx" class="flex gap-4 px-6 py-4">
          <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
            {{ idx + 1 }}
          </span>
          <p class="pt-0.5 text-sm text-slate-800">{{ decision }}</p>
        </li>
      </ol>
    </article>

    <!-- Ringkasan Sesi -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <BarChart3 class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Ringkasan Sesi</h2>
      </div>
      <div class="grid grid-cols-2 gap-px bg-slate-200 sm:grid-cols-4">
        <div class="bg-white px-6 py-4">
          <p class="text-xs font-medium uppercase tracking-wider text-slate-500">Masa Mula</p>
          <p class="mt-1 text-lg font-semibold text-slate-900">{{ sessionStats.startTime }}</p>
        </div>
        <div class="bg-white px-6 py-4">
          <p class="text-xs font-medium uppercase tracking-wider text-slate-500">Masa Tamat</p>
          <p class="mt-1 text-lg font-semibold text-slate-900">{{ sessionStats.endTime }}</p>
        </div>
        <div class="bg-white px-6 py-4">
          <p class="text-xs font-medium uppercase tracking-wider text-slate-500">Tempoh</p>
          <p class="mt-1 text-lg font-semibold text-slate-900">{{ sessionStats.duration }}</p>
        </div>
        <div class="bg-white px-6 py-4">
          <p class="text-xs font-medium uppercase tracking-wider text-slate-500">Jumlah Mesej</p>
          <p class="mt-1 text-lg font-semibold text-slate-900">{{ sessionStats.totalMessages }}</p>
        </div>
      </div>
    </article>

    <!-- Log Perbualan -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <button
        class="flex w-full items-center justify-between px-4 py-2.5"
        @click="showChatLog = !showChatLog"
      >
        <div class="flex items-center gap-2">
          <MessageSquare class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Log Perbualan</h2>
        </div>
        <ChevronUp v-if="showChatLog" class="h-5 w-5 text-slate-400" />
        <ChevronDown v-else class="h-5 w-5 text-slate-400" />
      </button>
      <div v-if="showChatLog" class="border-t border-slate-100 p-4">
        <AppTimeline :events="chatLogEvents" />
      </div>
    </article>

    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors">
        <Download class="h-4 w-4" />
        Muat Turun PDF
      </button>
      <button class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
        <Printer class="h-4 w-4" />
        Cetak
      </button>
    </div>
  </div>
</AdminLayout>
</template>
