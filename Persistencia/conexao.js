//conexão com o mysql
import mysql from 'mysql2/promise';

export default async function conectar() {

    //boas práticas para gerenciar conexões com o banco de dados
    if (global.poolConexoes) {
        return await global.poolConexoes.getConnection();
    }
    else {
        const pool = await mysql.createPool({
            host: 'localhost',
            port: 3306,
            user: 'root',
            database: 'manicure',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        })

        global.poolConexoes = pool;
        return await pool.getConnection();
    }

}