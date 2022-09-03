let Post =class  {
    id
    title="";
    media=[];
    date;
    likesCount=0; 
    commentsCount=0;
    react;
    reactId;
    userDataModel;

    constructor(id, title, media,date,likesCount,commentsCount,react,reactId,userDataModel) {
        this.id = id;
        this.title = title;
        this.media=media;
        this.date = date;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.react= react;
        this.reactId=reactId;
        this.userDataModel=userDataModel
        
    }
}
export default Post