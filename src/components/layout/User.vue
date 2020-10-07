<template>
  <div class="container-fluid">
    <div class="slim-header-left">
      <h2 class="slim-logo">
        <a href>
          <div>
            <img src="../../../assets/img/logo_string.png" alt="">
          </div>
        </a>
      </h2>
      <a href id="slimSidebarMenu" class="slim-sidebar-menu">
        <span></span>
      </a>
    </div>
    <!-- slim-header-left -->
    <div class="slim-header-right">
      <!-- <div class="dropdown dropdown-b" data-toggle="tooltip" title="Notificações">
        <a href class="header-notification" data-toggle="dropdown">
          <i class="icon ion-ios-bell-outline" style="color:#50d88b"></i>
          <span class="indicator" style="color:#50d88b"></span>
        </a>
        <div class="dropdown-menu">
          <div class="dropdown-menu-header">
            <h6 class="dropdown-menu-title">Notificações</h6>
            <div>
              <a href>Marcar todas como lidas</a>
            </div>
      </div>-->
      <!-- dropdown-menu-header -->
      <!-- <div class="dropdown-list"> -->
      <!-- loop starts here -->
      <!-- <a href class="dropdown-link">
              <div class="media">
                <img src="http://via.placeholder.com/500x500" alt />
                <div class="media-body">
                  <p>Orçamento 33/2020 recebeu uma cotação para o item PIRACLOSTROBINA7.</p>
                  <span>02 de Abri 2020, 6:08pm</span>
                </div>
      </div>-->
      <!-- media -->
      <!-- </a> -->
      <!-- loop ends here -->
      <!-- <a href class="dropdown-link">
              <div class="media">
                <img src="http://via.placeholder.com/500x500" alt />
                <div class="media-body">
                  <p>Comprador aceitou a nota fiscal enviada para o orçamento 28/2020</p>
                  <span>02 de Abri 2020, 6:08pm</span>
                </div>
      </div>-->
      <!-- media -->
      <!-- </a>
            <a href class="dropdown-link read">
              <div class="media">
                <img src="http://via.placeholder.com/500x500" alt />
                <div class="media-body">
                  <p>Fornecedor enviou a nota fiscal para o orçamento 28/2020</p>
                  <span>02 de Abri 2020, 6:08pm</span>
                </div>
      </div>-->
      <!-- media -->
      <!-- </a>
            <a href class="dropdown-link read">
              <div class="media">
                <img src="http://via.placeholder.com/500x500" alt />
                <div class="media-body">
                  <p>Fornecedor enviou a fatura para o orçamento 28/2020</p>
                  <span>02 de Abri 2020, 6:08pm</span>
                </div>
      </div>-->
      <!-- media -->
      <!-- </a>
            <div class="dropdown-list-footer">
              <a href="#">
                <i class="fa fa-angle-down" style="color:#50d88b"></i> Mostrar todas as notificações
              </a>
            </div>
      </div>-->
      <!-- dropdown-list -->
      <!-- </div> -->
      <!-- dropdown-menu-right -->
      <!-- </div> -->
      <!-- dropdown -->
      <div class="dropdown dropdown-c">
        <a href="#" class="logged-user" data-toggle="dropdown">
          <span>Olá {{nome}}</span>
          <i class="fa fa-angle-down" style="color:#50d88b"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <nav class="nav">
            <!-- <a href="#" class="nav-link">
              <i class="icon ion-person" style="color:#50d88b"></i> Alterar Dados
            </a>

            <a href="#" class="nav-link">
              <i class="icon ion-ios-gear" style="color:#50d88b"></i> Alterar Senha
            </a>-->
            <a @click="sair()" class="nav-link">
              <i class="icon ion-forward" style="color:#50d88b"></i> Sair
            </a>
          </nav>
        </div>
        <!-- dropdown-menu -->
      </div>
      <!-- dropdown -->
    </div>
    <!-- header-right -->
  </div>
  <!-- container-fluid -->

  <!--end::User-->
</template>
<script>
export default {
  name: "user",
  computed: {
    user() {
      console.log(this.$store.state.auth)
      return this.$store.state.auth.user;
    },
    sair() {
      this.$store.dispatch("auth/ActionSingnout").then();
      this.$router.push("/login");
    },
    nome() {
      if (this.user) {
        return this.user.username;
      } else {
        return "";
      }
    },
  },
};
</script>