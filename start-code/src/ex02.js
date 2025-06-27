import sequelize from "./db/database.js";
import Author from "./models/author.js";
import Book from "./models/book.js";

(async () => {
  await sequelize.sync({ force: true });

  const ronan = await Author.create({ name: "Ronan The Best", birthYear: 1990 });
  const kim = await Author.create({ name: "Kim Ang", birthYear: 1995 });
  const hok = await Author.create({ name: "Hok Tim", birthYear: 2015 });

  await ronan.createBook({ title: "Book A", publicationYear: 2010, pages: 200 });
  await ronan.createBook({ title: "Book B", publicationYear: 2015, pages: 150 });

  await kim.createBook({ title: "Book C", publicationYear: 2017, pages: 220 });
  await kim.createBook({ title: "Book D", publicationYear: 2020, pages: 300 });

  await hok.createBook({ title: "Book E", publicationYear: 2022, pages: 100 });
  await hok.createBook({ title: "Book F", publicationYear: 2023, pages: 180 });

  const books = await kim.getBooks();
  console.log("📚 Books by Kim:", books.map(b => b.title));

  const authors = await Author.findAll({ include: Book });
  authors.forEach(a => {
    console.log(`👤 ${a.name}`);
    a.Books.forEach(b => console.log(`   • ${b.title}`));
  });

  console.log("Completed.");
})();
