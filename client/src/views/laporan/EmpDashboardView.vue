<script setup lang="ts">
import {
  Briefcase,
  TrendingUp,
  Award,
  Clock,
  BarChart3,
} from "lucide-vue-next";

import AppStatCard from "@/components/AppStatCard.vue";
import AppKpiGauge from "@/components/AppKpiGauge.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const stats = [
  { icon: Briefcase, label: "Kes Aktif", value: 342, trend: "up" as const, changePercent: 5.2, subtitle: "dari bulan lepas", color: "blue" as const },
  { icon: TrendingUp, label: "Kes Baru Bulan Ini", value: 47, trend: "up" as const, changePercent: 12, subtitle: "berbanding bulan lepas", color: "green" as const },
  { icon: Award, label: "Award Dikeluarkan", value: 28, trend: "down" as const, changePercent: -3, subtitle: "bulan ini", color: "violet" as const },
  { icon: Clock, label: "Purata Hari Penyelesaian", value: 142, trend: "flat" as const, changePercent: 0, subtitle: "hari", color: "amber" as const },
];

const kpis = [
  { value: 72, target: 100, label: "Kadar Penyelesaian", unit: "%", color: "blue" as const },
  { value: 98.5, target: 99.5, label: "Ketersediaan Sistem", unit: "%", color: "green" as const },
  { value: 89, target: 95, label: "Pematuhan SLA", unit: "%", color: "amber" as const },
];

const caseTypes = [
  { label: "Pembuangan Tidak Adil", value: 180, color: "bg-blue-500" },
  { label: "Pertikaian Perdagangan", value: 95, color: "bg-emerald-500" },
  { label: "Perjanjian Kolektif", value: 42, color: "bg-amber-500" },
  { label: "Lain-lain", value: 25, color: "bg-slate-400" },
];

const maxCaseValue = Math.max(...caseTypes.map((c) => c.value));
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <div>
      <h1 class="page-title">Dashboard eMP</h1>
      <p class="mt-1 text-sm text-slate-500">Ringkasan prestasi dan statistik Mahkamah Perusahaan</p>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AppStatCard
        v-for="s in stats"
        :key="s.label"
        :icon="s.icon"
        :label="s.label"
        :value="s.value"
        :trend="s.trend"
        :change-percent="s.changePercent"
        :subtitle="s.subtitle"
        :color="s.color"
      />
    </div>

    <!-- KPI Gauges -->
    <div>
      <h2 class="mb-3 text-lg font-semibold text-slate-800">Petunjuk Prestasi Utama (KPI)</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AppKpiGauge
          v-for="k in kpis"
          :key="k.label"
          :value="k.value"
          :target="k.target"
          :label="k.label"
          :unit="k.unit"
          :color="k.color"
        />
      </div>
    </div>

    <!-- Bar Chart: Kes Mengikut Jenis -->
    <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div class="mb-4 flex items-center gap-2">
        <BarChart3 class="h-5 w-5 text-slate-500" />
        <h2 class="text-lg font-semibold text-slate-800">Kes Mengikut Jenis</h2>
      </div>
      <div class="space-y-4">
        <div v-for="ct in caseTypes" :key="ct.label" class="flex items-center gap-4">
          <span class="w-48 shrink-0 text-sm text-slate-600">{{ ct.label }}</span>
          <div class="flex-1">
            <div class="h-7 overflow-hidden rounded-md bg-slate-100">
              <div
                class="flex h-full items-center rounded-md px-3 text-xs font-semibold text-white transition-all duration-500"
                :class="ct.color"
                :style="{ width: `${(ct.value / maxCaseValue) * 100}%` }"
              >
                {{ ct.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
