<template>
  <div class="card card-custom gutter-b example example-compact">
    <div class="card-header">
      <h3 class="card-title">{{ordem}}. Informações Bancária</h3>
    </div>
    <!--begin::Form-->
    <div class="card-body">
      <div class="form-group row">
        <div class="col-lg-3">
          <br />
          <label>Código do Banco:</label>
          <div class="input-group">
            <input
              v-model="objeto.codigo_banco"
              :disabled="disable"
              type="number"
              class="form-control"
              placeholder="Código do Banco"
              maxlength="5"
            />
          </div>
        </div>

        <div class="col-lg-4">
          <br />
          <label>Nome do Banco:</label>
          <div class="input-group">
            <input
              v-model="objeto.banco"
              :disabled="disable"
              type="text"
              class="form-control"
              placeholder="Banco"
            />
          </div>
        </div>
        <div class="col-lg-4">
          <br />
          <label>Tipo:</label>
          <select-populado
            :list="tipos"
            :data="objeto.tipo"
            :fieldKey="'label'"
            :fieldText="'value'"
            @onChange="AlterarTipo"
          />
        </div>

        <div class="col-lg-4">
          <br />
          <label>Agência:</label>
          <div class="input-group">
            <input
              v-model="objeto.agencia"
              :disabled="disable"
              type="text"
              class="form-control"
              placeholder="Agência"
            />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="la la-bookmark-o"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="col-lg-1">
          <br />
          <label>DV:</label>
          <div class="input-group">
            <input
              v-model="objeto.dv_agencia"
              :disabled="disable"
              type="text"
              class="form-control"
              placeholder="DV"
              maxlength="2"
            />
          </div>
        </div>

        <div class="col-lg-4">
          <br />
          <label>Conta:</label>
          <div class="input-group">
            <input
              v-model="objeto.conta"
              :disabled="disable"
              type="text"
              class="form-control"
              placeholder="Conta"
            />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="la la-map-marker"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="col-lg-1">
          <br />
          <label>DV:</label>
          <div class="input-group">
            <input
              v-model="objeto.dv_conta"
              :disabled="disable"
              type="text"
              class="form-control"
              placeholder="DV"
              maxlength="2"
            />
          </div>
        </div>
        <div class="col-lg-6">
          <br />
          <label>Favorecido:</label>
          <input
            type="text"
            :disabled="disable"
            v-model="objeto.favorecido"
            class="form-control"
            placeholder="Favorecido"
          />
        </div>
        <div class="col-lg-6">
          <br />
          <label>CPF / CNPJ:</label>
          <the-mask
            :masked="false"
            v-model="objeto.identificador"
            :mask="['###.###.###-##','##.###.###/####-##']"
            class="form-control"
            placeholder="CPF / CNPJ"
          />
        </div>

        <div class="col-lg-12">
          <br />
          <label>Observação:</label>
          <textarea
            :disabled="disable"
            v-model="objeto.observacao"
            rows="5"
            class="form-control"
            placeholder="Observação"
          ></textarea>
        </div>
      </div>
    </div>

    <!--end::Form-->
  </div>
</template>
<script>
import { TheMask } from "vue-the-mask";
import SelectPopulado from "../forms/SelectPopulado.vue";
export default {
  props: {
    objeto: Object,
    disable: Boolean,
    ordem: Number,
  },
  data: () => ({
    tipos: [
      { label: "POUPANÇA", value: "POUPANÇA" },
      { label: "CORRENTE", value: "CORRENTE" },
      { label: "SALÁRIO", value: "SALÁRIO" },
      // { label: "JURÍDICA", value: "JURÍDICA" },
    ],
  }),
  components: {
    TheMask,
    SelectPopulado,
  },
  mounted() {
    console.log(this.objeto);
  },
  methods: {
    AlterarTipo(item) {
      console.log(item);
      this.objeto.tipo = item;
    },
  },
  watch: {
    objeto(nValue) {
      if (nValue) {
        this.objeto = nValue;
      }
    },
    disable(nValue) {
      if (nValue) {
        this.disable = nValue;
      }
    },
    ordem(nValue) {
      if (nValue) {
        this.ordem = nValue;
      }
    },
  },
};
</script>