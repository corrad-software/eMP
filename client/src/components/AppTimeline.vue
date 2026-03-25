<script setup lang="ts">
import type { Component } from "vue";
import { Circle } from "lucide-vue-next";

export type TimelineEvent = {
  id: number | string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: Component;
  color?: string;
  actor?: string;
};

defineProps<{
  events: TimelineEvent[];
}>();
</script>

<template>
  <div class="relative space-y-0">
    <div class="absolute left-[17px] top-2 bottom-2 w-px bg-slate-200" />
    <div v-for="event in events" :key="event.id" class="relative flex gap-4 pb-6 last:pb-0">
      <div class="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-100 shadow-sm" :class="event.color ?? ''">
        <component :is="event.icon ?? Circle" class="h-4 w-4 text-slate-500" />
      </div>
      <div class="min-w-0 flex-1 pt-1">
        <p class="text-sm font-semibold text-slate-900">{{ event.title }}</p>
        <p v-if="event.description" class="mt-0.5 text-sm text-slate-600">{{ event.description }}</p>
        <div class="mt-1 flex items-center gap-2 text-xs text-slate-400">
          <span v-if="event.actor" class="font-medium text-slate-500">{{ event.actor }}</span>
          <span>{{ event.timestamp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
