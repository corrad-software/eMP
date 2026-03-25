<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileInput,
  Gavel,
  Scale,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Users,
  FileSearch,
  BarChart3,
} from "lucide-vue-next";

import AdminLayout from "@/layouts/AdminLayout.vue";

const router = useRouter();

// ── Stat cards ──
const stats = [
  { label: "Kes Aktif", value: "342", change: "+12", positive: true, icon: Briefcase, spark: [280, 295, 310, 318, 325, 330, 342] },
  { label: "Kes Baru (Mac)", value: "47", change: "+8", positive: true, icon: TrendingUp, spark: [32, 38, 41, 35, 40, 44, 47] },
  { label: "Menunggu Tindakan", value: "23", change: "-3", positive: true, icon: Clock, spark: [30, 28, 32, 26, 25, 24, 23] },
  { label: "Award Bulan Ini", value: "28", change: "+5", positive: true, icon: Scale, spark: [18, 22, 20, 25, 23, 26, 28] },
];

// ── Sparkline helper ──
function sparklinePath(data: number[], w = 100, h = 28) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = w / (data.length - 1);
  return data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
}

function sparklineArea(data: number[], w = 100, h = 28) {
  return `${sparklinePath(data, w, h)} L${w},${h} L0,${h} Z`;
}

// ── Urgent items ──
const urgentItems = [
  { id: 1, type: "sla", label: "3 kes melebihi SLA sebutan", caseNo: "MPM/4/2-1234", dueAt: "Hari ini", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  { id: 2, type: "filing", label: "5 pemfailan menunggu semakan", caseNo: null, dueAt: "2 hari lagi", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  { id: 3, type: "approval", label: "2 kes menunggu kelulusan YDP", caseNo: null, dueAt: "Hari ini", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
];

// ── Today schedule ──
const todaySchedule = [
  { time: "09:00", caseNo: "MPM/4/2-1234/2026", type: "Sebutan", venue: "Bilik 1", chairman: "YA Tuan Mohd Rizal" },
  { time: "10:30", caseNo: "MPM/4/2-0890/2025", type: "Perbicaraan", venue: "Bilik 2", chairman: "YA Tuan Rajesh Kumar" },
  { time: "14:00", caseNo: "MPM/4/2-1555/2026", type: "Sebutan", venue: "Bilik 1", chairman: "YA Puan Siti Aminah" },
  { time: "15:30", caseNo: "MPM/4/2-1600/2026", type: "Mediasi", venue: "Bilik 3", chairman: "YA Puan Noraini" },
];

// ── Recent activity ──
const recentActivity = [
  { action: "Kes baru didaftarkan", detail: "MPM/4/2-1680/2026 — Ahmad lwn. ABC Sdn Bhd", time: "10 min lalu", icon: Briefcase },
  { action: "Award dikeluarkan", detail: "MPM/4/2-0567/2025 — Muthu lwn. JKL Enterprises", time: "1 jam lalu", icon: Scale },
  { action: "Pemfailan diterima", detail: "EF-2026-000142 — Pertikaian Perdagangan", time: "2 jam lalu", icon: FileInput },
  { action: "Sebutan selesai", detail: "MPM/4/2-1102/2025 — 3 keputusan direkod", time: "3 jam lalu", icon: MessageSquare },
  { action: "Kes ditutup", detail: "MPM/4/2-0322/2025 — Siti Fatimah lwn. PQR Mfg", time: "Semalam", icon: CheckCircle2 },
];

// ── Quick links ──
const quickLinks = [
  { label: "Pendaftaran Kes", desc: "Daftar kes baru atau semak senarai pendaftaran", icon: Briefcase, to: "/admin/kes/daftar" },
  { label: "e-Filing", desc: "Urus pemfailan dan semak permohonan", icon: FileInput, to: "/admin/efiling" },
  { label: "Jadual Mahkamah", desc: "Lihat dan urus jadual perbicaraan", icon: CalendarDays, to: "/admin/jadual" },
  { label: "e-Sebutan", desc: "Sesi sebutan atas talian", icon: MessageSquare, to: "/admin/esebutan" },
  { label: "Carian Pintar", desc: "Cari award dan dokumen", icon: FileSearch, to: "/admin/carian" },
  { label: "Dashboard KPI", desc: "Laporan dan analitik prestasi", icon: BarChart3, to: "/admin/laporan" },
];

// ── Kes mengikut status (donut data) ──
const caseByStatus = [
  { label: "Pendaftaran", value: 45, color: "#3b82f6" },
  { label: "Dalam Proses", value: 128, color: "#8b5cf6" },
  { label: "Perbicaraan", value: 97, color: "#f59e0b" },
  { label: "Diputuskan", value: 52, color: "#10b981" },
  { label: "Ditutup", value: 20, color: "#94a3b8" },
];
const totalCases = computed(() => caseByStatus.reduce((s, c) => s + c.value, 0));
const donutGradient = computed(() => {
  let start = 0;
  const segments = caseByStatus.map((c) => {
    const pct = (c.value / totalCases.value) * 100;
    const end = start + pct;
    const seg = `${c.color} ${start}% ${end}%`;
    start = end;
    return seg;
  });
  return `conic-gradient(${segments.join(", ")})`;
});

// ── Monthly trend (bar chart) ──
const monthlyData = [
  { month: "Okt", registered: 38, resolved: 32 },
  { month: "Nov", registered: 42, resolved: 35 },
  { month: "Dis", registered: 35, resolved: 40 },
  { month: "Jan", registered: 44, resolved: 38 },
  { month: "Feb", registered: 39, resolved: 41 },
  { month: "Mac", registered: 47, resolved: 28 },
];
const maxMonthly = computed(() => Math.max(...monthlyData.flatMap((m) => [m.registered, m.resolved])));
</script>

<template>
  <AdminLayout>
    <div class="mx-auto max-w-7xl space-y-4">
      <!-- ───── Hero Header ───── -->
      <div class="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Main Dashboard</p>
        <h1 class="mt-2 text-2xl font-semibold text-slate-900">e-Mahkamah Perusahaan Malaysia</h1>
        <p class="mt-1 text-sm text-slate-500">Ringkasan operasi dan tindakan segera · {{ new Date().toLocaleDateString('ms-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      </div>

      <!-- ───── Stat Cards with Sparklines ───── -->
      <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="stat in stats" :key="stat.label" class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between">
            <p class="text-xs font-medium text-slate-500">{{ stat.label }}</p>
            <span
              class="rounded-full px-2 py-0.5 text-[11px] font-semibold"
              :class="stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'"
            >{{ stat.change }}</span>
          </div>
          <div class="mt-2 flex items-end justify-between">
            <p class="text-2xl font-semibold text-slate-900">{{ stat.value }}</p>
            <svg width="100" height="28" class="text-[var(--accent-500)] opacity-60">
              <path :d="sparklineArea(stat.spark)" fill="currentColor" opacity="0.15" />
              <polyline :points="stat.spark.map((v, i) => `${i * (100 / (stat.spark.length - 1))},${28 - ((v - Math.min(...stat.spark)) / (Math.max(...stat.spark) - Math.min(...stat.spark) || 1)) * 28}`).join(' ')" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </article>
      </section>

      <!-- ───── Urgent Alerts ───── -->
      <article v-if="urgentItems.length" class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <AlertTriangle class="h-4 w-4 text-amber-500" />
          <h2 class="text-sm font-semibold text-slate-900">Tindakan Segera</h2>
          <span class="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700">{{ urgentItems.length }}</span>
        </div>
        <div class="divide-y divide-slate-100 p-2">
          <div
            v-for="item in urgentItems"
            :key="item.id"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
          >
            <div class="h-2 w-2 shrink-0 rounded-full" :class="item.type === 'sla' ? 'bg-red-500' : 'bg-amber-500'" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-slate-800">{{ item.label }}</p>
              <p v-if="item.caseNo" class="text-xs text-slate-400">{{ item.caseNo }}</p>
            </div>
            <span class="shrink-0 text-xs font-medium" :class="item.color">{{ item.dueAt }}</span>
          </div>
        </div>
      </article>

      <!-- ───── Main Grid: Charts + Schedule + Activity ───── -->
      <div class="grid gap-4 lg:grid-cols-3">
        <!-- Left: Donut + Monthly trend -->
        <div class="space-y-4 lg:col-span-2">
          <div class="grid gap-4 md:grid-cols-2">
            <!-- Donut chart -->
            <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Gavel class="h-4 w-4 text-slate-500" />
                <h2 class="text-sm font-semibold text-slate-900">Kes Mengikut Status</h2>
              </div>
              <div class="flex items-center gap-6 pt-4">
                <div class="relative h-28 w-28 shrink-0">
                  <div class="h-full w-full rounded-full" :style="{ background: donutGradient }" />
                  <div class="absolute inset-3 flex items-center justify-center rounded-full bg-white">
                    <div class="text-center">
                      <p class="text-lg font-bold text-slate-900">{{ totalCases }}</p>
                      <p class="text-[10px] text-slate-400">Jumlah</p>
                    </div>
                  </div>
                </div>
                <div class="space-y-1.5">
                  <div v-for="c in caseByStatus" :key="c.label" class="flex items-center gap-2 text-sm">
                    <span class="h-2.5 w-2.5 shrink-0 rounded-full" :style="{ backgroundColor: c.color }" />
                    <span class="text-slate-600">{{ c.label }}</span>
                    <span class="ml-auto font-semibold text-slate-800">{{ c.value }}</span>
                  </div>
                </div>
              </div>
            </article>

            <!-- Monthly bar chart -->
            <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
                <BarChart3 class="h-4 w-4 text-slate-500" />
                <h2 class="text-sm font-semibold text-slate-900">Trend Bulanan</h2>
              </div>
              <div class="flex items-center gap-4 pt-3 text-[11px] text-slate-400">
                <span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-blue-500" /> Didaftarkan</span>
                <span class="flex items-center gap-1"><span class="h-2 w-2 rounded-full bg-emerald-500" /> Diselesaikan</span>
              </div>
              <div class="mt-3 flex items-end gap-2">
                <div v-for="m in monthlyData" :key="m.month" class="flex flex-1 flex-col items-center gap-1">
                  <div class="flex w-full items-end justify-center gap-0.5">
                    <div class="w-3 rounded-t bg-blue-500" :style="{ height: `${(m.registered / maxMonthly) * 80}px` }" />
                    <div class="w-3 rounded-t bg-emerald-500" :style="{ height: `${(m.resolved / maxMonthly) * 80}px` }" />
                  </div>
                  <span class="text-[10px] text-slate-400">{{ m.month }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- Right: Today Schedule -->
        <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 px-4 py-2.5">
            <div class="flex items-center gap-2">
              <CalendarDays class="h-4 w-4 text-slate-500" />
              <h2 class="text-sm font-semibold text-slate-900">Jadual Hari Ini</h2>
            </div>
            <button class="text-xs font-medium text-slate-500 hover:text-slate-700" @click="router.push('/admin/jadual')">Lihat semua</button>
          </div>
          <div class="divide-y divide-slate-100">
            <div
              v-for="(item, i) in todaySchedule"
              :key="i"
              class="flex gap-3 px-4 py-3 transition-colors hover:bg-slate-50"
            >
              <div class="flex w-12 shrink-0 flex-col items-center">
                <span class="text-sm font-bold text-slate-900">{{ item.time }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-slate-800">{{ item.caseNo }}</p>
                <p class="text-xs text-slate-500">{{ item.type }} · {{ item.venue }}</p>
                <p class="text-xs text-slate-400">{{ item.chairman }}</p>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- ───── Recent Activity ───── -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Clock class="h-4 w-4 text-slate-500" />
          <h2 class="text-sm font-semibold text-slate-900">Aktiviti Terkini</h2>
        </div>
        <div class="divide-y divide-slate-100">
          <div
            v-for="(a, i) in recentActivity"
            :key="i"
            class="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50"
          >
            <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <component :is="a.icon" class="h-4 w-4 text-slate-500" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-slate-800">{{ a.action }}</p>
              <p class="truncate text-xs text-slate-400">{{ a.detail }}</p>
            </div>
            <span class="shrink-0 text-xs text-slate-400">{{ a.time }}</span>
          </div>
        </div>
      </article>

      <!-- ───── Quick Links ───── -->
      <section>
        <h2 class="mb-3 text-sm font-semibold text-slate-900">Pintasan</h2>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button
            v-for="link in quickLinks"
            :key="link.label"
            class="group rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md"
            @click="router.push(link.to)"
          >
            <div class="flex items-center gap-2">
              <component :is="link.icon" class="h-4 w-4 text-slate-400 group-hover:text-[var(--accent-600)]" />
              <span class="text-sm font-semibold text-slate-800">{{ link.label }}</span>
              <ArrowRight class="ml-auto h-3.5 w-3.5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent-500)]" />
            </div>
            <p class="mt-1 text-xs text-slate-500">{{ link.desc }}</p>
          </button>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>
