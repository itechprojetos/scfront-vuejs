import Home from "../pages/Home/Home.vue";
import Usuarios from "./Usuarios/Usuarios.vue";
import Perfil from "./Perfil/Perfil.vue";
import Restaurantes from "./Restaurantes/Restaurantes.vue";
import CadastroSetor from "./CadastroSetor/CadastroSetor.vue";
import CadastroAtividadeDiaria from "./CadastroAtividadeDiaria/CadastroAtividadeDiaria.vue";
import CadastroAtividadeSemanal from "./CadastroAtividadeSemanal/CadastroAtividadeSemanal.vue";
import TarefasDiarias from './TarefasDiarias/TarefasDiarias.vue';
import TarefaSemanais from './TarefasSemanais/TarefasSemanais.vue';
import RelatorioPonto from './RelatorioPonto/RelatorioPonto.vue';

export default [
    {
        path: '/',
        name: 'Dashboard',
        component: Home
    },
    {
        path: '/perfil',
        name: 'Perfil',
        component: Perfil
    },
    {
        path: '/usuarios',
        name: 'Usuários',
        component: Usuarios
    },
    {
        path: '/restaurantes',
        name: 'Restaurantes',
        component: Restaurantes
    },
    {
        path: '/cadastrosetor',
        name: 'Cadastro Setor',
        component: CadastroSetor
    },
    {
        path: '/cadastroatividadediaria',
        name: 'Cadastro Atividade Diária',
        component: CadastroAtividadeDiaria
    },
    {
        path: '/cadastroatividadesemanal',
        name: 'Cadastro Atividade Semanal',
        component: CadastroAtividadeSemanal
    },
    {
        path: '/tarefasdiarias',
        name: 'Tarefas Diárias',
        component: TarefasDiarias
    },
    {
        path: '/tarefassemanais',
        name: 'Tarefas Semanais',
        component: TarefaSemanais
    },
    {
        path: '/relatorios/ponto',
        name: 'Relatório de ponto eletrônico',
        component: RelatorioPonto
    }
]
