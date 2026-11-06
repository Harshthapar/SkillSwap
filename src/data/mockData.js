// Comprehensive mock data for SkillSwap platform

export const CURRENT_USER = {
  id: "usr-current",
  name: "Aiden Vance",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  department: "Computer Science & Engineering",
  year: "3rd Year",
  bio: "Passionate full-stack developer eager to refine UI/UX design and mobile app animation chops. Love pair programming!",
  skillsOffered: [
    { name: "React.js", category: "Web Development", level: "Advanced", desc: "Hooks, state management, SPA architecture" },
    { name: "Python", category: "Programming", level: "Intermediate", desc: "Data structures, scripting, basic automation" },
    { name: "TypeScript", category: "Web Development", level: "Intermediate", desc: "Type safety and scalable frontends" }
  ],
  skillsWanted: [
    { name: "UI/UX Design", category: "Design", level: "Beginner", desc: "Wireframing, design systems in Figma" },
    { name: "Motion Design", category: "Design", level: "Beginner", desc: "Micro-interactions and transitions" }
  ],
  learningPreferences: {
    format: "Hybrid", // In-person, Online, Hybrid
    availability: "Evenings & Weekends",
    sessionDuration: "60 mins"
  },
  skillCredits: 140,
  completedExchanges: 12,
  rating: 4.9,
  reviewsCount: 16
};

