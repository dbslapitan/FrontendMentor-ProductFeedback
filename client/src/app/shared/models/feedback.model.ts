export interface Feedback{
  _id?: string,
  userID?: string,
  title?: string,
  category?: string,
  upvotes?: string[],
  status?: string,
  details?: string,
  dateCreated?: Date
}