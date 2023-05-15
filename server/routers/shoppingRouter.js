const express = require('express');
const router = express.Router();
const ShoppingList = require('../models/shopping-list');
const GroceryItem = require('../models/grocey-item');

const { StatusCodes } = require('http-status-codes');

router.post('/grocery-item', async (req, res) => {
    //Build Grocery Item
    let groceryItem = new GroceryItem({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    })

     let shoppingListId = req.body.shoppingListId;

     //Load Shopping List
     let shoppingList = await ShoppingList.findById(shoppingListId);
    shoppingList.groceryItems.push(groceryItem);
    //Save Shopping List
    const shoppingListSaved = await shoppingList.save();
    if (shoppingListSaved) {
         res.status(StatusCodes.OK).json(shoppingListSaved);
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'We cant save the Grocery Item.'});
    }
});

router.get('/shopping-lists', async (req, res) => {

    let list = await ShoppingList.find({}).sort({title: 1});
    console.log(list);
    if (list) {
        // return res.status(StatusCodes.OK).json({list, count: list.length});
        return res.status(StatusCodes.OK).json(list);
    } else {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `We not found itens.`});
    }

});

router.post('/shopping-lists', async (req, res) => {

    const item = req.body;
    let shoppingList = new ShoppingList({
        name: item.name,
        address: item.address
    });

    let shoppingListSaved = await shoppingList.save();
    if (shoppingListSaved) {
        return res.status(StatusCodes.CREATED).json(shoppingList);
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `We cant save the shopping list.`});
    }

});

router.delete('/grocery-item/:groceryItemId', async (req, res) => {

    const groceryItemId = req.params.groceryItemId;
    await GroceryItem.findOneAndDelete({_id: groceryItemId});
    return res.status(StatusCodes.OK).json({message: 'We deleted the item.'});

});

router.get('/shopping-lists/:shoppingListId', async (req, res) => {

    const shoppingListId = req.params.shoppingListId;
    const shoppingList = await ShoppingList.findOne({_id: shoppingListId});
    return res.status(StatusCodes.OK).json(shoppingList);

});

module.exports = router;