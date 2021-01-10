<template>
  <div class="slim-sidebar">
    <div v-for="(item, index) in nav" :key="`nav:${index}`">
      <label class="sidebar-label" v-if="item.type === 'label'">{{ item.content }}</label>
      <li class="sidebar-nav-item" v-if="item.type === 'link'">
        <router-link class="sidebar-nav-link" :to="item.href">
          {{ item.content }}
        </router-link>
      </li>
    </div>
    <label class="sidebar-label">Ações</label>
    <li class="sidebar-nav-item">
      <a class="sidebar-nav-link font-bold" href="#" @click='logout'>
        Sair
      </a>
    </li>
  </div>
</template>

<script>
  export default {
    name: 'Menu',

    data() {
      return {
        nav: [],
      };
    },

    computed: {
      user() {
        return this.$store.state.auth.user;
      },
    },

    methods: {
      async logout() {
        await this.$store.dispatch('auth/ActionSingnout');
        this.$router.push('/login');
      },

      isAdmin() {
        const roles = this.$store.state.auth.user.roles;

        if (typeof roles !== 'undefined') {
          for (const role of this.$store.state.auth.user.roles) {
            if (role.name === 'ADMIN') {
              return true;
            }
          }
        }

        return false;
      },

      isModerator() {
        const roles = this.$store.state.auth.user.roles;

        if (typeof roles !== 'undefined') {
          for (const role of this.$store.state.auth.user.roles) {
            if (role.name === 'GERENTE') {
              return true;
            }
          }
        }

        return false;
      },

      isAdminOrModerator() {
        return this.isAdmin() || this.isModerator();
      },
    },

    mounted() {
      this.nav = [
        {
          type: 'label',
          content: 'Menu',
        },
        {
          type: 'link',
          content: 'Inicial',
          href: '/',
        },
      ];

      if (this.isAdminOrModerator()) {
        this.nav.push(
          {
            type: 'link',
            content: 'Tarefas Diárias',
            href: '/tarefasdiarias',
          },
          {
            type: 'link',
            content: 'Tarefas Semanais',
            href: '/tarefassemanais',
          },
        );
      }

      if (this.isAdmin()) {
        this.nav.push(
          {
            type: 'label',
            content: 'Cadastros',
          },
          {
            type: 'link',
            content: 'Atividades Diárias',
            href: '/cadastroatividadediaria',
          },
          {
            type: 'link',
            content: 'Atividades Semanais',
            href: '/cadastroatividadesemanal',
          },
          {
            type: 'link',
            content: 'Restaurantes',
            href: '/restaurantes',
          },
          {
            type: 'link',
            content: 'Setores',
            href: '/cadastrosetor',
          },
          {
            type: 'link',
            content: 'Usuários',
            href: '/usuarios',
          },
          {
            type: 'label',
            content: 'Relatórios',
          },
          {
            type: 'link',
            content: 'Ponto eletrônico',
            href: '/relatorios/ponto',
          },
        );
      }
    },
  };
</script>

<style scoped>
  .sidebar-label {
    margin-top: 20px;
    font-size: medium;
  }

  .font-bold {
    font-weight: bold !important;
  }
</style>
