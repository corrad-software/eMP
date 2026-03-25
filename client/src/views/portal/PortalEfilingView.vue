<script setup lang="ts">
import PortalLayout from "@/layouts/PortalLayout.vue";
import {
  FileText,
  Search,
  Download,
  UserPlus,
  ClipboardList,
  Upload,
  Send,
  ArrowRight,
  LogIn,
} from "lucide-vue-next";

const services = [
  {
    icon: FileText,
    titleBm: "Failkan Kes Baru",
    titleEn: "File New Case",
    descBm: "Hantar permohonan pemfailan kes baru secara dalam talian melalui sistem e-Filing.",
    descEn: "Submit a new case filing application online through the e-Filing system.",
    to: "/portal/log-masuk",
  },
  {
    icon: Search,
    titleBm: "Semak Status Pemfailan",
    titleEn: "Check Filing Status",
    descBm: "Pantau status pemfailan kes anda dan terima pemberitahuan terkini.",
    descEn: "Monitor your case filing status and receive the latest notifications.",
    to: "/portal/carian",
  },
  {
    icon: Download,
    titleBm: "Muat Turun Borang",
    titleEn: "Download Forms",
    descBm: "Muat turun borang-borang rasmi yang diperlukan untuk proses pemfailan.",
    descEn: "Download official forms required for the filing process.",
    to: "#",
  },
];

const steps = [
  {
    icon: UserPlus,
    stepBm: "Langkah 1",
    stepEn: "Step 1",
    titleBm: "Daftar Akaun",
    titleEn: "Register Account",
    descBm: "Cipta akaun pengguna e-Filing dengan maklumat yang diperlukan.",
    descEn: "Create an e-Filing user account with the required information.",
  },
  {
    icon: ClipboardList,
    stepBm: "Langkah 2",
    stepEn: "Step 2",
    titleBm: "Isi Borang",
    titleEn: "Fill in Form",
    descBm: "Lengkapkan borang pemfailan secara dalam talian dengan butiran kes.",
    descEn: "Complete the filing form online with case details.",
  },
  {
    icon: Upload,
    stepBm: "Langkah 3",
    stepEn: "Step 3",
    titleBm: "Muat Naik Dokumen",
    titleEn: "Upload Documents",
    descBm: "Muat naik dokumen sokongan yang diperlukan dalam format PDF.",
    descEn: "Upload required supporting documents in PDF format.",
  },
  {
    icon: Send,
    stepBm: "Langkah 4",
    stepEn: "Step 4",
    titleBm: "Hantar",
    titleEn: "Submit",
    descBm: "Semak dan hantar permohonan anda. Anda akan menerima nombor rujukan.",
    descEn: "Review and submit your application. You will receive a reference number.",
  },
];

