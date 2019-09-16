const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    watched: [Number],
    wanted: [Number],
});

userSchema.query.byName = function(name) {
    return this.where( { userName: new RegExp( name, 'i') });
}

const User = mongoose.model("User", userSchema);

module.exports = User;