const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err){
    if(err) throw err;
    console.log('connected');
    getItems();
});

// include id, name and prices of products for sale
function getItems() {
     connection.query('SELECT * FROM products', function(err,res){
    if (err) throw err;
    for (var i=0; i<res.length; i++){
        // console.log('Below you will find the list of items left' + res[i].item_id + '|' + res[i].product_name);
        console.log('Below you will find the list of items left' + 
        `${res[i].item_id}
        ${res[i].product_name}
        ${res[i].price}`);
    }
})
// connection.end()
promptUser();
}

function promptUser () {
    inquirer
    .prompt([
        {
        name: 'product ID',
        type: 'input',
        message: "Please Enter the ID of the product you'd like to buy",
        
        }
    ]), {
        name: 'Product Quantity',
        type: 'input',
        message: "How many units of this product would you like to buy?"
    }

    connection.query(`Select * from products WHERE item_id=`${item_id}`)

}















