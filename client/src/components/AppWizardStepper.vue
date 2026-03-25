<script setup lang="ts">
import { Check } from "lucide-vue-next";

export type WizardStep = {
  id: string;
  label: string;
  description?: string;
};

defineProps<{
  steps: WizardStep[];
  currentStep: number;
}>();

defineEmits<{ stepClick: [index: number] }>();
</script>

<template>
  <nav class="flex items-center">
    <ol class="flex w-full items-center">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        class="flex items-center"
        :class="index < steps.length - 1 ? 'flex-1' : ''"
      >
        <button
          class="flex items-center gap-2 whitespace-nowrap"
          :class="index <= currentStep ? 'cursor-pointer' : 'cursor-default'"
          @click="index <= currentStep && $emit('stepClick', index)"
        >
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            :class="
              index < currentStep
                ? 'bg-slate-900 text-white'
                : index === currentStep
                  ? 'bg-slate-900 text-white ring-4 ring-slate-200'
                  : 'bg-slate-200 text-slate-500'
            "
          >
            <Check v-if="index < currentStep" class="h-4 w-4" />
            <span v-else>{{ index + 1 }}</span>
          </span>
          <div class="hidden sm:block">
            <p class="text-sm font-medium" :class="index <= currentStep ? 'text-slate-900' : 'text-slate-400'">
              {{ step.label }}
            </p>
            <p v-if="step.description" class="text-xs text-slate-400">{{ step.description }}</p>
          </div>
        </button>
        <div v-if="index < steps.length - 1" class="mx-3 h-px flex-1 bg-slate-200" :class="index < currentStep ? 'bg-blue-400' : ''" />
      </li>
    </ol>
  </nav>
</template>
