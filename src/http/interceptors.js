import router from 'vue-router';
import store from "../store";

export default function (request, next) {
    next(function (response) {
        if (response.status == 403) {
            if (typeof response.data.message === 'string' && response.data.message.toLowerCase() === 'insufficient permissions') {
                window._Vue.$swal.fire({
                    icon: 'warning',
                    title: 'Permissões insuficientes',
                    text: 'Desculpe, mas você não tem permissão para executar esta ação',
                });

                return;
            }

            window._Vue.$router.push("/login");
            store.dispatch("auth/ActionSingnout");

            window._Vue.$swal.fire({
                icon: "warning",
                title: "Aviso",
                text: "Sua sessão expirou, favor logar novamente no sistema"
            });

        } else if (response.status != 200 && response.status != 201 && response.status != 204) {
            if (response.data) {
                let message = 'Erro ao comunicar com API, favor contactar o suporte.'
                if(response.data.errors){
                    message = ''
                    if (response.data.errors.email){
                        message = message + response.data.errors.email[0] + '<br/>'
                    } 
                    if (response.data.errors.cpf){
                        message = message + response.data.errors.cpf[0] + '<br/>'
                    }
                }                 
                window._Vue.$swal.fire({
                    icon: "error",
                    title: "Oops...",
                    html: message,
                });
            } else {
                window._Vue.$swal.fire({
                    icon: "error",
                    title: response.data.message || "Oops...",
                    text: "Ocorreu um erro inesperado, favor contactar o suporte.",
                });
            }
        }

    })

}