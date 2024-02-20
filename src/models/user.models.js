import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        require: true,
        trin: true
    },
    email: {
        type: String ,
        unique: true,
        require: true,
        trin: true
    },
    password: {
        type: String,
        require: true
    }
    },{

    timestamps: true   //creates createdAt and updatedAt fields
});

export default mongoose.model("User", userSchema);