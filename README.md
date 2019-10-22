This project uses Node.js and MySQL.
The goal of this assignment is to create an Amazon like storefront that allows users to enter information (id) about the products available in the storefront. The app will take in orders from customers and deplete stock from the store's inventory (DB).

Link for app demonstration : https://drive.google.com/file/d/1-j5-FP1P5N5avgSdrVtBTsmPNbOcEqAn/view

Throughout the video I am :

1. Running the SELECT * FROM products query to show the db table (take note of the stock_quantity numbers)
2. Then I am going to cli and running node bAmamazon.js to run the application. It will first prompt the user with two questions.
    - The first asking the user for the ID of the product they would like 
    - The second prompt asking the desired quantity for this item.
*** At this time the application is checking the inventory. 
3. If the quanity the user has asked for is available, the app will give user the price of their items and tell them to have a good day.
    - After this step I go back to the db and run the select statement again to get the db information and show that the stock quantity of the users selected items have decreased depending on the amt they've requested.
4. If the quantity desired is insufficient, the user is prompted with an option of trying another product. They then have a choice of yes or no.
    - If yes is selected the user is prompted with the questions from (2) if no is selected we thank the customer and tell them to have a great day.