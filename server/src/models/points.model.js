import mongoose from 'mongoose'
const PointsSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "Student" 
  },
  type: { 
    type: String, enum: ["GRADE", "ATTENDANCE", "ASSIGNMENT", "SPORTS", "EXTRA_CURRICULAR", ] 
  },
  points: Number,
  reason: String,
  createdAt: { type: Date, default: Date.now }
});

const Points = mongoose.model('Points', PointsSchema)