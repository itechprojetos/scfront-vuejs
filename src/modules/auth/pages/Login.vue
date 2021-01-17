<template>
  <div>
    <div
        v-if="pesquisando == true"
        class="loader loader-default is-active"
        data-text="Carregando"
      ></div>
    <div class="d-md-flex flex-row-reverse">
      <div class="signin-right">
        <div class="signin-box">
          <h2 class="signin-title-primary">Bem-Vindo!</h2>
          <h3 class="signin-title-secondary">Acesse para continuar.</h3>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              v-model="form.contribuinte"
              placeholder="Digite seu contribuinte"
            />
          </div>
          <!-- form-group -->
          <div class="form-group mg-b-50">
            <input
              type="password"
              v-model="form.password"
              class="form-control"
              placeholder="Digite sua senha"
            />
          </div>
          <!-- form-group -->
          <!-- <p class="mg-b-0">Esqueceu sua senha? <a href="#" data-toggle="modal" data-target="#recoveyPassword">Clique Aqui!</a></p> -->
          <button
            type="button"
            @click="submit()"
            :disabled="form.contribuinte == '' || form.password == '' || vcaptcha == false"
            class="btn btn-block btn-insumo"
          >Entrar</button>
          <br />
          <!-- <vue-recaptcha
            sitekey="6LcSqc8ZAAAAACbi5tBzFW_VRoqY_D5yyUOZZQXB"
            ref="recaptcha"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired">            
          </vue-recaptcha> -->
        </div>        
      </div>
      
      <!-- signin-right -->
      <div class="signin-left">
        <div class="signin-box">
          <div class="mb-4">
            <img src="../../../../assets/img/logo_string.png" alt="">
          </div>
          <h2 class="slim-logo">
            <router-link to="/login">
              sistema de </br> gestão inteligente.
            </router-link>
          </h2>
          <p>
            String Cleasing é uma plataforma de gestão interna, que possibilita 
            o usuário fazer diversos controles e ações direto de um sistema gestor.
          </p>
          <p>
            Através da nossa plataforma você vai poder cadastrar usuários, gerenciar
             permissões de acesso, gerenciar rotinas do dia e diversas outras 
             funcionalidades.
          </p>
          <p class="tx-12">&copy; Copyright 2020. Todos os Direitos Reservados.</p>
        </div>
      </div>
      <!-- signin-left -->
    </div>
    <!-- d-flex -->

    <!-- MODAL GRID -->
    <div id="recoveyPassword" class="modal fade">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content bd-0 bg-transparent rounded overflow-hidden">
          <div class="modal-body pd-0">
            <div class="row no-gutters">
              <div class="col-lg-6 bg-insumo">
                <div class="pd-40">
                  <p></p>
                  <h4 class="slim-logowhite">
                    <router-link to="/login">
                      StringCleasing
                      <span>.</span>
                    </router-link>
                  </h4>

                  <p class="tx-white op-7 mg-b-30">
                    String Cleasing é uma plataforma de gestão interna, que possibilita
                     o usuário fazer diversos controles e ações direto de um sistema
                      gestor.
                  </p>
                  <p class="tx-white op-7 mg-b-30">
                    Através da nossa plataforma você vai poder cadastrar usuários,
                     gerenciar permissões de acesso, gerenciar rotinas do dia e 
                     diversas outras funcionalidades.
                  </p>
                  <br />
                </div>
              </div>
              <!-- col-6 -->
              <div class="col-lg-6 bg-white">
                <div class="pd-y-30 pd-xl-x-30">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div class="pd-x-30 pd-y-10">
                    <h3 class="tx-gray-800 tx-normal mg-b-5">Recuperar Senha!</h3>
                    <p>Olá, informe o seu e-mail cadastrado e enviaremos uma senha novinha para você.</p>
                    <br />
                    <div class="form-group">
                      <input
                        type="email"
                        name="email"
                        class="form-control pd-y-12"
                        placeholder="Qual o seu e-mail cadastrado?"
                      />
                    </div>
                    <!-- form-group -->

                    <button class="btn btn-insumo pd-y-12 btn-block">Enviar Senha</button>
                  </div>
                </div>
                <!-- pd-20 -->
              </div>
              <!-- col-6 -->
            </div>
            <!-- row -->
          </div>
          <!-- modal-body -->
        </div>
        <!-- modal-content -->
      </div>
      <!-- modal-dialog -->
    </div>
    <!-- modal -->
  </div>
</template>
<script>
  import VueRecaptcha from 'vue-recaptcha';
export default {
  components:{
    VueRecaptcha
  },
  data: () => ({
    pesquisando: false,
    vcaptcha: true,
    form: {      
      contribuinte: "",
      password: "",
    },
  }),
  methods: {
    submit() {
      this.pesquisando = true
      this.$store
        .dispatch("auth/ActionDoLogin", this.form)
        .then(() => {
          this.pesquisando = false
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err)
          this.$swal.fire({
            icon: "error",
            title: `Aviso`,
            text: "E-Mail ou Senha inválidos. Por favor, entrar com credenciais válidas.",
          });
          this.pesquisando = false
        });
    },
    async onCaptchaVerified(response) {
      this.vcaptcha = true
    },
    async onCaptchaExpired() {
      this.vcaptcha = false
    }
  },
};
</script>