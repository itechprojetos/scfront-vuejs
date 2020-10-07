<template>
  <div>
    <select
      v-if="disable==true"
      id="dados"
      :disabled="disable"
      v-model="data"
      class="form-control select2 dados"
    >
      <option v-for="(item,index) of  dados" :key="index" :value="item.id">{{item.text}}</option>
    </select>

    <Select2
      v-if="disable!=true"
      v-model="data"
      :options="dados"
      :settings="{ disable: disable }"
      @select="changeValue($event)"
    />
  </div>
</template>
<script>
function resolve(path, obj) {
  return path.split(".").reduce(function (prev, curr) {
    return prev ? prev[curr] : null;
  }, obj || self);
}
import Select2 from "v-select2-component";
export default {
  name: "SelectPopulado",
  props: {
    action: String,
    data: String || Number,
    list: Array,
    fieldKey: String,
    fieldText: String,
    fieldApoio: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    dados: [],
    options: [],
  }),
  methods: {
    async loadDados() {
      this.dados = await this.$store.dispatch(this.action);
      this.popularField();
      // this.select2();
    },
    changeValue(evt) {
      this.$emit("onChange", evt.id);
    },
    montarTela(col, item) {
      return resolve(col, item);
    },
    popularField() {
      this.dados = this.dados.map((x) => {
        return {
          id: x[this.fieldKey],
          text: `${this.montarTela(this.fieldText, x)}${
            this.fieldApoio != ""
              ? " - (" + this.montarTela(this.fieldApoio, x) + ")"
              : ""
          }`,
        };
      });
    },
    select2() {
      setTimeout(() => {
        if (this.dados.length) {
          window.JQuery(".dados").select2();
        }
      }, 900);
    },
  },
  components: { Select2 },
  mounted() {
    if (this.action) {
      this.loadDados();
    } else if (this.list) {
      this.dados = JSON.parse(JSON.stringify(this.list));
      this.popularField();
      // console.log(this.dados);
      // this.select2();
    }
    // window.$(".dados").on("change", (evt) => {
    //   this.changeValue(evt);
    // });
  },
  watch: {
    action(nValue) {
      if (nValue) {
        this.action = nValue;
        this.loadDados();
        // this.select2();
      }
    },
    list(nvalue) {
      if (nvalue) {
        this.list = nvalue;
        this.dados = JSON.parse(JSON.stringify(this.list));
        this.popularField();
        // this.select2();
      }
    },
    fieldKey(nValue) {
      if (nValue) {
        this.fieldKey = nValue;
      }
    },
    fieldText(nValue) {
      if (nValue) {
        this.fieldText = nValue;
      }
    },
    disable(nValue) {
      if (nValue) {
        this.disable = nValue;
      }
    },
    data(nValue) {
      if (nValue) {
        this.data = nValue;
      }
    },
  },
};
</script>
