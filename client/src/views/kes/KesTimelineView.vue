<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  FileText,
  Users,
  Gavel,
  Calendar,
  Upload,
  CheckCircle,
  Scale,
  Bell,
  ClipboardList,
  Send,
  UserCheck,
} from "lucide-vue-next";
import AppTimeline from "@/components/AppTimeline.vue";
import type { TimelineEvent } from "@/components/AppTimeline.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();
const caseId = route.params.id;

const filterType = ref("all");

const filterOptions = [
  { value: "all", label: "Semua" },
  { value: "registration", label: "Pendaftaran" },
  { value: "assignment", label: "Penugasan" },
  { value: "filing", label: "Pemfailan" },
  { value: "mention", label: "Sebutan" },
  { value: "hearing", label: "Perbicaraan" },
  { value: "decision", label: "Keputusan" },
  { value: "note", label: "Catatan" },
];

const allEvents: (TimelineEvent & { type: string })[] = [
  { id: 1, type: "registration", title: "Rujukan JPPM diterima", description: "Rujukan JPPM/2026/0201 diterima daripada Jabatan Perhubungan Perusahaan.", timestamp: "14 Jan 2026, 3:45 PM", actor: "Sistem", icon: Bell, color: "bg-blue-100" },
  { id: 2, type: "registration", title: "Kes didaftarkan", description: "Kes MP(S)/1-0201/2026 didaftarkan dalam sistem eMP.", timestamp: "15 Jan 2026, 10:00 AM", actor: "Puan Noraini binti Hassan", icon: FileText, color: "bg-blue-100" },
  { id: 3, type: "registration", title: "Semakan duplikasi selesai", description: "Tiada pendaftaran berganda dikesan untuk kes ini.", timestamp: "15 Jan 2026, 10:05 AM", actor: "Sistem", icon: CheckCircle, color: "bg-emerald-100" },
  { id: 4, type: "assignment", title: "Cadangan agihan dibuat", description: "Sistem mencadangkan YA Tuan Mohd Rizal berdasarkan beban kerja (12 kes aktif).", timestamp: "15 Jan 2026, 10:10 AM", actor: "Sistem", icon: UserCheck, color: "bg-violet-100" },
  { id: 5, type: "assignment", title: "Pengerusi diluluskan oleh YDP", description: "YDP meluluskan pelantikan YA Tuan Mohd Rizal sebagai Pengerusi.", timestamp: "16 Jan 2026, 2:30 PM", actor: "YDP Tuan Hakim Ahmad", icon: Users, color: "bg-violet-100" },
  { id: 6, type: "filing", title: "Notis Sebutan dikeluarkan", description: "Notis sebutan pertama (Borang 4) dihantar kepada kedua-dua pihak melalui pos berdaftar dan e-mel.", timestamp: "20 Jan 2026, 9:00 AM", actor: "Sistem", icon: Send, color: "bg-slate-100" },
  { id: 7, type: "filing", title: "Borang 1 difailkan", description: "Borang 1 (Pernyataan Kes) dikemukakan oleh pihak penuntut.", timestamp: "28 Jan 2026, 4:00 PM", actor: "Ahmad bin Ismail", icon: Upload, color: "bg-emerald-100" },
  { id: 8, type: "mention", title: "Sebutan pertama", description: "Sebutan pertama di Bilik Sebutan 3. Kedua-dua pihak hadir. Penuntut diwakili Encik Razak, responden diwakili Puan Faridah.", timestamp: "10 Feb 2026, 9:30 AM", actor: "YA Tuan Mohd Rizal", icon: Gavel, color: "bg-amber-100" },
  { id: 9, type: "note", title: "Arahan Pengerusi", description: "Penuntut diarahkan memfailkan Penyata Tuntutan dalam tempoh 14 hari. Responden diarahkan memfailkan Penyata Jawapan dalam tempoh 14 hari selepas terima Penyata Tuntutan.", timestamp: "10 Feb 2026, 10:30 AM", actor: "YA Tuan Mohd Rizal", icon: ClipboardList, color: "bg-slate-100" },
  { id: 10, type: "filing", title: "Penyata Tuntutan difailkan", description: "Penyata Tuntutan lengkap dengan dokumen sokongan dikemukakan oleh pihak penuntut.", timestamp: "25 Feb 2026, 3:00 PM", actor: "Ahmad bin Ismail", icon: Upload, color: "bg-emerald-100" },
  { id: 11, type: "filing", title: "Penyata Jawapan difailkan", description: "Penyata Jawapan dikemukakan oleh pihak responden melalui e-Filing.", timestamp: "10 Mac 2026, 11:00 AM", actor: "Mega Corp Sdn Bhd", icon: Upload, color: "bg-emerald-100" },
  { id: 12, type: "hearing", title: "Perbicaraan dijadualkan", description: "Perbicaraan hari pertama ditetapkan pada 5 April 2026 di Bilik Bicara 1.", timestamp: "15 Mac 2026, 2:00 PM", actor: "YA Tuan Mohd Rizal", icon: Calendar, color: "bg-blue-100" },
  { id: 13, type: "mention", title: "Sebutan kedua (pengurusan kes)", description: "Sebutan kedua untuk pengurusan kes sebelum perbicaraan. Isu preliminary dibincangkan.", timestamp: "20 Mac 2026, 10:00 AM", actor: "YA Tuan Mohd Rizal", icon: Gavel, color: "bg-amber-100" },
  { id: 14, type: "filing", title: "Ikatan Dokumen difailkan", description: "Ikatan dokumen penuntut (ID-1 hingga ID-15) difailkan sebelum perbicaraan.", timestamp: "22 Mac 2026, 2:00 PM", actor: "Ahmad bin Ismail", icon: Upload, color: "bg-emerald-100" },
];

const filteredEvents = computed(() => {
  if (filterType.value === "all") return allEvents;
  return allEvents.filter((e) => e.type === filterType.value);
});
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Pengurusan Kes', to: '/admin/kes' }, { label: 'Timeline' }]" />
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button
        class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
        @click="router.push(`/admin/kes/${caseId}`)"
      >
        <ArrowLeft class="h-4 w-4" />
      </button>
      <div>
        <h1 class="page-title">Timeline Kes</h1>
        <p class="mt-0.5 text-sm text-slate-500">MP(S)/1-0201/2026 — Kronologi penuh aktiviti kes</p>
      </div>
    </div>

    <!-- Filter -->
    <div class="flex flex-wrap gap-2">
      <button
        v-for="opt in filterOptions"
        :key="opt.value"
        class="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
        :class="filterType === opt.value
          ? 'bg-slate-900 text-white'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
        @click="filterType = opt.value"
      >
        {{ opt.label }}
      </button>
    </div>

    <!-- Timeline -->
    <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div v-if="filteredEvents.length > 0">
        <AppTimeline :events="filteredEvents" />
      </div>
      <div v-else class="py-12 text-center">
        <p class="text-sm text-slate-400">Tiada peristiwa untuk jenis tapis yang dipilih.</p>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
