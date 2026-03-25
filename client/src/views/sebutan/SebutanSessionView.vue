<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { Send, Clock, Plus, Square, Users } from "lucide-vue-next";
import AppStatusBadge from "@/components/AppStatusBadge.vue";
import AppChatMessage from "@/components/AppChatMessage.vue";
import type { MentionMessage } from "@/types";
import AdminLayout from "@/layouts/AdminLayout.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const route = useRoute();
const sessionId = Number(route.params.id);

const newMessage = ref("");
const elapsedSeconds = ref(1380); // ~23 minutes elapsed
let timerInterval: ReturnType<typeof setInterval> | null = null;

const caseNo = "MP-KL-2026-0045";
const sessionStatus = "in-progress";

const participants = ref([
  { name: "YA Tuan Hakim Azman", role: "Pengerusi", present: true },
  { name: "Ahmad bin Ismail", role: "Pihak Menuntut", present: true },
  { name: "Puan Faridah (Tetuan ABC)", role: "Peguam Pihak Menuntut", present: true },
  { name: "Syarikat XYZ Sdn Bhd", role: "Pihak Menentang", present: true },
  { name: "En. Ravi (Tetuan DEF)", role: "Peguam Pihak Menentang", present: false },
]);

const messages = ref<MentionMessage[]>([
  { id: 1, mentionSessionId: sessionId, senderName: "Sistem", senderRole: "", content: "Sesi sebutan telah dimulakan.", type: "system", sentAt: "09:02" },
  { id: 2, mentionSessionId: sessionId, senderName: "Sistem", senderRole: "", content: "YA Tuan Hakim Azman telah memasuki sesi.", type: "system", sentAt: "09:02" },
  { id: 3, mentionSessionId: sessionId, senderName: "Sistem", senderRole: "", content: "Ahmad bin Ismail telah memasuki sesi.", type: "system", sentAt: "09:03" },
  { id: 4, mentionSessionId: sessionId, senderName: "Sistem", senderRole: "", content: "Puan Faridah (Tetuan ABC) telah memasuki sesi.", type: "system", sentAt: "09:03" },
  { id: 5, mentionSessionId: sessionId, senderName: "YA Tuan Hakim Azman", senderRole: "Pengerusi", content: "Selamat pagi semua. Sesi sebutan untuk kes MP-KL-2026-0045 kini dimulakan. Sila sahkan kehadiran pihak-pihak.", type: "message", sentAt: "09:04" },
  { id: 6, mentionSessionId: sessionId, senderName: "Puan Faridah (Tetuan ABC)", senderRole: "Peguam Pihak Menuntut", content: "Selamat pagi YA. Saya Puan Faridah daripada Tetuan ABC & Associates, mewakili pihak menuntut Ahmad bin Ismail. Pihak menuntut hadir.", type: "message", sentAt: "09:05" },
  { id: 7, mentionSessionId: sessionId, senderName: "Sistem", senderRole: "", content: "Syarikat XYZ Sdn Bhd telah memasuki sesi.", type: "system", sentAt: "09:06" },
  { id: 8, mentionSessionId: sessionId, senderName: "Syarikat XYZ Sdn Bhd", senderRole: "Pihak Menentang", content: "Selamat pagi YA. Pihak menentang hadir. Peguam kami En. Ravi belum dapat menyertai kerana masalah teknikal.", type: "message", sentAt: "09:07" },
  { id: 9, mentionSessionId: sessionId, senderName: "YA Tuan Hakim Azman", senderRole: "Pengerusi", content: "Dimaklumkan. Kita akan teruskan. Adakah pihak menuntut telah memfailkan penyata tuntutan?", type: "message", sentAt: "09:08" },
  { id: 10, mentionSessionId: sessionId, senderName: "Puan Faridah (Tetuan ABC)", senderRole: "Peguam Pihak Menuntut", content: "Ya YA, penyata tuntutan telah difailkan pada 10 Mac 2026. Bersama dokumen sokongan.", type: "message", sentAt: "09:10" },
  { id: 11, mentionSessionId: sessionId, senderName: "YA Tuan Hakim Azman", senderRole: "Pengerusi", content: "Pihak menentang diarahkan memfailkan penyata jawapan dalam tempoh 14 hari daripada tarikh hari ini.", type: "decision", sentAt: "09:15" },
  { id: 12, mentionSessionId: sessionId, senderName: "Syarikat XYZ Sdn Bhd", senderRole: "Pihak Menentang", content: "Difahami YA. Kami akan memfailkan dalam tempoh tersebut.", type: "message", sentAt: "09:16" },
  { id: 13, mentionSessionId: sessionId, senderName: "YA Tuan Hakim Azman", senderRole: "Pengerusi", content: "Tarikh sebutan seterusnya ditetapkan pada 22 April 2026, jam 9:00 pagi.", type: "decision", sentAt: "09:20" },
  { id: 14, mentionSessionId: sessionId, senderName: "Puan Faridah (Tetuan ABC)", senderRole: "Peguam Pihak Menuntut", content: "Terima kasih YA. Dicatat.", type: "message", sentAt: "09:21" },
]);

const decisions = ref<string[]>([
  "Pihak menentang diarahkan memfailkan penyata jawapan dalam tempoh 14 hari.",
  "Tarikh sebutan seterusnya: 22 April 2026, 9:00 pagi.",
]);

const newDecision = ref("");
const showDecisionInput = ref(false);

