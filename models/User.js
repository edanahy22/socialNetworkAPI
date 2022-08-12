const { Schema, model } = require('mongoose');

// Schema to create a course model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: Boolean,
      required: true,
      unique: true,
      default: true,
      match: [/^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/, 'Please Enter a Valid Email' ]
    },
    thoughts: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Thought' 
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
  ] 
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Course = model('course', courseSchema);

module.exports = Course;
