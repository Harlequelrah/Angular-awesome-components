import { Comment } from "../../core/models/comment.model";

export class Post {
    constructor(
        public id: number,
        public userId: number,
        public title: string,
        public createdDate: string,
        public content: string,
        public comments: Comment[],
        public imageUrl : string
    ) { }
}
