<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Plus, AlertTriangle } from "lucide-vue-next";
import AppCalendarGrid from "@/components/AppCalendarGrid.vue";
import type { CalendarEvent } from "@/components/AppCalendarGrid.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = useRouter();

const mahkamahFilter = ref("");
const jenisFilter = ref("");
const pengerusiFilter = ref("");

const events: CalendarEvent[] = [
  { id: 1, title: "Sebutan - MP(S)/1-0201/2026", date: "2026-03-25", time: "09:00", type: "mention", color: "bg-blue-500" },
  { id: 2, title: "Perbicaraan - MP(S)/1-0207/2026", date: "2026-03-25", time: "10:00", type: "hearing", color: "bg-violet-500" },
  { id: 3, title: "Mediasi - MP(S)/1-0205/2026", date: "2026-03-26", time: "09:30", type: "mediation", color: "bg-emerald-500" },
  { id: 4, title: "Sebutan - MP(S)/1-0202/2026", date: "2026-03-26", time: "14:00", type: "mention", color: "bg-blue-500" },
  { id: 5, title: "Perbicaraan - MP(S)/1-0203/2026", date: "2026-03-27", time: "09:00", type: "hearing", color: "bg-violet-500" },
  { id: 6, title: "Pentadbiran - Mesyuarat Pengurusan", date: "2026-03-27", time: "15:00", type: "administrative", color: "bg-slate-400" },
  { id: 7, title: "Sebutan - MP(S)/1-0208/2026", date: "2026-03-28", time: "09:00", type: "mention", color: "bg-blue-500" },
  { id: 8, title: "Mediasi - MP(S)/1-0204/2026", date: "2026-03-28", time: "10:30", type: "mediation", color: "bg-emerald-500" },
  { id: 9, title: "Perbicaraan - MP(S)/1-0201/2026", date: "2026-03-31", time: "09:00", type: "hearing", color: "bg-violet-500" },
  { id: 10, title: "Sebutan - MP(S)/1-0206/2026", date: "2026-03-31", time: "14:30", type: "mention", color: "bg-blue-500" },
  { id: 11, title: "Mediasi - MP(S)/1-0202/2026", date: "2026-04-01", time: "09:00", type: "mediation", color: "bg-emerald-500" },
  { id: 12, title: "Perbicaraan - MP(S)/1-0207/2026", date: "2026-04-02", time: "10:00", type: "hearing", color: "bg-violet-500" },
];

const conflicts = [
  {
    id: 1,
    title: "Konflik Bilik Mahkamah 1",
    description: "Sebutan MP(S)/1-0201/2026 dan Perbicaraan MP(S)/1-0207/2026 dijadualkan pada masa yang bertindih di Bilik 1 pada 25 Mac 2026, 09:00-10:30.",
    events: ["MP(S)/1-0201/2026 (09:00-10:00)", "MP(S)/1-0207/2026 (09:30-11:00)"],
  },
  {
    id: 2,
    title: "Konflik Pengerusi",
    description: "YA Tuan Mohd Rizal dijadualkan untuk dua kes serentak pada 31 Mac 2026, 09:00.",
    events: ["MP(S)/1-0201/2026 (09:00)", "MP(S)/1-0206/2026 (09:00)"],
  },
];

const legend = [
  { label: "Sebutan", color: "bg-blue-500" },
  { label: "Perbicaraan", color: "bg-violet-500" },
  { label: "Mediasi", color: "bg-emerald-500" },
  { label: "Pentadbiran", color: "bg-slate-400" },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Jadual Mahkamah</h1>
        <p class="mt-1 text-sm text-slate-500">Kalendar penjadualan mahkamah perusahaan.</p>
      </div>
      <button
        class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
        @click="router.push('/admin/jadual/baru')"
      >
        <Plus class="h-4 w-4" />
        Tambah Acara
      </button>
    </div>

    <!-- Filter Bar -->
    <div class="flex flex-wrap gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div class="flex items-center gap-2">
        <label class="text-xs font-medium text-slate-600">Mahkamah</label>
        <select
          v-model="mahkamahFilter"
          class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
        >
          <option value="">Semua</option>
          <option value="1">Mahkamah 1</option>
          <option value="2">Mahkamah 2</option>
          <option value="3">Mahkamah 3</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs font-medium text-slate-600">Jenis</label>
        <select
          v-model="jenisFilter"
          class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
        >
          <option value="">Semua</option>
          <option value="mention">Sebutan</option>
          <option value="hearing">Perbicaraan</option>
          <option value="mediation">Mediasi</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-xs font-medium text-slate-600">Pengerusi</label>
        <select
          v-model="pengerusiFilter"
          class="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
        >
          <option value="">Semua</option>
          <option value="rizal">YA Tuan Mohd Rizal</option>
          <option value="siti">YA Puan Siti Aminah</option>
          <option value="kamal">YA Tuan Kamal Ariffin</option>
        </select>
      </div>
    </div>

    <!-- Calendar -->
    <AppCalendarGrid :events="events" />

    <!-- Legend -->
    <div class="flex items-center gap-5 rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-sm">
      <span class="text-xs font-semibold uppercase tracking-wide text-slate-400">Petunjuk</span>
      <div v-for="item in legend" :key="item.label" class="flex items-center gap-1.5">
        <span class="inline-block h-3 w-3 rounded" :class="item.color"></span>
        <span class="text-xs text-slate-600">{{ item.label }}</span>
      </div>
    </div>

    <!-- Scheduling Conflicts -->
    <div class="space-y-3">
      <h2 class="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <AlertTriangle class="h-4 w-4 text-red-500" />
        Konflik Jadual
      </h2>
      <div v-for="conflict in conflicts" :key="conflict.id" class="rounded-lg border-2 border-red-200 bg-red-50 p-4">
        <h3 class="text-sm font-semibold text-red-800">{{ conflict.title }}</h3>
        <p class="mt-1 text-sm text-red-700">{{ conflict.description }}</p>
        <ul class="mt-2 space-y-1">
          <li v-for="(evt, idx) in conflict.events" :key="idx" class="text-xs text-red-600">
            &bull; {{ evt }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
