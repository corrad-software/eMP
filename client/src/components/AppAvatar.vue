<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  size?: "sm" | "md" | "lg";
  photoUrl?: string;
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm": return "h-7 w-7 text-xs";
    case "lg": return "h-11 w-11 text-sm";
    default: return "h-9 w-9 text-sm";
  }
});

const initials = computed(() => {
  const parts = props.name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] ?? "?").toUpperCase();
});

const bgColors = [
  "bg-slate-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-violet-500",
  "bg-rose-500",
];

const bgColor = computed(() => {
  let hash = 0;
  for (let i = 0; i < props.name.length; i++) {
    hash = props.name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return bgColors[Math.abs(hash) % bgColors.length];
});
</script>

<template>
  <div class="shrink-0 overflow-hidden rounded-full" :class="sizeClass">
    <img
      v-if="photoUrl"
      :src="photoUrl"
      :alt="name"
      class="h-full w-full object-cover"
    />
    <div
      v-else
      class="flex h-full w-full items-center justify-center font-semibold text-white"
      :class="bgColor"
    >
      {{ initials }}
    </div>
  </div>
</template>
