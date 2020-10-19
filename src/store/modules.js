import { store as auth } from "../modules/auth";
import { store as usuario } from "../pages/Usuarios";
import { store as perfil } from "../pages/Perfil";
import { store as home } from "../pages/Home";
import { store as restaurante } from "../pages/Restaurantes";
import { store as setor } from "../pages/CadastroSetor";
import { store as atividadediaria } from "../pages/CadastroAtividadeDiaria";
import { store as atividadesemanal } from "../pages/CadastroAtividadeSemanal";
import { store as tarefassemanais } from "../pages/TarefasSemanais";
import { store as tarefasdiarias } from "../pages/TarefasDiarias";

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
}