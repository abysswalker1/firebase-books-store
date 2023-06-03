import { BookType } from "../store/booksListSlice";

export const filterByDate = (books: BookType[], date: number | undefined = undefined) => (
  books.filter(book => book.date === date)
);

export const getRecomended = (books: BookType[]) => {
  let year = new Date().getFullYear();
  let highestRating = books.reduce((prevRating: number, nextBook: BookType) => {
      if(nextBook.rating && nextBook.rating > prevRating) {
        return nextBook.rating;
      }
    return prevRating
  }, 0)

  let bestBooks = books.filter(book => book.date && (book.date <= year - 3 && book.rating == highestRating))
  let randomIndex = Math.floor(Math.random() * bestBooks.length)
  let neededBook =  bestBooks[randomIndex];

  return neededBook
};