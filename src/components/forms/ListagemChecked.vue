<template>
  <div class="table-responsive">
    <vue-good-table
      styleClass="table mg-b-0 tx-12 table-striped"
      :columns="colunas"
      :rows="dadosFiltro"
      :paginate="true"
      :globalSearchPlaceholder="'Pesquisar'"
      :globalSearch="true"
      :nextText="'Próximo'"
      :prevText="'Anterior'"
      :ofText="'de'"
      :rowsPerPageText="'Linhas por página'"
    >
      <div slot="emptystate" class="text-center">Não há registros</div>
      <template slot="table-row-before" slot-scope="props">
        <td class="text-center">
          <input type="checkbox" v-model="props.row.checked" />
        </td>
      </template>
      <template slot="table-row-after" slot-scope="props">
        <td class="text-center" v-if="canAcao==true">
          <a
            v-if="canVer==true"
            class="btn btn-sm btn-clean btn-icon"
            title="Visualizar"
            @click="ver(props.row)"
          >
            <i
              class="fa fa-eye"
              style="font-size: 20px; margin-right: 5px; color: #3EC2CF !important;"
            ></i>
          </a>
          <a
            v-if="canEditar==true"
            class="btn btn-sm btn-clean btn-icon"
            title="Editar"
            @click="editar(props.row)"
          >
            <i
              class="icon ion-compose"
              style="font-size: 20px; margin-right: 5px; color: #3EC2CF !important;"
            ></i>
          </a>
          <a
            v-if="canInativar==true"
            class="btn btn-sm btn-clean btn-icon"
            title="Deletar"
            @click="inativar(props.row)"
          >
            <i
              class="fa fa-close"
              style="font-size: 20px; margin-right: 5px; color:#dc3545 !important"
            ></i>
          </a>
        </td>
      </template>
    </vue-good-table>
  </div>
</template>
<script>
export default {
  name: "ListagemChecked",
  props: {
    dados: Array,
    colunas: Array,
    canAcao: {
      type: Boolean,
      default: true,
    },
    canEditar: {
      type: Boolean,
      default: true,
    },
    canInativar: {
      type: Boolean,
      default: true,
    },
    canVer: {
      type: Boolean,
      default: false,
    },
    ativo: true,
  },
  data:()=>({
    dadosFiltro: [],
  }),
  methods: {
    ver(item) {
      this.$emit("onVisualizar", item);
    },
    inativar(item) {
      this.$emit("onDelete", item);
    },
    editar(item) {
      this.$emit("onEditar", item);
    },
  },

  mounted() {
    this.dadosFiltro = this.dados;
  },

  watch: {
    dados(nValue) {
      if (nValue) {
        this.dados = nValue;
        this.dadosFiltro = this.dados;
      }
    },
    colunas(nValue) {
      if (nValue) {
        this.colunas = nValue;
      }
    },
    colunasDetalhes(nValue) {
      if (nValue) {
        this.colunas = nValue;
      }
    },
  },
};
</script>
<style >
.marginApoio {
  margin-top: 13px !important;
}
</style>