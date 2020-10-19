<template>
  <div class="container">
    <sub-header :titulo="'TAREFAS DIÁRIAS'" :page="'Tarefas diárias'" />
    <div class="section-wrapper">
      <div v-if="pesquisando == true" class="loader loader-default is-active" data-text="Carregando"></div>

      <div class="mt-2" v-for="(setor,index) in atividades" :key="index">
        <!-- <div class="row"> -->
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
        <!-- </div> -->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import SubHeader from "../../components/layout/SubHeader";

  function initialState() {
    return {
      pesquisando: false,
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
    methods: {
      load() {
        this.pesquisando = true
        this.$store.dispatch("setor/ActionGetList").then(r => {
          this.pesquisando = false
          this.atividades = r
          console.log(r)
        }).catch(err => console.log(err))
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
              this.$store.dispatch("tarefasdiarias/ActionRegister", {
                tipo: "diaria",
                atividade: atividade.id,
                user_id: this.$store.state.auth.user.id,
                executada: true
              }).then(r => {
                console.log(r)
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
              this.$store.dispatch("tarefasdiarias/ActionRegister", {
                tipo: "diaria",
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