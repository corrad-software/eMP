<script setup lang="ts">
import { ChevronRight, Home } from "lucide-vue-next";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>

<template>
  <nav class="flex items-center gap-1 text-sm" aria-label="Breadcrumb">
    <router-link
      to="/admin"
      class="flex items-center text-slate-400 transition-colors hover:text-slate-600"
    >
      <Home class="h-3.5 w-3.5" />
    </router-link>
    <template v-for="(item, i) in items" :key="i">
      <ChevronRight class="h-3.5 w-3.5 text-slate-300" />
      <router-link
        v-if="item.to"
        :to="item.to"
        class="text-slate-400 transition-colors hover:text-slate-600"
      >
        {{ item.label }}
      </router-link>
      <span v-else class="font-medium text-slate-700">{{ item.label }}</span>
    </template>
  </nav>
</template>
