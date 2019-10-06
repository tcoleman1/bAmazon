DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
item_id INTEGER (3) NOT NULL,
product_name VARCHAR (40) NOT NULL,
department_name VARCHAR (20),
price DECIMAL (8),
stock_quantity INTEGER (3) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
	VALUES (1, "Alexa Remote", "Electronics", 13.00, 10), (2, "Crock Pot", "Kitchen", 34.00, 40),
			(3, "LED Ring Lights", "Electronics", 27.00, 23), (4, "Throws", "Home & Living", 15.00, 60),
            (5, "Christmas Ornaments", "Holidays", 9.99, 32), (6, "10 Piece Titanium Pot Set", "Kitchen", 65.00, 13),
            (7, "Hand Held Pro Vacuum Car Cleaner", "Car", 79.99, 120), (8, "Ring Door Bell", "Home", 135.99, 60),
            (9, "Sony Noise Cancelling Headphones", "Electronics", 200.000, 6), (10, "Brita Water Filters", "Kitchen", 17.99, 28);
            
    
    SELECT * FROM products;
   