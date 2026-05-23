import React, { useState, useEffect } from 'react';

const SubmitIdea = () => {
  const [projectName, setProjectName] = useState('');
  const [session, setSession] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [memberInput, setMemberInput] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('submitIdeaDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setProjectName(draft.projectName || '');
        setSession(draft.session || '');
        setLeaderName(draft.leaderName || '');
        setDescription(draft.description || '');
        setMembers(draft.members || []);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const handleSaveDraft = () => {
    const draftData = {
      projectName,
      session,
      leaderName,
      description,
      members,
      savedAt: new Date().toISOString()
    };

    localStorage.setItem('submitIdeaDraft', JSON.stringify(draftData));
    
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleAddMember = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (memberInput.trim()) {
        setMembers([...members, memberInput.trim()]);
        setMemberInput('');
      }
    }
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!session) {
      newErrors.session = 'Session is required';
    }
    
    if (!leaderName.trim()) {
      newErrors.leaderName = 'Leader name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (members.length === 0) {
      newErrors.members = 'At least one team member is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill all fields properly');
      return;
    }

    // Check for duplicate submissions (any student with same idea)
    const existingIdeas = JSON.parse(localStorage.getItem('studentIdeas') || '[]');
    const isDuplicate = existingIdeas.some(idea => 
      idea.title.toLowerCase().trim() === projectName.toLowerCase().trim() && 
      idea.fullDescription.toLowerCase().trim() === description.toLowerCase().trim()
    );

    if (isDuplicate) {
      alert('This project idea already submitted by another student! Please choose a different idea.');
      return;
    }

    // Create new idea object
    const newIdea = {
      id: Date.now(), // Simple unique ID
      title: projectName,
      session: session,
      leader: { name: leaderName },
      shortDescription: description.substring(0, 100) + '...',
      fullDescription: description,
      team: members.map(name => ({ name })),
      status: 'Pending',
      submittedAt: new Date().toISOString()
    };

    const updatedIdeas = [...existingIdeas, newIdea];

    // Save to localStorage
    localStorage.setItem('studentIdeas', JSON.stringify(updatedIdeas));

    const notifications = JSON.parse(localStorage.getItem('teacherIdeaNotifications') || '[]');
    notifications.push({
      id: Date.now(),
      ideaId: newIdea.id,
      title: newIdea.title,
      leaderName: leaderName,
      read: false,
      submittedAt: newIdea.submittedAt,
    });
    localStorage.setItem('teacherIdeaNotifications', JSON.stringify(notifications));

    // Show success message
    alert('Project idea submitted successfully!');
    
    // Clear saved draft after successful submission
    localStorage.removeItem('submitIdeaDraft');
    
    // Reset form
    setProjectName('');
    setSession('');
    setLeaderName('');
    setDescription('');
    setMembers([]);
    setMemberInput('');
    setErrors({});
  };

  return (
    <div className="si-page">
      <div className="si-header-row">
        <div>
          <h2 className="si-title">Submit Project Idea</h2>
          <p className="si-subtitle">
            Submit your ideas to the teachers for review. Make sure to provide a clear description and add your team members if you have any. 
          </p>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="si-success-message">
          <span className="material-symbols-outlined si-success-icon">
            check_circle
          </span>
          <span>Draft Saved Successfully</span>
        </div>
      )}

      <div className="si-card">
        {/* Form */}
        <div className="si-card-inner">
          <div className="si-form-grid">
            <div className="si-field si-field-full">
              <label className="si-label">Project Idea Name</label>
              <input
                className={`si-input ${errors.projectName ? 'error' : ''}`}
                placeholder="Enter your project idea name like ecommerce website ..."
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              {errors.projectName && <span className="error-message">{errors.projectName}</span>}
            </div>

            <div className="si-field">
              <label className="si-label">Session</label>
              <div className="si-select-wrapper">
               <select className={`si-select ${errors.session ? 'error' : ''}`} value={session} onChange={(e) => setSession(e.target.value)}>
                  <option value="">Select Session</option>
                  <option value="Morning Session (09:00 - 12:00)">Morning Session (09:00 - 12:00)</option>
                  <option value="Evening Session (14:00 - 17:00)">Evening Session (14:00 - 17:00)</option>
                </select>
                <span className="si-select-icon-wrapper">
                  <span className="material-symbols-outlined si-select-icon">
                    expand_more
                  </span>
                </span>
              </div>
              {errors.session && <span className="error-message">{errors.session}</span>}
            </div>

            <div className="si-field">
              <label className="si-label">Leader Name</label>
              <input
                className={`si-input ${errors.leaderName ? 'error' : ''}`}
                placeholder="Enter your name"
                type="text"
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
              />
              {errors.leaderName && <span className="error-message">{errors.leaderName}</span>}
            </div>

            <div className="si-field si-field-full">
              <label className="si-label">Description</label>
              <textarea
                className={`si-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Describe your project idea including the problem it solves and any technologies you plan to use. "
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
              <p className="si-counter">{description.length} / 500 characters</p>
            </div>

            <div className="si-field si-field-full">
              <label className="si-label">Team Members</label>
              <div className="si-chip-input">
                {members.map((member, idx) => (
                  <div key={idx} className="si-chip">
                    {member}
                    <button
                      type="button"
                      onClick={() => removeMember(idx)}
                      className="si-chip-remove"
                    >
                      <span className="material-symbols-outlined si-chip-remove-icon">
                        close
                      </span>
                    </button>
                  </div>
                ))}
                <input
                  className="border-none focus:ring-0 p-1 text-sm bg-transparent flex-1 min-w-[140px] text-slate-900 dark:text-white"
                  placeholder="Type name & press Enter..."
                  type="text"
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  onKeyDown={handleAddMember}
                />
              </div>
              {errors.members && <span className="error-message">{errors.members}</span>}
              <p className="si-hint">
                <span className="material-symbols-outlined si-hint-icon">
                  info
                </span>
                Press Enter to add a member. Add up to 4 additional members.
              </p>
            </div>
          </div>

          <div className="si-footer-row">
            <div className="si-footer-actions">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="si-btn-secondary"
              >
                Save Draft
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="si-btn-primary"
              >
                <span className="material-symbols-outlined si-btn-primary-icon">
                  send
                </span>
                Submit Project Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitIdea;