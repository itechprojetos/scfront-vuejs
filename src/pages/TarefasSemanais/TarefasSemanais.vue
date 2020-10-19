<template>
  <div class="container">
    <sub-header :titulo="'TAREFAS SEMANAIS'" :page="'Tarefas semanais'" />
    <div class="section-wrapper">
      <div v-if="pesquisando == true" class="loader loader-default is-active" data-text="Carregando"></div>
      <div v-if="empty">
        <span>Nenhuma atividade diária registrada</span>
      </div>
      <!-- Segunda-Feira -->
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
              height: 100%;" v-if="hasSegunda">
        <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;" class="section-title">
          Segunda-Feira
        </legend>

        <div class="mt-2" v-for="(setor,index) in atividades.segunda" :key="index">
          <div class="col-12">
            <label class="section-title">Setor {{setor.nome}}</label>
          </div>
          <div class="border-bottom" v-for="(atividade,index) in setor.atividade_semanals">
            <div class="row">
              <div class="col-9 mt-1" style="align-self: flex-end;">
                <span>
                  {{atividade.nome}}
                </span>
              </div>
              <div class="col-3" style="align-self: flex-end;">
                <span>Executada</span>
                <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                  <i class="icon ion-android-checkbox" style="color: green;" />
                </a>
                <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                  <i class="icon ion-android-checkbox" style="color: red;" />
                </a>
                <span> Não Executada</span>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Terça Feira -->
      <fieldset class="mt-4" style="
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
              height: 100%;" v-if="hasTerca">
        <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;" class="section-title">
          Terça-Feira
        </legend>
        <div class="mt-2" v-for="(setor,index) in atividades.terca" :key="index">
          <div class="col-12">
            <label class="section-title">Setor {{setor.nome}}</label>
          </div>
          <div class="border-bottom" v-for="(atividade,index) in setor.atividade_semanals">
            <div class="row">
              <div class="col-9 mt-1" style="align-self: flex-end;">
                <span>
                  {{atividade.nome}}
                </span>
              </div>
              <div class="col-3" style="align-self: flex-end;">
                <span>Executada</span>
                <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                  <i class="icon ion-android-checkbox" style="color: green;" />
                </a>
                <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                  <i class="icon ion-android-checkbox" style="color: red;" />
                </a>
                <span> Não Executada</span>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Quarta-Feira -->
      <fieldset class="mt-4" style="
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
              height: 100%;" v-if="hasQuarta">
        <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;" class="section-title">
          Quarta-Feira
        </legend>
        <div class="mt-2" v-for="(setor,index) in atividades.quarta" :key="index">
          <div class="col-12">
            <label class="section-title">Setor {{setor.nome}}</label>
          </div>
          <div class="border-bottom" v-for="(atividade,index) in setor.atividade_semanals">
            <div class="row">
              <div class="col-9 mt-1" style="align-self: flex-end;">
                <span>
                  {{atividade.nome}}
                </span>
              </div>
              <div class="col-3" style="align-self: flex-end;">
                <span>Executada</span>
                <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                  <i class="icon ion-android-checkbox" style="color: green;" />
                </a>
                <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                  <i class="icon ion-android-checkbox" style="color: red;" />
                </a>
                <span> Não Executada</span>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Quinta-Feira -->
      <fieldset class="mt-4" style="
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
              height: 100%;" v-if="hasQuinta">
        <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;" class="section-title">
          Quinta-Feira
        </legend>
        <div class="mt-2" v-for="(setor,index) in atividades.quinta" :key="index">
          <div class="col-12">
            <label class="section-title">Setor {{setor.nome}}</label>
          </div>
          <div class="border-bottom" v-for="(atividade,index) in setor.atividade_semanals">
            <div class="row">
              <div class="col-9 mt-1" style="align-self: flex-end;">
                <span>
                  {{atividade.nome}}
                </span>
              </div>
              <div class="col-3" style="align-self: flex-end;">
                <span>Executada</span>
                <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                  <i class="icon ion-android-checkbox" style="color: green;" />
                </a>
                <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                  <i class="icon ion-android-checkbox" style="color: red;" />
                </a>
                <span> Não Executada</span>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Sexta-Feira -->
      <fieldset class="mt-4" style="
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
              height: 100%;" v-if="hasSexta">
        <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;" class="section-title">
          Sexta-Feira
        </legend>
        <div class="mt-2" v-for="(setor,index) in atividades.sexta" :key="index">
          <div class="col-12">
            <label class="section-title">Setor {{setor.nome}}</label>
          </div>
          <div class="border-bottom" v-for="(atividade,index) in setor.atividade_semanals">
            <div class="row">
              <div class="col-9 mt-1" style="align-self: flex-end;">
                <span>
                  {{atividade.nome}}
                </span>
              </div>
              <div class="col-3" style="align-self: flex-end;">
                <span>Executada</span>
                <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                  <i class="icon ion-android-checkbox" style="color: green;" />
                </a>
                <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                  <i class="icon ion-android-checkbox" style="color: red;" />
                </a>
                <span> Não Executada</span>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Sabado -->
      <fieldset class="mt-4" style="
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
              height: 100%;" v-if="hasSabado">
        <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;" class="section-title">
          Sábado
        </legend>
        <div class="mt-2" v-for="(setor,index) in atividades.sabado" :key="index">
          <div class="col-12">
            <label class="section-title">Setor {{setor.nome}}</label>
          </div>
          <div class="border-bottom" v-for="(atividade,index) in setor.atividade_semanals">
            <div class="row">
              <div class="col-9 mt-1" style="align-self: flex-end;">
                <span>
                  {{atividade.nome}}
                </span>
              </div>
              <div class="col-3" style="align-self: flex-end;">
                <span>Executada</span>
                <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                  <i class="icon ion-android-checkbox" style="color: green;" />
                </a>
                <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                  <i class="icon ion-android-checkbox" style="color: red;" />
                </a>
                <span> Não Executada</span>
              </div>
            </div>
          </div>
        </div>
      </fieldset>

      <!-- Domingo -->
      <fieldset class="mt-4" style="
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
              height: 100%;" v-if="hasDomingo">
        <legend style="                
                display: block;
                width:auto;
                padding-inline-start: 2px;
                padding-inline-end: 2px;
                background-color:white;" class="section-title">
          Domingo
        </legend>
        <div class="mt-2" v-for="(setor,index) in atividades.domingo" :key="index">
          <div class="col-12">
            <label class="section-title">Setor {{setor.nome}}</label>
          </div>
          <div class="border-bottom" v-for="(atividade,index) in setor.atividade_semanals">
            <div class="row">
              <div class="col-9 mt-1" style="align-self: flex-end;">
                <span>
                  {{atividade.nome}}
                </span>
              </div>
              <div class="col-3" style="align-self: flex-end;">
                <span>Executada</span>
                <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                  <i class="icon ion-android-checkbox" style="color: green;" />
                </a>
                <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                  <i class="icon ion-android-checkbox" style="color: red;" />
                </a>
                <span> Não Executada</span>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <!-- <div class="mt-2" v-for="(setor,index) in atividades" :key="index">
        <div class="col-12">
          <label class="section-title">Setor {{setor.nome}}</label>
        </div>
        <div class="border-bottom" v-for="(atividade,index) in setor.atividade_diaria">
          <div class="row">
            <div class="col-9 mt-1" style="align-self: flex-end;">
              <span>
                {{atividade.nome}}
              </span>
            </div>
            <div class="col-3" style="align-self: flex-end;">
              <span>Executada</span>
              <a class="btn" style="padding: 0px;" role="button" @click="done(atividade)">
                <i class="icon ion-android-checkbox" style="color: green;" />
              </a>
              <a class="btn" style="padding: 0px;" role="button" @click="notdone(atividade)">
                <i class="icon ion-android-checkbox" style="color: red;" />
              </a>
              <span> Não Executada</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
  </div>
