<template>
  <!--begin::Content-->
  <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
    <!--begin::Subheader-->
    <sub-header :titulo="titulo" :buttons="buttons"></sub-header>
    <!--end::Subheader-->
    <!--begin::Entry-->
    <div class="d-flex flex-column-fluid">
      <!--begin::Container-->
      <div class="container">
        <!--begin::Dashboard-->
        <!--begin::Row-->

        <div class="row">
          <div class="col-lg-12">
            <div class="card card-custom gutter-b example example-compact">
              <div class="card-header">
                <div class="card-title">
                  <h3 class="card-label">1. Cadastrando {{nome}}</h3>
                </div>
                <div class="card-toolbar">
                  <ul class="nav nav-tabs nav-bold nav-tabs-line">
                    <li class="nav-item">
                      <a class="nav-link active" data-toggle="tab" href="#cadastro">
                        <span class="nav-icon">
                          <i class="flaticon2-chat-1"></i>
                        </span>
                        <span class="nav-text">Cadastro</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#acesso">
                        <span class="nav-icon">
                          <i class="flaticon2-drop"></i>
                        </span>
                        <span class="nav-text">Acesso</span>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#empresa">
                        <span class="nav-icon">
                          <i class="flaticon2-gear"></i>
                        </span>
                        <span class="nav-text">Empresa</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <!--begin::Form-->
              <form class="form">
                <div class="card-body">
                  <div class="tab-content">
                    <div
                      class="tab-pane fade show active"
                      id="cadastro"
                      role="tabpanel"
                      aria-labelledby="cadastro"
                    >
                      <div class="form-group row">
                        <div class="col-lg-6">
                          <label>Funcionário:</label>
                          <select-populado
                            :list="funcionario"
                            :data="data.id_funcionario"
                            :fieldKey="'id_funcionario'"
                            :fieldText="'pessoa.nome'"
                            :fieldApoio="'apelido'"
                            :disable="opcao=='E'"
                            @onChange="changeUsuario"
                          />
                        </div>

                        <div class="col-lg-6">
                          <label>Email:</label>
                          <input
                            type="email"
                            :disabled="disable || opcao=='E' || (data.login != '' && data.login !=undefined && data.login != null)"
                            v-model="data.login"
                            class="form-control"
                            placeholder="Email"
                          />
                        </div>
                        <div class="col-lg-6">
                          <br />
                          <label>Senha:</label>
                          <input
                            type="password"
                            :disabled="disable"
                            v-model="data.senha"
                            class="form-control"
                            placeholder="Senha"
                          />
                        </div>
                        <div class="col-lg-6">
                          <br />
                          <label>Confirmar Senha:</label>
                          <input
                            type="password"
                            :disabled="disable"
                            v-model="data.confirm"
                            class="form-control"
                            placeholder="Confirmar Senha"
                          />
                        </div>
                      </div>

                      <div class="separator separator-dashed my-10"></div>
                      <div class="form-group row">
                        <div class="col-lg-6">
                          <label>Status:</label> &nbsp;
                          <toggle-button v-model="data.ativo" :sync="true" :labels="true" :font-size="15" :width="80" :height="40"/>
                          <!-- <input
                    data-switch="true"
                    type="checkbox"
                    name="switch"
                    id="test"
                    data-on-color="success"
                    v-model="funcionario.ativo"
                          />-->
                          <span class="form-text text-muted"></span>
                        </div>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="acesso" role="tabpanel" aria-labelledby="acesso">
                      <div v-for="(item,index) of menu" :key="index">
                        <div class="form-group row">
                          <div class="col-lg-11">
                            <br />
                            <br />
                            <b>&nbsp;&nbsp; {{item.menu}}</b>
                          </div>
                        </div>
                        <div class="form-group row">
                          <div
                            v-for="(el,idx) of item.funcionalidades"
                            :key="idx"
                            class="checkbox-list col-lg-2"
                            style="margin-top: 32px;"
                          >
                            <label class="checkbox">
                              <input type="checkbox" name="Checkboxes1" v-model="el.checked" />
                              <span></span>
                              {{el.descricao}}
                            </label>
                            <label class="checkbox checkbox-disabled">
                              <input
                                type="checkbox"
                                disabled="disabled"
                                checked="checked"
                                name="Checkboxes1"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="tab-pane fade"
                      id="empresa"
                      role="tabpanel"
                      aria-labelledby="empresa"
                    >
                      <div class="row col-sm-12">
                        <label>Selecione as <br>Empresas de acesso:</label>
                        <br />
                        <div class="col-lg-4 col-md-9 col-sm-12">
                          <Select2
                            v-model="empresa"
                            :options="empresas"
                            :settings="{ disabled: disable,multiple:'multiple' }"
                          />
                          <!-- <select
                            class="form-control select2"
                            id="kt_select2_3"
                            name="param"
                            multiple="multiple"
                          >
                            <optgroup>
                              <option value="CA">California</option>
                              <option value="NV" selected="selected">Nevada,Oregon</option>
                              <option value="OR">Oregon</option>
                              <option value="WA">Washington</option>
                            </optgroup>
                          </select>-->
                        </div>
                      </div>

                      <!-- 
                      <div class="form-group row">
                        <div class="col-lg-12">
                          <label>Empresa:</label>
                          <select-populado
                            :list="empresas"
                            :data="empresa.id_empresa"
                            :fieldKey="'id_empresa'"
                            :fieldText="'pessoa.nome'"
                            @onChange="changeEmpresa"
                          />
                        </div>
                      </div>
                      -->
                    </div>
                  </div>
                </div>

                <div class="card-footer">
                  <div class="row">
                    <div class="col-lg-12 ml-lg-auto">
                      <button
                        type="button"
                        @click="salvar()"
                        class="btn btn-primary mr-2"
                      >{{`Próximo / Gravar`}}</button>
                    </div>
                  </div>
                </div>
              </form>
              <!--end::Form-->
            </div>
          </div>
        </div>

        <!--begin::Row-->

        <!--end::Row-->
        <!--end::Dashboard-->
      </div>
      <!--end::Container-->
    </div>
    <!--end::Entry-->
  </div>
  <!--end::Content-->
