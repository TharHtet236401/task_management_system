import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  deadline: {
    type: Date,
    required: true
  },
}, {
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
