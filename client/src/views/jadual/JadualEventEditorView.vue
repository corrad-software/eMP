<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Save, X, Search, AlertTriangle, CheckCircle } from "lucide-vue-next";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const router = useRouter();

const isNew = computed(() => route.params.id === "baru" || !route.params.id);
const pageTitle = computed(() => (isNew.value ? "Acara Baru" : "Edit Acara"));

const jenisAcara = ref(isNew.value ? "" : "mention");
const noKes = ref(isNew.value ? "" : "MP(S)/1-0201/2026");
const tarikh = ref(isNew.value ? "" : "2026-03-25");
const masaMula = ref(isNew.value ? "" : "09:00");
const masaTamat = ref(isNew.value ? "" : "10:00");
const bilikMahkamah = ref(isNew.value ? "" : "bilik-1");
const pengerusi = ref(isNew.value ? "" : "rizal");

const conflictChecked = ref(false);
const conflictFound = ref(false);

const jenisOptions = [
  { value: "mention", label: "Sebutan" },
  { value: "hearing", label: "Perbicaraan" },
  { value: "mediation", label: "Mediasi" },
  { value: "conference", label: "Persidangan" },
  { value: "administrative", label: "Pentadbiran" },
];

const bilikOptions = [
  { value: "bilik-1", label: "Bilik Mahkamah 1" },
  { value: "bilik-2", label: "Bilik Mahkamah 2" },
  { value: "bilik-3", label: "Bilik Mahkamah 3" },
  { value: "bilik-mediasi", label: "Bilik Mediasi" },
];

const pengerusiOptions = [
  { value: "rizal", label: "YA Tuan Mohd Rizal" },
  { value: "siti", label: "YA Puan Siti Aminah" },
  { value: "kamal", label: "YA Tuan Kamal Ariffin" },
];

function semakKonflik() {
  conflictChecked.value = true;
  // Mock: show conflict if date is 2026-03-25 and bilik-1
  conflictFound.value = tarikh.value === "2026-03-25" && bilikMahkamah.value === "bilik-1";
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Jadual Mahkamah', to: '/admin/jadual' }, { label: 'Acara' }]" />
    <!-- Header -->
    <div>
      <h1 class="page-title">{{ pageTitle }}</h1>
      <p class="mt-1 text-sm text-slate-500">{{ isNew ? "Cipta acara baru dalam jadual mahkamah." : "Kemaskini butiran acara mahkamah." }}</p>
    </div>

    <!-- Form -->
    <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div class="space-y-5">
        <!-- Jenis Acara -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Jenis Acara</label>
          <select
            v-model="jenisAcara"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="" disabled>Pilih jenis acara</option>
            <option v-for="opt in jenisOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>

        <!-- No. Kes -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">No. Kes</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              v-model="noKes"
              type="text"
              placeholder="Cari no. kes..."
              class="h-10 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <!-- Tarikh -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Tarikh</label>
          <input
            v-model="tarikh"
            type="date"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        <!-- Masa Mula / Tamat -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Masa Mula</label>
            <input
              v-model="masaMula"
              type="time"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Masa Tamat</label>
            <input
              v-model="masaTamat"
              type="time"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>

        <!-- Bilik Mahkamah -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Bilik Mahkamah</label>
          <select
            v-model="bilikMahkamah"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="" disabled>Pilih bilik</option>
            <option v-for="opt in bilikOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>

        <!-- Pengerusi -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-slate-700">Pengerusi</label>
          <select
            v-model="pengerusi"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="" disabled>Pilih pengerusi</option>
            <option v-for="opt in pengerusiOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>

        <!-- Conflict Check -->
        <div>
          <button
            class="inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100"
            @click="semakKonflik"
          >
            <Search class="h-4 w-4" />
            Semak Konflik
          </button>

          <div v-if="conflictChecked && conflictFound" class="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <AlertTriangle class="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <div>
              <p class="text-sm font-medium text-red-800">Konflik dikesan</p>
              <p class="mt-0.5 text-xs text-red-600">Bilik Mahkamah 1 telah dijadualkan untuk kes MP(S)/1-0207/2026 pada tarikh dan masa yang sama (09:30-11:00). Sila pilih bilik atau masa lain.</p>
            </div>
          </div>
          <div v-if="conflictChecked && !conflictFound" class="mt-3 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
            <CheckCircle class="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
            <p class="text-sm font-medium text-green-800">Tiada konflik dikesan. Jadual tersedia.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3">
      <button
        class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        @click="router.push('/admin/jadual')"
      >
        <X class="h-4 w-4" />
        Batal
      </button>
      <button class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800">
        <Save class="h-4 w-4" />
        Simpan
      </button>
    </div>
  </div>
</AdminLayout>
</template>
