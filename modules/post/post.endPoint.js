import { roles } from "../../middleware/auth.js"

const endPoint = {
    createPost: [roles.Admin, roles.User]
}
export  {
    endPoint
}