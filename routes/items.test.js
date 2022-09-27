process.env.NODE_ENV = 'test'; 

const request = require("supertest");

const app = require("../app")
let items = require("../fakeDb");

let item = { name:'bougie spaghetti',price:200 }

beforeEach(async ()=>{
    items.push(item)
});

afterEach(async ()=>{
    items = []
});

// check if i can get all items
describe("GET /items", ()=> {
    test("get all items!", async ()=>{
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(item).toEqual({name:'bougie spaghetti',price:200});
    })
});

// check post request
describe("POST /items", ()=> {
    test("creating an item", async()=>{
        const res = await request(app).post("/items").send({name:'udon',price:5});
        expect(res.body.item.name).toEqual("udon");
        expect(res.body.item.price).toEqual(5);

    })
});

describe("PATCH /items/:name", ()=>{
    test("updating an item", async()=>{
        const res = await request(app).patch(`/items/${item.name}`).send({name: "cereal"});
        expect(res.body.item).toEqual({name:'cereal'});
    })
})

describe("DELETE /items/:name", ()=>{
    test("deleting an item", async()=>{
        const res = await request(app).delete(`/items/${item.name}`);
        expect(res.body).toEqual(({ message: "Deleted" }))
    })
})