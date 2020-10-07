<template>
  <div class="slim-pageheader">
    <ol class="breadcrumb slim-breadcrumb">
      <li class="breadcrumb-item">
        <router-link to="/">APCred</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">{{page}}</li>
    </ol>
    <h6 class="slim-pagetitle">{{titulo.toUpperCase()}}</h6>
  </div>
</template>
<script>
export default {
  // name: "SubHeader",
  props: {
    titulo: String,
    page: String,
  },
  watch: {
    page(newValue) {
      this.page = newValue;
    },
    titulo(newValue) {
      this.titulo = newValue;
    },
  },
};
</script>