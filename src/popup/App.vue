<template>
<div class="fe-weekly-popup">
  <router-view />
</div>
</template>

<script>
export default {
  name: "App",
}
</script>
<style lang="scss">
@import '@/styles/index.scss';
html, body{
  height: auto !important;
}
.fe-weekly-popup {
  overflow: hidden;
  box-sizing: border-box;
  width: 360px;
  background: #f5f5f5;
  padding: 8px;
}
</style>