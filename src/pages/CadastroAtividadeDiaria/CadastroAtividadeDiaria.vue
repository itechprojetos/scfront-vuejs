<template>
  <div class="container">
    <sub-header :titulo="'CADASTRO - ATIVIDADE DIÁRIA'" :page="'Cadastro Atividade  Diária'" />

    <div class="section-wrapper">
      <div v-if="pesquisando == true" class="loader loader-default is-active" data-text="Carregando"></div>
      <div class="row">
        <div class="col-lg-8">
          <div class="form-group">
            <label class="form-control-label">Descrição da atividade diária</label>
            <span class="tx-danger">*</span>
            <input id="atividade" v-model="atividade.nome" class="form-control" name="atividade" type="text" />
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-group">
            <label class="form-control-label">Setor</label>
            <span class="tx-danger">*</span>
            <select v-model="atividade.setor" name="setor" id class="form-control">
              <option value="null">Selecione</option>
              <option v-for="(item,index) in setores" :key="index" :value="item.id">{{item.nome}}</option>
            </select>
          </div>
          <!-- form-group -->
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <button @click="Salvar()" class="btn btn-insumo pull-right col-lg-3"
            style="margin-top: 25px; margin-bottom: 50px;">{{opcao == 'A'? 'ADICIONAR': 'SALVAR'}}</button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <Listagem :dados="listarAtividades" :colunas="colunas" @onEditar="Editar" @onDelete="Deletar"
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
      atividades: [],
      setores: [],
      pesquisando: false,
      opcao: 'A',
      atividade: {
        nome: '',
        id: null,
        setor: null,
      },
      colunas: [
        {
          label: "DESCRIÇÃO",
          field: "nome",
        },
        {
          label: "SETOR",
          field: "Setor.nome",
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
      listarAtividades() {
        return this.atividades
      }
    },
    methods: {
      load() {
        this.pesquisando = true
        const atividades = this.$store.dispatch('atividadediaria/ActionGetList')
        const setores = this.$store.dispatch('setor/ActionGetList')
        Promise.all([atividades, setores]).then(result => {
          this.pesquisando = false
          this.atividades = result[0]
          this.setores = result[1]
        }).catch(err => {
          console.log(err)
          this.pesquisando = false
        })
      },
      verificarDados() {
        if (
          this.atividade.nome === '' ||
          this.atividade.nome === null ||
          this.atividade.nome === undefined ||
          this.atividade.setor === '' ||
          this.atividade.setor === null ||
          this.atividade.setor === undefined
        ) {
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
      podeEditar() { },
      podeApagar() { },
      Salvar() {
        
        if (this.opcao === "A"){
          if (this.verificarDados()) {
            return
          }

          this.pesquisando = true
          this.$store.dispatch("atividadediaria/ActionCreate",this.atividade)
          .then( r => {
            this.pesquisando = false
            this.$swal
              .fire({
                icon: "success",
                title: `Sucesso`,
                text: "Atividade diária adicionada com sucesso",
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
              text: "Deseja realmente atualizar a atividade diária?",
              showCloseButton: true,
              showCancelButton: true,
              showConfirmButton: true,
              cancelButtonText: "Não",
              confirmButtonText: "Sim",
            })
            .then((r) => {
              if (r.value) {
                this.pesquisando = true
                this.$store.dispatch('atividadediaria/ActionUpdate', this.atividade).then(() => {
                  this.pesquisando = false
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Atividade diária atualizada com sucesso",
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
        this.opcao = 'E'
        this.atividade.id = item.id
        this.atividade.nome = item.nome
        this.atividade.setor = item.Setor.id
        this.$nextTick(() => {
          this.$scrollTop()
        });
      },
      Deletar(item) {
        this.$swal
          .fire({
            icon: "error",
            title: "Atenção",
            text: "Deseja realmente excluir esta atividade diária?",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Não",
            confirmButtonText: "Sim",
          })
          .then((r) => {
            if (r.value) {
              this.$store
                .dispatch("atividadediaria/ActionDelete", { id: item.id })
                .then(() => {
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Atividade diária excluida com sucesso",
                    })
                    .then(() => {
                      Object.assign(this.$data, initialState());
                      this.load();
                      this.$nextTick(() => {
                        this.$scrollTop()
                      });
                    });
                });
            }
          });
      },
    }
  }
</script>