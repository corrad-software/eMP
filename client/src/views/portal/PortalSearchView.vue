<script setup lang="ts">
import { useRouter } from "vue-router";
import PortalLayout from "@/layouts/PortalLayout.vue";
import AppSearchBar from "@/components/AppSearchBar.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import { Search, ArrowRight, Gavel, Calendar, User } from "lucide-vue-next";
import type { CaseRecord } from "@/types";

const router = useRouter();

const mockCases: CaseRecord[] = [
  { id: 1, caseNo: "MPM/4/2-1234/2026", caseType: "unfair-dismissal", subject: "Ahmad bin Ali lwn. ABC Sdn Bhd", status: "hearing", priority: "normal", parties: [], registeredAt: "2026-01-15", createdAt: "2026-01-15", updatedAt: "2026-03-01", assignedChairmanName: "YA Tuan Mohd Rizal" },
  { id: 2, caseNo: "MPM/4/2-1102/2025", caseType: "trade-dispute", subject: "Kesatuan Pekerja XYZ lwn. DEF Industries", status: "decided", priority: "normal", parties: [], registeredAt: "2025-11-02", createdAt: "2025-11-02", updatedAt: "2026-02-20", assignedChairmanName: "YA Puan Siti Aminah" },
  { id: 3, caseNo: "MPM/4/2-0890/2025", caseType: "unfair-dismissal", subject: "Lim Wei Keat lwn. GHI Corporation", status: "in-progress", priority: "urgent", parties: [], registeredAt: "2025-08-20", createdAt: "2025-08-20", updatedAt: "2026-01-10", assignedChairmanName: "YA Tuan Rajesh Kumar" },
  { id: 4, caseNo: "MPM/4/2-0567/2025", caseType: "non-compliance", subject: "Muthu a/l Rajan lwn. JKL Enterprises", status: "closed", priority: "normal", parties: [], registeredAt: "2025-05-10", createdAt: "2025-05-10", updatedAt: "2025-12-15", assignedChairmanName: "YA Puan Noraini" },
  { id: 5, caseNo: "MPM/4/2-0322/2025", caseType: "unfair-dismissal", subject: "Siti Fatimah binti Mohd lwn. PQR Manufacturing", status: "decided", priority: "normal", parties: [], registeredAt: "2025-03-22", createdAt: "2025-03-22", updatedAt: "2025-09-20", assignedChairmanName: "YA Tuan Mohd Rizal" },
  { id: 6, caseNo: "MPM/4/2-1680/2026", caseType: "trade-dispute", subject: "Kesatuan Pekerja Automotif lwn. Premier Motors Bhd", status: "registered", priority: "normal", parties: [], registeredAt: "2026-03-20", createdAt: "2026-03-20", updatedAt: "2026-03-20", assignedChairmanName: "YA Puan Siti Aminah" },
];

const caseTypeLabels: Record<string, string> = {
  "unfair-dismissal": "Pembuangan Tidak Adil",
  "trade-dispute": "Pertikaian Perdagangan",
  "collective-agreement": "Perjanjian Kolektif",
  "non-compliance": "Ketidakpatuhan",
  other: "Lain-lain",
};
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <!-- Hero header -->
    <section class="relative bg-[#1a237e] py-12">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=300&fit=crop" alt="" class="h-full w-full object-cover opacity-10" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
            <Search class="h-6 w-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white sm:text-3xl">
              {{ locale === 'bm' ? 'Carian Kes' : 'Case Search' }}
            </h1>
            <p class="mt-0.5 text-sm text-blue-200">
              {{ locale === 'bm' ? 'Cari maklumat kes Mahkamah Perusahaan Malaysia' : 'Search Industrial Court of Malaysia case information' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Search bar -->
    <section class="bg-slate-50 py-6">
      <div class="mx-auto max-w-7xl px-4">
        <AppSearchBar
          :placeholder="locale === 'bm' ? 'Cari nombor kes, nama pihak...' : 'Search case number, party name...'"
          :filters="[
            { key: 'type', label: locale === 'bm' ? 'Jenis Kes' : 'Case Type', options: [
              { value: 'unfair-dismissal', label: 'Pembuangan Tidak Adil' },
              { value: 'trade-dispute', label: 'Pertikaian Perdagangan' },
              { value: 'non-compliance', label: 'Ketidakpatuhan' },
            ]},
            { key: 'year', label: locale === 'bm' ? 'Tahun' : 'Year', options: [
              { value: '2026', label: '2026' },
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' },
            ]},
          ]"
        />
      </div>
    </section>

    <!-- Results -->
    <section class="py-8">
      <div class="mx-auto max-w-7xl px-4">
        <p class="mb-4 text-sm text-slate-500">
          {{ locale === 'bm' ? `Memaparkan ${mockCases.length} daripada 1,247 rekod` : `Showing ${mockCases.length} of 1,247 records` }}
        </p>

        <div class="space-y-3">
          <article
            v-for="c in mockCases"
            :key="c.id"
            class="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            @click="router.push(`/portal/kes/${c.id}`)"
          >
            <div class="flex items-start gap-4">
              <div class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1a237e]/10 text-[#1a237e] sm:flex">
                <Gavel class="h-5 w-5" />
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-sm font-bold text-[#1a237e]">{{ c.caseNo }}</span>
                  <AppStatusBadge :status="c.status" />
                  <span v-if="c.priority === 'urgent'" class="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">Segera</span>
                </div>
                <h3 class="mt-1 font-medium text-slate-900">{{ c.subject }}</h3>
                <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span class="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">{{ caseTypeLabels[c.caseType] }}</span>
                  <span class="flex items-center gap-1"><User class="h-3 w-3" /> {{ c.assignedChairmanName }}</span>
                  <span class="flex items-center gap-1"><Calendar class="h-3 w-3" /> {{ c.registeredAt }}</span>
                </div>
              </div>
              <ArrowRight class="mt-2 h-4 w-4 shrink-0 text-slate-300" />
            </div>
          </article>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