export const INITIAL_STUDENTS = [
  {
    id: "stu-1",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Interaction Design",
    year: "4th Year",
    bio: "Senior product design student. Love crafting clean aesthetics, design tokens, and user research protocols.",
    skillsOffered: [
      { name: "UI/UX Design", category: "Design", level: "Advanced", desc: "Figma master, design systems, usability heuristics" },
      { name: "Figma", category: "Design", level: "Advanced", desc: "Auto-layout, variables, interactive prototyping" }
    ],
    skillsWanted: [
      { name: "React.js", category: "Web Development", level: "Beginner", desc: "Wants to turn Figma concepts into real code" },
      { name: "TypeScript", category: "Web Development", level: "Beginner", desc: "Understanding typed components" }
    ],
    learningPreferences: {
      format: "Hybrid",
      availability: "Evenings & Weekends",
      sessionDuration: "60 mins"
    },
    skillCredits: 210,
    completedExchanges: 18,
    rating: 4.95,
    reviewsCount: 22,
    recentlyActive: "10 mins ago"
  },
  {
    id: "stu-2",
    name: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Data Science & AI",
    year: "3rd Year",
    bio: "Deep learning enthusiast. Building ML pipelines by day and learning visual storytelling by night.",
    skillsOffered: [
      { name: "Machine Learning", category: "AI/ML", level: "Advanced", desc: "PyTorch, scikit-learn, tabular classification" },
      { name: "Python", category: "Programming", level: "Advanced", desc: "Numpy, Pandas, high-performance data processing" }
    ],
    skillsWanted: [
      { name: "UI/UX Design", category: "Design", level: "Intermediate", desc: "Designing clean data dashboard interfaces" },
      { name: "Public Speaking", category: "Public Speaking", level: "Beginner", desc: "Presenting research papers effectively" }
    ],
    learningPreferences: {
      format: "Online",
      availability: "Weekends",
      sessionDuration: "60 mins"
    },
    skillCredits: 180,
    completedExchanges: 14,
    rating: 4.88,
    reviewsCount: 19,
    recentlyActive: "1 hour ago"
  },
  {
    id: "stu-3",
    name: "Sophia Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    department: "Media Arts & Cinema",
    year: "2nd Year",
    bio: "Video creator & storyteller. Editing reels, color grading cinematic shots, and podcast audio mixing.",
    skillsOffered: [
      { name: "Video Editing", category: "Video Editing", level: "Advanced", desc: "Premiere Pro, DaVinci Resolve color grading" },
      { name: "Photography", category: "Photography", level: "Intermediate", desc: "Portrait lighting, composition, Lightroom" }
    ],
    skillsWanted: [
      { name: "Web Development", category: "Web Development", level: "Beginner", desc: "Wants a custom portfolio website" },
      { name: "Python", category: "Programming", level: "Beginner", desc: "Automating video asset exports" }
    ],
    learningPreferences: {
      format: "In-person",
      availability: "Weekdays",
      sessionDuration: "45 mins"
    },
    skillCredits: 95,
    completedExchanges: 8,
    rating: 4.92,
    reviewsCount: 11,
    recentlyActive: "3 hours ago"
  },
  {
    id: "stu-4",
    name: "Devon Brooks",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Mechanical & Robotics",
    year: "4th Year",
    bio: "Robotics club president. Microcontrollers, ROS, motor drivers, and 3D CAD modeling.",
    skillsOffered: [
      { name: "Robotics", category: "Robotics", level: "Advanced", desc: "Arduino, ESP32, PID control, hardware integration" },
      { name: "C++", category: "Programming", level: "Intermediate", desc: "Embedded C++, memory management, pointers" }
    ],
    skillsWanted: [
      { name: "React.js", category: "Web Development", level: "Intermediate", desc: "Building robot telemetry web dashboard" },
      { name: "AI/ML", category: "AI/ML", level: "Beginner", desc: "Computer vision on Raspberry Pi" }
    ],
    learningPreferences: {
      format: "Hybrid",
      availability: "Evenings & Weekends",
      sessionDuration: "60 mins"
    },
    skillCredits: 165,
    completedExchanges: 15,
    rating: 4.9,
    reviewsCount: 17,
    recentlyActive: "30 mins ago"
  },
  {
    id: "stu-5",
    name: "Aaliyah Morales",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    department: "Business & Finance",
    year: "3rd Year",
    bio: "Fintech geek. Financial modeling, venture pitch decks, and personal finance budget algorithms.",
    skillsOffered: [
      { name: "Finance", category: "Finance", level: "Advanced", desc: "DCF modeling, budgeting spreadsheets, valuation" },
      { name: "Public Speaking", category: "Public Speaking", level: "Advanced", desc: "Keynotes, pitch delivery, imposter syndrome management" }
    ],
    skillsWanted: [
      { name: "Python", category: "Programming", level: "Intermediate", desc: "Algorithmic trading & automated backtesting" },
      { name: "Web Development", category: "Web Development", level: "Beginner", desc: "Landing page for student consultancy" }
    ],
    learningPreferences: {
      format: "Online",
      availability: "Weekdays",
      sessionDuration: "30 mins"
    },
    skillCredits: 130,
    completedExchanges: 11,
    rating: 4.85,
    reviewsCount: 14,
    recentlyActive: "2 days ago"
  },
  {
    id: "stu-6",
    name: "Karan Sharma",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science",
    year: "2nd Year",
    bio: "Competitive programmer and algorithms tutor. Big-O analysis and dynamic programming made intuitive.",
    skillsOffered: [
      { name: "C++", category: "Programming", level: "Advanced", desc: "STL, graph algorithms, dynamic programming" },
      { name: "Mathematics", category: "Mathematics", level: "Intermediate", desc: "Discrete math, combinatorics, linear algebra" }
    ],
    skillsWanted: [
      { name: "UI/UX Design", category: "Design", level: "Beginner", desc: "Clean UI for coding contest platform" },
      { name: "React.js", category: "Web Development", level: "Intermediate", desc: "Frontend state & clean components" }
    ],
    learningPreferences: {
      format: "Hybrid",
      availability: "Evenings & Weekends",
      sessionDuration: "60 mins"
    },
    skillCredits: 240,
    completedExchanges: 21,
    rating: 4.97,
    reviewsCount: 28,
    recentlyActive: "5 mins ago"
  },
  {
    id: "stu-7",
    name: "Zoe Zimmerman",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    department: "Music Production & Sound",
    year: "3rd Year",
    bio: "Sound designer, keyboardist, and Ableton Live beatmaker. Love synthesizing audio landscapes.",
    skillsOffered: [
      { name: "Music", category: "Music", level: "Advanced", desc: "Ableton Live, keyboard improvisation, synth theory" },
      { name: "Video Editing", category: "Video Editing", level: "Intermediate", desc: "Soundtrack syncing, audio restoration" }
    ],
    skillsWanted: [
      { name: "Web Development", category: "Web Development", level: "Intermediate", desc: "Web Audio API and interactive synths" },
      { name: "Graphic Design", category: "Design", level: "Beginner", desc: "Album art and typography" }
    ],
    learningPreferences: {
      format: "In-person",
      availability: "Weekends",
      sessionDuration: "60 mins"
    },
    skillCredits: 110,
    completedExchanges: 9,
    rating: 4.89,
    reviewsCount: 13,
    recentlyActive: "4 hours ago"
  },
  {
    id: "stu-8",
    name: "Tariq Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    department: "Applied Mathematics",
    year: "4th Year",
    bio: "Math enthusiast interested in cryptography, probabilistic modeling, and quantitative games.",
    skillsOffered: [
      { name: "Mathematics", category: "Mathematics", level: "Advanced", desc: "Multivariable calculus, probability, linear algebra" },
      { name: "Python", category: "Programming", level: "Intermediate", desc: "SciPy, numerical analysis" }
    ],
    skillsWanted: [
      { name: "UI/UX Design", category: "Design", level: "Beginner", desc: "Visualizing high-dimensional math" },
      { name: "Public Speaking", category: "Public Speaking", level: "Intermediate", desc: "Explaining theorem proofs clearly" }
    ],
    learningPreferences: {
      format: "Online",
      availability: "Weekdays",
      sessionDuration: "45 mins"
    },
    skillCredits: 155,
    completedExchanges: 13,
    rating: 4.91,
    reviewsCount: 15,
    recentlyActive: "Yesterday"
  },
  {
    id: "stu-9",
    name: "Maya Lin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Communication Studies",
    year: "2nd Year",
    bio: "Debate society vice-captain. Teaching storytelling, persuasive rhetoric, and clear presentation structuring.",
    skillsOffered: [
      { name: "Communication", category: "Communication", level: "Advanced", desc: "Persuasive writing, active listening, interview prep" },
      { name: "Public Speaking", category: "Public Speaking", level: "Advanced", desc: "Body language, slide presentation poise" }
    ],
    skillsWanted: [
      { name: "Web Development", category: "Web Development", level: "Beginner", desc: "Building a personal essay newsletter blog" },
      { name: "Video Editing", category: "Video Editing", level: "Intermediate", desc: "Editing debate breakdown shorts" }
    ],
    learningPreferences: {
      format: "Hybrid",
      availability: "Evenings & Weekends",
      sessionDuration: "45 mins"
    },
    skillCredits: 175,
    completedExchanges: 16,
    rating: 4.96,
    reviewsCount: 20,
    recentlyActive: "Just now"
  },
  {
    id: "stu-10",
    name: "Liam O'Connor",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    department: "Visual Communications",
    year: "3rd Year",
    bio: "Street & concert photographer. Master of natural lighting, street portraits, and raw grading.",
    skillsOffered: [
      { name: "Photography", category: "Photography", level: "Advanced", desc: "Manual exposure, mirrorless cameras, lightroom" },
      { name: "Design", category: "Design", level: "Intermediate", desc: "Editorial magazine layouts, poster design" }
    ],
    skillsWanted: [
      { name: "React.js", category: "Web Development", level: "Beginner", desc: "Building custom interactive photo gallery" },
      { name: "Finance", category: "Finance", level: "Beginner", desc: "Freelance pricing and invoicing" }
    ],
    learningPreferences: {
      format: "In-person",
      availability: "Weekends",
      sessionDuration: "60 mins"
    },
    skillCredits: 125,
    completedExchanges: 10,
    rating: 4.87,
    reviewsCount: 12,
    recentlyActive: "5 hours ago"
  },
  {
    id: "stu-11",
    name: "Priya Nair",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Artificial Intelligence",
    year: "4th Year",
    bio: "NLP researcher working on LLM fine-tuning and retrieval-augmented generation. Let's make AI helpful!",
    skillsOffered: [
      { name: "AI/ML", category: "AI/ML", level: "Advanced", desc: "Hugging Face transformers, LangChain, embeddings" },
      { name: "Python", category: "Programming", level: "Advanced", desc: "Asynchronous Python, FastAPI, API architecture" }
    ],
    skillsWanted: [
      { name: "UI/UX Design", category: "Design", level: "Intermediate", desc: "Conversational UI and AI agent human interfaces" },
      { name: "React.js", category: "Web Development", level: "Intermediate", desc: "Modern chat streaming frontends" }
    ],
    learningPreferences: {
      format: "Hybrid",
      availability: "Evenings & Weekends",
      sessionDuration: "60 mins"
    },
    skillCredits: 260,
    completedExchanges: 24,
    rating: 4.98,
    reviewsCount: 31,
    recentlyActive: "15 mins ago"
  },
  {
    id: "stu-12",
    name: "Julian Rivera",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80",
    department: "Mechatronics Engineering",
    year: "2nd Year",
    bio: "Robotics and drone hardware builder. Passionate about autonomous flight controllers and telemetry.",
    skillsOffered: [
      { name: "Robotics", category: "Robotics", level: "Intermediate", desc: "Quadcopter flight controllers, soldering, sensors" },
      { name: "Programming", category: "Programming", level: "Intermediate", desc: "C/C++, serial communication protocols" }
    ],
    skillsWanted: [
      { name: "Video Editing", category: "Video Editing", level: "Beginner", desc: "FPV drone cinematic reels" },
      { name: "Design", category: "Design", level: "Beginner", desc: "Branding our drone racing team" }
    ],
    learningPreferences: {
      format: "In-person",
      availability: "Weekends",
      sessionDuration: "45 mins"
    },
    skillCredits: 85,
    completedExchanges: 6,
    rating: 4.82,
    reviewsCount: 8,
    recentlyActive: "3 days ago"
  }
];

