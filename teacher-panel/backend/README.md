# Teacher Panel Backend

Backend API for the Teacher Panel using MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Ideas Management**: CRUD operations for student project ideas with status tracking (Pending, Accepted, Rejected)
- **Student Issues**: Handle student issues with teacher replies
- **Teacher Feedback**: Store and retrieve feedback given to students
- **File Uploads**: Manage teacher file uploads for students
- **Progress Tracking**: Track student project progress with tasks

## API Endpoints

### Ideas
- `GET /api/ideas` - Get all ideas
- `GET /api/ideas/:id` - Get idea by ID
- `POST /api/ideas` - Create new idea
- `PUT /api/ideas/:id` - Update idea
- `PATCH /api/ideas/:id/status` - Update idea status
- `DELETE /api/ideas/:id` - Delete idea
- `GET /api/ideas/status/:status` - Get ideas by status
- `GET /api/ideas/session/:session` - Get ideas by session

### Student Issues
- `GET /api/issues` - Get all issues
- `GET /api/issues/:id` - Get issue by ID
- `POST /api/issues` - Create new issue
- `PUT /api/issues/:id/reply` - Reply to issue
- `PATCH /api/issues/:id/status` - Update issue status
- `DELETE /api/issues/:id` - Delete issue
- `GET /api/issues/category/:category` - Get issues by category

### Teacher Feedback
- `GET /api/feedback` - Get all feedback
- `GET /api/feedback/:id` - Get feedback by ID
- `GET /api/feedback/idea/:ideaId` - Get feedback by idea ID
- `POST /api/feedback` - Create new feedback
- `DELETE /api/feedback/:id` - Delete feedback

### File Uploads
- `GET /api/uploads` - Get all uploads
- `GET /api/uploads/:id` - Get upload by ID
- `POST /api/uploads` - Create new upload
- `DELETE /api/uploads/:id` - Delete upload
- `GET /api/uploads/teacher/:teacherName` - Get uploads by teacher

### Student Progress
- `GET /api/progress` - Get all progress records
- `GET /api/progress/:id` - Get progress by ID
- `GET /api/progress/leader/:leaderName` - Get progress by leader name
- `POST /api/progress` - Create new progress record
- `PUT /api/progress/:id` - Update progress
- `PATCH /api/progress/:id/progress` - Update progress percentage
- `POST /api/progress/:id/tasks` - Add task to progress
- `PATCH /api/progress/:id/tasks/:taskId` - Update task status
- `DELETE /api/progress/:id` - Delete progress

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (installed and running)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Edit `.env` file and set your MongoDB URI:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/teacher-panel-db
NODE_ENV=development
```

4. Start MongoDB (if not already running):
```bash
# On Windows
net start MongoDB

# On Mac/Linux
sudo systemctl start mongod
# or
mongod
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## Data Models

### Idea
```javascript
{
  title: String,
  leader: { name: String },
  team: [{ name: String }],
  session: 'Morning' | 'Evening',
  shortDescription: String,
  fullDescription: String,
  status: 'Pending' | 'Accepted' | 'Rejected',
  progress: Number (0-100),
  milestones: { current: String, next: String }
}
```

### StudentIssue
```javascript
{
  category: String,
  description: String,
  studentName: String,
  status: 'Pending' | 'Replied' | 'Resolved',
  teacherReply: String,
  timestamp: Date
}
```

### TeacherFeedback
```javascript
{
  ideaId: ObjectId,
  ideaTitle: String,
  leaderName: String,
  feedback: String,
  status: 'Accepted' | 'Rejected' | 'Feedback Sent',
  teacherName: String,
  timestamp: Date
}
```

### TeacherUpload
```javascript
{
  name: String,
  size: String,
  type: String,
  announcement: String,
  uploadedBy: String,
  uploadDate: Date,
  data: String (Base64)
}
```

### StudentProgress
```javascript
{
  projectName: String,
  leaderName: String,
  members: [String],
  progress: Number (0-100),
  tasks: [{ title: String, status: 'Pending' | 'In Progress' | 'Completed' }]
}
```

## Testing the API

You can test the API using:
- Postman
- curl commands
- Any HTTP client

Example curl command:
```bash
curl http://localhost:5000/api/ideas
```

## Integration with Frontend

To integrate this backend with the teacher panel frontend:

1. Update the frontend components to use API calls instead of localStorage
2. Replace localStorage operations with fetch/axios calls to the backend endpoints
3. Update the base URL in API calls to `http://localhost:5000/api`

Example:
```javascript
// Instead of:
const ideas = JSON.parse(localStorage.getItem('studentIdeas') || '[]');

// Use:
const response = await fetch('http://localhost:5000/api/ideas');
const ideas = await response.json();
```

## License

ISC
