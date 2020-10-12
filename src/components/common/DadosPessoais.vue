<template>
  <div>
    <div v-if="isEmpresa" class="card card-custom gutter-b example example-compact">
      <div class="card-header">
        <h3 class="card-title">{{ordem}}. Informações Pessoais</h3>
        <div class="card-toolbar"></div>
      </div>

      <div class="card-body">
        <div class="form-group row">
          <div class="col-lg-6">
            <label>Nome Fantasia:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Nome Fantasia"
              v-model="data.pessoa.nome"
            />
          </div>

          <div class="col-lg-6">
            <label>Razão Social:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Razão Social"
              v-model="data.pessoa.razao_social"
            />
          </div>

          <div class="col-lg-5">
            <br />
            <label>Responsável:</label>
            <input
              type="text"
              class="form-control"
              v-model="data.responsavel"
              placeholder="Responsável"
            />
          </div>

          <div class="col-lg-4">
            <br />
            <label>CNPJ:</label>
            <the-mask
              :masked="false"
              v-model="data.pessoa.identificador"
              :mask="['##.###.###/####-##']"
              class="form-control"
              placeholder="CNPJ"
            />
          </div>

          <div class="checkbox-list col-lg-2" style="margin-top: 50px;">
            <label class="checkbox">
              <input type="checkbox" name="Checkboxes1" v-model="data.optante_simples" />
              <span></span>Optante pelo simples
            </label>
          </div>

          <div class="col-lg-6">
            <br />
            <label>Inscrição Estadual:</label>
            <input
              type="email"
              class="form-control"
              placeholder="Inscrição Estadual"
              v-model="data.pessoa.insc_estadual"
            />
          </div>

          <div class="col-lg-6">
            <br />
            <label>Inscrição Municipal:</label>
            <input
              type="email"
              class="form-control"
              v-model="data.pessoa.insc_municipal"
              placeholder="Inscrição Municipal"
            />
          </div>

          <div class="col-lg-12">
            <br />
            <label>Observação:</label>
            <textarea
              rows="5"
              class="form-control"
              placeholder="Observação"
              v-model="data.observacao"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!isEmpresa && !isFuncionario"
      class="card card-custom gutter-b example example-compact"
    >
      <div class="card-header">
        <h3 class="card-title">{{ordem}}. Informações Pessoais</h3>
        <div class="card-toolbar"></div>
      </div>
      <div class="card-body">
        <div class="form-group row">
          <div class="col-lg-3">
            <label>Tipo:</label>
            <select-populado
              :list="tipos"
              :data="data.pessoa.tipo_pessoa"
              :fieldKey="'id'"
              :fieldText="'value'"
              @onChange="AlterarTipo"
            />
            <!-- <select
              v-model="data."
              class="form-control select2 tipos"
              id="tipos"
              name="param"
              @change="AlterarTipo"
            >
              <option value="J">/option>
              <option value="F">Pessoa Física</option>
            </select>-->
          </div>

          <div class="col-lg-9">
            <label>{{data.pessoa.tipo_pessoa =="J"? "Nome Fantasia":data.pessoa.tipo_pessoa =="F"?"Nome Completo":"Nome/Nome Fantasia"}}:</label>
            <input
              type="text"
              v-model="data.pessoa.nome"
              class="form-control"
              placeholder="Nome completo"
            />
          </div>

          <div class="col-lg-4" v-show="data.pessoa.tipo_pessoa =='J'">
            <br />
            <label>Responsável:</label>
            <input
              type="text"
              v-model="data.responsavel"
              class="form-control"
              placeholder="Nome completo"
            />
          </div>

          <div class="col-lg-6" v-show="data.pessoa.tipo_pessoa =='F'">
            <br />
            <label>Data de Nascimento:</label>
            <input
              type="date"
              v-model="data.pessoa.data_nascimento"
              class="form-control"
              placeholder="Data de Nascimento"
            />
          </div>

          <div class="col-lg-6" v-show="data.pessoa.tipo_pessoa =='F'">
            <br />
            <label>Sexo:</label>
            <select-populado
              :list="sexos"
              :data="data.pessoa.sexo"
              :fieldKey="'id'"
              :fieldText="'value'"
              @onChange="AlterarSexo"
            />
            <!-- <select
              v-model="data.pessoa.sexo"
              class="form-control select2 tipos"
              id="sexo"
              name="param"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>-->
          </div>

          <div class="col-lg-6" v-show="data.pessoa.tipo_pessoa =='F'">
            <br />
            <label>CPF:</label>
            <the-mask
              :masked="false"
              v-model="data.pessoa.identificador"
              :mask="['###.###.###-##']"
              class="form-control"
              placeholder="CPF"
            />
          </div>

          <div class="col-lg-6" v-show="data.pessoa.tipo_pessoa =='F'">
            <br />
            <label>RG:</label>
            <the-mask
              :masked="false"
              v-model="data.pessoa.rg"
              :mask="['##.###.###-#']"
              class="form-control"
              placeholder="RG"
            />
          </div>

          <div class="col-lg-6" v-show="data.pessoa.tipo_pessoa =='J'">
            <br />
            <label>Razão Social:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Razão Social"
              v-model="data.pessoa.razao_social"
            />
          </div>

          <div
            class="checkbox-list col-lg-2"
            style="margin-top: 32px;"
            v-show="data.pessoa.tipo_pessoa =='J'"
          >
            <label class="checkbox" style="margin-top:20px;">
              <input type="checkbox" v-model="data.optante_simples" name="Checkboxes1" />
              <span></span>Optante pleo simples
            </label>
          </div>

          <div class="col-lg-12" v-show="data.pessoa.tipo_pessoa =='J'">
            <br />
            <label>CNPJ:</label>
            <the-mask
              :masked="false"
              v-model="data.pessoa.identificador"
              :mask="['##.###.###/####-##']"
              class="form-control"
              placeholder="CNPJ"
            />
          </div>

          <div class="col-lg-6" v-show="data.pessoa.tipo_pessoa =='J'">
            <br />
            <label>Inscrição Estadual:</label>
            <input
              type="text"
              v-model="data.pessoa.insc_estadual"
              class="form-control"
              placeholder="Inscrição Estadual"
            />
          </div>

          <div class="col-lg-6" v-show="data.pessoa.tipo_pessoa =='J'">
            <br />
            <label>Inscrição Municipal:</label>
            <input
              type="text"
              v-model="data.pessoa.insc_municipal"
              class="form-control"
              placeholder="Inscrição Municipal"
            />
          </div>

          <div class="col-lg-12">
            <br />
            <label>Observação:</label>
            <textarea
              rows="5"
              class="form-control"
              placeholder="Observação"
              v-model="data.observacao"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isFuncionario" class="card card-custom gutter-b example example-compact">
      <div class="card-header">
        <h3 class="card-title">{{ordem}}. Informações Pessoais</h3>
        <div class="card-toolbar"></div>
      </div>
      <!--begin::Form-->
      <div class="card-body">
        <div class="form-group row">
          <div class="col-lg-6">
            <label>Empresa:</label>
            <select-populado
              :list="empresas"
              :data="data.id_empresa"
              :fieldKey="'id_empresa'"
              :fieldText="'pessoa.nome'"
              @onChange="atualizaEmpresa"
              :disable="empresa.id_empresa != undefined"
            />
          </div>

          <div class="col-lg-6">
            <label>Tipo de Pessoas:</label>
            <select-populado
              :list="tipos"
              :data="data.pessoa.tipo_pessoa"
              :fieldKey="'id'"
              :fieldText="'value'"
              @onChange="atualizaTipoPessoa"
            />
          </div>

          <div class="col-lg-6">
            <br />
            <label>Apelido:</label>
            <input type="text" class="form-control" v-model="data.apelido" placeholder="Apelido" />
          </div>

          <div class="col-lg-3">
            <br />
            <label>Data de Admissão:</label>
            <input
              v-model="data.data_admissao"
              type="date"
              class="form-control"
              placeholder="Data de Admissão"
            />
          </div>

          <div class="col-lg-3">
            <br />
            <label>Data de Demissão:</label>
            <input
              type="date"
              v-model="data.data_demissao"
              class="form-control"
              placeholder="Data de Demissão"
            />
          </div>

          <div class="col-lg-6">
            <br />
            <label>Valor do Salário:</label>
            <!-- <input type="date" class="form-control" placeholder="Valor" /> -->
            <money v-model="data.ultimo_salario" class="form-control" v-bind="money"></money>
          </div>

          <div class="col-lg-6">
            <br />
            <label>Valor Salário Contábil:</label>
            <money v-model="data.ultimo_salario_contabil" class="form-control" v-bind="money"></money>
            <!-- <input type="email" class="form-control" placeholder="Valor" /> -->
          </div>
          <!-- Pessoa Juridica -->

          <div v-if="data.pessoa.tipo_pessoa == 'J'" class="col-lg-12 form-group row">
            <div class="col-lg-12">
              <br />
              <label>Nome Fantasia:</label>
              <input
                type="text"
                v-model="data.pessoa.nome"
                class="form-control"
                placeholder="Nome Completo"
              />
            </div>

            <div class="col-lg-6">
              <br />
              <label>Razão Social:</label>
              <input
                type="text"
                v-model="data.pessoa.razao_social"
                class="form-control"
                placeholder="Razão Social"
              />
            </div>

            <div class="col-lg-4">
              <br />
              <label>CNPJ</label>
              <the-mask
                :masked="false"
                v-model="data.pessoa.identificador"
                :mask="['##.###.###/####-##']"
                class="form-control"
                placeholder="CNPJ"
              />
            </div>

            <div class="checkbox-list col-lg-2" style="margin-top: 50px;">
              <label class="checkbox">
                <input v-model="data.optante_simples" type="checkbox" name="Checkboxes1" />
                <span></span>Optante pleo simples
              </label>
            </div>
          </div>
          <!-- Pessoa Fisica -->
          <div v-if="data.pessoa.tipo_pessoa == 'F'" class="col-lg-12 form-group row">
            <div class="col-lg-12">
              <br />
              <label>Nome Completo:</label>
              <input
                type="text"
                v-model="data.pessoa.nome"
                class="form-control"
                placeholder="Nome Completo"
              />
            </div>

            <div class="col-lg-3">
              <br />
              <label>Sexo:</label>
              <select-populado
                :list="sexos"
                :data="data.pessoa.sexo"
                :fieldKey="'id'"
                :fieldText="'value'"
                @onChange="AlterarSexo"
              />
              <!-- <select
              v-model="data.pessoa.sexo"
              class="form-control select2"
              id="kt_select2_2"
              name="param"
            >
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              </select>-->
            </div>

            <div class="col-lg-4">
              <br />
              <label>Data de Nascimento:</label>
              <input
                type="date"
                v-model="data.pessoa.data_nascimento"
                class="form-control"
                placeholder="Data de Nascimento"
              />
            </div>

            <div class="col-lg-5">
              <br />
              <label>Carteira de Trabalho:</label>
              <input
                type="text"
                v-model="data.carteira_trabalho"
                class="form-control"
                placeholder="Número Carteira de Trabalho"
              />
            </div>

            <div class="col-lg-6">
              <br />
              <label>CPF:</label>
              <the-mask
                :masked="false"
                v-model="data.pessoa.identificador"
                :mask="['###.###.###-##']"
                class="form-control"
                placeholder="CPF"
              />
            </div>

            <div class="col-lg-6">
              <br />
              <label>RG:</label>
              <the-mask
                :masked="false"
                v-model="data.pessoa.rg"
                :mask="['##.###.###-#']"
                class="form-control"
                placeholder="RG"
              />
            </div>
          </div>

          <div class="col-lg-12">
            <br />
            <label>Função:</label>
            <input v-model="data.funcao" type="text" class="form-control" placeholder="Função" />
          </div>

          <div class="col-lg-2" style="margin-top:20px;">
            <label>Anexar foto</label>
            <br />

            <div
              class="image-input image-input-empty image-input-outline"
              id="kt_image_5"
              :style="`background-image: url(${foto})`"
            >
              <div class="image-input-wrapper"></div>

              <label
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="change"
                data-toggle="tooltip"
                title
                data-original-title="Alterar foto"
              >
                <i class="fa fa-pen icon-sm text-muted"></i>
                <input
                  type="file"
                  @change="onFileChange"
                  name="profile_avatar"
                  accept=".png, .jpg, .jpeg"
                />
                <input type="hidden" name="profile_avatar_remove" />
              </label>

              <span
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="cancel"
                data-toggle="tooltip"
                title="Cancelar o envio"
              >
                <i class="ki ki-bold-close icon-xs text-muted"></i>
              </span>

              <span
                class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow"
                data-action="remove"
                data-toggle="tooltip"
                title="Remover Foto"
              >
                <i class="ki ki-bold-close icon-xs text-muted"></i>
              </span>
            </div>
          </div>

          <!-- 
           <div class="col-lg-12">
            <br />
            <label>Anexo / foto:</label>
            <div class="custom-file">
              <input
                @change="onFileChange"
                ref="foto"
                type="file"
                class="custom-file-input"
                id="customFile"
              />
              <label class="custom-file-label" for="customFile">Anexe foto</label>
            </div>
          </div>

          -->

          <div class="col-lg-10">
            <br />
            <label>Observação:</label>
            <textarea
              v-model="data.observacao"
              rows="5"
              class="form-control"
              placeholder="Observação"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TheMask } from "vue-the-mask";
