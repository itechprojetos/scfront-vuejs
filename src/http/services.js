import { services as auth } from "../modules/auth";
import { services as usuario } from "../pages/Usuarios";
import { services as perfil } from "../pages/Perfil";
import { services as home } from "../pages/Home";
import {services as restaurante} from "../pages/Restaurantes";
import {services as setor} from "../pages/CadastroSetor";
import {services as atividadediaria} from "../pages/CadastroAtividadeDiaria";
import {services as atividadesemanal} from "../pages/CadastroAtividadeSemanal";
import {services as tarefassemanais} from "../pages/TarefasSemanais";
import {services as tarefasdiarias} from "../pages/TarefasDiarias";

export default {
    auth,
    usuario,
    perfil,
    home,
    restaurante,
    setor,
    atividadediaria,
    atividadesemanal,
    tarefassemanais,
    tarefasdiarias
};      