<script setup lang="ts">
defineProps<{
  variant?: "card" | "table" | "form" | "text" | "stat";
  lines?: number;
}>();
</script>

<template>
  <!-- Card variant -->
  <div v-if="variant === 'card'" class="animate-pulse rounded-lg bg-slate-200 h-48" />

  <!-- Table variant -->
  <div v-else-if="variant === 'table'" class="animate-pulse space-y-2">
    <!-- Header row -->
    <div class="flex gap-4 rounded bg-slate-200 px-4 py-3">
      <div class="h-3 w-1/4 rounded bg-slate-300" />
      <div class="h-3 w-1/4 rounded bg-slate-300" />
      <div class="h-3 w-1/4 rounded bg-slate-300" />
      <div class="h-3 w-1/4 rounded bg-slate-300" />
    </div>
    <!-- Data rows -->
    <div v-for="n in (lines ?? 5)" :key="n" class="flex gap-4 px-4 py-3">
      <div class="h-3 w-1/4 rounded bg-slate-200" />
      <div class="h-3 w-1/4 rounded bg-slate-200" />
      <div class="h-3 w-1/4 rounded bg-slate-200" />
      <div class="h-3 w-1/4 rounded bg-slate-200" />
    </div>
  </div>

  <!-- Form variant -->
  <div v-else-if="variant === 'form'" class="animate-pulse space-y-5">
    <div v-for="n in (lines ?? 4)" :key="n" class="space-y-2">
      <div class="h-3 w-24 rounded bg-slate-200" />
      <div class="h-9 w-full rounded bg-slate-200" />
    </div>
  </div>

  <!-- Stat variant -->
  <div v-else-if="variant === 'stat'" class="animate-pulse rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <div class="h-3 w-20 rounded bg-slate-200" />
      <div class="h-4 w-4 rounded bg-slate-200" />
    </div>
    <div class="mt-3 h-7 w-16 rounded bg-slate-200" />
    <div class="mt-2 h-3 w-24 rounded bg-slate-200" />
  </div>

  <!-- Text variant (default) -->
  <div v-else class="animate-pulse space-y-2.5">
    <div class="h-3 w-full rounded bg-slate-200" />
    <div class="h-3 w-4/5 rounded bg-slate-200" />
    <div class="h-3 w-3/5 rounded bg-slate-200" />
  </div>
</template>
