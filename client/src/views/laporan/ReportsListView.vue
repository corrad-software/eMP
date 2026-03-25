<script setup lang="ts">
import {
  BarChart3,
  Activity,
  ShieldCheck,
  ScrollText,
  Award,
  FilePlus,
  FileText,
} from "lucide-vue-next";
import type { Component } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

interface ReportTemplate {
  id: string;
  icon: Component;
  title: string;
  description: string;
}

const templates: ReportTemplate[] = [
  {
    id: "statistik-kes",
    icon: BarChart3,
    title: "Laporan Statistik Kes",
    description: "Statistik keseluruhan kes mengikut jenis, status, dan tempoh masa tertentu.",
  },
  {
    id: "prestasi-mahkamah",
    icon: Activity,
    title: "Laporan Prestasi Mahkamah",
    description: "Analisis prestasi mahkamah berdasarkan KPI dan metrik penyelesaian kes.",
  },
  {
    id: "pematuhan-sla",
    icon: ShieldCheck,
    title: "Laporan Pematuhan SLA",
    description: "Laporan pematuhan Service Level Agreement untuk semua proses mahkamah.",
  },
  {
    id: "audit-trail",
    icon: ScrollText,
    title: "Laporan Audit Trail",
    description: "Jejak audit aktiviti pengguna dan perubahan data dalam sistem.",
  },
  {
    id: "award-bulanan",
    icon: Award,
    title: "Laporan Award Bulanan",
    description: "Senarai award yang dikeluarkan dalam tempoh bulanan dengan butiran kes.",
  },
  {
    id: "pendaftaran-kes",
    icon: FilePlus,
    title: "Laporan Pendaftaran Kes",
    description: "Ringkasan pendaftaran kes baru mengikut kategori dan tarikh.",
  },
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <div>
      <h1 class="page-title">Senarai Laporan</h1>
      <p class="mt-1 text-sm text-slate-500">
        Pilih templat laporan untuk menjana laporan berdasarkan data semasa.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="tpl in templates"
        :key="tpl.id"
        class="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-200/60">
          <component :is="tpl.icon" class="h-5 w-5" />
        </div>
        <h3 class="text-sm font-semibold text-slate-900">{{ tpl.title }}</h3>
        <p class="mt-1 text-xs leading-relaxed text-slate-500">{{ tpl.description }}</p>
        <router-link
          :to="`/admin/laporan/${tpl.id}`"
          class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
        >
          <FileText class="h-3.5 w-3.5" />
          Jana Laporan
        </router-link>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