</template>

<script>
  import SubHeader from "../../components/layout/SubHeader";

  function initialState() {
    return {
      pesquisando: false,
      empty: true,
      atividades: [],
    }
  }

  export default {
    components: {
      SubHeader,
    },
    data: () => {
      return initialState();
    },
    mounted() {
      this.load()
    },
    computed: {
      hasSegunda() {
        if (this.atividades.segunda && this.atividades.segunda.length > 0) {
          this.empty = false
          return true
        } else {
          return false
        }
      },
      hasTerca() {
        if (this.atividades.terca && this.atividades.terca.length > 0) {
          this.empty = false
          return true
        } else {
          return false
        }
      },
      hasQuarta() {
        if (this.atividades.quarta && this.atividades.quarta.length > 0) {
          this.empty = false
          return true
        } else {
          return false
        }
      },
      hasQuinta() {
        if (this.atividades.quinta && this.atividades.quinta.length > 0) {
          this.empty = false
          return true
        } else {
          return false
        }
      },
      hasSexta() {
        if (this.atividades.sexta && this.atividades.sexta.length > 0) {
          this.empty = false
          return true
        } else {
          return false
        }
      },
      hasSabado() {
        if (this.atividades.sabado && this.atividades.sabado.length > 0) {
          this.empty = false
          return true
        } else {
          return false
        }
      },
      hasDomingo() {
        if (this.atividades.domingo && this.atividades.domingo.length > 0) {
          this.empty = false
          return true
        } else {
          return false
        }
      },
    },
    methods: {
      load() {
        this.pesquisando = true
        this.$store.dispatch("tarefassemanais/ActionGetList").then(r => {
          this.pesquisando = false
          this.atividades = r
          console.log(r)
        })
      },
      done(atividade) {
        this.$swal
          .fire({
            icon: "warning",
            title: "Atenção",
            text: "Deseja realmente registrar esta atividade como executada?",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Não",
            confirmButtonText: "Sim",
          })
          .then((r) => {
            if (r.value) {
              this.$store.dispatch("tarefassemanais/ActionRegister", {
                tipo: "semanal",
                atividade: atividade.id,
                user_id: this.$store.state.auth.user.id,
                executada: true
              }).then(r => {
                if (r == "Atividade ja registrada para esta data!") {
                  this.$swal
                    .fire({
                      icon: "error",
                      title: "Atenção",
                      text: "Esta atividade já foi registrada na data de hoje!",
                      showCloseButton: true,
                    })
                } else if (r == "Fora do horario de registro de atividades!") {
                  this.$swal
                    .fire({
                      icon: "error",
                      title: "Atenção",
                      text: "Fora do horário de registro de atividades!",
                      showCloseButton: true,
                    })
                } else {
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Atividade registrada com sucesso",
                    })
                }
              }).catch(error => {
                console.log(error)
              })
            }
          })
      },
      notdone(atividade) {
        this.$swal
          .fire({
            icon: "warning",
            title: "Atenção",
            text: "Deseja realmente registrar esta atividade como não executada?",
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Não",
            confirmButtonText: "Sim",
          })
          .then((r) => {
            if (r.value) {

              this.$store.dispatch("tarefassemanais/ActionRegister", {
                tipo: "semanal",
                atividade: atividade.id,
                user_id: this.$store.state.auth.user.id,
                executada: false
              }).then(r => {
                if (r == "Atividade ja registrada para esta data!") {
                  this.$swal
                    .fire({
                      icon: "error",
                      title: "Atenção",
                      text: "Esta atividade já foi registrada na data de hoje!",
                      showCloseButton: true,
                    })
                } else if (r == "Fora do horario de registro de atividades!") {
                  this.$swal
                    .fire({
                      icon: "error",
                      title: "Atenção",
                      text: "Fora do horário de registro de atividades!",
                      showCloseButton: true,
                    })
                } else {
                  this.$swal
                    .fire({
                      icon: "success",
                      title: `Sucesso`,
                      text: "Atividade registrada com sucesso",
                    })
                }
              }).catch(error => {
                console.log(error)
              })
            }
          })
      }
    }
  }
</script>