const express = require("express");
const connectdb = require("./db");
const bookstore = require("./Schema");
const Check_data = require("./middlewares");

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.get("/", (req, res) => {
    res.send("welcome to the book store")
})

app.get("/books/book/:id", async (req, res) => {
    const book = await bookstore.findById(req.params.id);
    if (!book) {
        res.status(404).send({ error: 'Book not found' });
    }
    res.send(book)
});

app.delete("/books/delete/:id", async (req, res) => {
    let { id } = req.params

    await bookstore.findByIdAndDelete(id)
    res.send("delete")
})

app.get("/books", async (req, res) => {
    const books = await bookstore.find();
    res.send(books);
});

app.post("/books/addbooks", Check_data, async (req, res) => {
    let book = await bookstore.create(req.body)
    res.send(book)
})

app.patch("/books/update/:id", async (req, res) => {
    let { id } = req.params
    await bookstore.findByIdAndUpdate(id, req.body)
    res.send("data update")
})

app.get("/books/filter", async (req, res) => {
        let { author, category, title, price } = req.query;
        let filter = {};
        let sort = {};

        if (author) {
            filter.author = author;
        }
        if (category) {
            filter.category = category;
        }
        if (title) {
            filter.title = title;
        }

        if (price) {
            if (price === "lth") {
                sort.price = 1; 
            } else if (price === "htl") {
                sort.price = -1; 
            }
        }

        const books = await bookstore.find(filter).sort(sort);

        res.send(books);
});

app.listen(8090, () => {
    console.log("server in runing up to 8090");
    connectdb()
})