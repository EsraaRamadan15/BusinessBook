let User =class  {
    id
    firstName="";
    lastName="";
    email="";
    deviceToken;
    birthDate;
    phone;
    jobTitle;
    specialty;
    businessType;
    city;
    country;
    gender="";
    address;
    personalImage;
    coverImage;
    followersNumber=0;
    followingsNumber=0
    constructor(id,firstName, lastName, email,deviceToken,birthDate,phone,jobTitle,specialty,
        businessType,country,city,gender,address,personalImage,coverImage) {
            this.id=id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.deviceToken = deviceToken;
        this.birthDate = birthDate;
        this.phone = phone;
        this.jobTitle = jobTitle;
        this.specialty = specialty;
        this.businessType = businessType;
        this.country = country;
        this.city = city;
        this.gender = gender;
        this.address = address;
        this.personalImage = personalImage;
        this.coverImage = coverImage;
        
    }
}
export default User