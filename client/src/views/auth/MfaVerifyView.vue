<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Shield, ArrowRight, Lock } from "lucide-vue-next";

const digits = ref<string[]>(["", "", "", "", "", ""]);
const inputRefs = ref<HTMLInputElement[]>([]);
const isVerifying = ref(false);
const error = ref("");
const resent = ref(false);

function setRef(el: unknown, index: number) {
  if (el instanceof HTMLInputElement) {
    inputRefs.value[index] = el;
  }
}

function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value.replace(/\D/g, "");
  digits.value[index] = value.slice(0, 1);

  if (value && index < 5) {
    nextTick(() => inputRefs.value[index + 1]?.focus());
  }
}

function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === "Backspace" && !digits.value[index] && index > 0) {
    nextTick(() => inputRefs.value[index - 1]?.focus());
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasted = (event.clipboardData?.getData("text") || "").replace(/\D/g, "").slice(0, 6);
  for (let i = 0; i < 6; i++) {
    digits.value[i] = pasted[i] || "";
  }
  const focusIndex = Math.min(pasted.length, 5);
  nextTick(() => inputRefs.value[focusIndex]?.focus());
}

function verify() {
  const code = digits.value.join("");
  if (code.length < 6) {
    error.value = "Sila masukkan kod 6 digit penuh.";
    return;
  }
  isVerifying.value = true;
  error.value = "";
  // Mockup: simulate verification delay
  setTimeout(() => {
    isVerifying.value = false;
    error.value = "Kod pengesahan tidak sah. Sila cuba lagi.";
  }, 1500);
}

function resendCode() {
  resent.value = true;
  setTimeout(() => {
    resent.value = false;
  }, 3000);
}

const otpCode = ref(digits);
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] px-4">
    <div class="w-full max-w-[420px]">
      <!-- Branding Header -->
      <div class="mb-8 flex flex-col items-center">
        <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1e3a5f] to-[#2c5282] shadow-lg">
          <Shield class="h-7 w-7 text-[#c5a44e]" />
        </div>
        <h2 class="text-lg font-bold tracking-tight text-[#1e3a5f]">Mahkamah Perusahaan Malaysia</h2>
        <p class="text-xs text-[#64748b]">eMP - Sistem Pengurusan Kes Elektronik</p>
      </div>

      <!-- Card -->
      <div class="rounded-xl border border-[#e2e8f0] bg-white px-8 pb-8 pt-7 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div class="mb-6 flex flex-col items-center">
          <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#ebf0f7]">
            <Lock class="h-5 w-5 text-[#1e3a5f]" />
          </div>
          <h1 class="text-lg font-semibold text-[#1e3a5f]">Pengesahan Dua Faktor</h1>
          <p class="mt-1 text-center text-[13px] leading-relaxed text-[#64748b]">
            Kod pengesahan telah dihantar ke<br />
            <span class="font-medium text-[#334155]">a****n@mpm.gov.my</span>
          </p>
        </div>

        <!-- OTP Inputs -->
        <div class="mb-6 flex justify-center gap-2.5">
          <input
            v-for="(_, index) in 6"
            :key="index"
            :ref="(el) => setRef(el, index)"
            type="text"
            inputmode="numeric"
            maxlength="1"
            :value="digits[index]"
            class="h-13 w-11 rounded-lg border-2 border-[#d1d5db] bg-[#f9fafb] text-center text-xl font-bold text-[#1e3a5f] transition-all focus:border-[#1e3a5f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
            @input="handleInput(index, $event)"
            @keydown="handleKeydown(index, $event)"
            @paste="handlePaste"
          />
        </div>

        <!-- Error -->
        <div
          v-if="error"
          class="mb-4 rounded-lg border border-[#fecaca] bg-[#fef2f2] px-3.5 py-2.5 text-center text-[13px] text-[#dc2626]"
        >
          {{ error }}
        </div>

        <!-- Verify Button -->
        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1e3a5f] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#163250] disabled:opacity-60"
          :disabled="isVerifying"
          @click="verify"
        >
          {{ isVerifying ? 'Mengesahkan...' : 'Sahkan' }}
          <ArrowRight v-if="!isVerifying" class="h-4 w-4" />
        </button>

        <!-- Resend -->
        <div class="mt-5 text-center">
          <p v-if="resent" class="text-[13px] font-medium text-[#16a34a]">
            Kod baharu telah dihantar.
          </p>
          <button
            v-else
            type="button"
            class="text-[13px] text-[#1e3a5f] underline underline-offset-2 transition-colors hover:text-[#2c5282]"
            @click="resendCode"
          >
            Hantar semula kod
          </button>
        </div>
      </div>

      <!-- Footer -->
      <p class="mt-6 text-center text-[11px] text-[#94a3b8]">
        &copy; {{ new Date().getFullYear() }} Mahkamah Perusahaan Malaysia. Hak cipta terpelihara.
      </p>
    </div>
  </div>
</template>
