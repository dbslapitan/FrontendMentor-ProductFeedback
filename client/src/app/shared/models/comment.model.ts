export interface UserComment{
  _id?: string,
  comment?: string,
  username?: string,
  name?: string,
  feedbackId?: string,
  userId?: string,
  imageUrl?: string,
  extension?: string,
  replies?: UserReply[]
}

interface UserReply {
  dateCreated: Date,
  extension: string,
  name: string,
  reply: string,
  replyTo: string,
  userId: string,
  username: string,
  imageUrl: string
}