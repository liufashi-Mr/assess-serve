const mysql=require('mysql');
const pool=mysql.createPool({
    // host:'localhost',
    host:"121.40.223.192",
    password:'Lfs@6810..',
    database:'assessment_manage',
    connectionLimit:10,
    user:'root'
})

const query = (sql, param) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err,"123")
                reject(err);
                return;
            }
            connection.query(sql, param, (err, data) => {
                connection.release();
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            })
        })
    })
}

module.exports = query;