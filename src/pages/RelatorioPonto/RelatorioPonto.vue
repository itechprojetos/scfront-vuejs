<template>
  <div class="container">
    <sub-header :titulo="'Relatório de ponto eletrônico'" :page="'Relatório de ponto eletrônico'" />
    <div class="section-wrapper">
      <div v-if="researching === true" class="loader loader-default is-active" data-text="Carregando"></div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label class="form-control-label">Status do colaborador</label>
            <select v-model="filterUsersByStatus" class="form-control">
              <option :value="null">Todos</option>
              <option :value="true">Online</option>
              <option :value="false">Offline</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <button @click="load()" class="btn btn-insumo pull-right filter-button">Buscar usuários</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Listagem :dados="listUsers" :colunas="columns" :canAcao="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SubHeader from '../../components/layout/SubHeader';
  import Listagem from '../../components/forms/Listagem';

  export default {
    components: {
      SubHeader,
      Listagem,
    },

    data() {
      return {
        researching: false,
        filterUsersByStatus: null,
        users: [],
        columns: [
          { label: 'Nome', field: 'username' },
          { label: 'Documento', field: 'cpf' },
          { label: 'Restaurante', field: 'restaurante.nome' },
          { label: 'Status', field: 'isOnline', thClass: 'text-center', tdClass: 'text-center', html: true },
        ],
      };
    },

    computed: {
      listUsers() {
        return this.users;
      },
    },
    
    methods: {
      async load() {
        this.researching = true;
        console.log(this.filterUsersByStatus, typeof this.filterUsersByStatus);

        try {
          const users = await this.$store.dispatch('relatorioponto/ActionGetList');
          const formatedUsers = [];

          for (const user of users) {
            if (this.filterUsersByStatus !== null) {
              if (user.isOnline !== this.filterUsersByStatus) {
                continue;
              }
            }

            formatedUsers.push(Object.assign(user, {
              isOnline: `
                <i class="fa fa-circle" style="color: ${user.isOnline ? '#89ba3f' : '#bf5054'}"></i>
              `,
            }));
          }

          this.users = formatedUsers;
        } catch (err) {
          this.$swal.fire({
            icon: 'error',
            title: 'Não foi possível comunicar-se com a API',
            text: 'Desculpe, mas não foi possível buscar o relatório de ponto eletrônico.',
          });
        }

        this.researching = false;
      },
    },

    mounted() {
      this.load();
    },
  }
</script>

<style scoped>
  .filter-button {
    margin-top: 1.8rem;
  }
</style>