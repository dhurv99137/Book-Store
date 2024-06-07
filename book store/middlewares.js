const Check_data = (req, res, next) => {
    let { title, author, category, publicationYear, price, quantity, description, imageUrl } = req.body;
    if (!title || !author || !category || !publicationYear || !price || !quantity || !description || !imageUrl) {
        return res.status(400).send({ message: 'All fields are required' });
    }
    else {
        next();
    }
};

module.exports = Check_data