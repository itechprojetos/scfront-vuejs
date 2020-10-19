<template>
  <div class="container">
    <div class="slim-pageheader">
      <ol class="breadcrumb slim-breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Home</a>
        </li>
      </ol>
      <h6 class="slim-pagetitle">HOME</h6>
    </div>
    <!-- slim-pageheader -->

    <div class="section-wrapper">
      <div class="col-12 mb-3">
        <div>
          <span class="font-weight-bold text-dark" style="font-size: 14px;">REGISTRO DE PONTO ELETRÔNICO</span>
          <hr />
        </div>

        <div class="clock">
          <p class="clock date">{{ date }}</p>
          <p class="clock time">{{ time }}</p>
        </div>

        <div class="col-lg-12">
          <button @click="toClockIn()" class="btn btn-insumo pull-right">REGISTRAR PONTO</button>
        </div>
      </div>
    </div>

  </div>
  <!-- container -->
</template>
<script>
  export default {
    data: () => ({
      date: undefined,
      time: undefined,
      timerID: undefined,
    }),
    mounted() {
      this.timerID = setInterval(this.updateTime, 1000);
      this.updateTime();
    },
    destroyed() {
      clearInterval(this.timerID);
    },
    methods: {
      updateTime() {
        var week = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
        var cd = new Date();
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
        this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
      },
      zeroPadding(num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      },
      toClockIn() {
        let ponto = {
          user: this.$store.state.auth.user.id
        }
        this.$store.dispatch('home/ActionToClockIn', ponto).then(r => {
          if (r === 'Ponto registrado com sucesso') {
            this.$swal
              .fire({
                icon: "success",
                title: `Sucesso`,
                text: "Ponto de entrada registrado com sucesso",
              });
          } else if (r === 'Ponto de Entrada já cadastrado') {
            this.$swal
              .fire({
                icon: "error",
                title: `Error`,
                text: "Ponto de entrada ja registrado!",
              });
          } else if (r === 'Ponto de Saída já cadastrado') {
            this.$swal
              .fire({
                icon: "error",
                title: `Error`,
                text: "Ponto de saida ja registrado!",
              });
          } else if (r === 'Fora do horário de registro de ponto.') {
            this.$swal
              .fire({
                icon: "error",
                title: `Error`,
                text: "Fora do horário de ponto!",
              });
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
  };
</script>