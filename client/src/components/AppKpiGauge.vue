<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  value: number;
  target: number;
  label: string;
  unit?: string;
  color?: "blue" | "green" | "amber" | "red";
}>();

const percent = computed(() => Math.min(100, Math.round((props.value / props.target) * 100)));

const barColor: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-rose-500",
};
</script>

<template>
  <div class="rounded-lg border border-slate-200 bg-white p-4">
    <p class="text-xs font-medium uppercase tracking-wide text-slate-500">{{ label }}</p>
    <div class="mt-2 flex items-baseline gap-1">
      <span class="text-2xl font-bold text-slate-900">{{ value }}</span>
      <span v-if="unit" class="text-sm text-slate-400">{{ unit }}</span>
      <span class="ml-auto text-xs text-slate-400">Sasaran: {{ target }}{{ unit ? ` ${unit}` : '' }}</span>
    </div>
    <div class="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        class="h-full rounded-full transition-all duration-500"
        :class="barColor[color ?? 'blue']"
        :style="{ width: `${percent}%` }"
      />
    </div>
    <p class="mt-1 text-right text-xs text-slate-400">{{ percent }}%</p>
  </div>
</template>
