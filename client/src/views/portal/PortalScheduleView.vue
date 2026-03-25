<script setup lang="ts">
import PortalLayout from "@/layouts/PortalLayout.vue";
import AppCalendarGrid from "@/components/AppCalendarGrid.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { CalendarEvent } from "@/components/AppCalendarGrid.vue";
import { Calendar, Clock, MapPin, User, Gavel } from "lucide-vue-next";

const events: CalendarEvent[] = [
  { id: 1, title: "Sebutan MPM/4/2-1234", date: "2026-03-25", time: "09:00", type: "mention" },
  { id: 2, title: "Bicara MPM/4/2-0890", date: "2026-03-25", time: "10:30", type: "hearing" },
  { id: 3, title: "Sebutan MPM/4/2-1102", date: "2026-03-26", time: "09:00", type: "mention" },
  { id: 4, title: "Mediasi MPM/4/2-0567", date: "2026-03-27", time: "14:00", type: "mediation" },
  { id: 5, title: "Bicara MPM/4/2-1300", date: "2026-03-28", time: "09:30", type: "hearing" },
  { id: 6, title: "Sebutan MPM/4/2-1400", date: "2026-03-31", time: "09:00", type: "mention" },
  { id: 7, title: "Bicara MPM/4/2-1450", date: "2026-03-31", time: "14:00", type: "hearing" },
  { id: 8, title: "Sebutan MPM/4/2-1500", date: "2026-04-01", time: "09:00", type: "mention" },
];

const todaySchedule = [
  { time: "09:00", caseNo: "MPM/4/2-1234/2026", type: "Sebutan", venue: "Bilik Mahkamah 1", chairman: "YA Tuan Mohd Rizal", parties: "Ahmad lwn. ABC Sdn Bhd", status: "scheduled" },
  { time: "10:30", caseNo: "MPM/4/2-0890/2025", type: "Perbicaraan", venue: "Bilik Mahkamah 2", chairman: "YA Tuan Rajesh Kumar", parties: "Lim lwn. GHI Corp", status: "in-progress" },
  { time: "14:00", caseNo: "MPM/4/2-1555/2026", type: "Sebutan", venue: "Bilik Mahkamah 1", chairman: "YA Puan Siti Aminah", parties: "Kesatuan lwn. DEF Industries", status: "scheduled" },
  { time: "15:30", caseNo: "MPM/4/2-1600/2026", type: "Mediasi", venue: "Bilik Mahkamah 3", chairman: "YA Puan Noraini", parties: "Muthu lwn. JKL Enterprises", status: "scheduled" },
];

const upcomingDays = [
  {
    date: "26 Mac 2026 (Khamis)",
    items: [
      { time: "09:00", case: "MPM/4/2-1102", type: "Sebutan", venue: "Bilik 1" },
      { time: "10:00", case: "MPM/4/2-1200", type: "Perbicaraan", venue: "Bilik 2" },
    ],
  },
  {
    date: "27 Mac 2026 (Jumaat)",
    items: [
      { time: "14:00", case: "MPM/4/2-0567", type: "Mediasi", venue: "Bilik 3" },
    ],
  },
  {
    date: "28 Mac 2026 (Isnin)",
    items: [
      { time: "09:30", case: "MPM/4/2-1300", type: "Perbicaraan", venue: "Bilik 1" },
      { time: "14:00", case: "MPM/4/2-1350", type: "Sebutan", venue: "Bilik 2" },
    ],
  },
];

const legendItems = [
  { label: "Sebutan", color: "bg-blue-500" },
  { label: "Perbicaraan", color: "bg-violet-500" },
  { label: "Mediasi", color: "bg-emerald-500" },
  { label: "Pentadbiran", color: "bg-slate-400" },
];
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <!-- Hero header -->
    <section class="relative bg-[#1a237e] py-12">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1920&h=300&fit=crop" alt="" class="h-full w-full object-cover opacity-10" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
            <Calendar class="h-6 w-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white sm:text-3xl">
              {{ locale === 'bm' ? 'Jadual Mahkamah' : 'Court Schedule' }}
            </h1>
            <p class="mt-0.5 text-sm text-blue-200">
              {{ locale === 'bm' ? 'Jadual perbicaraan dan sebutan Mahkamah Perusahaan Malaysia' : 'Industrial Court hearing and mention schedules' }}
            </p>
          </div>
        </div>

        <!-- Legend -->
        <div class="mt-4 flex flex-wrap gap-3">
          <div v-for="item in legendItems" :key="item.label" class="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
            <span class="h-2 w-2 rounded-full" :class="item.color" />
            {{ item.label }}
          </div>
        </div>
      </div>
    </section>

    <!-- Calendar + Today sidebar -->
    <section class="py-8">
      <div class="mx-auto max-w-7xl px-4">
        <div class="grid gap-6 lg:grid-cols-3">
          <!-- Calendar -->
          <div class="lg:col-span-2">
            <AppCalendarGrid :events="events" />
          </div>

          <!-- Today's Schedule -->
          <div>
            <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
              <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
                <Clock class="h-4 w-4 text-amber-500" />
                <h2 class="text-sm font-semibold text-slate-900">{{ locale === 'bm' ? 'Jadual Hari Ini' : "Today's Schedule" }}</h2>
                <span class="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">{{ todaySchedule.length }}</span>
              </div>
              <div class="divide-y divide-slate-100">
                <div v-for="(item, i) in todaySchedule" :key="i" class="px-4 py-3 transition-colors hover:bg-slate-50">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-bold text-slate-900">{{ item.time }}</span>
                    <AppStatusBadge :status="item.status" />
                  </div>
                  <p class="mt-1 text-sm font-medium text-[#1a237e]">{{ item.caseNo }}</p>
                  <p class="text-xs text-slate-600">{{ item.parties }}</p>
                  <div class="mt-1.5 flex flex-wrap gap-2 text-[11px] text-slate-400">
                    <span class="flex items-center gap-0.5"><Gavel class="h-3 w-3" /> {{ item.type }}</span>
                    <span class="flex items-center gap-0.5"><MapPin class="h-3 w-3" /> {{ item.venue }}</span>
                    <span class="flex items-center gap-0.5"><User class="h-3 w-3" /> {{ item.chairman }}</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming days -->
    <section class="bg-slate-50 py-8">
      <div class="mx-auto max-w-7xl px-4">
        <h2 class="text-lg font-bold text-slate-900">{{ locale === 'bm' ? 'Jadual Akan Datang' : 'Upcoming Schedule' }}</h2>
        <div class="mt-4 grid gap-4 md:grid-cols-3">
          <article v-for="day in upcomingDays" :key="day.date" class="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div class="border-b border-slate-100 px-4 py-2.5">
              <h3 class="text-sm font-semibold text-slate-900">{{ day.date }}</h3>
            </div>
            <div class="divide-y divide-slate-50">
              <div v-for="(ev, j) in day.items" :key="j" class="flex items-center gap-3 px-4 py-2.5">
                <span class="w-12 shrink-0 text-xs font-bold text-slate-700">{{ ev.time }}</span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-slate-800">{{ ev.case }}</p>
                  <p class="text-[11px] text-slate-400">{{ ev.type }} · {{ ev.venue }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
