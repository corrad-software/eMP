<script setup lang="ts">
import { ref } from "vue";
import { FileText, Plus, Pencil, Eye, Mail, FileOutput } from "lucide-vue-next";
import AdminLayout from "@/layouts/AdminLayout.vue";

type Template = {
  id: number;
  name: string;
  description: string;
  lastModified: string;
  category: "notis" | "surat";
};

const templates = ref<Template[]>([
  {
    id: 1,
    name: "Notis Sebutan",
    description: "Templat notis untuk memaklumkan pihak-pihak mengenai tarikh sebutan kes.",
    lastModified: "2026-03-20",
    category: "notis",
  },
  {
    id: 2,
    name: "Notis Perbicaraan",
    description: "Templat notis untuk memaklumkan tarikh dan lokasi perbicaraan kes.",
    lastModified: "2026-03-18",
    category: "notis",
  },
  {
    id: 3,
    name: "Notis Keputusan",
    description: "Templat notis untuk menyampaikan keputusan mahkamah kepada pihak-pihak.",
    lastModified: "2026-03-15",
    category: "notis",
  },
  {
    id: 4,
    name: "Surat Pengesahan",
    description: "Templat surat pengesahan rasmi untuk pelbagai urusan mahkamah.",
    lastModified: "2026-03-12",
    category: "surat",
  },
  {
    id: 5,
    name: "Surat Perintah",
    description: "Templat surat perintah mahkamah untuk pelaksanaan keputusan.",
    lastModified: "2026-03-10",
    category: "surat",
  },
]);

const notisTemplates = templates.value.filter((t) => t.category === "notis");
const suratTemplates = templates.value.filter((t) => t.category === "surat");

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ms-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Pengurusan Templat</h1>
        <p class="mt-1 text-sm text-slate-500">Urus templat notis dan surat rasmi mahkamah</p>
      </div>
      <button
        class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
      >
        <Plus class="h-4 w-4" />
        Tambah Templat
      </button>
    </div>

    <!-- Templat Notis -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Mail class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Templat Notis</h2>
      </div>
      <div class="space-y-3 p-4">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="tpl in notisTemplates"
          :key="tpl.id"
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="mb-3 flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-200/60">
              <FileText class="h-5 w-5" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-semibold text-slate-900">{{ tpl.name }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-slate-500">{{ tpl.description }}</p>
            </div>
          </div>
          <p class="mb-4 text-xs text-slate-400">Kemaskini terakhir: {{ formatDate(tpl.lastModified) }}</p>
          <div class="flex gap-2">
            <button
              class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Pencil class="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Eye class="h-3.5 w-3.5" />
              Pratonton
            </button>
          </div>
        </div>
      </div>
      </div>
    </article>

    <!-- Templat Surat -->
    <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <FileOutput class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Templat Surat</h2>
      </div>
      <div class="space-y-3 p-4">
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="tpl in suratTemplates"
          :key="tpl.id"
          class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="mb-3 flex items-start gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600 ring-1 ring-violet-200/60">
              <FileText class="h-5 w-5" />
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-semibold text-slate-900">{{ tpl.name }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-slate-500">{{ tpl.description }}</p>
            </div>
          </div>
          <p class="mb-4 text-xs text-slate-400">Kemaskini terakhir: {{ formatDate(tpl.lastModified) }}</p>
          <div class="flex gap-2">
            <button
              class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Pencil class="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              class="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Eye class="h-3.5 w-3.5" />
              Pratonton
            </button>
          </div>
        </div>
      </div>
      </div>
    </article>
  </div>
</AdminLayout>
</template>
