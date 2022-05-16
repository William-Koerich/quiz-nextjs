import { embaralhar } from "../functions/arrays"
import RespostaModel from "./resposta"

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    #respondida: boolean

    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou = false, respondida = false) {
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
        this.#respondida = respondida
    }

    
    get id() {
        return this.#id
    }

    get enunciado() {
        return this.#enunciado
    }

    get respostas() {
        return this.#respostas
    }

    get acertou() {
        return this.#acertou
    }

    get respondida() {

        for(const resposta of this.#respostas) {
            if(resposta.revelada) return true
        }

        return false
    }

    responderCom(indice: number): QuestaoModel {
        const acertou = this.respostas[indice]?.certa
        const respostas = this.respostas.map((resposta, i) => {
            const respostaSelecionada = i === indice
            // Se eu não quiser revelar qual é a resposta certa, basta remover a parte do || na linha de baixo.
            const deveRevelar = respostaSelecionada || resposta.certa
            return deveRevelar ? resposta.revelar() : resposta
        })

        return new QuestaoModel(this.id, this.enunciado, respostas, acertou)
    }

    embaralharRespostas(): QuestaoModel {
        const respostasEmbaralhadas = embaralhar(this.respostas)
        return new QuestaoModel(this.id, this.enunciado, respostasEmbaralhadas, this.acertou)
    }

    converterParaObjeto() {
        return {
            id: this.id,
            enunciado: this.enunciado,
            acertou: this.acertou,
            respondida: this.respondida,
            respostas: this.respostas.map(resposta => resposta.converterParaObjeto())
        }
    }
}