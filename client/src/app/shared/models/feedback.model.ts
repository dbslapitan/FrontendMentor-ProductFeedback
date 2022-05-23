export interface Feedback{
  _id?: String,
  userID?: String,
  title?: String,
  category?: String,
  upvotes?: String[],
  status?: String,
  details?: String,
  dateCreated?: Date
}