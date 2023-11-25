import { obterCardManicures } from "../funcoesDialogFlow/funcoesDLFlow.js";

export default class DialogFlowCtrl {

    processarIntencoes(requisicao, resposta) {
        //verificar se a inteção é 'Default Welcome Intent'
        if (requisicao.method === 'POST') {
            const intencao = requisicao.body.queryResult.intent.displayName;

            //como identificar a origem da requisição do dialogFlow: messenger, slack, etc
            const origem = requisicao.body?.originalDetectIntentRequest?.source;
            if (intencao === 'Default Welcome Intent') {
                //devolver uma resposta para o DialogFlow
                if (origem) {
                    //cards no formato custom
                    obterCardManicures('custom').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Boas-Vindas ao Espaço Marcia Boni! \n",
                                    "no momento temos essas opções de manicure : \n"
                                ]
                            }
                        });
                        respostaDF.fulfillmentMessages.push(...listaCards);
                        respostaDF.fulfillmentMessages.push({
                            "text": {
                                "text": [
                                    "Qual opção de manicure você deseja?"
                                ]
                            }
                        })
                        resposta.json(respostaDF);
                    }).catch((erro) => {
                        let respostaDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        "Erro ao recuperar as opções de manicure: \n",
                                        "Não foi possível consultar o menu de manicure!",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }
                            }]
                        }
                        resposta.json(respostaDF);
                    })

                }
                else {
                    obterCardManicures('messenger').then((listaCards) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Boas-Vindas ao Espaço Marcia Boni!",
                                    "text": [
                                        "Estamos muito felizes em ter você por aqui!",
                                        "Essas são nossas opções de manicure: \n"
                                    ]
                                }]]
                            }
                        });
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push(...listaCards);
                        respostaDF.fulfillmentMessages[0].payload.richContent[0].push({
                            "type": "description",
                            "title": "Qual opção de manicure você deseja?",
                            "text": []
                        });
                        resposta.json(respostaDF);
                    }).catch((erro) => {
                        let respostaDF = {
                            "fulfillmentMessages": []
                        }
                        respostaDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Erro ao recuperar as opções de manicure: \n",
                                    "text": [
                                        "Não foi possível consultar o menu de manicure!",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }]]
                            }
                        });

                    })
                }
            }

        }
    }
}