export const INITIAL_EXCHANGES = [
  {
    id: "exc-1",
    partnerId: "stu-1",
    partnerName: "Elena Rostova",
    partnerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    department: "Interaction Design",
    skillTeaching: "React.js",
    skillLearning: "UI/UX Design",
    status: "Accepted", // Pending, Accepted, Active, Completed, Rejected
    duration: "60 mins",
    learningFormat: "Hybrid",
    date: "Tomorrow, 5:30 PM",
    timestamp: Date.now() - 3600000 * 2,
    creditsValue: 20,
    notes: "Reviewing design system tokens and building corresponding Tailwind components."
  },
  {
    id: "exc-2",
    partnerId: "stu-6",
    partnerName: "Karan Sharma",
    partnerAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    department: "Computer Science",
    skillTeaching: "React.js",
    skillLearning: "C++",
    status: "Active",
    duration: "60 mins",
    learningFormat: "Hybrid",
    date: "Thursday, 4:00 PM",
    timestamp: Date.now() - 3600000 * 18,
    creditsValue: 20,
    notes: "Covered pointers and reference semantics. Next session: React state flow."
  },
  {
    id: "exc-3",
    partnerId: "stu-11",
    partnerName: "Priya Nair",
    partnerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Artificial Intelligence",
    skillTeaching: "React.js",
    skillLearning: "AI/ML",
    status: "Pending",
    duration: "60 mins",
    learningFormat: "Online",
    date: "Next Monday, 6:00 PM",
    timestamp: Date.now() - 3600000 * 26,
    creditsValue: 20,
    notes: "Proposed session on LLM streaming client interfaces."
  },
  {
    id: "exc-4",
    partnerId: "stu-2",
    partnerName: "Marcus Chen",
    partnerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Data Science & AI",
    skillTeaching: "Python",
    skillLearning: "UI/UX Design",
    status: "Completed",
    duration: "60 mins",
    learningFormat: "Online",
    date: "Oct 28, 2026",
    timestamp: Date.now() - 3600000 * 120,
    creditsValue: 20,
    notes: "Session completed with mutual 5-star ratings!"
  }
];

