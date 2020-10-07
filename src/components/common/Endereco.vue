<template>
  <div class="col-lg-12">
    <h5>Endereço</h5>
    <hr />
    <div class="row">
      <div class="col-lg-12">
        <label>CEP:</label>
        <div class="input-group">
          <the-mask
            :masked="false"
            v-model="objeto.cep"
            :mask="['##.###-###']"
            class="form-control"
            @blur.native="validaCep"
            :disabled="disable"
            placeholder="CEP"
            @input="atualizarCad"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="la la-bookmark-o"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-10">
        <br />
        <label>Endereço:</label>
        <div class="input-group">
          <input
            ref="logradouro"
            v-model="objeto.logradouro"
            @input="atualizarCad"
            :disabled="disable"
            type="text"
            class="form-control"
            placeholder="Endereço"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="la la-map-marker"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-lg-2">
        <br />
        <label>Número:</label>
        <div class="input-group">
          <input
            ref="numero"
            v-model="objeto.numero"
            @input="atualizarCad"
            :disabled="disable"
            type="text"
            class="form-control"
            placeholder="Número"
          />
        </div>
      </div>
    </div>
    <div class="row 2x">
      <div class="col-lg-12">
        <br />
        <label>Complemento:</label>
        <div class="input-group">
          <input
            ref="complemento"
            v-model="objeto.complemento"
            @input="atualizarCad"
            :disabled="disable"
            type="text"
            class="form-control"
            placeholder="Complemento"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6">
        <br />
        <label>Bairro:</label>
        <div class="input-group">
          <input
            ref="bairro"
            v-model="objeto.bairro"
            @input="atualizarCad"
            :disabled="disable"
            type="text"
            class="form-control"
            placeholder="Bairro"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="la la-map-marker"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <br />
        <label>Cidade:</label>
        <div class="input-group">
          <input
            ref="cidade"
            v-model="objeto.cidade"
            @input="atualizarCad"
            :disabled="disable"
            type="text"
            class="form-control"
            placeholder="Cidade"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="la la-map-marker"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="col-lg-2">
        <br />
        <label>Estado:</label>
        <!-- <select class="form-control select2" id="kt_select2_1" name="param">
        <option value="AK">AM</option>
        <option value="HI">BA</option>
        <option value="AK">RJ</option>
        <option value="HI">RS</option>
        <option value="AK">MA</option>
        <option value="HI">TO</option>
        </select>-->
        <input
          ref="estado"
          v-model="objeto.estado"
          @input="atualizarCad"
          :disabled="disable"
          type="text"
          class="form-control"
          placeholder="Estado"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { TheMask } from "vue-the-mask";
export default {
  props: {
    objeto: Object,
    disable: Boolean,
  },
  data: () => ({
    cepConsultado: "",
  }),
  components: {
    TheMask,
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
  },
  methods: {
    ...mapActions("cep", ["ActionBuscarEndereco"]),
    atualizarCad() {
      // this.$emit("onAtualizar", this.objeto);
    },
    validaCep(evt) {
      let cep = evt.target.value;
      if (cep == "") {
        this.cepConsultado = cep;
        this.objeto.cep = "";
        this.$refs.cep = "";

        this.objeto.logradouro = "";
        this.$refs.logradouro = "";

        this.objeto.estado = "";
        this.$refs.estado = "";

        this.objeto.cidade = "";
        this.$refs.cidade = "";

        this.objeto.bairro = "";
        this.$refs.bairro = "";
        return;
      }
      if (cep === this.cepConsultado) return;

      this.ActionBuscarEndereco(cep).then((r) => {
        this.cepConsultado = cep;
        this.objeto.cep = r.endereco.cep;
        this.$refs.cep = this.objeto.cep;

        this.objeto.logradouro = r.endereco.logradouro;
        this.$refs.logradouro = this.objeto.logradouro;

        this.objeto.estado = r.endereco.uf;
        this.$refs.estado = this.objeto.estado;

        this.objeto.cidade = r.endereco.localidade;
        this.$refs.cidade = this.objeto.cidade;

        this.objeto.bairro = r.endereco.bairro;
        this.$refs.bairro = this.objeto.bairro;
      });
    },
  },
};
</script>