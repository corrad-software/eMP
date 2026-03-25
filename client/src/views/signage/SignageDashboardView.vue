<script setup lang="ts">
import { useRouter } from "vue-router";
import { Monitor, Wifi, WifiOff, Settings } from "lucide-vue-next";
import AppStatCard from "@/components/AppStatCard.vue";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import type { SignageDevice } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";

const router = useRouter();

const devices: SignageDevice[] = [
  { id: 1, name: "Paparan Lobi Utama", location: "Aras 1 - Lobi Utama", status: "online", lastHeartbeat: "2026-03-25T09:58:00", currentPlaylistId: 1 },
  { id: 2, name: "Paparan Tingkat 2", location: "Aras 2 - Koridor", status: "online", lastHeartbeat: "2026-03-25T09:57:00", currentPlaylistId: 1 },
  { id: 3, name: "Paparan Bilik Menunggu", location: "Aras 1 - Bilik Menunggu", status: "online", lastHeartbeat: "2026-03-25T09:55:00", currentPlaylistId: 2 },
  { id: 4, name: "Paparan Kaunter Pendaftaran", location: "Aras 1 - Kaunter", status: "offline", lastHeartbeat: "2026-03-25T08:30:00", currentPlaylistId: 1 },
  { id: 5, name: "Paparan Bilik Mahkamah 1", location: "Aras 3 - Bilik Mahkamah 1", status: "maintenance", lastHeartbeat: "2026-03-24T17:00:00", currentPlaylistId: 3 },
  { id: 6, name: "Paparan Kafeteria", location: "Aras G - Kafeteria", status: "online", lastHeartbeat: "2026-03-25T09:56:00", currentPlaylistId: 2 },
];

const playlistNames: Record<number, string> = {
  1: "Jadual Harian",
  2: "Pengumuman Am",
  3: "Info Mahkamah",
};

const totalDevices = devices.length;
const onlineCount = devices.filter((d) => d.status === "online").length;
const offlineCount = devices.filter((d) => d.status !== "online").length;

function formatTime(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" });
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <!-- Header -->
    <div>
      <h1 class="page-title">Paparan Kandungan Digital</h1>
      <p class="mt-1 text-sm text-slate-500">Pantau dan urus paparan digital di seluruh bangunan.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <AppStatCard :icon="Monitor" label="Total Peranti" :value="totalDevices" color="blue" />
      <AppStatCard :icon="Wifi" label="Dalam Talian" :value="onlineCount" color="green" />
      <AppStatCard :icon="WifiOff" label="Luar Talian" :value="offlineCount" color="red" />
    </div>

    <!-- Device Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="device in devices"
        :key="device.id"
        class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
              <Monitor class="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-900">{{ device.name }}</h3>
              <p class="text-xs text-slate-500">{{ device.location }}</p>
            </div>
          </div>
          <AppStatusBadge :status="device.status" />
        </div>

        <div class="mt-4 space-y-2 border-t border-slate-100 pt-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">Detak Jantung Terakhir</span>
            <span class="font-medium text-slate-700">{{ formatTime(device.lastHeartbeat) }}</span>
          </div>
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">Senarai Main</span>
            <span class="font-medium text-slate-700">{{ playlistNames[device.currentPlaylistId ?? 0] ?? "-" }}</span>
          </div>
        </div>

        <button
          class="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          @click="router.push(`/admin/signage/playlist/${device.currentPlaylistId ?? 1}`)"
        >
          <Settings class="h-3.5 w-3.5" />
          Urus
        </button>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
