<script setup lang="ts">
import type { Component } from "vue";
import { Inbox } from "lucide-vue-next";

defineProps<{
  icon?: Component;
  title?: string;
  message?: string;
  actionLabel?: string;
}>();

defineEmits<{ action: [] }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <component :is="icon ?? Inbox" class="h-7 w-7" />
    </div>
    <h3 class="mt-4 text-sm font-semibold text-slate-900">{{ title ?? 'Tiada rekod' }}</h3>
    <p class="mt-1 max-w-sm text-sm text-slate-500">{{ message ?? 'Tiada data untuk dipaparkan pada masa ini.' }}</p>
    <button
      v-if="actionLabel"
      class="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </div>
</template>
