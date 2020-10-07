<template>
  <div class="container">
    <!-- <div class="slim-pageheader">
            <ol class="breadcrumb slim-breadcrumb">
              <li class="breadcrumb-item"><a href="#">APCred</a></li>
              <li class="breadcrumb-item active" aria-current="page">perfils Recebedoras</li>
            </ol>
            <h6 class="slim-pagetitle">APCRED - perfils RECEBEDORAS</h6>
    </div>-->
    <!-- slim-pageheader -->

    <sub-header :titulo="'APCRED - CONFIGURAÇÕES - PERFIL DE ACESSO'" :page="'Perfil'" />

    <div class="section-wrapper">
      <div
      v-if="pesquisando == true"
      class="loader loader-default is-active"
      data-text="Carregando"
    ></div>
      <div class="row">
        <div class="col-12">
          <label class="section-title">CADASTRAR PERFIL DE ACESSO</label>
        </div>
      </div>
      <div v-if="pode()">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label class="form-control-label">Descrição</label>
              <span class="tx-danger">*</span>
              <input
                id="lastname"
                v-model="perfil.name"
                class="form-control"
                name="lastname"
                type="text"
              />
            </div>
            <!-- form-group -->
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <label class="section-title">ASSOCIAR FUNCIONALIDADES</label>
          </div>
        </div>
        <hr />

        <div style="margin-top: 20px;" class="row" v-for="(item,index) in permissoes" :key="index">
          <div class="col-3" v-for="(xpto,index) in item" :key="index">
            <fieldset style="
              display: block;
              margin-inline-start: 2px;
              margin-inline-end: 2px;
              padding-block-start: 0.35em;
              padding-inline-start: 0.75em;
              padding-inline-end: 0.75em;
              padding-block-end: 0.625em;
              min-inline-size: min-content;
              border-width: 2px;
              border-style: groove;
              border-color: threedface;
              height: 100%;"
            >
              <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;"
                class="section-title"
                >
                {{xpto.key}}
              </legend>
              <!-- <label class="section-title">{{xpto.key}}</label> -->
            <br />
            <div style="margin-left: 10px;" class="form-group form-check" v-for="(subItem, index) in xpto.dados" :key="index">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="subItem.checked"
                @click="VerifyCad(xpto.key,subItem)"
                id="cadastrar-perfils"
              />
              <label class="form-check-label" for="exampleCheck1">{{subItem.label.toUpperCase()}}</label>
            </div>
            </fieldset>            
          </div>
        </div>

        <div class="row">
          <div class="col-lg-12">
            <button
              @click="manter()"
              class="btn btn-insumo pull-right col-lg-2"
              style="margin-top: 25px; margin-bottom: 50px;"
            >{{opcao == 'A'? 'ADICIONAR': 'SALVAR'}}</button>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <Listagem
            :dados="perfilsAvante"
            :colunas="colunas"
            :canEditar="podeEditar()"
            :canInativar="podeApagar()"
            @onEditar="Editar"
            @onDelete="Deletar"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- container -->
