var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err){
    if(err) throw err
    else{
        console.log('connected');
    }
});

// include id, name and prices of products for sale

connection.query('SELECT * FROM products', (err,rows) =>{
    if(err) throw err;
    console.log('Recieved data from bamazon DB :\n' + rows);
})















connection.end();