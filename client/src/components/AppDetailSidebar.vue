<script setup lang="ts">
import { X } from "lucide-vue-next";

defineProps<{
  open: boolean;
  title?: string;
  width?: string;
}>();

defineEmits<{ close: [] }>();
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="open"
      class="fixed inset-y-0 right-0 z-40 flex flex-col border-l border-slate-200 bg-white shadow-xl"
      :style="{ width: width ?? '400px' }"
    >
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <h2 class="text-sm font-semibold text-slate-900">{{ title ?? 'Butiran' }}</h2>
        <button class="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600" @click="$emit('close')">
          <X class="h-5 w-5" />
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-5">
        <slot />
      </div>
    </aside>
  </Transition>
</template>
