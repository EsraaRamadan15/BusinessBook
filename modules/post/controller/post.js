import postModel from "../../../DB/models/postModels/post.js";

const createPost = async (req, res) => {
    const { title } = req.body
    console.log(title)
    if (req.fileErr) {
        res.status(400).json({ message: "in-valid format" })
    } else {
        const imageURL = [];
        console.log(req.files)
        req.files.forEach(file => {
            imageURL.push(`${req.finalDestination}/${file.filename}`)
        });

        //console.log(req.id)
        const newPost = new postModel({ title, images: imageURL, createdBy: req.userId })
        const savedPost = await newPost.save()
        res.status(201).json({ message: "Done", savedPost })
    }
}

export {createPost}
