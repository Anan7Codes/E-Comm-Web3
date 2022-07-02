//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Store {
    
    struct Product {
        string title;
        string desc;
        address payable seller;
        uint productId;
        uint price;
        address buyer;
        bool delivered;
    }

    uint counter = 1;
    Product[] public products;

    event registered(string title, uint productId, address seller);
    event bought(uint productId, address buyer);
    event delivered(uint productId);

    function registerProduct(string memory _title, string memory _desc, uint _price) public {
        require(_price>0, "Price must be greater than 0");
        Product memory tempProduct;
        tempProduct.title = _title;
        tempProduct.desc = _desc;
        tempProduct.seller = payable(msg.sender);
        tempProduct.productId = counter;
        tempProduct.price = _price * 10**18;
        tempProduct.delivered = false;
        products.push(tempProduct);
        emit registered(_title, tempProduct.productId, msg.sender);
        counter++;
    }

    function buy(uint _productId) payable public {
        require(_productId>0, "Product ID must be greater than 0");
        require(products[_productId-1].price>0, "Product price must be greater than 0");
        require(products[_productId-1].seller != msg.sender, "You cannot buy your own product");
        require(products[_productId-1].delivered == false, "Product already delivered");
        products[_productId-1].buyer = msg.sender;
        emit bought(_productId, msg.sender);
    }

    function delivery(uint _productId) public {
        require(_productId>0, "Product ID must be greater than 0");
        require(products[_productId-1].buyer == msg.sender, "Only buyer can confirm");
        require(products[_productId-1].delivered == false, "Product already delivered");
        products[_productId-1].delivered = true;
        products[_productId-1].seller.transfer(products[_productId-1].price);
        emit delivered(_productId);
    }
}
