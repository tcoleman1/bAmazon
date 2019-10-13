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

function getItems() {
     connection.query('SELECT * FROM products', function(err,res){
    if (err) throw err;
    for (var i=0; i<res.length; i++){
        // console.log('Below you will find the list of items left' + res[i].item_id + '|' + res[i].product_name);
        console.log(`---------------------------
      PRODUCT ID:      ${res[i].item_id}
     PRODUCT NAME:    ${res[i].product_name}
     PRODUCT PRICE:   ${res[i].price}`);
    }
    promptUser();
})
// connection.end()

}


function promptUser () {
    inquirer
    .prompt([
        {
        name: 'productID',
        type: 'input',
        message: "Please Enter the ID of the product you'd like to buy",
        
        },

        {
            name: 'productQuantity',
            type: 'input',
            message: "How many units of this product would you like to buy?"
        }

    ])
 
    .then(function(option){
       // console.log(option)
        
        console.log("We've reached this point")
          ///  connection.query("SELECT * from products WHERE item_id=${option.productID}", function(res,err){
              connection.query("SELECT * from products WHERE item_id=?", [

                    option.productID
              ], 
                
            function(err,res){
                console.log(res)
                console.log(err)
               console.log('This is my prod id:' + option.productID)
                if(err) throw err
                console.log(res[0].stock_quantity)
                if(res[0].stock_quantity > parseInt(option.productQuantity)){
                    console.log("Insufficient Quantity, please try another product")
                }
               else if(option.quantityChoice <= res[0].stock_quantity){
                   let totalCost = res[0].price * option.productQuantity
                 // console.log("Ok the price of this item is:" + "$"+ totalCost +
                   // ".Thank you for shopping with us");
                    connection.query(`UPDATE products SET stock_quantity = "${res[0].stock_quantity - parseInt(option.productQuantity)}" WHERE item_id=${parseInt(option.productID)}`, function(err,res){

                     if (err) throw err;
                    console.log("Ok the price of this item is:" + "$"+ totalCost + ".Thank you for shopping with us");
                    })
               }
            })
        })
    }
    












