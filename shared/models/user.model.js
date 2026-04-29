import { model, Schema } from "mongoose";
import { hash } from "bcryptjs";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) return this.password = await hash(this.password, 10);
    else next();
})

const User = model("User", userSchema);

export { User };