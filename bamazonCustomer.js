const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    getItems();
});

function getItems() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {

            console.log(`---------------------------
      PRODUCT ID:      ${res[i].item_id}
     PRODUCT NAME:    ${res[i].product_name}
     PRODUCT PRICE:   ${res[i].price}`);
        }
        promptUser();
    })

}


function promptUser() {
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

        .then(function (option) {
            ///  connection.query("SELECT * from products WHERE item_id=${option.productID}", function(res,err){
            connection.query("SELECT * from products WHERE item_id=?", [

                option.productID
            ],

                function (err, res) {

                    if (err) throw err

                    if (res[0].stock_quantity < parseInt(option.productQuantity)) {
                        console.log("Insufficient Quantity, please try another product")
                        tryAgain();
                    }
                    else { //(option.quantityChoice <= res[i].stock_quantity)


                        const totalCost = (res[0].price * option.productQuantity).toFixed(2)
                        const newStockQuantity = res[0].stock_quantity - parseInt(option.productQuantity)

                        //  connection.query(`UPDATE products SET stock_quantity = "${res[0].stock_quantity - parseInt(option.productQuantity)}" WHERE item_id=${parseInt(option.productID)}`, function(err,res){



                        connection.query("UPDATE products SET ? WHERE ? ", [{

                            stock_quantity: newStockQuantity

                        }, {
                            item_id: option.productID
                        }], function(err,res){

                            console.log("Inventory Updated")
                        })


                        console.log("The price of this item is: " + "$ " + totalCost + " Thank you for shopping with us");


                            console.log( "Led ring lights should have quantity of 19", res[0].stock_quantity)
                        // the lines below shows the id and new quantity 
                       // connection.query("UPDATE products SET stock_quantity=" + newStockQuantity + "WHERE item_id=?", [
                          //  option.productID
                        // ])
                        //connection.query("UPDATE products SET ? WHERE ?"

                        //   const sql = "UPDATE products SET ? WHERE ?";
                        //   connection.query(sql, [option.productID, newStockQuantity])
                        // 
                        // updateDb();
                    }
                })
        })
}


function tryAgain() {
    inquirer.prompt([
        {
            name: "tryAnotherItem",
            message: "Would you like to try another item?",
            type: "checkbox",
            choices: ["yes", "no"]

        }
    ])
    option.tryAnotherItem === "yes" ? promptUser() : connection.end()
}

// function updateDb (itemId, stockQuantity) {

// connection.query("UPDATE products SET ? WHERE ?",[
//     {
// item_id: itemId

//     }, 

//     {
//         stock_quantity: stockQuantity
//     }
// ]),

// console.log("We have updated the inventory")
// }

module.exports = connection;