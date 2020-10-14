<template>
  <div class="slim-sidebar">
    <label class="sidebar-label" style="margin-top: 20px; font-size:medium;">MENU</label>
    <li class="sidebar-nav-item">
      <router-link to="/" class="sidebar-nav-link">Inicial</router-link>
    </li>
    <li class="sidebar-nav-item">
      <span class="sidebar-nav-link">Tarefas Diárias</span>
    </li>
    <li class="sidebar-nav-item">
      <span class="sidebar-nav-link">Tarefas Semanais</span>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/restaurantes" class="sidebar-nav-link">Restaurantes</router-link>
    </li>
    <label class="sidebar-label" 
      style="margin-top: 20px; font-size:medium;">CONFIGURAÇÕES</label>
    <li class="sidebar-nav-item">
      <router-link to="/usuarios" class="sidebar-nav-link">Usuários</router-link>
    </li>   
    <li class="sidebar-nav-item">
      <a class="sidebar-nav-link" style="font-weight: bold;" href="" @click='sair'>Sair</a>
    </li>  
    </ul>
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