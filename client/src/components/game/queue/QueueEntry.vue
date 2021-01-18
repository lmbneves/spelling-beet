<template>
  <span :class="validity">{{ value }}</span>
</template>

<script>
export default {
  name: 'QueueEntry',
  props: {
    validity: String,
    value: String
  }
};
</script>

<style scoped>
.required {
  color: #ce2759;
}

.valid {
  color: #070707;
}

.invalid {
  color: #999999;
}
</style>