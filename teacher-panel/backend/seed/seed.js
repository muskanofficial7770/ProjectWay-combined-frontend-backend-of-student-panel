const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Idea = require('../models/Idea');
const StudentIssue = require('../models/StudentIssue');
const TeacherFeedback = require('../models/TeacherFeedback');
const TeacherUpload = require('../models/TeacherUpload');
const Notification = require('../models/Notification');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/teacher-panel-db');
    console.log('MongoDB Connected');

    // Clear existing data
    await Idea.deleteMany({});
    await StudentIssue.deleteMany({});
    await TeacherFeedback.deleteMany({});
    await TeacherUpload.deleteMany({});
    await Notification.deleteMany({});
    console.log('Cleared existing data');

    // Seed initial ideas
    const initialIdeas = [
      {
        title: 'Smart Garden System',
        leader: { name: 'Alex Johnson' },
        team: [{ name: 'Sarah Lee' }, { name: 'Mike Chen' }],
        session: 'Morning',
        shortDescription: 'An IoT based automated watering system using Arduino...',
        fullDescription: 'A comprehensive system using Arduino sensors to monitor soil moisture, temperature, and sunlight. The system will automatically water plants when moisture drops below a threshold and log data to a local server for analysis.',
        status: 'Pending',
        progress: 75,
        milestones: { current: 'Prototype', next: 'Testing Phase' }
      },
      {
        title: 'Recycle App',
        leader: { name: 'Sarah Lee' },
        team: [{ name: 'Alex Johnson' }],
        session: 'Evening',
        shortDescription: 'Mobile app for tracking local recycling centers and rewards...',
        fullDescription: 'A cross-platform mobile application that gamifies recycling. Users can scan items to identify if they are recyclable, find nearby centers, and earn points redeemable at local businesses.',
        status: 'Pending',
        progress: 15,
        milestones: { current: 'Wireframing', next: 'MVP Development' }
      },
      {
        title: 'Study Buddy',
        leader: { name: 'Mike Chen' },
        team: [{ name: 'David Miller' }],
        session: 'Morning',
        shortDescription: 'Peer-to-peer tutoring platform for high school students...',
        fullDescription: 'An online web platform connecting students who need help with those who excel in specific subjects. Features include video chat, whiteboard sharing, and scheduling tools.',
        status: 'Pending',
        progress: 40,
        milestones: { current: 'Backend Setup', next: 'Frontend Integration' }
      },
      {
        title: 'Drone Delivery',
        leader: { name: 'Emily Davis' },
        team: [],
        session: 'Evening',
        shortDescription: 'Prototype for campus delivery drone with obstacle avoidance...',
        fullDescription: 'Designing a lightweight drone capable of carrying small packages (up to 2kg) across campus. The focus is on autonomous navigation and obstacle avoidance using ultrasonic sensors.',
        status: 'Pending',
        progress: 10,
        milestones: { current: 'Component Sourcing', next: 'Chassis Assembly' }
      },
      {
        title: 'Solar Charger Pro',
        leader: { name: 'Jessica Wong' },
        team: [],
        session: 'Evening',
        shortDescription: 'Portable solar charging unit for mobile devices...',
        fullDescription: 'A high-efficiency portable solar charger with a foldable design. It includes a built-in battery bank to store energy for night-time charging.',
        status: 'Accepted',
        progress: 75,
        milestones: { current: 'Prototype', next: 'Testing Phase' }
      },
      {
        title: 'Campus Map VR',
        leader: { name: 'David Miller' },
        team: [],
        session: 'Morning',
        shortDescription: 'Virtual reality tour of campus grounds...',
        fullDescription: 'An immersive VR experience allowing prospective students to tour campus from home. Built using Unity and available on Oculus Quest.',
        status: 'Accepted',
        progress: 90,
        milestones: { current: 'Polishing', next: 'Launch' }
      },
      {
        title: 'Bio-Plastic Utils',
        leader: { name: 'Amara Okafor' },
        team: [],
        session: 'Morning',
        shortDescription: 'Biodegradable cutlery made from starch...',
        fullDescription: 'Developing a formula for durable, heat-resistant cutlery made entirely from potato starch and glycerin. Fully compostable within 30 days.',
        status: 'Accepted',
        progress: 60,
        milestones: { current: 'Formula Testing', next: 'Mold Design' }
      },
      {
        title: 'Waste Not App',
        leader: { name: 'Sarah Jenkins' },
        team: [],
        session: 'Evening',
        shortDescription: 'App to connect restaurants with food banks...',
        fullDescription: 'A logistics app to help restaurants donate excess food to local shelters. Includes liability waiver generation and transport scheduling.',
        status: 'Rejected',
        progress: 10,
        milestones: { current: 'Concept', next: 'Stopped' }
      }
    ];

    const seededIdeas = await Idea.insertMany(initialIdeas);
    console.log('Seeded initial ideas');

    // Seed sample student issue
    await StudentIssue.create({
      category: 'Technical',
      description: 'Having trouble connecting to the database server',
      studentName: 'Alex Johnson',
      status: 'Pending'
    });
    console.log('Seeded sample student issue');

    // Seed sample teacher feedback with valid ideaId
    if (seededIdeas.length > 0) {
      await TeacherFeedback.create({
        ideaId: seededIdeas[0]._id,
        ideaTitle: seededIdeas[0].title,
        leaderName: seededIdeas[0].leader.name,
        feedback: 'Great concept! Focus on the sensor accuracy.',
        status: 'Feedback Sent',
        teacherName: 'Teacher'
      });
      console.log('Seeded sample teacher feedback');

      // Seed sample notification
      await Notification.create({
        ideaId: seededIdeas[0]._id,
        title: seededIdeas[0].title,
        leaderName: seededIdeas[0].leader.name,
        read: false,
        submittedAt: new Date()
      });
      console.log('Seeded sample notification');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
