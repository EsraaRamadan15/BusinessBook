import { roles } from "../../middleware/auth.js"

const userAuthorization = {
    endPoint: [roles.User]
}

const adminAuthorization = {
    endPoint: [roles.Admin]
}
export  {
    userAuthorization,adminAuthorization
}