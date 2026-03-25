<script setup lang="ts">
import { ref } from "vue";
import { CheckCircle, ChevronLeft, ChevronRight, Send, Users, FileSearch, FileUp, ClipboardCheck } from "lucide-vue-next";
import AppWizardStepper from "@/components/AppWizardStepper.vue";
import AppFileUpload from "@/components/AppFileUpload.vue";
import type { WizardStep } from "@/components/AppWizardStepper.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const currentStep = ref(0);

const steps: WizardStep[] = [
  { id: "pihak", label: "Maklumat Pihak" },
  { id: "kes", label: "Butiran Kes" },
  { id: "dokumen", label: "Dokumen Sokongan" },
  { id: "semakan", label: "Semakan" },
  { id: "hantar", label: "Penghantaran" },
];

// --- Form data ---
const claimant = ref({
  name: "",
  ic: "",
  address: "",
  email: "",
  phone: "",
});

const respondent = ref({
  companyName: "",
  regNo: "",
  address: "",
});

const caseDetails = ref({
  caseType: "",
  subject: "",
  description: "",
  priority: "normal" as "normal" | "urgent",
});

const caseTypeOptions = [
  { value: "unfair-dismissal", label: "Pembuangan Tidak Adil" },
  { value: "trade-dispute", label: "Pertikaian Perdagangan" },
  { value: "collective-agreement", label: "Perjanjian Kolektif" },
  { value: "non-compliance", label: "Ketidakpatuhan Award" },
  { value: "other", label: "Lain-lain" },
];

const generatedRef = "EF-2026-000152";

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

function submitFiling() {
  // Mock submission - go to confirmation step
  currentStep.value = 4;
}

function getCaseTypeLabel(value: string): string {
  return caseTypeOptions.find((o) => o.value === value)?.label ?? value;
}
</script>

