import { reactive, RefSymbol } from "@vue/reactivity";
import { ref } from "vue";

export function validaLocalStorage() {

    let dado = localStorage.getItem('fala') ? localStorage.getItem('fala') : '';

    if (dado != '') {

        const item = localStorage.getItem('fala') ? localStorage.getItem('fala') : '';
        const dadoComExpiracao = item
            ? JSON.parse(item) // `item` não é `null`, então podemos fazer `JSON.parse(item)`
            : null;


        // Verificar se o dado existe e se não expirou
        return dadoComExpiracao && new Date().getTime() < dadoComExpiracao.expiracao
            ? dadoComExpiracao.valor
            : (localStorage.removeItem('fala'), null); // Se expirado, remove o dado e retorna null

    }
}
let cont = reactive({value:0});
let audio: HTMLAudioElement | null = null;
export function falar(frase: string) {

    const exist = validaLocalStorage(); // recebo a resposta se existe O localStorage ou ja expirou
    console.log(cont.value);
    if (cont.value === 0) {
        audio = new Audio(`/audio/${frase}.mp3`);
      }
    if (cont.value >= 1 && audio) {
        console.log('entrou');
        audio.pause();
        cont.value --;
    
        console.log(cont.value);
    }
    

    if (exist == null && audio && cont.value == 0) { // se null, pode prosseguir para a execucao do audio

        //executo o audio e trato caso algum erro na reproducao
        audio.play().catch(error => {
            console.error('Erro ao reproduzir o áudio:', error);
        });
        cont.value++

        // setando localStorage para nao ser executado o audio novamente durante um periodo estipulado
        const tempoExpiracaoEmSegundos = 2; // 5 segundos de intervalo para execucao dos audios
        const agora = new Date().getTime();
        const expiracao = agora + tempoExpiracaoEmSegundos * 1000; // Tempo em milissegundos
        const valor = 'falando';
        const dadoComExpiracao = JSON.stringify({ valor, expiracao });
        localStorage.setItem('fala', dadoComExpiracao);
    }

}