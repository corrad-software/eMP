<script setup lang="ts">
import type { Component } from "vue";
import { TrendingUp, TrendingDown, Minus } from "lucide-vue-next";

defineProps<{
  icon?: Component;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "flat";
  changePercent?: number;
  color?: "blue" | "green" | "red" | "amber" | "violet" | "slate";
}>();
</script>

<template>
  <article class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
    <div class="flex items-center justify-between">
      <p class="text-xs font-medium text-slate-500">{{ label }}</p>
      <component v-if="icon" :is="icon" class="h-4 w-4 text-slate-400" />
    </div>
    <p class="mt-2 text-2xl font-semibold text-slate-900">{{ value }}</p>
    <div v-if="trend || subtitle" class="mt-1 flex items-center gap-1.5 text-xs">
      <template v-if="trend">
        <span
          class="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold"
          :class="trend === 'up' ? 'bg-emerald-50 text-emerald-600' : trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'"
        >
          <TrendingUp v-if="trend === 'up'" class="h-3 w-3" />
          <TrendingDown v-else-if="trend === 'down'" class="h-3 w-3" />
          <Minus v-else class="h-3 w-3" />
          {{ changePercent != null ? `${changePercent > 0 ? '+' : ''}${changePercent}%` : '' }}
        </span>
      </template>
      <span v-if="subtitle" class="text-slate-400">{{ subtitle }}</span>
    </div>
  </article>
</template>
