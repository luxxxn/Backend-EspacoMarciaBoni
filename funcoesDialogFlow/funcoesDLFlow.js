//url de referência https://cloud.google.com/dialogflow/es/docs/integrations/dialogflow-messenger?hl=pt-br

import Manicure from "../Modelo/manicure.js";

export function criarMessengerCard(){
    return {
        type:"info",
        title:"",
        subtitle:"",
        image: {
            src : {
                rawUrl:""
            }
        },
        actionLink:""
    }
} //fim da função criarMessengerCard

export function criarCustomCard(){
    //exibir nos ambientes padrões, tais como: ambiente de teste do DialogFlow, slack, etc
    return {
        card: {
            title:"",
            subtitle:"",
            imageUri:"",
            buttons: [
                {
                    text:"botão",
                    postback:""
                }
            ]
        }
    }
    
} // fim da função criarCustomCard

export async function obterCardManicures(tipoCard = 'custom'){
    const ManicureModelo = new Manicure();
    const listaManicures = await ManicureModelo.consultar();
    const listaCards = [];
    for (const manicure of listaManicures){
        let cartao;
        if (tipoCard == 'custom'){
            cartao = criarCustomCard();
            cartao.card.title = manicure.descricao;
            cartao.card.subtitle = `opções: ${manicure.opcoes}, 
                                    valor: R$${manicure.valor}`;
            cartao.card.imageUri = manicure.urlImagem;
            cartao.card.buttons[0].text = "Clique aqui para mais informações";
            cartao.card.buttons[0].postback = "https://www.sandraalmeidahair.com.br/servicos/";
        } 
        else{
            //card para messenger
            cartao = criarMessengerCard();
            cartao.title = manicure.descricao;
            cartao.subtitlesubtitle = `opções: ${manicure.opcoes}, 
            valor: R$${pizza.valor}`;
            cartao.image.src.rawUrl = manicure.urlImagem;
            cartao.actionLink = "https://www.sandraalmeidahair.com.br/servicos/";
        }
        listaCards.push(cartao);
    }
    return listaCards;
}