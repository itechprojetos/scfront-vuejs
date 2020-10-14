<template>
  <div class="container">
    <sub-header :titulo="'CADASTRO - RESTAURANTES'" :page="'Restaurantes'" />
    <div class="section-wrapper">
      <div v-if="pesquisando == true" class="loader loader-default is-active" data-text="Carregando"></div>
      <div>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label">Nome do Restaurante</label>
              <span class="tx-danger">*</span>
              <input id="restaurante" v-model="restaurante.nome" class="form-control" name="restaurante" type="text" />
            </div>
          </div>
          <div class="col-lg-6">
            <button @click="Salvar()" class="btn btn-insumo pull-right col-lg-4"
              style="margin-top: 25px; margin-bottom: 50px;">{{opcao == 'A'? 'ADICIONAR': 'SALVAR'}}</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <Listagem :dados="listarRestaurantes" :colunas="colunas" @onEditar="Editar" @onDelete="Deletar"
            :canEditar="podeEditar()" :canInativar="podeApagar()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SubHeader from "../../components/layout/SubHeader";
  import Listagem from "../../components/forms/Listagem.vue";

  function initialState() {
    return {
      opcao: 'A',
      pesquisando: false,
      restaurantes: [],
      restaurante: {
        nome: ''
      },
      colunas: [
        {
          label: "NOME",
          field: "nome",
        },
        {
          label: "AÇÃO",
          thClass: "text-center",
        },
      ]
    }
  }
  export default {
    components: {
      SubHeader,
      Listagem
    },
    data: () => {
      return initialState();
    },
    mounted() {
      this.load()
    },
    computed: {
      listarRestaurantes() {
        return this.restaurantes;
      },
    },
    methods: {
      podeEditar() {
      },
      podeApagar() {
      },
      load() {
        this.pesquisando = true
        this.$store.dispatch("restaurante/ActionGetList").then(r => {
          this.restaurantes = r
          console.log(r)
          this.pesquisando = false
        }).catch(err => {
          this.pesquisando = false
        })
      },
      verificarDados() {
        if (
          this.nome !== '' ||
          this.nome !== null ||
          this.nome !== undefined          
          ){
            this.$swal
            .fire({
              icon: "error",
              title: "Error",
              text: "Os campos obrigatórios devems ser preenchidos!",
            });
            return true
          }
          return false
      },
      Salvar() {
        if (this.opcao === "A"){
          if (!this.verificarDados()) {
            return
          }

          this.pesquisando = true
          this.$store.dispatch("restaurante/ActionCreate",this.restaurante)
          .then( r => {
            this.pesquisando = false
            this.$swal
              .fire({
                icon: "success",
                title: `Sucesso`,
                text: "Restaurante adicionado com sucesso",
              }).then(() => {
                this.$nextTick(() => {
                  this.$scrollTop()
                });
                this.load();
                Object.assign(this.$data, initialState());
              });
          })
        } else if (this.opcao === "E"){
          this.$swal
            .fire({
              icon: "warning",
              title: "Atenção",
              text: "Deseja realmente atualizar o restaurante?",
              showCloseButton: true,
              showCancelButton: true,
              showConfirmButton: true,
              cancelButtonText: "Não",
              confirmButtonText: "Sim",
            })
            .then((r) => {
              if (r.value) {
                this.pesquisando = true
                this.$store.dispatch('restaurante/ActionUpdate', this.restaurante).then(() => {
                  this.pesquisando = false
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Restaurante atualizado com sucesso",
                    })
                    .then(() => {
                      this.$nextTick(() => {
                        this.$scrollTop()
                      });
                      Object.assign(this.$data, initialState());
                      this.load();
                    });
                })
              }
            });
        }
      },
      Editar(item) {
        this.opcao = "E"
        this.restaurante.nome = item.nome
        this.restaurante.id = item.id
      },
      Deletar(item) {
        this.$swal
          .fire({
            icon: "error",
            title: "Atenção",
            text: "Deseja realmente excluir este restaurante?",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Não",
            confirmButtonText: "Sim",
          })
          .then((r) => {
            if (r.value) {
              this.$store
                .dispatch("restaurante/ActionDelete", { id: item.id })
                .then(() => {
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Rerstaurante excluido com sucesso",
                    })
                    .then(() => {
                      this.load();
                    });
                });
            }
          });
      }
    }
  }
</script>