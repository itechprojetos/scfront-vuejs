<template>
  <div class="slim-sidebar">
    <label class="sidebar-label">Menu</label>
    <li class="sidebar-nav-item">
      <router-link to="/" class="sidebar-nav-link">Inicial</router-link>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/tarefasdiarias" class="sidebar-nav-link">Tarefas Diárias</router-link>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/tarefassemanais" class="sidebar-nav-link">Tarefas Semanais</router-link>
    </li>
    <label class="sidebar-label">Cadastros</label>
    <li class="sidebar-nav-item">
      <router-link to="/cadastroatividadediaria" class="sidebar-nav-link">Atividades Diárias</router-link>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/cadastroatividadesemanal" class="sidebar-nav-link">Atividades Semanais</router-link>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/restaurantes" class="sidebar-nav-link">Restaurantes</router-link>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/cadastrosetor" class="sidebar-nav-link">Setores</router-link>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/usuarios" class="sidebar-nav-link">Usuários</router-link>
    </li>
    <label class="sidebar-label">Relatórios</label>
    <li class="sidebar-nav-item">
      <router-link to="/relatorios/ponto" class="sidebar-nav-link">Ponto eletrônico</router-link>
    </li>
    <label class="sidebar-label">Ações</label>
    <li class="sidebar-nav-item">
      <a class="sidebar-nav-link" style="font-weight: bold;" href="" @click='sair'>Sair</a>
    </li>
  </div>
</template>
<script>
  export default {
    name: "Menu",
    computed: {
      user() {
        return this.$store.state.auth.user;
      },
    },
    methods: {
      sair() {
        this.$store.dispatch("auth/ActionSingnout").then();
        this.$router.push("/login");
      }
    },
  };
</script>
<style scoped>
  .sidebar-label {
    margin-top: 20px;
    font-size: medium;
  }
</style>