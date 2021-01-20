<template>
  <div class="container">
    <sub-header :titulo="'Registro de ponto eletrônico'" :page="'Registro de ponto eletrônico'" />
    <div class="section-wrapper">
      <div v-if="researching === true" class="loader loader-default is-active" data-text="Carregando"></div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label class="form-control-label">Colaborador</label>
            <span class="tx-danger">*</span>
            <select v-model="addRecord.userId" class="form-control">
              <option v-for="(user, index) in users" :key="`user:${index}`" :value="user.id">{{ user.username }}</option>
            </select>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label class="form-control-label">Tipo</label>
            <span class="tx-danger">*</span>
            <select v-model="addRecord.type" class="form-control">
              <option value="Entrada">Entrada</option>
              <option value="Saída">Saída</option>
            </select>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label class="form-control-label">Data</label>
            <span class="tx-danger">*</span>
            <datepicker input-class="form-control" format="dd/MM/yyyy" :language="pt" v-model="addRecord.date"></datepicker>
          </div>
        </div>
        <div class="col-md-2">
          <div class="form-group">
            <label class="form-control-label">Hora</label>
            <span class="tx-danger">*</span>
            <the-mask class="form-control" :mask="'##:##:##'" v-model="addRecord.time" />
          </div>
        </div>
        <div class="col-md-3">
          <button @click="create()" class="btn btn-insumo btn-block pull-right filter-button">Registrar ponto manual</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Listagem :dados="listRecords" :colunas="columns" :canAcao="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { TheMask } from 'vue-the-mask';
  import Datepicker from 'vuejs-datepicker';
  import { ptBR } from 'vuejs-datepicker/dist/locale';
  import SubHeader from '../../components/layout/SubHeader';
  import Listagem from '../../components/forms/Listagem';

  export default {
    components: {
      SubHeader,
      Listagem,
      TheMask,
      Datepicker,
    },

    data() {
      return {
        pt: ptBR,
        addRecord: { userId: null, type: null, date: null, time: null },
        researching: false,
        records: [],
        users: [],
        columns: [
          { label: 'Nome', field: 'name' },
          { label: 'Restaurante', field: 'restaurant', thClass: 'text-center', tdClass: 'text-center' },
          { label: 'Entrada', field: 'toClockIn', thClass: 'text-center', tdClass: 'text-center' },
          { label: 'Saída', field: 'toClockOut', thClass: 'text-center', tdClass: 'text-center' },
          { label: 'Ponto manual', field: 'delayed', thClass: 'text-center', tdClass: 'text-center' },
        ],
      };
    },

    computed: {
      listRecords() {
        return this.records;
      },
    },
    
    methods: {
      async load() {
        this.researching = true;

        try {
          const records = await this.$store.dispatch('pontoeletronico/ActionGetList');
          const formatedRecords = [];

          for (const record of records) {
            formatedRecords.push(Object.assign(record, {
              toClockIn: this.$moment(record.toClockIn, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
              toClockOut: record.toClockOut ? this.$moment(record.toClockOut, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : '--',
              delayed: record ? 'Sim' : 'Não',
            }));
          }

          this.records = formatedRecords;
        } catch (err) {
          this.$swal.fire({
            icon: 'error',
            title: 'Não foi possível comunicar-se com a API',
            text: 'Desculpe, mas não foi possível buscar os registros de ponto eletrônico.',
          });
        }

        this.researching = false;
      },

      async create() {
        if (!this.addRecord.userId || !this.addRecord.type || !this.addRecord.date || !this.addRecord.time) {
          this.$swal.fire({
            icon: 'warning',
            title: 'Alguns dados estão faltando',
            text: 'Por favor, preencha todos os dados',
          });

          return;
        }

        const formatedDate = this.$moment(this.addRecord.date, 'DD-MM-YYYY').format('YYYY-MM-DD');

        if (formatedDate.toLowerCase() === 'invalid date' || formatedDate.length !== 10) {
          this.$swal.fire({
            icon: 'warning',
            title: 'Dados inválidos',
            text: 'A data que você forneceu não é válida',
          });

          return;
        }

        const formatedTime = this.$moment(this.addRecord.time, 'HH:mm:ss').format('HH:mm:ss');

        if (formatedTime.toLowerCase() === 'invalid date' || formatedTime.length !== 8) {
          this.$swal.fire({
            icon: 'warning',
            title: 'Dados inválidos',
            text: 'A hora que você forneceu não é válida',
          });

          return;
        }

        this.researching = true;

        try {
          const data = await this.$store.dispatch('pontoeletronico/ActionCreate', Object.assign(JSON.parse(JSON.stringify(this.addRecord)), {
            date: formatedDate,
            time: formatedTime,
          }));

          if (!data.success) {
            this.$swal.fire({
              icon: 'warning',
              title: 'Falha ao tentar registrar ponto',
              text: data.message,
            });
          } else {
            await this.load();
            this.addRecord = { userId: null, type: null, date: null, time: null };
          }
        } catch (err) {
          console.error(err);
        }

        this.researching = false;
      },
    },

    async mounted() {
      this.users = await this.$store.dispatch('usuario/ActionGetList');
      this.load();
    },
  }
</script>

<style scoped>
  .filter-button {
    margin-top: 1.8rem;
  }
</style>