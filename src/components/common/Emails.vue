<template>
  <div class="col-lg-12">
    <!-- <div class="col-lg-12">
      <label>Email:</label>
    </div>-->
    <h5>Email's</h5>
    <hr />
    <div id="kt_repeater_1" class="col-lg-12">
      <div data-repeater-list>
        <div
          v-for="(item,index) of dados"
          :key="index"
          data-repeater-item
          class="form-group row align-items-center"
        >
          <div class="col-md-4">
            <br />
            <label>Nome:</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="flaticon2-user"></i>
              </span>

              <input
                type="text"
                :disabled="disable"
                v-model="item.observacao"
                class="form-control"
                placeholder="Nome"
              />
            </div>
          </div>
          <div class="col-md-4">
            <br />
            <label>Email:</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="flaticon2-mail"></i>
              </span>

              <input
                type="email"
                v-model="item.email"
                :disabled="disable"
                class="form-control"
                placeholder="Digite um email válido"
              />
            </div>
          </div>

          <div class="col-md-2" v-if="disable ==false">
            <br />
            <br />
            <a
              href="javascript:;"
              @click="deleta(item)"
              data-repeater-delete
              class="btn btn-sm font-weight-bolder btn-light-danger"
            >
              <i class="la la-trash-o"></i>Delete
            </a>
          </div>
        </div>
      </div>

      <div class="form-group row" v-if="disable ==false">
        <label class="col-lg-2 col-form-label text-right"></label>
        <div class="col-lg-4">
          <a
            href="javascript:;"
            data-repeater-create
            @click="inserir()"
            class="btn btn-sm font-weight-bolder btn-light-primary"
          >
            <i class="la la-plus"></i>Add
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dados: Array,

    disable: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (!this.dados) this.dados = [];
    this.aplicaIndex();
    if (this.dados.length == 0) {
      this.inserir();
    }
  },
  methods: {
    aplicaIndex() {
      this.dados.forEach((el, index) => {
        el["index"] = index;
      });
    },
    deleta(item) {
      this.dados = this.dados.filter((x) => x.index !== item.index);
      this.$emit("onAtualizar", this.dados);
    },
    inserir() {
      this.dados.push({
        observacao: "",
        telefone: "",
        index: this.dados.length + 1,
      });
      this.$emit("onAtualizar", this.dados);
    },
  },
  watch: {
    dados(nValue) {
      if (nValue) {
        this.dados = nValue;
        this.aplicaIndex();
      } else {
        this.dados = [];
      }
    },
    disable(nValue) {
      if (nValue) {
        this.disable = nValue;
      }
    },
  },
};
</script>