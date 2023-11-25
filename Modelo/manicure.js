import ManicureDAO from "../Persistencia/manicureDAO.js";

export default class Manicure{
    #codigo;
    #descricao;
    #opcoes;
    #valor;
    #urlImagem;

    constructor(codigo, descricao, opcoes, valor, urlImagem){
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#opcoes = opcoes;
        this.#valor = valor;
        this.#urlImagem = urlImagem;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }

    get opcoes(){
        return this.#opcoes;
    }

    set opcoes(novoopcoes){
        this.#opcoes = novoopcoes;
    }

    get valor(){
        return this.#valor;
    }

    set valor(novoValor){
        this.#valor = novoValor;
    }


    get urlImagem(){
        return this.#urlImagem;
    }

    set urlImagem(novaUrl){
        this.#urlImagem = novaUrl;
    }

    //override do método toJSON()
    toJSON(){
        return {
            'codigo': this.#codigo,
            'descricao': this.#descricao,
            'opcoes': this.#opcoes,
            'valor': this.#valor,
            'urlImagem': this.#urlImagem,
        }
    }

    async gravar(){
        //DAO = Data Access Object
        const manicureDAO = new ManicureDAO();
        await manicureDAO.gravar(this);
    }

    async atualizar(){
        const manicureDAO = new ManicureDAO();
        await manicureDAO.atualizar(this);
    }

    async excluir(){
        const manicureDAO = new ManicureDAO();
        await manicureDAO.excluir(this);
    }

    async consultar(){
        const manicureDAO = new ManicureDAO();
        return await manicureDAO.consultar();
    }

}