function formatTimer(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function handleSendMessage() {
  if (!newMessage.value.trim()) return;
  const msg: MentionMessage = {
    id: messages.value.length + 1,
    mentionSessionId: sessionId,
    senderName: "YA Tuan Hakim Azman",
    senderRole: "Pengerusi",
    content: newMessage.value.trim(),
    type: "message",
    sentAt: new Date().toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" }),
  };
  messages.value.push(msg);
  newMessage.value = "";
}

function handleAddDecision() {
  if (!newDecision.value.trim()) return;
  decisions.value.push(newDecision.value.trim());
  const msg: MentionMessage = {
    id: messages.value.length + 1,
    mentionSessionId: sessionId,
    senderName: "YA Tuan Hakim Azman",
    senderRole: "Pengerusi",
    content: newDecision.value.trim(),
    type: "decision",
    sentAt: new Date().toLocaleTimeString("ms-MY", { hour: "2-digit", minute: "2-digit" }),
  };
  messages.value.push(msg);
  newDecision.value = "";
  showDecisionInput.value = false;
}

onMounted(() => {
  timerInterval = setInterval(() => {
    elapsedSeconds.value++;
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<template>
<AdminLayout>
  <div class="flex h-[calc(100vh-7rem)] flex-col">
    <div class="px-4 pt-3">
      <AppBreadcrumb :items="[{ label: 'e-Sebutan', to: '/admin/esebutan' }, { label: 'Sesi Sebutan' }]" />
    </div>
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div class="flex items-center gap-4">
        <router-link to="/admin/esebutan" class="text-sm text-slate-500 hover:text-slate-700">&larr; Kembali</router-link>
        <div>
          <h1 class="text-lg font-bold text-slate-900">{{ caseNo }}</h1>
          <p class="text-xs text-slate-500">Sesi Sebutan #{{ sessionId }}</p>
        </div>
        <AppStatusBadge :status="sessionStatus" />
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5">
        <Clock class="h-4 w-4 text-slate-500" />
        <span class="font-mono text-sm font-semibold text-slate-700">{{ formatTimer(elapsedSeconds) }}</span>
      </div>
    </div>

    <!-- Three-column layout -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left: Participants -->
      <div class="w-60 shrink-0 border-r border-slate-200 bg-slate-50">
        <div class="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
          <Users class="h-4 w-4 text-slate-500" />
          <h2 class="text-sm font-semibold text-slate-700">Peserta ({{ participants.length }})</h2>
        </div>
        <ul class="divide-y divide-slate-100">
          <li v-for="p in participants" :key="p.name" class="flex items-start gap-3 px-4 py-3">
            <span
              class="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              :class="p.present ? 'bg-emerald-500' : 'bg-slate-300'"
            />
            <div class="min-w-0">
              <p class="text-sm font-medium text-slate-800 truncate">{{ p.name }}</p>
              <p class="text-xs text-slate-500">{{ p.role }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Center: Chat -->
      <div class="flex flex-1 flex-col">
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <AppChatMessage
            v-for="msg in messages"
            :key="msg.id"
            :sender-name="msg.senderName"
            :sender-role="msg.senderRole"
            :content="msg.content"
            :timestamp="msg.sentAt"
            :type="msg.type"
            :is-own="msg.senderName === 'YA Tuan Hakim Azman' && msg.type === 'message'"
          />
        </div>

        <!-- Input area -->
        <div class="border-t border-slate-200 bg-white p-3">
          <form class="flex gap-2" @submit.prevent="handleSendMessage">
            <input
              v-model="newMessage"
              type="text"
              placeholder="Taip mesej..."
              class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              type="submit"
              class="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              <Send class="h-4 w-4" />
              Hantar
            </button>
          </form>
        </div>
      </div>

      <!-- Right: Decisions -->
      <div class="w-72 shrink-0 border-l border-slate-200 bg-white flex flex-col">
        <div class="border-b border-slate-200 px-4 py-3">
          <h2 class="text-sm font-semibold text-slate-700">Keputusan Sesi</h2>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <div
            v-for="(decision, idx) in decisions"
            :key="idx"
            class="rounded-lg border border-amber-200 bg-amber-50 p-3"
          >
            <p class="text-xs font-semibold text-amber-600">Keputusan {{ idx + 1 }}</p>
            <p class="mt-1 text-sm text-amber-900">{{ decision }}</p>
          </div>

          <p v-if="decisions.length === 0" class="text-sm text-slate-400 text-center py-4">
            Tiada keputusan lagi.
          </p>

          <!-- Add decision input -->
          <div v-if="showDecisionInput" class="space-y-2">
            <textarea
              v-model="newDecision"
              rows="3"
              placeholder="Masukkan keputusan..."
              class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <div class="flex gap-2">
              <button
                class="flex-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
                @click="handleAddDecision"
              >
                Simpan
              </button>
              <button
                class="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                @click="showDecisionInput = false; newDecision = ''"
              >
                Batal
              </button>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 p-4 space-y-2">
          <button
            v-if="!showDecisionInput"
            class="flex w-full items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
            @click="showDecisionInput = true"
          >
            <Plus class="h-4 w-4" />
            Tambah Keputusan
          </button>
          <router-link
            :to="`/admin/esebutan/${sessionId}/rumusan`"
            class="flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition-colors"
          >
            <Square class="h-4 w-4" />
            Tamat Sesi
          </router-link>
        </div>
      </div>
    </div>
  </div>
</AdminLayout>
</template>
