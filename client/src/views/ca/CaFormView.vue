<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft, Save, Send, Building2, Users, FileSignature, Paperclip } from "lucide-vue-next";
import AppFileUpload from "@/components/AppFileUpload.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const router = useRouter();

const form = ref({
  companyName: "",
  companyRegNo: "",
  industry: "",
  companyAddress: "",
  unionName: "",
  unionRegNo: "",
  unionAddress: "",
  effectiveFrom: "",
  effectiveTo: "",
  description: "",
});

const industryOptions = [
  "Elektronik",
  "Minyak & Gas",
  "Perhotelan",
  "Penerbangan",
  "Tekstil",
  "Perbankan",
  "Perkilangan",
  "Pembinaan",
  "Perladangan",
  "Telekomunikasi",
  "Pengangkutan",
  "Lain-lain",
];
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'Perjanjian Kolektif', to: '/admin/kes/ca' }, { label: 'Daftar CA Baru' }]" />
    <!-- Header -->
    <div class="flex items-start gap-3">
      <button
        class="mt-1 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
        @click="router.push('/admin/kes/ca')"
      >
        <ArrowLeft class="h-4 w-4" />
      </button>
      <div>
        <h1 class="page-title">Daftar Perjanjian Kolektif Baru</h1>
        <p class="mt-1 text-sm text-slate-500">Isi maklumat untuk mendaftarkan perjanjian kolektif baru.</p>
      </div>
    </div>

    <form class="mx-auto max-w-7xl space-y-4" @submit.prevent>
      <!-- Maklumat Majikan -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Building2 class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Maklumat Majikan</h2>
        </div>
        <div class="space-y-3 p-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="companyName" class="text-sm font-medium text-slate-700">Nama Syarikat</label>
            <input
              id="companyName"
              v-model="form.companyName"
              type="text"
              placeholder="Nama penuh syarikat"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label for="companyRegNo" class="text-sm font-medium text-slate-700">No. Pendaftaran Syarikat</label>
            <input
              id="companyRegNo"
              v-model="form.companyRegNo"
              type="text"
              placeholder="cth. 200501018765"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label for="industry" class="text-sm font-medium text-slate-700">Industri</label>
            <select
              id="industry"
              v-model="form.industry"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            >
              <option value="" disabled>Pilih industri</option>
              <option v-for="opt in industryOptions" :key="opt" :value="opt">{{ opt }}</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label for="companyAddress" class="text-sm font-medium text-slate-700">Alamat</label>
            <textarea
              id="companyAddress"
              v-model="form.companyAddress"
              rows="2"
              placeholder="Alamat penuh syarikat"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
        </div>
      </article>

      <!-- Maklumat Kesatuan -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Users class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Maklumat Kesatuan</h2>
        </div>
        <div class="space-y-3 p-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="unionName" class="text-sm font-medium text-slate-700">Nama Kesatuan</label>
            <input
              id="unionName"
              v-model="form.unionName"
              type="text"
              placeholder="Nama penuh kesatuan sekerja"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label for="unionRegNo" class="text-sm font-medium text-slate-700">No. Pendaftaran Kesatuan</label>
            <input
              id="unionRegNo"
              v-model="form.unionRegNo"
              type="text"
              placeholder="cth. KS-1234"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label class="text-sm font-medium text-slate-700">&nbsp;</label>
            <div class="h-10" />
          </div>
          <div class="sm:col-span-2">
            <label for="unionAddress" class="text-sm font-medium text-slate-700">Alamat</label>
            <textarea
              id="unionAddress"
              v-model="form.unionAddress"
              rows="2"
              placeholder="Alamat penuh kesatuan sekerja"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
        </div>
      </article>

      <!-- Butiran Perjanjian -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <FileSignature class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Butiran Perjanjian</h2>
        </div>
        <div class="space-y-3 p-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label for="effectiveFrom" class="text-sm font-medium text-slate-700">Tarikh Mula Kuat Kuasa</label>
            <input
              id="effectiveFrom"
              v-model="form.effectiveFrom"
              type="date"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div>
            <label for="effectiveTo" class="text-sm font-medium text-slate-700">Tarikh Tamat Kuat Kuasa</label>
            <input
              id="effectiveTo"
              v-model="form.effectiveTo"
              type="date"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors text-slate-700 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="description" class="text-sm font-medium text-slate-700">Keterangan</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              placeholder="Ringkasan perjanjian kolektif..."
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </div>
        </div>
      </article>

      <!-- Dokumen Sokongan -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Paperclip class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Dokumen Sokongan</h2>
        </div>
        <div class="space-y-3 p-4">
          <AppFileUpload accept=".pdf" :max-size-mb="20" multiple />
        </div>
      </article>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          @click="router.push('/admin/kes/ca')"
        >
          Batal
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <Save class="h-4 w-4" />
          Simpan Draf
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-800"
        >
          <Send class="h-4 w-4" />
          Hantar
        </button>
      </div>
    </form>
  </div>
</AdminLayout>
</template>