export const INITIAL_TRANSACTIONS = [
  {
    id: "tx-1",
    type: "earned",
    amount: 20,
    description: "Completed exchange session: Python fundamentals with Marcus Chen",
    date: "Nov 4, 2026",
    timestamp: Date.now() - 3600000 * 48
  },
  {
    id: "tx-2",
    type: "spent",
    amount: 20,
    description: "Learned UI/UX Design heuristics from Elena Rostova",
    date: "Nov 2, 2026",
    timestamp: Date.now() - 3600000 * 96
  },
  {
    id: "tx-3",
    type: "earned",
    amount: 30,
    description: "Peer bonus: Excellent student mentor milestone",
    date: "Oct 29, 2026",
    timestamp: Date.now() - 3600000 * 160
  },
  {
    id: "tx-4",
    type: "earned",
    amount: 20,
    description: "Completed exchange session: React state management with Devon Brooks",
    date: "Oct 25, 2026",
    timestamp: Date.now() - 3600000 * 250
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "High Compatibility Match!",
    message: "Elena Rostova (Interaction Design) shares a 96% reciprocal skill match with you.",
    time: "15m ago",
    read: false,
    type: "match"
  },
  {
    id: "notif-2",
    title: "Exchange Request Received",
    message: "Priya Nair requested a 60-minute peer exchange (React.js <-> AI/ML).",
    time: "2h ago",
    read: false,
    type: "exchange"
  },
  {
    id: "notif-3",
    title: "Skill Credits Credited",
    message: "You earned +20 Skill Credits for completing a session with Marcus Chen.",
    time: "Yesterday",
    read: true,
    type: "wallet"
  },
  {
    id: "notif-4",
    title: "Exchange Accepted",
    message: "Karan Sharma accepted your C++ exchange proposal.",
    time: "2 days ago",
    read: true,
    type: "accepted"
  }
];

