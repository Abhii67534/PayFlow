const z = require("zod")

const mySchema = z.object({
    userName:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
})

const signin = z.object({
    userName:z.string().email(),
    password:z.string()
})

module.exports ={
    mySchema,
    signin
}