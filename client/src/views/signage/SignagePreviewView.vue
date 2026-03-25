<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { X } from "lucide-vue-next";

const router = useRouter();

const currentTime = ref(new Date().toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
const currentDate = ref(new Date().toLocaleDateString("ms-MY", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));

let timer: ReturnType<typeof setInterval>;
onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }, 1000);
});
onUnmounted(() => clearInterval(timer));

const hearings = [
  { time: "09:00", caseNo: "MP(S)/1-0201/2026", parties: "Ahmad bin Ismail lwn. ABC Sdn Bhd", type: "Sebutan", room: "Bilik 1", chairman: "YA Tuan Mohd Rizal" },
  { time: "09:30", caseNo: "MP(S)/1-0207/2026", parties: "Global Tech Sdn Bhd lwn. KPKM", type: "Perbicaraan", room: "Bilik 2", chairman: "YA Puan Siti Aminah" },
  { time: "10:00", caseNo: "MP(S)/1-0202/2026", parties: "Syarikat XYZ Sdn Bhd lwn. Kesatuan Pekerja", type: "Sebutan", room: "Bilik 1", chairman: "YA Tuan Mohd Rizal" },
  { time: "10:30", caseNo: "MP(S)/1-0205/2026", parties: "Kesatuan Pekerja Elektronik lwn. ElectroCorp", type: "Mediasi", room: "Bilik Mediasi", chairman: "YA Tuan Kamal Ariffin" },
  { time: "14:00", caseNo: "MP(S)/1-0203/2026", parties: "Lim Wei Shen lwn. Mega Industries Sdn Bhd", type: "Perbicaraan", room: "Bilik 2", chairman: "YA Puan Siti Aminah" },
  { time: "14:30", caseNo: "MP(S)/1-0208/2026", parties: "Tan Boon Keat lwn. TechVenture Sdn Bhd", type: "Sebutan", room: "Bilik 1", chairman: "YA Tuan Kamal Ariffin" },
];

const tickerText = "PENGUMUMAN: Sesi mahkamah bermula pada 9:00 pagi. Semua pihak diminta hadir 15 minit lebih awal. | Perkhidmatan kaunter pendaftaran dibuka 8:30 pagi - 4:30 petang. | Sistem e-Filing kini boleh diakses melalui portal rasmi Mahkamah Perusahaan.";

const typeColor: Record<string, string> = {
  Sebutan: "text-blue-300",
  Perbicaraan: "text-violet-300",
  Mediasi: "text-emerald-300",
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex flex-col bg-slate-900">
    <!-- Close Button -->
    <button
      class="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
      @click="router.back()"
    >
      <X class="h-5 w-5" />
    </button>

    <!-- Header Strip -->
    <div class="flex items-center justify-between bg-gradient-to-r from-blue-900 to-blue-800 px-8 py-4">
      <div class="flex items-center gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <span class="text-xl font-bold text-yellow-400">MP</span>
        </div>
        <div>
          <h1 class="text-lg font-bold text-white">Mahkamah Perusahaan Malaysia</h1>
          <p class="text-xs text-blue-200">Industrial Court of Malaysia</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold tabular-nums text-white">{{ currentTime }}</p>
        <p class="text-xs text-blue-200">{{ currentDate }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-auto p-6">
      <h2 class="mb-4 text-center text-lg font-semibold text-blue-300">Jadual Perbicaraan Hari Ini</h2>
      <table class="w-full">
        <thead>
          <tr class="border-b border-blue-800/60">
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-400">Masa</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-400">No. Kes</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-400">Pihak-Pihak</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-400">Jenis</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-400">Bilik</th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-blue-400">Pengerusi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(h, i) in hearings" :key="i" class="border-b border-blue-900/40" :class="i % 2 === 0 ? 'bg-blue-950/30' : ''">
            <td class="px-4 py-3 text-sm font-semibold tabular-nums text-white">{{ h.time }}</td>
            <td class="px-4 py-3 text-sm font-medium text-yellow-300">{{ h.caseNo }}</td>
            <td class="px-4 py-3 text-sm text-slate-200">{{ h.parties }}</td>
            <td class="px-4 py-3 text-sm font-medium" :class="typeColor[h.type] ?? 'text-slate-300'">{{ h.type }}</td>
            <td class="px-4 py-3 text-sm text-slate-300">{{ h.room }}</td>
            <td class="px-4 py-3 text-sm text-slate-300">{{ h.chairman }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bottom Ticker -->
    <div class="overflow-hidden bg-blue-950 py-2.5">
      <div class="animate-marquee whitespace-nowrap">
        <span class="mx-8 text-sm text-blue-200">{{ tickerText }}</span>
        <span class="mx-8 text-sm text-blue-200">{{ tickerText }}</span>
      </div>
    </div>

    <style scoped>
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: inline-block;
        animation: marquee 30s linear infinite;
      }
    </style>
  </div>
</template>
