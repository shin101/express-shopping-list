const items = require("./fakeDb")

class Item {
    constructor(name,price){
        this.name=name;
        this.price=price;

        items.push(this);
    }

    static findAll(){
        return items
    }

    static find(name){
        let foundItem = items.find(x=>x.name === name);
        if(foundItem === undefined){
            throw {msg: "Not found", status: 404}
        }
        return foundItem
    }

    static update(name,data){
        let foundItem = Item.find(name);
        if (foundItem === undefined){
            throw {msg:"Not found", status:404}
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
    }
    
    static del(name){
        let foundIdx = items.findIndex(x=>x.name === name);
        if (foundIdx === -1){
            throw {msg:"Not found", status:404}
        }
        delete items[foundIdx];
    }
}

module.exports = Item;