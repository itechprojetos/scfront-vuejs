<template>
  <div class="slim-footer">
    <div class="container">
      <p>
        Copyright 2020 &copy; Todos os direitos reservados.
      </p>
      <p>
        Desenvolvido por
        <img class="iettto-footer-logo" src="../../../assets/img/iettto-labs.png" alt="Iettto Labs">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Foot",
  computed: {
    nome() {
      return process.env.VUE_APP_NOME;
    },
  },
};
</script>

<style scoped>
  .iettto-footer-logo {
    margin-left: 0.8rem;
    max-height: 20px;
  }
</style>