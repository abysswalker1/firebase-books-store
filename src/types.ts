export type BookType = {
  id: string
  name: string
  authors: string[],
  date?: number,
  ISBN?: string,
  rating?: number
}