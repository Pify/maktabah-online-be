const { Book } = require('../models');

class BookService {
    static async create(bookData) {
        const {
            title,
            author,
            yearPublished,
            publisher,
            type,
            dateAdded,
            source,
            isOld,
            shelfCategory
        } = bookData;

        const book = await Book.create({
            title,
            author,
            yearPublished,
            publisher,
            type,
            dateAdded,
            source,
            isOld,
            shelfCategory,
            isBorrowed: false
        });

        return book;
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const { rows: books, count: totalItems } = await Book.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const totalPages = Math.ceil(totalItems / limit);

        return {
            books,
            page,
            limit,
            totalItems,
            totalPages,
        };
    }

    static async findById(id) {
        return Book.findByPk(id);
    }

    static async update(id, updatedData) {
        const book = await Book.findByPk(id);
        if (!book) return null;

        await book.update(updatedData);
        return book;
    }

    static async delete(id) {
        const book = await Book.findByPk(id);
        if (!book) return null;

        await book.destroy();
        return book;
    }
}

module.exports = BookService;