interface Thread {
    id: number,
    uid: string,
    userId: number,
    title: string,
    content: string,
    tags: string,
    views: number,
    upvotes: number,
    downvotes: number,
    createdDate: string
}

export default Thread;