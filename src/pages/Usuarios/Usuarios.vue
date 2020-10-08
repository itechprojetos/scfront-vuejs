<template>
  <div class="container">
    <sub-header :titulo="'CONFIGURAÇÕES - USUÁRIOS'" :page="'Usuários'" />

    <div class="section-wrapper">
      <div
        v-if="pesquisando == true"
        class="loader loader-default is-active"
        data-text="Carregando"
      ></div>
      <div>
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label">Nome do Usuário</label>
              <span class="tx-danger">*</span>
              <input
                id="username"
                v-model="usuario.username"
                class="form-control"
                name="username"
                type="text"
              />
            </div>
            <!-- form-group -->
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label">Email</label>
              <span class="tx-danger">*</span>
              <input
                id="email"
                v-model="usuario.email"
                class="form-control"
                name="email"
                type="email"
              />
            </div>
            <!-- form-group -->
          </div>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label">Contribuinte</label>
              <span class="tx-danger">*</span>
              <the-mask
                :masked="true"
                v-model="usuario.cpf"
                :mask="['###.###.###']"
                class="form-control"
              />
            </div>
            <!-- form-group -->
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label class="form-control-label">Telefone</label>
              <span class="tx-danger">*</span>
              <the-mask
                :masked="true"
                v-model="usuario.telefone"
                :mask="['+### ### ### ###']"
                class="form-control"
              />
            </div>
            <!-- form-group -->
          </div>
        </div>

        <div class="row">
          <div class="col-lg-4">
            <div class="form-group">
              <label class="form-control-label">Senha</label>
              <span class="tx-danger">*</span>
              <input
                id="password"
                v-model="usuario.password"
                class="form-control"
                name="password"
                type="password"
              />
            </div>
            <!-- form-group -->
          </div>
          <div class="col-lg-4">
            <div class="form-group">
              <label class="form-control-label">Confirmar a Senha</label>
              <span class="tx-danger">*</span>
              <input
                id="password_confirmation"
                v-model="usuario.password_confirmation"
                class="form-control"
                name="password_confirmation"
                type="password"
              />
            </div>
            <!-- form-group -->
          </div>
          <div class="col-lg-4">
            <div class="form-group">
              <label class="form-control-label">Perfil de acesso</label>
              <span class="tx-danger">*</span>
              <select v-model="usuario.role" name="perfil-usuario" id class="form-control">
                <option value>Selecione</option>
                <option v-for="(item,index) in perfis" :key="index" :value="item.id">{{item.name}}</option>
              </select>
            </div>
            <!-- form-group -->
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
            :dados="usuariosAvante"
            :colunas="colunas"
            @onEditar="Editar"
            @onDelete="Deletar"
            :canEditar="podeEditar()"
            :canInativar="podeApagar()"
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
export default {
  components: {
    SubHeader,
    Listagem,
    TheMask,
  },
  data: () => ({
    pesquisando: false,
    usuario: {
      username: "",
      cpf: "",
      telefone: "",
      role: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    opcao: "A",
    usuarios: [],
    perfis: [],
    colunas: [
      {
        label: "Contribuinte",
        field: "cpf",
      },
      {
        label: "NOME",
        field: "username",
      },
      {
        label: "EMAIL",
        field: "email",
      },
      {
        label: "TELEFONE",
        field: "telefone",
      },
      {
        label: "AÇÃO",
        thClass: "text-center",
      },
    ],
  }),
  mounted() {
    let usuario = this.$store.state.auth.user;
    this.perfis = this.$store.state.auth.roles;
    console.log(this.$store.state)
    this.load();
  },

  computed: {
    usuariosAvante() {
      return this.usuarios;
    },
  },
  methods: {
    pode() {
    },
    podeCadastrar() {
    },
    podeEditar() {
    },
    podeApagar() {
    },
    verificarRequired() {
      console.log(this.usuario)
        if(
          this.usuario.username === '' ||
          this.usuario.email === '' ||
          this.usuario.cpf === '' ||
          this.usuario.telefone === '' ||
          this.usuario.password === '' ||
          this.usuario.password_confirmation === '' ||
          this.usuario.role === '' ||
          this.usuario.role === null ||
          this.usuario.role === undefined
        ){
          this.$swal
          .fire({
            icon: "error",
            title: "Error",
            text: "Os campos obrigatórios devems ser preenchidos!",
        });
         return true
        } else if(this.usuario.password !== this.usuario.password_confirmation){
          this.$swal
          .fire({
            icon: "error",
            title: "Error",
            text: "Os passwords não são iguais!",
        });
          return true
        }
        return false
    },
    manter() {
      if ( this.verificarRequired() ) {
        return
      }
      this.pesquisando = true
      console.log(this.usuario)
      if (this.opcao === 'A'){
        this.$store.dispatch('usuario/ActionCreate',this.usuario).then(r => {
          this.pesquisando = false
          this.$swal
            .fire({
              icon: "success",
              title: `Sucesso`,
              text: "Perfil adicionado com sucesso",
            });
        })
      }
    },
    load() {
      this.pesquisando = true;

      this.$store.dispatch('usuario/ActionGetList').then(r =>{
        this.pesquisando=false
        this.usuarios = r
        console.log(this.usuarios)
      }).catch(err =>{
        pesquisando = false
      })

    },
    Editar(item) {
      this.usuario = item
    },
    Deletar(item) {
    },
  },
};
</script>