<template>
<AdminLayout>
  <div class="mx-auto max-w-7xl space-y-4">
    <AppBreadcrumb :items="[{ label: 'e-Filing', to: '/admin/efiling' }, { label: 'Pemfailan Baru' }]" />
    <!-- Header -->
    <div>
      <h1 class="page-title">Pemfailan Baru</h1>
      <p class="mt-1 text-sm text-slate-500">Lengkapkan semua langkah untuk menghantar pemfailan anda</p>
    </div>

    <!-- Wizard Stepper -->
    <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <AppWizardStepper :steps="steps" :current-step="currentStep" @step-click="currentStep = $event" />
    </div>

    <!-- Step 1: Maklumat Pihak -->
    <article v-if="currentStep === 0" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <Users class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Maklumat Pihak</h2>
      </div>
      <div class="space-y-3 p-4">
        <!-- Claimant -->
        <div class="mb-8">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Pihak Menuntut (Pemohon)</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Nama Penuh</label>
              <input v-model="claimant.name" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="Nama penuh seperti dalam KP" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">No. Kad Pengenalan</label>
              <input v-model="claimant.ic" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="000000-00-0000" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
              <textarea v-model="claimant.address" rows="2" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="Alamat penuh" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">E-mel</label>
              <input v-model="claimant.email" type="email" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="emel@contoh.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">No. Telefon</label>
              <input v-model="claimant.phone" type="tel" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="012-3456789" />
            </div>
          </div>
        </div>

        <!-- Respondent -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">Pihak Menentang (Responden)</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Nama Syarikat</label>
              <input v-model="respondent.companyName" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="Nama penuh syarikat" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">No. Pendaftaran Syarikat</label>
              <input v-model="respondent.regNo" type="text" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="201901000000 (0000000-X)" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-slate-700 mb-1">Alamat Syarikat</label>
              <textarea v-model="respondent.address" rows="2" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="Alamat berdaftar syarikat" />
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Step 2: Butiran Kes -->
    <article v-if="currentStep === 1" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <FileSearch class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Butiran Kes</h2>
      </div>
      <div class="space-y-4 p-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Jenis Kes</label>
          <select v-model="caseDetails.caseType" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200">
            <option value="" disabled>Pilih jenis kes</option>
            <option v-for="opt in caseTypeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Tajuk / Subjek</label>
          <textarea v-model="caseDetails.subject" rows="2" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="Ringkasan tajuk kes" />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Huraian Kes</label>
          <textarea v-model="caseDetails.description" rows="4" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200" placeholder="Huraikan kronologi kes secara terperinci" />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Keutamaan</label>
          <div class="flex gap-6">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="caseDetails.priority" type="radio" value="normal" class="h-4 w-4 border-slate-300 text-blue-600 focus:ring-slate-200" />
              <span class="text-sm text-slate-700">Normal</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="caseDetails.priority" type="radio" value="urgent" class="h-4 w-4 border-slate-300 text-blue-600 focus:ring-slate-200" />
              <span class="text-sm text-slate-700">Segera</span>
            </label>
          </div>
        </div>
      </div>
    </article>

    <!-- Step 3: Dokumen Sokongan -->
    <article v-if="currentStep === 2" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <FileUp class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Dokumen Sokongan</h2>
      </div>
      <div class="space-y-3 p-4">
        <p class="text-sm text-slate-500">Muat naik dokumen berkaitan seperti surat tawaran, surat penamatan, payslip, dan lain-lain.</p>
        <AppFileUpload accept=".pdf,.doc,.docx" :max-size-mb="10" multiple />
      </div>
    </article>

    <!-- Step 4: Semakan -->
    <article v-if="currentStep === 3" class="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <ClipboardCheck class="h-4 w-4 text-blue-600" />
        <h2 class="text-sm font-semibold text-slate-900">Semakan Maklumat</h2>
      </div>
      <div class="space-y-3 p-4">
        <p class="text-sm text-slate-500">Sila semak semua maklumat sebelum menghantar pemfailan anda.</p>

        <!-- Claimant summary -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Pihak Menuntut</h3>
          <div class="rounded-lg bg-slate-50 p-4 space-y-2">
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Nama:</span><span class="text-slate-900">{{ claimant.name || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">No. KP:</span><span class="text-slate-900">{{ claimant.ic || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Alamat:</span><span class="text-slate-900">{{ claimant.address || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">E-mel:</span><span class="text-slate-900">{{ claimant.email || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">No. Telefon:</span><span class="text-slate-900">{{ claimant.phone || '-' }}</span></div>
          </div>
        </div>

        <!-- Respondent summary -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Pihak Menentang</h3>
          <div class="rounded-lg bg-slate-50 p-4 space-y-2">
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Syarikat:</span><span class="text-slate-900">{{ respondent.companyName || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">No. Pendaftaran:</span><span class="text-slate-900">{{ respondent.regNo || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Alamat:</span><span class="text-slate-900">{{ respondent.address || '-' }}</span></div>
          </div>
        </div>

        <!-- Case details summary -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Butiran Kes</h3>
          <div class="rounded-lg bg-slate-50 p-4 space-y-2">
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Jenis Kes:</span><span class="text-slate-900">{{ getCaseTypeLabel(caseDetails.caseType) || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Subjek:</span><span class="text-slate-900">{{ caseDetails.subject || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Huraian:</span><span class="text-slate-900">{{ caseDetails.description || '-' }}</span></div>
            <div class="flex gap-2 text-sm"><span class="w-36 shrink-0 font-medium text-slate-500">Keutamaan:</span><span class="text-slate-900">{{ caseDetails.priority === 'urgent' ? 'Segera' : 'Normal' }}</span></div>
          </div>
        </div>
      </div>
    </article>

    <!-- Step 5: Penghantaran (Success) -->
    <article v-if="currentStep === 4" class="rounded-lg border border-slate-200 bg-white p-8 shadow-sm text-center">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle class="h-10 w-10 text-emerald-600" />
      </div>
      <h2 class="mt-4 text-xl font-bold text-slate-900">Pemfailan Berjaya Dihantar</h2>
      <p class="mt-2 text-sm text-slate-500">Pemfailan anda telah diterima dan akan disemak oleh Pendaftar.</p>
      <div class="mt-6 rounded-lg bg-slate-50 p-4 inline-block">
        <p class="text-sm text-slate-500">No. Rujukan Pemfailan</p>
        <p class="mt-1 text-2xl font-bold text-blue-600">{{ generatedRef }}</p>
      </div>
      <p class="mt-6 text-xs text-slate-400">Anda akan menerima e-mel pengesahan di alamat e-mel yang didaftarkan.</p>
      <div class="mt-6">
        <router-link to="/admin/efiling" class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
          Kembali ke Senarai
        </router-link>
      </div>
    </article>

    <!-- Navigation Buttons -->
    <div v-if="currentStep < 4" class="flex items-center justify-between">
      <button
        v-if="currentStep > 0"
        class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
        @click="prevStep"
      >
        <ChevronLeft class="h-4 w-4" />
        Sebelumnya
      </button>
      <div v-else />

      <button
        v-if="currentStep < 3"
        class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
        @click="nextStep"
      >
        Seterusnya
        <ChevronRight class="h-4 w-4" />
      </button>
      <button
        v-else-if="currentStep === 3"
        class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
        @click="submitFiling"
      >
        <Send class="h-4 w-4" />
        Hantar
      </button>
    </div>
  </div>
</AdminLayout>
</template>
