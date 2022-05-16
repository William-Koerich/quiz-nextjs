/* eslint-disable import/no-anonymous-default-export */
import questoes from '../bancoDeQuestoes'
export default  (req, res) => {
    const  id = +req.query.id

    const questoesSelecionadas = questoes.filter(questao => questao.id === id)

    if(questoesSelecionadas.length === 1) {
        const questao = questoesSelecionadas[0].embaralharRespostas()
        const objeto = questao.converterParaObjeto()
        res.status(200).json(objeto)
    } else {
        res.status(204).send()
    }

    

    res.status(200).json(questoes[0].converterParaObjeto())
}