</template>
<script>
import Select2 from "v-select2-component";
import SubHeader from "../layout/SubHeader";
import SelectPopulado from "../forms/SelectPopulado";
import { mapActions, mapState } from "vuex";
import * as _ from "lodash";
export default {
  props: {
    data: Object,
    disable: Boolean,
    titulo: String,
    nome: String,
    buttons: {
      type: Array,
      default: new Array(),
    },
    opcao: String,
    usuarios: Array,
  },
  components: {
    SubHeader,
    SelectPopulado,
    Select2,
  },
  data: () => ({
    obj: {
      id_usuario: 0,
    },
    option: {},
    funcionalidades: [],
    funcUser: [],
    usuario: {},
    funcionario: [],
    empresas: [],
    empresa: [],
    tela: "",
  }),
  computed: {
    ...mapState("auth", ["user"]),
    idUsuario: {
      set(item) {
        this.obj.id_usuario = item;
      },
      get() {
        return this.obj.id_usuario;
      },
    },
    btnLabel() {
      if (this.opcao == "A") {
        return "Adicionar";
      } else {
        return "Atualizar";
      }
    },
    menu() {
      let dados = [];

      this.funcionalidadesUsuario.forEach((el) => {
        this.funcionalidades.find(
          (x) => x.id_funcionalidade == el.id_funcionalidade
        )["checked"] = true;
        this.funcionalidades.find(
          (x) => x.id_funcionalidade == el.id_funcionalidade
        )["id_usuario_funcionalidade"] = el.id_usuario_funcionalidade;
      });

      let initial = _.groupBy(this.funcionalidades, "menu");
      for (let i in initial) {
        dados.push({
          menu: i,
          funcionalidades: initial[i],
        });
      }
      return dados;
    },
    funcionalidadesUsuario: {
      get() {
        return this.funcUser;
      },
      set(nValue) {
        this.funcUser = nValue;
      },
    },
    telas() {
      return this.tela;
    },
  },
  mounted() {
    if (this.data.id_usuario) {
      this.funcionalidadesUsuario = this.data.funcionalidadesHabilitadas;
      this.empresa = this.data.empresasHabilitadas.map((x) => x.id_empresa);
    }

    if (this.opcao == "A") {
      this.data.ativo = true;
    }
    this.ActionGetEmpresasAtivos().then((r) => {
      this.empresas = r;
      this.empresas = this.empresas.map((x) => {
        return {
          id: x.id_empresa,
          text: x.pessoa.nome,
        };
      });
    });
    this.ActionGetFuncionalidades().then((r) => {
      this.funcionalidades = r;
    });
    this.ActionGetListFuncionarios().then((r) => {
      this.funcionario = r;
      if (this.opcao == "A") {
        this.funcionario = this.funcionario.filter((f) => f.ativo == true);
        this.funcionario = this.funcionario.filter(
          (f) =>
            this.usuarios.filter((x) => x.id_funcionario == f.id_funcionario)
              .length == 0
        );
      }
    });
  },
  watch: {
    opcao(nValue) {
      if (nValue) {
        this.opcao = nValue;
      }
    },
    usuarios(nValue) {
      if (nValue) {
        this.usuarios = nValue;
        this.funcionario = this.funcionario.filter(
          (f) =>
            this.usuarios.filter((x) => x.id_funcionario == f.id_funcionario)
              .length == 0
        );
      }
    },
    data(nValue) {
      if (nValue) {
        this.data = nValue;
        if (this.data.id_usuario) {
          this.funcionalidadesUsuario = this.data.funcionalidadesHabilitadas;
          this.empresa = this.data.empresasHabilitadas.map((x) => x.id_empresa);
        }
      }
    },
    disable(nValue) {
      if (nValue) {
        this.disable = nValue;
      }
    },
    titulo(nValue) {
      if (nValue) {
        this.titulo = nValue;
      }
    },
    nome(nValue) {
      if (nValue) {
        this.nome = nValue;
      }
    },
    buttons(nValue) {
      if (nValue) {
        this.buttons = nValue;
      }
    },
  },
  methods: {
    ...mapActions("funcionario", ["ActionGetListFuncionarios"]),
    ...mapActions("empresa", ["ActionGetEmpresasAtivos"]),
    ...mapActions("perfilAcesso", [
      "ActionGetFuncionalidades",
      "ActionPostFuncionalidadeUsuario",
    ]),
    voltar() {
      this.$emit("onCancel", true);
    },
    changeEmpresa(item) {
      this.empresa.id_empresa = item;
    },
    changeUsuario(item) {
      this.data.id_funcionario = item;
      let v = this.funcionario.filter((f) => f.id_funcionario == item)[0];
      this.data.login = v.pessoa.emails ? v.pessoa.emails[0].email : "";
    },
    salvar() {
      let tela = window.$(".active").prop("href");

      if (tela.includes("cadastro")) {
        window.$('a[href*="acesso"]').click();
        this.tela = "acesso";
      } else if (tela.includes("acesso")) {
        window.$('a[href*="empresa"]').click();
        this.tela = "empresa";
      } else if (tela.includes("empresa")) {
        if (this.data.id_funcionario == 0) {
          this.$swal.fire({
            icon: "warning",
            title: "Atenção",
            text: "Favor Preencher o campo Funcionário",
          });
          return;
        }

        if (this.data.senha == "" || this.data.confirm == "") {
          this.$swal.fire({
            icon: "warning",
            title: "Atenção",
            text: "Favor Preencher o campo Senha e/ou Confirmar Senha",
          });
          return;
        }
        if (this.data.senha != this.data.confirm) {
          this.$swal.fire({
            icon: "warning",
            title: "Atenção",
            text: "Campo Senha e Confirmação de senha não estão iguais!",
          });
          return;
        }

        if (this.funcionalidades.filter((f) => f.checked == true).length == 0) {
          this.$swal.fire({
            icon: "warning",
            title: "Atenção",
            text:
              "Por favor selecionar na aba acessos algum acesso para o Usuário do sistema!",
          });
          return;
        }

        if (this.empresa.length == 0) {
          this.$swal.fire({
            icon: "warning",
            title: "Atenção",
            text:
              "Por favor selecionar na aba empresas pelo menos uma empresa que o usuário terá acesso!",
          });
          return;
        }
        this.data["funcionalidades"] = this.funcionalidades.filter(
          (x) => x.checked == true
        );
        this.data["empresas"] = this.empresa;

        this.$emit("onSave", this.data);
      }
    },
  },
};
</script>