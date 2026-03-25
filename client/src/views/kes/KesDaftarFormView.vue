<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  ArrowLeft,
  Search,
  UserCheck,
  ClipboardList,
  Users,
  FileText,
  CheckCircle2,
  Save,
  Send,
} from "lucide-vue-next";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const router = useRouter();

const jppmRef = ref("");
const jppmLookedUp = ref(false);

const form = ref({
  claimantName: "",
  claimantIc: "",
  claimantAddress: "",
  claimantEmail: "",
  claimantPhone: "",
  respondentCompany: "",
  respondentRegNo: "",
  respondentAddress: "",
  respondentEmail: "",
  caseType: "",
  subject: "",
  description: "",
  priority: "normal",
  selectedChairman: "",
});

function lookupJppm() {
  jppmLookedUp.value = true;
  jppmRef.value = "JPPM/2026/0239";
  form.value.claimantName = "Mohd Faizal bin Abdullah";
  form.value.claimantIc = "880512-10-5523";
  form.value.claimantAddress = "No. 45, Jalan Merdeka 3, Taman Sentosa, 43000 Kajang, Selangor";
  form.value.claimantEmail = "faizal.abdullah@email.com";
  form.value.claimantPhone = "012-3456789";
  form.value.respondentCompany = "TechVision Sdn Bhd";
  form.value.respondentRegNo = "201901025678";
  form.value.respondentAddress = "Lot 12, Kawasan Perindustrian Bangi, 43650 Bandar Baru Bangi, Selangor";
  form.value.respondentEmail = "hr@techvision.com.my";
}

const chairmanOptions = [
  { id: "chairman-1", name: "YA Tuan Mohd Rizal", activeCases: 12, completed: 48, avgDays: 138 },
  { id: "chairman-2", name: "YA Puan Siti Aminah", activeCases: 8, completed: 52, avgDays: 125 },
  { id: "chairman-3", name: "YA Tuan Kamal Ariffin", activeCases: 15, completed: 41, avgDays: 152 },
];
</script>

