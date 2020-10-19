<template>
  <div class="container">
    <sub-header :titulo="'CADASTRO - SETORES'" :page="'Cadastro Setor'" />

    <div class="section-wrapper">
      <div v-if="pesquisando == true" class="loader loader-default is-active" data-text="Carregando"></div>
      <div class="row">
        <div class="col-lg-6">
          <div class="form-group">
            <label class="form-control-label">Nome do Setor</label>
            <span class="tx-danger">*</span>
            <input id="setor" v-model="setor.nome" class="form-control" name="setor" type="text" />
          </div>
        </div>
        <div class="col-lg-6">
          <button @click="Salvar()" class="btn btn-insumo pull-right col-lg-4"
            style="margin-top: 25px; margin-bottom: 50px;">{{opcao == 'A'? 'ADICIONAR': 'SALVAR'}}</button>
        </div>
      </div>
      <Listagem :dados="listagemSetores" :colunas="colunas" @onEditar="Editar" @onDelete="Deletar"
      :canEditar="podeEditar()" :canInativar="podeApagar()" />
    </div>


  </div>
</template>

<script>
  import SubHeader from "../../components/layout/SubHeader";
  import Listagem from "../../components/forms/Listagem";
  function initialState() {
    return {
      opcao: 'A',
      setores: [],
      setor:{
        nome:'',
        id: null
      },
      pesquisando: false,
      colunas:[
      {
        label: "SETOR",
        field: "nome",
        thClass: "text-center",
        tdClass: "d-flex justify-content-sm-center text-left"
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
    mounted(){
      this.load()
    },
    computed:{
      listagemSetores(){
        return this.setores
      }
    },
    methods:{
      load(){
        this.pesquisando = true
        this.$store.dispatch('setor/ActionGetList').then(r =>{
          this.pesquisando = false
          this.setores = r
        })
      },
      verificarDados() {
        if (
          this.setor.nome === '' ||
          this.setor.nome === null ||
          this.setor.nome === undefined          
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
      Salvar(){
        
        if (this.opcao === "A"){
          if (this.verificarDados()) {
            return
          }

          this.pesquisando = true
          this.$store.dispatch("setor/ActionCreate",this.setor)
          .then( r => {
            this.pesquisando = false
            this.$swal
              .fire({
                icon: "success",
                title: `Sucesso`,
                text: "Setor adicionado com sucesso",
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
              text: "Deseja realmente atualizar o setor?",
              showCloseButton: true,
              showCancelButton: true,
              showConfirmButton: true,
              cancelButtonText: "Não",
              confirmButtonText: "Sim",
            })
            .then((r) => {
              if (r.value) {
                this.pesquisando = true
                this.$store.dispatch('setor/ActionUpdate', this.setor).then(() => {
                  this.pesquisando = false
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Setor atualizado com sucesso",
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
        this.setor.nome = item.nome
        this.setor.id = item.id
        this.$nextTick(() => {
          this.$scrollTop()
        });
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
                .dispatch("setor/ActionDelete", { id: item.id })
                .then(() => {
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Rerstaurante excluido com sucesso",
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
      podeEditar(){},
      podeApagar(){}      
    }
  }
</script>