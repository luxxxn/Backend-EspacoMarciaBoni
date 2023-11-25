import Manicure from "../Modelo/manciure.js";
import conectar from "./conexao.js";

export default class manicureDAO{

    async gravar(manicure){
        if (manicure instanceof Manicure){
            const sql ='INSERT INTO manicure (descricao, opcoes, valor, urlImagem,) VALUES (?, ?, ?, ?)';
            const parametros = [manicure.descricao, manicure.opcoes, manicure.valor, manicure.urlImagem];
            const conexao = await conectar();
            const resultado = await conexao.execute(sql, parametros);
            manicure.codigo = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(manicure){
        if (manicure instanceof Manicure){
            const sql =`UPDATE manicure SET descricao = ?, opcoes = ?, valor = ?, urlImagem = ? WHERE codigo = ?`;
            const parametros = [manicure.descricao, manicure.opcoes, manicure.valor, manicure.urlImagem,  manicure.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(manicure){
        if (manicure instanceof Manicure){
            const sql =`DELETE FROM manicure WHERE codigo = ?`;
            const parametros = [manicure.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }

    }

    async consultar(){
        const sql =`SELECT * FROM manicure`;
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql);
        let listaManicures = [];
        for (const registro of registros){
            const manicure = new Manicure(registro.codigo, registro.descricao, registro.opcoes, registro.valor, registro.urlImagem);
            listaManicures.push(manicure);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaManicures;
    }
}