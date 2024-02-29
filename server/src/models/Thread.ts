interface Thread {
    id: number,
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