</template>
<script>
import SubHeader from "../../components/layout/SubHeader";
import Listagem from "../../components/forms/Listagem";
import { TheMask } from "vue-the-mask";
import utils from "../../utils";
import _ from "lodash";
export default {
  components: {
    SubHeader,
    Listagem,
    TheMask,
  },
  data: () => ({
    pesquisando: false,
    perfil: {
      name: "",
    },
    permissoes: [],
    opcao: "A",
    perfils: [],
    colunas: [
      {
        label: "ID",
        field: "id",
      },
      {
        label: "DESCRIÇÃO DO PERFIL",
        field: "name",
      },
      {
        label: "AÇÕES",
        thClass: "text-center",
      },
    ],
  }),
  mounted() {
    let usuario = this.$store.state.auth.user;
    let lista = this.$store.state.auth.user.profile.permissions.filter(
      (f) => f.type.toUpperCase() == "PERFIL" && f.name.includes("list") == true
    );

    if (lista.length == 0) {
      this.$router.push("/");
    }
    this.load();
  },

  computed: {
    perfilsAvante() {
      return this.perfils;
    },
  },
  methods: {
    // ...mapActions({
    //   lista: "empresa/ActionGetList",
    //   delete: "empresa/ActionDelete",
    //   update: "empresa/ActionUpdate",
    //   crete: "empresa/ActionCreate",
    // }),
    pode() {
      return this.opcao == "A" ? this.podeCadastrar() : this.podeEditar();
    },
    podeCadastrar() {
      let usuario = this.$store.state.auth.user;
      let lista = this.$store.state.auth.user.profile.permissions.filter(
        (f) =>
          f.type.toUpperCase() == "PERFIL" &&
          f.name.includes("register") == true
      );

      return lista.length > 0 && this.opcao == "A";
    },
    podeEditar() {
      let usuario = this.$store.state.auth.user;
      let lista = this.$store.state.auth.user.profile.permissions.filter(
        (f) =>
          f.type.toUpperCase() == "PERFIL" && f.name.includes("edit") == true
      );

      return lista.length > 0;
    },
    podeApagar() {
      let usuario = this.$store.state.auth.user;
      let lista = this.$store.state.auth.user.profile.permissions.filter(
        (f) =>
          f.type.toUpperCase() == "PERFIL" && f.name.includes("delete") == true
      );

      return lista.length > 0;
    },
    verificarCep: function (evt) {
      utils
        .getEnderecoCep(evt.target.value)
        .then((r) => {
          this.empresa.cidade = r.data.localidade;
          this.empresa.estado = r.data.uf;
          // this.empresa.bairro = r.data.bairro;
          this.empresa.endereco = r.data.logradouro;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    verificarRequired() {
      if (this.perfil.name == "") {
        this.$swal.fire({
          icon: "warning",
          title: `Atenção`,
          text: "Por favor preencher todos os campos obrigatórios",
        });
        return true;
      }

      return false;
    },
    VerifyCad(key, subItem) {
      if (subItem.label.toUpperCase().includes("VISU") == false) {
        this.permissoes.forEach((el) => {
          let apx = el.filter((c) => c.key == key).map((x) => x.dados);
          if (apx.length > 0) {
            apx.forEach((element) => {
              element.forEach((u) => {
                if (u.label.includes("Vis") == true) {
                  u.checked = true;
                }
              });
            });
          }
        });

        // datas.forEach((element) => {
        //   if (element.label.toUpperCase().includes("VISU") == true) {
        //     element.checked = true;
        //   }
        // });
      }
    },
    manter() {
      if (this.verificarRequired()) return;
      this.pesquisando = true
      this.perfil["permissions"] = [];

      this.permissoes.forEach((el) => {
        el.forEach((element) => {
          this.perfil["permissions"] = [
            ...this.perfil["permissions"],
            ...element.dados
              .filter((f) => f.checked == true)
              .map((x) => {
                return { id: x.id, name: x.name };
              }),
          ];
        });
      });

      console.log(this.perfil.permissions)

      if (this.opcao == "A") {
        this.$store.dispatch("perfil/ActionCreate", this.perfil).then((r) => {
          this.$swal
            .fire({
              icon: "success",
              title: `Sucesso`,
              text: "Perfil adicionado com sucesso",
            })
            .then(() => {
              this.opcao = "A";
              this.perfil = {
                name: "",
              };
              this.load();              
            });
            this.pesquisando = false
        });
      } else {
        this.$store.dispatch("perfil/ActionUpdate", this.perfil).then((r) => {
          this.$swal
            .fire({
              icon: "success",
              title: `Sucesso`,
              text: "Perfil atualizado com sucesso",
            })
            .then(() => {
              this.opcao = "A";
              this.perfil = { name: "" };
              this.load();              
            });
            this.pesquisando = false
        });
      }
    },
    load() {
      this.pesquisando = true
      this.$store.dispatch("perfil/ActionGetListPerfil").then((r) => {
        this.perfils = r;
      });

      this.$store.dispatch("perfil/ActionGetListPermissao").then((r) => {        
        let keys = Object.keys(r);
        let dados = [];
        keys.forEach((el, index) => {
          dados.push({ key: el, dados: r[el] });
        });
        this.permissoes = _.chunk(dados, 4);
        console.log(this.permissoes)
        this.pesquisando = false
      });
    },
    Editar(item) {
      this.pesquisando = true
      this.opcao = "E";
      this.perfil = JSON.parse(JSON.stringify(item));

      this.permissoes.forEach((el) => {
        el.forEach((element) => {
          element.dados.forEach((x) => {
            x.checked = item.permissions.filter((f) => f.id == x.id).length > 0;
          });
        });
      });
      this.$nextTick(() => {
        this.$scrollTop()
        this.pesquisando = false
      }); 
    },
    Deletar(item) {
      this.$swal
        .fire({
          icon: "error",
          title: "Atenção",
          text: "Deseja realmente excluir este perfil?",
          showCloseButton: true,
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: "Não",
          confirmButtonText: "Sim",
        })
        .then((r) => {
          if (r.value) {
            this.$store
              .dispatch("perfil/ActionDelete", { id: item.id })
              .then(() => {
                this.$swal
                  .fire({
                    icon: "success",
                    title: `Sucesso`,
                    text: "Perfil excluido com sucesso",
                  })
                  .then(() => {
                    this.load();
                  });
              });
          }
        });
    },
  },
};
</script>