export interface Feedback{
  _id?: string,
  userID?: string,
  title?: string,
  category?: string,
  comments?: number,
  upvotes?: string[],
  status?: string,
  details?: string,
  dateCreated?: Date,
}