const filingTypes = [
  {
    codeBm: "Seksyen 20",
    codeEn: "Section 20",
    titleBm: "Pembuangan Kerja Tidak Adil",
    titleEn: "Unjust Dismissal",
    descBm: "Permohonan representasi oleh pekerja yang dibuang kerja tanpa sebab munasabah.",
    descEn: "Representation application by a worker dismissed without just cause.",
  },
  {
    codeBm: "Seksyen 26",
    codeEn: "Section 26",
    titleBm: "Pertikaian Perdagangan",
    titleEn: "Trade Dispute",
    descBm: "Rujukan pertikaian perdagangan antara majikan dan pekerja atau kesatuan sekerja.",
    descEn: "Referral of trade disputes between employer and worker or trade union.",
  },
  {
    codeBm: "Seksyen 33",
    codeEn: "Section 33",
    titleBm: "Tafsiran Award",
    titleEn: "Interpretation of Award",
    descBm: "Permohonan tafsiran terhadap mana-mana award yang telah dikeluarkan.",
    descEn: "Application for interpretation of any award that has been issued.",
  },
  {
    codeBm: "Perjanjian Kolektif",
    codeEn: "Collective Agreement",
    titleBm: "Pendaftaran Perjanjian Kolektif",
    titleEn: "Collective Agreement Registration",
    descBm: "Pendaftaran perjanjian kolektif antara majikan dan kesatuan sekerja.",
    descEn: "Registration of collective agreement between employer and trade union.",
  },
];
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <!-- Hero -->
    <section class="relative bg-[#1a237e] py-12">
      <div class="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=300&fit=crop" alt="" class="h-full w-full object-cover opacity-10" />
      </div>
      <div class="relative mx-auto max-w-7xl px-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur">
            <FileText class="h-6 w-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-white sm:text-3xl">{{ locale === 'bm' ? 'Pemfailan Dalam Talian' : 'Online Filing' }}</h1>
            <p class="mt-0.5 text-sm text-blue-200">{{ locale === 'bm' ? 'Failkan dokumen dan permohonan kes secara dalam talian' : 'File documents and case applications online' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Cards -->
    <section class="mx-auto max-w-7xl px-4 py-12">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <router-link
          v-for="svc in services"
          :key="svc.titleBm"
          :to="svc.to"
          class="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100">
            <component :is="svc.icon" class="h-6 w-6" />
          </div>
          <h4 class="mt-4 font-semibold text-slate-900">
            {{ locale === 'bm' ? svc.titleBm : svc.titleEn }}
          </h4>
          <p class="mt-1 text-sm text-slate-500">
            {{ locale === 'bm' ? svc.descBm : svc.descEn }}
          </p>
          <div class="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600">
            {{ locale === 'bm' ? 'Selanjutnya' : 'Learn more' }}
            <ArrowRight class="h-4 w-4" />
          </div>
        </router-link>
      </div>
    </section>

    <!-- Cara Memfailkan -->
    <section class="bg-white py-12">
      <div class="mx-auto max-w-7xl px-4">
        <h3 class="text-center text-xl font-bold text-slate-900">
          {{ locale === 'bm' ? 'Cara Memfailkan' : 'How to File' }}
        </h3>
        <p class="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500">
          {{ locale === 'bm'
            ? 'Ikuti empat langkah mudah untuk memfailkan kes anda secara dalam talian.'
            : 'Follow four simple steps to file your case online.' }}
        </p>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, i) in steps"
            :key="i"
            class="relative rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
          >
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1a237e] text-white">
              <component :is="step.icon" class="h-6 w-6" />
            </div>
            <p class="mt-3 text-xs font-semibold uppercase tracking-wider text-blue-600">
              {{ locale === 'bm' ? step.stepBm : step.stepEn }}
            </p>
            <h4 class="mt-1 font-semibold text-slate-900">
              {{ locale === 'bm' ? step.titleBm : step.titleEn }}
            </h4>
            <p class="mt-2 text-sm text-slate-500">
              {{ locale === 'bm' ? step.descBm : step.descEn }}
            </p>
            <!-- Connector arrow (not on last item) -->
            <ArrowRight
              v-if="i < steps.length - 1"
              class="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-slate-300 lg:block"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Jenis Pemfailan -->
    <section class="mx-auto max-w-7xl px-4 py-12">
      <h3 class="text-xl font-bold text-slate-900">
        {{ locale === 'bm' ? 'Jenis Pemfailan' : 'Filing Types' }}
      </h3>
      <p class="mt-1 text-sm text-slate-500">
        {{ locale === 'bm'
          ? 'Senarai jenis pemfailan yang disokong oleh sistem e-Filing.'
          : 'List of filing types supported by the e-Filing system.' }}
      </p>
      <div class="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table class="w-full text-left text-sm">
          <thead class="border-b border-slate-100 bg-slate-50">
            <tr>
              <th class="px-4 py-3 font-semibold text-slate-700">
                {{ locale === 'bm' ? 'Kategori' : 'Category' }}
              </th>
              <th class="px-4 py-3 font-semibold text-slate-700">
                {{ locale === 'bm' ? 'Jenis' : 'Type' }}
              </th>
              <th class="hidden px-4 py-3 font-semibold text-slate-700 md:table-cell">
                {{ locale === 'bm' ? 'Penerangan' : 'Description' }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="ft in filingTypes" :key="ft.codeBm" class="hover:bg-slate-50">
              <td class="px-4 py-3 font-medium text-slate-900">
                {{ locale === 'bm' ? ft.codeBm : ft.codeEn }}
              </td>
              <td class="px-4 py-3 text-slate-700">
                {{ locale === 'bm' ? ft.titleBm : ft.titleEn }}
              </td>
              <td class="hidden px-4 py-3 text-slate-500 md:table-cell">
                {{ locale === 'bm' ? ft.descBm : ft.descEn }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-slate-50 py-12">
      <div class="mx-auto max-w-7xl px-4 text-center">
        <h3 class="text-xl font-bold text-slate-900">
          {{ locale === 'bm' ? 'Bersedia untuk Memfailkan?' : 'Ready to File?' }}
        </h3>
        <p class="mx-auto mt-2 max-w-lg text-sm text-slate-500">
          {{ locale === 'bm'
            ? 'Log masuk ke akaun anda untuk memulakan proses pemfailan kes secara dalam talian.'
            : 'Log in to your account to start the online case filing process.' }}
        </p>
        <router-link
          to="/portal/log-masuk"
          class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1a237e] px-6 py-3 font-medium text-white transition hover:bg-[#283593]"
        >
          <LogIn class="h-5 w-5" />
          {{ locale === 'bm' ? 'Log Masuk untuk Memfailkan' : 'Log In to File' }}
        </router-link>
      </div>
    </section>
  </PortalLayout>
</template>