<template>
  <AdminLayout>
    <div class="mx-auto max-w-7xl space-y-4">
      <AppBreadcrumb :items="[{ label: 'Pendaftaran Kes', to: '/admin/kes/daftar' }, { label: 'Daftar Kes Baru' }]" />
      <!-- ───── Title ───── -->
      <div class="flex items-center gap-3">
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 shadow-sm transition-colors hover:bg-slate-50"
          @click="router.push('/admin/kes/daftar')"
        >
          <ArrowLeft class="h-4 w-4" />
        </button>
        <h1 class="page-title">Daftar Kes Baru</h1>
      </div>

      <!-- ═══════ RUJUKAN JPPM ═══════ -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Search class="h-4 w-4 text-blue-600" />
          <h2 class="text-sm font-semibold text-slate-900">Rujukan JPPM</h2>
        </div>
        <div class="space-y-3 p-4">
          <div class="flex items-end gap-3">
            <div class="max-w-sm space-y-1.5">
              <label class="text-sm font-medium text-slate-700">No. Rujukan JPPM</label>
              <input
                v-model="jppmRef"
                type="text"
                placeholder="Cth: JPPM/2026/0239"
                class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>
            <button
              class="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
              @click="lookupJppm"
            >
              <Search class="h-4 w-4" />
              Semak
            </button>
          </div>

          <div v-if="jppmLookedUp" class="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
            <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div class="text-sm text-emerald-900">
              <p class="mb-2 font-semibold">Rujukan ditemui — maklumat telah diisi secara automatik</p>
              <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-slate-600">
                <div><span class="font-medium text-slate-700">No. Rujukan:</span> {{ jppmRef }}</div>
                <div><span class="font-medium text-slate-700">Tarikh Terima:</span> 20 Mac 2026</div>
                <div><span class="font-medium text-slate-700">Jenis Aduan:</span> Pembuangan Kerja</div>
                <div><span class="font-medium text-slate-700">Status JPPM:</span> Selesai Siasatan</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- ═══════ MAKLUMAT PIHAK ═══════ -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <Users class="h-4 w-4 text-violet-600" />
          <h2 class="text-sm font-semibold text-slate-900">Maklumat Pihak</h2>
        </div>
        <div class="p-4">
          <div class="grid gap-4 lg:grid-cols-2">
            <!-- Penuntut -->
            <div>
              <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Penuntut (Claimant)</p>
              <div class="space-y-3">
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-slate-700">Nama Penuh</label>
                  <input v-model="form.claimantName" type="text" placeholder="Nama penuh penuntut" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div class="space-y-1.5">
                    <label class="text-sm font-medium text-slate-700">No. Kad Pengenalan</label>
                    <input v-model="form.claimantIc" type="text" placeholder="000000-00-0000" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-sm font-medium text-slate-700">No. Telefon</label>
                    <input v-model="form.claimantPhone" type="text" placeholder="012-0000000" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-slate-700">E-mel</label>
                  <input v-model="form.claimantEmail" type="email" placeholder="emel@contoh.com" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-slate-700">Alamat</label>
                  <textarea v-model="form.claimantAddress" rows="2" placeholder="Alamat penuh" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
              </div>
            </div>

            <!-- Responden -->
            <div>
              <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Responden (Respondent)</p>
              <div class="space-y-3">
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-slate-700">Nama Syarikat</label>
                  <input v-model="form.respondentCompany" type="text" placeholder="Nama penuh syarikat" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div class="space-y-1.5">
                    <label class="text-sm font-medium text-slate-700">No. Pendaftaran</label>
                    <input v-model="form.respondentRegNo" type="text" placeholder="201901025678" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                  </div>
                  <div class="space-y-1.5">
                    <label class="text-sm font-medium text-slate-700">E-mel Syarikat</label>
                    <input v-model="form.respondentEmail" type="email" placeholder="hr@syarikat.com" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                  </div>
                </div>
                <div class="space-y-1.5">
                  <label class="text-sm font-medium text-slate-700">Alamat Syarikat</label>
                  <textarea v-model="form.respondentAddress" rows="2" placeholder="Alamat penuh syarikat" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- ═══════ BUTIRAN KES ═══════ -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <FileText class="h-4 w-4 text-amber-600" />
          <h2 class="text-sm font-semibold text-slate-900">Butiran Kes</h2>
        </div>
        <div class="space-y-3 p-4">
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-slate-700">Jenis Kes</label>
              <select v-model="form.caseType" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200">
                <option value="">— Pilih Jenis Kes —</option>
                <option value="unfair-dismissal">Pembuangan Kerja Tidak Adil</option>
                <option value="trade-dispute">Pertikaian Perdagangan</option>
                <option value="collective-agreement">Perjanjian Kolektif</option>
                <option value="non-compliance">Ketidakpatuhan Award</option>
                <option value="other">Lain-lain</option>
              </select>
            </div>
            <div class="space-y-1.5">
              <label class="text-sm font-medium text-slate-700">Keutamaan</label>
              <select v-model="form.priority" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200">
                <option value="normal">Biasa</option>
                <option value="urgent">Segera</option>
              </select>
            </div>
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-medium text-slate-700">Perkara</label>
            <input v-model="form.subject" type="text" placeholder="Tajuk ringkas kes" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-medium text-slate-700">Keterangan</label>
            <textarea v-model="form.description" rows="4" placeholder="Huraian lanjut mengenai kes..." class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200" />
          </div>
        </div>
      </article>

      <!-- ═══════ CADANGAN AGIHAN ═══════ -->
      <article class="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
          <ClipboardList class="h-4 w-4 text-emerald-600" />
          <h2 class="text-sm font-semibold text-slate-900">Cadangan Agihan</h2>
          <span class="ml-1 text-xs text-slate-400">Berdasarkan beban kerja semasa</span>
        </div>
        <div class="space-y-2 p-4">
          <label
            v-for="ch in chairmanOptions"
            :key="ch.id"
            class="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all"
            :class="form.selectedChairman === ch.id ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
          >
            <input
              v-model="form.selectedChairman"
              type="radio"
              :value="ch.id"
              class="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-200"
            />
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
              <UserCheck class="h-4 w-4 text-slate-600" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-slate-900">{{ ch.name }}</p>
              <div class="mt-0.5 flex gap-3 text-xs text-slate-500">
                <span>{{ ch.activeCases }} kes aktif</span>
                <span>{{ ch.completed }} selesai</span>
                <span>Purata {{ ch.avgDays }} hari</span>
              </div>
            </div>
            <span
              v-if="ch.activeCases <= 10"
              class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
            >
              Disyorkan
            </span>
          </label>
        </div>
      </article>

      <!-- ═══════ ACTIONS ═══════ -->
      <div class="flex items-center justify-end gap-2 pb-6">
        <button
          class="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:bg-slate-50"
        >
          <Save class="h-4 w-4" />
          Simpan Draf
        </button>
        <button
          class="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
        >
          <Send class="h-4 w-4" />
          Hantar untuk Kelulusan
        </button>
      </div>
    </div>
  </AdminLayout>
</template>