export const COMMUNITY_ACTIVITIES = [
  {
    id: "act-1",
    user: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    action: "completed a peer exchange with",
    target: "Marcus Chen",
    details: "Figma Prototyping ↔ Python Automation",
    time: "22 mins ago"
  },
  {
    id: "act-2",
    user: "Karan Sharma",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    action: "created a new skill offer:",
    target: "Dynamic Programming in C++",
    details: "Looking to learn: UI/UX & Tailwind CSS",
    time: "1 hour ago"
  },
  {
    id: "act-3",
    user: "Priya Nair",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    action: "achieved the milestone:",
    target: "Top Rated Peer Mentor",
    details: "Awarded +50 Skill Credits badge",
    time: "3 hours ago"
  },
  {
    id: "act-4",
    user: "Sophia Patel",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    action: "completed an exchange with",
    target: "Liam O'Connor",
    details: "DaVinci Color Grading ↔ Portrait Lighting",
    time: "5 hours ago"
  },
  {
    id: "act-5",
    user: "Devon Brooks",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    action: "created a new skill offer:",
    target: "ROS2 & ESP32 Microcontrollers",
    details: "Looking to learn: React & Next.js",
    time: "8 hours ago"
  }
];

export const SKILL_CATEGORIES = [
  "All Categories",
  "Programming",
  "Web Development",
  "AI/ML",
  "Design",
  "Mathematics",
  "Communication",
  "Video Editing",
  "Photography",
  "Public Speaking",
  "Music",
  "Finance",
  "Robotics"
];

