let PostComment =class  {
    id;
    comment;
    date;
    isMyComment;
    userDataModel;

    constructor(id, comment, date,isMyComment,userDataModel) {
        this.id = id;
        this.comment = comment;
        this.date = date;
        this.isMyComment=isMyComment;
        this.userDataModel=userDataModel;
        
    }
}
export default PostComment