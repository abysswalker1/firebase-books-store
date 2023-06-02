import { BookType } from "../store/booksList"

const findElementById = (list: Array<BookType>, id: string) => list.find(item => item.id === id);

export default findElementById;