<template>
  <div class="slim-footer">
    <div class="container">
      <p>Copyright 2020 &copy; Todos os direitos reservados.</p>
      <p>
        Desenvolvido por:
        <a href>Itech</a>
      </p>
    </div>
    <!-- container -->
  </div>
  <!-- slim-footer -->
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