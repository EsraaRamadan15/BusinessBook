let Post =class  {
    id
    title="";
    media=[];
    date;
    likesCount=0; 
    commentsCount=0;
    userDataModel

    constructor(id, title, media,date,likesCount,commentsCount,userDataModel) {
        this.id = id;
        this.title = title;
        this.media=media;
        this.date = date;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.userDataModel=userDataModel
        
    }
}
export default Post