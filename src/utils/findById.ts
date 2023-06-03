import { BookType } from "../store/booksListSlice"

const findElementById = (list: Array<BookType>, id: string) => list.find(item => item.id === id);

export default findElementById;