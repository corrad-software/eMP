<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Plus, ChevronUp, ChevronDown, Trash2, Save, Eye, Image, Calendar, Megaphone } from "lucide-vue-next";
import type { SignagePlaylist, SignageItem } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();

const playlist = ref<SignagePlaylist>({
  id: Number(route.params.id) || 1,
  name: "Jadual Harian",
  isActive: true,
  items: [
    { id: 1, type: "schedule", content: "Jadual Perbicaraan Hari Ini", duration: 30, order: 1 },
    { id: 2, type: "announcement", content: "Peringatan: Sesi mahkamah bermula pada 9:00 pagi. Semua pihak diminta hadir 15 minit lebih awal.", duration: 15, order: 2 },
    { id: 3, type: "image", content: "banner-mahkamah-perusahaan.jpg", duration: 10, order: 3 },
    { id: 4, type: "announcement", content: "Perkhidmatan kaunter dibuka dari 8:30 pagi hingga 4:30 petang, Isnin hingga Jumaat.", duration: 15, order: 4 },
    { id: 5, type: "schedule", content: "Senarai Kes Esok", duration: 20, order: 5 },
  ],
});

const typeBadge: Record<string, { label: string; color: string; icon: typeof Calendar }> = {
  schedule: { label: "Jadual", color: "bg-blue-50 text-blue-700 ring-blue-300/60", icon: Calendar },
  announcement: { label: "Pengumuman", color: "bg-amber-50 text-amber-700 ring-amber-300/60", icon: Megaphone },
  image: { label: "Imej", color: "bg-emerald-50 text-emerald-700 ring-emerald-300/60", icon: Image },
};

function moveUp(index: number) {
  if (index === 0) return;
  const items = playlist.value.items;
  [items[index - 1], items[index]] = [items[index], items[index - 1]];
  items.forEach((item, i) => (item.order = i + 1));
}

function moveDown(index: number) {
  const items = playlist.value.items;
  if (index >= items.length - 1) return;
  [items[index], items[index + 1]] = [items[index + 1], items[index]];
  items.forEach((item, i) => (item.order = i + 1));
}

function removeItem(index: number) {
  playlist.value.items.splice(index, 1);
  playlist.value.items.forEach((item, i) => (item.order = i + 1));
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Paparan Digital', to: '/admin/signage' }, { label: 'Senarai Main' }]" />
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">{{ playlist.name }}</h1>
        <p class="mt-1 text-sm text-slate-500">Susun item paparan dalam senarai main ini.</p>
      </div>
      <span
        class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
        :class="playlist.isActive ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-300/60' : 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-300/60'"
      >
        {{ playlist.isActive ? "Aktif" : "Tidak Aktif" }}
      </span>
    </div>

    <!-- Playlist Items -->
    <div class="space-y-3">
      <div
        v-for="(item, index) in playlist.items"
        :key="item.id"
        class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      >
        <!-- Order Number -->
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
          {{ item.order }}
        </div>

        <!-- Type Badge -->
        <span class="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset" :class="(typeBadge[item.type] ?? typeBadge.schedule).color">
          <component :is="(typeBadge[item.type] ?? typeBadge.schedule).icon" class="h-3 w-3" />
          {{ (typeBadge[item.type] ?? typeBadge.schedule).label }}
        </span>

        <!-- Content -->
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-slate-900">{{ item.content }}</p>
          <p class="text-xs text-slate-500">{{ item.duration }}s</p>
        </div>

        <!-- Actions -->
        <div class="flex shrink-0 items-center gap-1">
          <button
            class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
            :disabled="index === 0"
            @click="moveUp(index)"
          >
            <ChevronUp class="h-4 w-4" />
          </button>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
            :disabled="index === playlist.items.length - 1"
            @click="moveDown(index)"
          >
            <ChevronDown class="h-4 w-4" />
          </button>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600"
            @click="removeItem(index)"
          >
            <Trash2 class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Add Item -->
    <button class="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 hover:border-blue-400 hover:text-blue-600">
      <Plus class="h-4 w-4" />
      Tambah Item
    </button>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3">
      <button
        class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        @click="router.push(`/admin/signage/preview/${playlist.id}`)"
      >
        <Eye class="h-4 w-4" />
        Pratonton
      </button>
      <button class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800">
        <Save class="h-4 w-4" />
        Simpan
      </button>
    </div>
  </div>
</AdminLayout>
</template>
