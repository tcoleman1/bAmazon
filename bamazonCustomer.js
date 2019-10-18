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
    getItems();
});

function getItems() {
     connection.query('SELECT * FROM products', function(err,res){
    if (err) throw err;
    for (var i=0; i<res.length; i++){
        
        console.log(`---------------------------
      PRODUCT ID:      ${res[i].item_id}
     PRODUCT NAME:    ${res[i].product_name}
     PRODUCT PRICE:   ${res[i].price}`);
    }
    promptUser();
})

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
          ///  connection.query("SELECT * from products WHERE item_id=${option.productID}", function(res,err){
              connection.query("SELECT * from products WHERE item_id=?", [

                    option.productID
              ], 
                
            function(err,res){

                if(err) throw err

                if(res[0].stock_quantity < parseInt(option.productQuantity)){
                    console.log("Insufficient Quantity, please try another product")
                    tryAgain();
                }
               else { //(option.quantityChoice <= res[i].stock_quantity)
               

                   const totalCost = (res[0].price * option.productQuantity).toFixed(2)
            
                  //  connection.query(`UPDATE products SET stock_quantity = "${res[0].stock_quantity - parseInt(option.productQuantity)}" WHERE item_id=${parseInt(option.productID)}`, function(err,res){

                    console.log("The price of this item is: " + "$ "+ totalCost + " Thank you for shopping with us");
                    }
               })
            })
        }
    
    
function tryAgain(){
    inquirer.prompt([
        {
            name: "tryAnotherItem",
            message: "Would you like to try another item?",
            type: "list",
            choices: ["yes", "no"]
        
        }
    ])
        option.tryAnotherItem === "yes" ? promptUser() : connection.end()
}
