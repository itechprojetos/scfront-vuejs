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
      weekDays: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
      date: undefined,
      serverTime: undefined,
      time: undefined,
      timerID: undefined,
    }),
    async mounted() {
      const { iso: serverHour } = await this.$store.dispatch('home/ActionGetCurrentHour');
      this.serverTime = this.$moment(serverHour).utcOffset(serverHour);
      this.timerID = setInterval(this.updateTime, 1000);
      this.updateTime();
    },
    destroyed() {
      clearInterval(this.timerID);
    },
    methods: {
      async updateTime() {
        this.serverTime = this.serverTime.add(1, 'second');
        this.time = this.serverTime.format('HH:mm:ss');
        this.date = `${this.serverTime.format('DD/MM/YYYY')} ${this.weekDays[this.serverTime.day()]}`;
      },
      zeroPadding(num, digit) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
          zero += '0';
        }
        return (zero + num).slice(-digit);
      },
      toClockIn() {
        this.$store.dispatch('home/ActionToClockIn', {
          user: this.$store.state.auth.user.id
        }).then(r => {
          this.$swal.fire({
            icon: r.success ? 'success' : 'error',
            title: r.success ? 'Ponto registrado' : 'Falha ao tentar registrar ponto',
            text: r.message,
          });
        }).catch(err => {
          console.log(err)
        });
      }
    },
  };
</script>
