import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    unique: true
  },
  leaderName: {
    type: String,
    required: true
  },
  leaderPassword: {
    type: String,
    required: true
  },
  members: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
