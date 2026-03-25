<script setup lang="ts">
import { ref } from "vue";
import PortalLayout from "@/layouts/PortalLayout.vue";
import { Search } from "lucide-vue-next";

const searchQuery = ref("");

const caList = [
  { no: "CA/2025/0012", majikan: "Syarikat Elektrik Sdn Bhd", kesatuan: "Kesatuan Pekerja Elektrik", industri: "Pembuatan", tarikhDaftar: "2025-11-15" },
  { no: "CA/2025/0034", majikan: "Hotel Majestic Kuala Lumpur", kesatuan: "Kesatuan Pekerja Hotel", industri: "Perhotelan", tarikhDaftar: "2025-12-03" },
  { no: "CA/2026/0001", majikan: "Bank Perdagangan Malaysia Bhd", kesatuan: "Kesatuan Pekerja Bank", industri: "Kewangan", tarikhDaftar: "2026-01-10" },
  { no: "CA/2026/0008", majikan: "Kilang Tekstil Utara Sdn Bhd", kesatuan: "Kesatuan Pekerja Tekstil", industri: "Tekstil", tarikhDaftar: "2026-01-28" },
  { no: "CA/2026/0015", majikan: "Pengangkutan Cepat Sdn Bhd", kesatuan: "Kesatuan Pekerja Pengangkutan", industri: "Pengangkutan", tarikhDaftar: "2026-02-14" },
  { no: "CA/2026/0022", majikan: "Ladang Kelapa Sawit Timur Bhd", kesatuan: "Kesatuan Pekerja Ladang", industri: "Perladangan", tarikhDaftar: "2026-03-05" },
];
</script>

<template>
  <PortalLayout v-slot="{ locale }">
    <section class="bg-gradient-to-br from-[#1a237e] to-[#283593] py-12 text-white">
      <div class="mx-auto max-w-6xl px-4 text-center">
        <h2 class="text-3xl font-bold">{{ locale === 'bm' ? 'Perjanjian Kolektif Berdaftar' : 'Registered Collective Agreements' }}</h2>
        <p class="mt-2 text-blue-200">
          {{ locale === 'bm' ? 'Senarai perjanjian kolektif yang telah didaftarkan di Mahkamah Perusahaan' : 'List of collective agreements registered at the Industrial Court' }}
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12">
      <!-- Search -->
      <div class="mb-6 flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="locale === 'bm' ? 'Cari mengikut nombor CA, nama majikan, atau kesatuan...' : 'Search by CA number, employer name, or union...'"
          class="flex-1 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
        />
        <button class="bg-[#1a237e] px-5 text-white transition hover:bg-[#283593]">
          <Search class="h-5 w-5" />
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50">
                <th class="px-4 py-3 text-left font-semibold text-slate-600">{{ locale === 'bm' ? 'No. CA' : 'CA No.' }}</th>
                <th class="px-4 py-3 text-left font-semibold text-slate-600">{{ locale === 'bm' ? 'Majikan' : 'Employer' }}</th>
                <th class="px-4 py-3 text-left font-semibold text-slate-600">{{ locale === 'bm' ? 'Kesatuan' : 'Union' }}</th>
                <th class="px-4 py-3 text-left font-semibold text-slate-600">{{ locale === 'bm' ? 'Industri' : 'Industry' }}</th>
                <th class="px-4 py-3 text-left font-semibold text-slate-600">{{ locale === 'bm' ? 'Tarikh Daftar' : 'Registration Date' }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ca in caList"
                :key="ca.no"
                class="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td class="px-4 py-3 font-medium text-blue-700">{{ ca.no }}</td>
                <td class="px-4 py-3 text-slate-900">{{ ca.majikan }}</td>
                <td class="px-4 py-3 text-slate-600">{{ ca.kesatuan }}</td>
                <td class="px-4 py-3 text-slate-600">{{ ca.industri }}</td>
                <td class="px-4 py-3 text-slate-500">{{ ca.tarikhDaftar }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
          {{ locale === 'bm' ? 'Menunjukkan 6 daripada 6 rekod' : 'Showing 6 of 6 records' }}
        </div>
      </div>
    </section>
  </PortalLayout>
</template>
