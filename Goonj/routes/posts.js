const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/goonj")

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    description: String,
    image: String

})


module.exports = mongoose.model("post", postSchema)