import SelectPopulado from "../forms/SelectPopulado.vue";
import { Money } from "v-money";
import { mapState } from "vuex";
export default {
  props: {
    isEmpresa: Boolean,
    isFuncionario: Boolean,
    data: Object,
    ordem: Number,
    empresas: Array,
  },
  data: () => ({
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      suffix: "",
      precision: 2,
      masked: false,
    },
    tipos: [
      { id: "J", value: "Pessoa Jurídica" },
      { id: "F", value: "Pessoa Física" },
    ],
    sexos: [
      { id: "M", value: "Masculino" },
      { id: "F", value: "Feminino" },
    ],
  }),
  components: {
    TheMask,
    SelectPopulado,
    Money,
  },
  mounted() {
    if (this.empresa.id_empresa != undefined) {
      this.data.id_empresa = this.empresa.id_empresa;
    }
    var avatar5 = new window.KTImageInput("kt_image_5");

    avatar5.on("cancel", (imageInput) => {
      this.data.foto = null;
      // swal.fire({
      //     title: 'Image successfully changed !',
      //     type: 'success',
      //     buttonsStyling: false,
      //     confirmButtonText: 'Awesome!',
      //     confirmButtonClass: 'btn btn-primary font-weight-bold'
      // });
    });

    avatar5.on("change", (imageInput) => {
      // this.onFileChange(imageInput);
      // swal.fire({
      //     title: 'Image successfully changed !',
      //     type: 'success',
      //     buttonsStyling: false,
      //     confirmButtonText: 'Awesome!',
      //     confirmButtonClass: 'btn btn-primary font-weight-bold'
      // });
    });

    avatar5.on("remove", function (imageInput) {
      this.data.foto = null;
      this.data.url_foto = null;
      // swal.fire({
      //     title: 'Image successfully removed !',
      //     type: 'error',
      //     buttonsStyling: false,
      //     confirmButtonText: 'Got it!',
      //     confirmButtonClass: 'btn btn-primary font-weight-bold'
      // });
    });
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (this.isFuncionario) {
        this.data.foto = files[0];
        // this.$emit("onAtualizar", this.data);
      }
    },
    atualizaEmpresa(item) {
      this.data.id_empresa = item;
      // this.$emit("onAtualizar", this.data);
    },
    atualizaTipoPessoa(item) {
      this.data.pessoa.tipo_pessoa = item;
      // this.$emit("onAtualizar", this.data);
    },
    atualizarCad() {
      // this.$emit("onAtualizar", this.data);
    },
    AlterarTipo(item) {
      this.data.pessoa.tipo_pessoa = item;
    },
    AlterarSexo(item) {
      this.data.pessoa.sexo = item;
    },
  },
  computed: {
    ...mapState("auth", ["empresa"]),
    foto() {
      return this.data.url_foto || "assets/media/users/blank.png";
    },
  },
  watch: {
    empresa(nValue) {
      this.empresa = nValue;
      this.data.id_empresa = this.empresa.id_empresa;
      if (this.$route.params.id != 0 && this.isFuncionario == true) {
        this.$swal
          .fire({
            icon: "warning",
            title: "Atenção",
            text:
              "Houve mudança de empresa, você será redirecionado para a lista de Funcionários ",
          })
          .then(() => this.$router.push("/funcionario"));
      }
    },
    isEmpresa(nValue) {
      if (nValue) {
        this.isEmpresa = nValue;
      }
    },
    isFuncionario(nValue) {
      if (nValue) {
        this.isFuncionario = nValue;
      }
    },
    // data(nValue) {
    //   if (nValue) {
    //     this.data = nValue;
    //   }
    // },
    ordem(nValue) {
      if (nValue) {
        this.data = nValue;
      }
    },
    empresas(nValue) {
      if (nValue) {
        this.empresas = nValue;
      }
    },
  },
};
</script>