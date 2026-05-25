import Team from '../models/Team.js';

// Create or update a team
export const saveTeam = async (req, res) => {
  try {
    const { projectName, leaderName, leaderPassword, members } = req.body;

    // Check if project name already exists
    const existingTeam = await Team.findOne({ projectName });
    
    if (existingTeam) {
      // Update existing team
      existingTeam.leaderName = leaderName;
      existingTeam.leaderPassword = leaderPassword;
      existingTeam.members = members;
      const updatedTeam = await existingTeam.save();

      res.status(200).json({ 
        success: true, 
        message: 'Team updated successfully!',
        team: updatedTeam 
      });
    } else {
      // Create new team
      const newTeam = new Team({
        projectName,
        leaderName,
        leaderPassword,
        members
      });

      const savedTeam = await newTeam.save();

      res.status(201).json({ 
        success: true, 
        message: 'Team created successfully!',
        team: savedTeam 
      });
    }
  } catch (error) {
    console.error('Error saving team:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving team', 
      error: error.message 
    });
  }
};

// Get team by project name
export const getTeamByProject = async (req, res) => {
  try {
    const { projectName } = req.params;
    const team = await Team.findOne({ projectName });

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found' 
      });
    }

    res.status(200).json({ success: true, team });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching team', 
      error: error.message 
    });
  }
};

// Verify leader password
export const verifyLeaderPassword = async (req, res) => {
  try {
    const { projectName, password } = req.body;
    const team = await Team.findOne({ projectName });

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found' 
      });
    }

    if (team.leaderPassword !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid password' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Password verified successfully',
      leaderName: team.leaderName,
      members: team.members 
    });
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying password', 
      error: error.message 
    });
  }
};

// Update project name
export const updateProjectName = async (req, res) => {
  try {
    const { oldProjectName, newProjectName } = req.body;

    const team = await Team.findOne({ projectName: oldProjectName });

    if (!team) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found' 
      });
    }

    team.projectName = newProjectName;
    const updatedTeam = await team.save();

    res.status(200).json({ 
      success: true, 
      message: 'Project name updated successfully',
      team: updatedTeam 
    });
  } catch (error) {
    console.error('Error updating project name:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating project name', 
      error: error.message 
    });
  }
};

// Delete team
export const deleteTeam = async (req, res) => {
  try {
    const { projectName } = req.params;
    const deletedTeam = await Team.findOneAndDelete({ projectName });

    if (!deletedTeam) {
      return res.status(404).json({ 
        success: false, 
        message: 'Team not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Team deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting team', 
      error: error.message 
    });
  }
};
