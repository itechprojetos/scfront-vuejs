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
      <span class="sidebar-nav-link">Restaurantes</span>
    </li>
    <label class="sidebar-label" 
      style="margin-top: 20px; font-size:medium;">CONFIGURAÇÕES</label>
    <li class="sidebar-nav-item">
      <router-link to="/usuarios" class="sidebar-nav-link">Usuários</router-link>
    </li>
    <li class="sidebar-nav-item">
      <router-link to="/perfil" class="sidebar-nav-link">Perfil de Acesso</router-link>
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
    },
  };
</script>