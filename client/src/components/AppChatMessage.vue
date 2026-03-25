<script setup lang="ts">
defineProps<{
  senderName: string;
  senderRole?: string;
  content: string;
  timestamp: string;
  isOwn?: boolean;
  type?: "message" | "system" | "decision";
}>();
</script>

<template>
  <div
    v-if="type === 'system'"
    class="flex justify-center py-2"
  >
    <span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">{{ content }}</span>
  </div>
  <div
    v-else-if="type === 'decision'"
    class="mx-auto max-w-lg rounded-lg border border-amber-200 bg-amber-50 p-3"
  >
    <p class="text-xs font-semibold uppercase tracking-wide text-amber-600">Keputusan</p>
    <p class="mt-1 text-sm text-amber-900">{{ content }}</p>
    <p class="mt-1 text-xs text-amber-500">{{ senderName }} &middot; {{ timestamp }}</p>
  </div>
  <div v-else class="flex gap-3" :class="isOwn ? 'flex-row-reverse' : ''">
    <div
      class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      :class="isOwn ? 'bg-blue-500' : 'bg-slate-400'"
    >
      {{ senderName.charAt(0).toUpperCase() }}
    </div>
    <div class="max-w-[70%]">
      <div class="flex items-baseline gap-2" :class="isOwn ? 'flex-row-reverse' : ''">
        <span class="text-xs font-semibold text-slate-700">{{ senderName }}</span>
        <span v-if="senderRole" class="text-[10px] text-slate-400">{{ senderRole }}</span>
      </div>
      <div
        class="mt-1 rounded-xl px-3.5 py-2 text-sm"
        :class="isOwn ? 'rounded-tr-sm bg-slate-900 text-white' : 'rounded-tl-sm bg-slate-100 text-slate-800'"
      >
        {{ content }}
      </div>
      <p class="mt-0.5 text-[10px] text-slate-400" :class="isOwn ? 'text-right' : ''">{{ timestamp }}</p>
    </div>
  </div>
</template>
