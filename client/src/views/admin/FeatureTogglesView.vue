<script setup lang="ts">
import { ref } from "vue";
import { ToggleRight } from "lucide-vue-next";
import AdminLayout from "@/layouts/AdminLayout.vue";

type FeatureToggle = {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  environments: string[];
};

const features = ref<FeatureToggle[]>([
  {
    id: 1,
    name: "e-Sebutan",
    description: "Membolehkan sebutan kes secara dalam talian melalui sidang video.",
    enabled: true,
    environments: ["Dev", "Staging", "Prod"],
  },
  {
    id: 2,
    name: "Carian Pintar Semantik",
    description: "Carian kes menggunakan pemahaman konteks dan padanan semantik.",
    enabled: true,
    environments: ["Dev", "Staging"],
  },
  {
    id: 3,
    name: "MyDigital ID SSO",
    description: "Log masuk tunggal menggunakan MyDigital ID untuk semua pengguna.",
    enabled: false,
    environments: ["Dev"],
  },
  {
    id: 4,
    name: "Notifikasi SMS",
    description: "Penghantaran notifikasi melalui SMS kepada pihak-pihak yang terlibat.",
    enabled: true,
    environments: ["Dev", "Staging", "Prod"],
  },
  {
    id: 5,
    name: "Auto-Assignment Kes",
    description: "Pengagihan kes secara automatik berdasarkan beban kerja hakim.",
    enabled: false,
    environments: ["Dev"],
  },
  {
    id: 6,
    name: "Paparan Digital Signage",
    description: "Paparan maklumat kes dan jadual pada skrin digital di lobi mahkamah.",
    enabled: true,
    environments: ["Dev", "Staging"],
  },
]);

const envColors: Record<string, string> = {
  Dev: "bg-sky-50 text-sky-700 ring-sky-300/60",
  Staging: "bg-amber-50 text-amber-700 ring-amber-300/60",
  Prod: "bg-emerald-50 text-emerald-700 ring-emerald-300/60",
};

function toggleFeature(feature: FeatureToggle) {
  feature.enabled = !feature.enabled;
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <div>
      <h1 class="page-title">Feature Toggles</h1>
      <p class="mt-1 text-sm text-slate-500">Kawal ciri-ciri sistem mengikut persekitaran</p>
    </div>

    <div class="overflow-x-auto rounded-lg border border-slate-200">
      <table class="min-w-full divide-y divide-slate-200 text-sm">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Ciri
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Penerangan
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Persekitaran
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500" style="width: 100px">
              Status
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr v-for="feature in features" :key="feature.id">
            <td class="whitespace-nowrap px-4 py-4">
              <div class="flex items-center gap-2">
                <ToggleRight class="h-4 w-4 text-slate-400" />
                <span class="font-medium text-slate-900">{{ feature.name }}</span>
              </div>
            </td>
            <td class="px-4 py-4 text-slate-500" style="max-width: 320px">
              {{ feature.description }}
            </td>
            <td class="px-4 py-4">
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="env in feature.environments"
                  :key="env"
                  class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                  :class="envColors[env] ?? 'bg-slate-100 text-slate-600 ring-slate-300/60'"
                >
                  {{ env }}
                </span>
              </div>
            </td>
            <td class="px-4 py-4 text-center">
              <button
                class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
                :class="feature.enabled ? 'bg-blue-600' : 'bg-slate-200'"
                role="switch"
                :aria-checked="feature.enabled"
                @click="toggleFeature(feature)"
              >
                <span
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  :class="feature.enabled ? 'translate-x-5' : 'translate-x-0'"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</AdminLayout>
</template>
