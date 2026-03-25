<script setup lang="ts">
import PortalLayout from "@/layouts/PortalLayout.vue";
import AppSearchBar from "@/components/AppSearchBar.vue";
import { FileText, Download, Scale, User, Calendar, Tag } from "lucide-vue-next";
import type { AwardResult } from "@/types";

const mockAwards: AwardResult[] = [
  { id: 1, caseNo: "MPM/4/2-0567/2025", awardNo: "Award No. 234/2026", title: "Muthu a/l Rajan lwn. JKL Enterprises Sdn Bhd", snippet: "...mahkamah mendapati bahawa pembuangan pekerja adalah tanpa sebab yang adil dan munasabah. Pekerja telah berkhidmat selama 8 tahun dengan rekod perkhidmatan yang baik...", chairmanName: "YA Puan Noraini", decidedAt: "15 Dis 2025", relevanceScore: 0.95, highlights: ["pembuangan tidak adil", "pampasan"], caseType: "Pembuangan Tidak Adil", year: 2026 },
  { id: 2, caseNo: "MPM/4/2-0322/2025", awardNo: "Award No. 189/2025", title: "Siti Fatimah binti Mohd lwn. PQR Manufacturing", snippet: "...pihak majikan gagal membuktikan bahawa pekerja telah melanggar kontrak perkhidmatan secara serius. Dakwaan salah laku tidak disokong oleh bukti yang mencukupi...", chairmanName: "YA Tuan Mohd Rizal", decidedAt: "20 Sep 2025", relevanceScore: 0.88, highlights: ["pelanggaran kontrak", "pembuangan"], caseType: "Pembuangan Tidak Adil", year: 2025 },
  { id: 3, caseNo: "MPM/4/2-0199/2024", awardNo: "Award No. 102/2025", title: "Kesatuan Pekerja Kelapa Sawit lwn. Green Palm Bhd", snippet: "...pertikaian berkaitan pindaan terma dan syarat perjanjian kolektif mengenai elaun syif. Majikan telah membuat pindaan secara unilateral tanpa rundingan...", chairmanName: "YA Puan Siti Aminah", decidedAt: "10 Mac 2025", relevanceScore: 0.82, highlights: ["perjanjian kolektif", "elaun syif"], caseType: "Pertikaian Perdagangan", year: 2025 },
  { id: 4, caseNo: "MPM/4/2-0088/2024", awardNo: "Award No. 45/2025", title: "Tan Wei Ming lwn. Global Synergy Sdn Bhd", snippet: "...pekerja diberhentikan tanpa notis yang mencukupi selepas memaklumkan kehamilan. Mahkamah mendapati terdapat elemen diskriminasi dalam keputusan pemberhentian...", chairmanName: "YA Tuan Rajesh Kumar", decidedAt: "5 Feb 2025", relevanceScore: 0.78, highlights: ["diskriminasi", "kehamilan", "notis"], caseType: "Pembuangan Tidak Adil", year: 2025 },
  { id: 5, caseNo: "MPM/4/2-0950/2024", awardNo: "Award No. 310/2025", title: "Kesatuan Pekerja Automotif lwn. Premier Motors Bhd", snippet: "...pertikaian mengenai bayaran kerja lebih masa dan elaun syif malam yang tidak dibayar mengikut perjanjian kolektif yang berkuat kuasa...", chairmanName: "YA Puan Noraini", decidedAt: "28 Nov 2025", relevanceScore: 0.75, highlights: ["kerja lebih masa", "elaun syif"], caseType: "Pertikaian Perdagangan", year: 2025 },
];
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <!-- Hero header -->
    <section class="relative bg-[#1a237e] py-12">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=1920&h=300&fit=crop" alt="" class="h-full w-full object-cover opacity-10" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
            <Scale class="h-6 w-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white sm:text-3xl">
              {{ locale === 'bm' ? 'Carian Award' : 'Award Search' }}
            </h1>
            <p class="mt-0.5 text-sm text-blue-200">
              {{ locale === 'bm' ? 'Cari dan muat turun award Mahkamah Perusahaan Malaysia' : 'Search and download Industrial Court awards' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Search -->
    <section class="bg-slate-50 py-6">
      <div class="mx-auto max-w-7xl px-4">
        <AppSearchBar
          :placeholder="locale === 'bm' ? 'Cari mengikut kata kunci, nombor kes, nama pihak...' : 'Search by keyword, case number, party name...'"
          :filters="[
            { key: 'year', label: locale === 'bm' ? 'Tahun' : 'Year', options: [
              { value: '2026', label: '2026' },
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' },
            ]},
            { key: 'type', label: locale === 'bm' ? 'Jenis' : 'Type', options: [
              { value: 'unfair-dismissal', label: 'Pembuangan Tidak Adil' },
              { value: 'trade-dispute', label: 'Pertikaian Perdagangan' },
            ]},
          ]"
        />
      </div>
    </section>

    <!-- Results -->
    <section class="py-8">
      <div class="mx-auto max-w-7xl px-4">
        <p class="mb-4 text-sm text-slate-500">
          {{ locale === 'bm' ? `Memaparkan ${mockAwards.length} daripada 634 award` : `Showing ${mockAwards.length} of 634 awards` }}
        </p>

        <div class="space-y-4">
          <article
            v-for="award in mockAwards"
            :key="award.id"
            class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div class="flex items-start gap-4">
              <!-- Left icon -->
              <div class="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#1a237e]/10 text-[#1a237e] sm:flex">
                <Scale class="h-6 w-6" />
              </div>

              <!-- Content -->
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="rounded-full bg-[#1a237e]/10 px-2.5 py-0.5 text-xs font-semibold text-[#1a237e]">{{ award.awardNo }}</span>
                  <span class="text-xs text-slate-400">{{ award.caseNo }}</span>
                </div>
                <h3 class="mt-2 font-semibold text-slate-900">{{ award.title }}</h3>
                <p class="mt-1.5 text-sm leading-relaxed text-slate-600">{{ award.snippet }}</p>

                <!-- Tags -->
                <div class="mt-3 flex flex-wrap gap-1.5">
                  <span v-for="h in award.highlights" :key="h" class="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                    <Tag class="h-2.5 w-2.5" />
                    {{ h }}
                  </span>
                </div>

                <!-- Meta -->
                <div class="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span class="flex items-center gap-1"><User class="h-3 w-3" /> {{ award.chairmanName }}</span>
                  <span class="flex items-center gap-1"><Calendar class="h-3 w-3" /> {{ award.decidedAt }}</span>
                  <span class="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">{{ award.caseType }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex shrink-0 flex-col gap-2">
                <button class="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                  <FileText class="h-3.5 w-3.5" />
                  {{ locale === 'bm' ? 'Lihat' : 'View' }}
                </button>
                <button class="flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition-colors hover:bg-slate-800">
                  <Download class="h-3.5 w-3.5" />
                  PDF
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
