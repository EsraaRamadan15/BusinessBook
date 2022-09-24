let Service =class  {
    id
    title;
    decription;
    price;
    image;


    constructor(id, title,image,decription,price) {
        this.id = id;
        this.title = title;
        this.image=image;
        this.decription=decription;
        this.price=price;
        
    }
}

let ServiceDetails =class{
    id
    title;
    decription;
    price;
    images;
    publisherModel;
    city;
    isFollow;
    isSelfPublished;
    constructor(id, title,decription,price,images,publisherModel,city,isFollow,isSelfPublished) {
        this.id = id;
        this.title = title;
        this.images=images;
        this.decription=decription;
        this.price=price;
        this.images=images;
        this.publisherModel=publisherModel;
        this.city=city;
        this.isFollow=isFollow;
        this.isSelfPublished=isSelfPublished;
        
    }

  }


export {Service,ServiceDetails} 