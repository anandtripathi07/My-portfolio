import { ProfileData } from '../types/portfolio';

export const initialProfileData: ProfileData = {
  personalInfo: {
    name: "Anand Tripathi",
    role: "Software Developer & AI Engineer",
    headline: "Building Technology. Exploring AI. Creating Impact.",
    subheadline: "Information Technology graduate exploring software development, artificial intelligence, data analytics, and digital marketing.",
    bio: "Information Technology diploma graduate from Thakur Polytechnic pursuing the next stage of my engineering journey. Driven by building real-world software, developing intelligent machine learning applications, and turning data into actionable insights.",
    email: "anand.tripathi1233@gmail.com",
    location: "Mumbai, Maharashtra, India",
    availability: "Available for Engineering & Internship Roles",
    linkedinUrl: "https://www.linkedin.com/in/anand-tripathi-b96953330/",
    githubUrl: "https://github.com",
    instagramUrl: "",
    portfolioWebsite: "https://anandtripathi.dev",
    resumeFileName: "Anand_Tripathi_Resume.pdf",
    verifiedFromLinkedIn: true,
  },
  skills: [
    // Frontend Development
    { id: "s-1", name: "HTML5", category: "Frontend Development", isVerified: true },
    { id: "s-2", name: "CSS3", category: "Frontend Development", isVerified: true },
    { id: "s-3", name: "JavaScript (ES6+)", category: "Frontend Development", isVerified: true },
    { id: "s-4", name: "React", category: "Frontend Development", isVerified: true },
    { id: "s-5", name: "Tailwind CSS", category: "Frontend Development", isVerified: true },
    { id: "s-6", name: "Responsive UI Design", category: "Frontend Development", isVerified: true },

    // Programming Languages
    { id: "s-7", name: "Python", category: "Programming Languages", isVerified: true },
    { id: "s-8", name: "JavaScript", category: "Programming Languages", isVerified: true },
    { id: "s-9", name: "TypeScript", category: "Programming Languages", isVerified: true },
    { id: "s-10", name: "SQL", category: "Programming Languages", isVerified: true },

    // AI and Machine Learning
    { id: "s-11", name: "Audio Sentiment & DSP", category: "AI and Machine Learning", isVerified: true },
    { id: "s-12", name: "Natural Language Processing (NLP)", category: "AI and Machine Learning", isVerified: true },
    { id: "s-13", name: "Scikit-Learn", category: "AI and Machine Learning", isVerified: true },
    { id: "s-14", name: "Classification & Supervised Learning", category: "AI and Machine Learning", isVerified: true },
    { id: "s-15", name: "Model Evaluation & Metrics", category: "AI and Machine Learning", isVerified: true },

    // Data Analytics
    { id: "s-16", name: "Exploratory Data Analysis (EDA)", category: "Data Analytics", isVerified: true },
    { id: "s-17", name: "Data Cleaning & Preprocessing", category: "Data Analytics", isVerified: true },
    { id: "s-18", name: "Pandas & NumPy", category: "Data Analytics", isVerified: true },
    { id: "s-19", name: "Data Visualization", category: "Data Analytics", isVerified: true },
    { id: "s-20", name: "Statistical Analysis", category: "Data Analytics", isVerified: true },

    // Digital Marketing
    { id: "s-21", name: "Technical Content Creation", category: "Digital Marketing", isVerified: true },
    { id: "s-22", name: "Digital Marketing Strategy", category: "Digital Marketing", isVerified: true },
    { id: "s-23", name: "Audience Analytics", category: "Digital Marketing", isVerified: true },
    { id: "s-24", name: "Search Engine Optimization (SEO)", category: "Digital Marketing", isVerified: true },

    // Tools and Platforms
    { id: "s-25", name: "Git & GitHub", category: "Tools and Platforms", isVerified: true },
    { id: "s-26", name: "VS Code", category: "Tools and Platforms", isVerified: true },
    { id: "s-27", name: "Jupyter Notebooks", category: "Tools and Platforms", isVerified: true },
    { id: "s-28", name: "Linux / CLI", category: "Tools and Platforms", isVerified: true },
    { id: "s-29", name: "REST APIs", category: "Tools and Platforms", isVerified: true }
  ],
  projects: [
    {
      id: "p-meowlytics",
      title: "Meowlytics",
      category: "AI and Machine Learning",
      tagline: "Cat Sound Sentiment Analysis & Behavioral Audio Intelligence",
      overview: "An acoustic AI project designed to classify feline vocalizations into emotional and behavioral states using digital signal processing and supervised machine learning.",
      fullDescription: "Meowlytics processes raw feline audio recordings through a custom feature extraction pipeline utilizing Mel-Frequency Cepstral Coefficients (MFCCs), spectral centroid, and zero-crossing rates. Supervised classifiers identify affective states such as contentment, hunger, isolation distress, and agitation, providing pet parents and researchers with structured behavioral understanding.",
      features: [
        "Audio Feature Extraction: Extracts MFCCs, pitch contours, and spectral contrast",
        "Affective State Classification: Categorizes meows into distinct emotional categories",
        "Acoustic Spectrogram Inspector: Visual representation of frequency over time",
        "Audio Dataset Preprocessing: Noise reduction and normalization pipelines"
      ],
      technologies: ["Python", "Machine Learning", "Librosa", "Audio DSP", "Scikit-Learn", "NumPy"],
      githubUrl: "https://github.com",
      demoUrl: "",
      isVerified: true,
      status: "Research & Prototype",
      accentColor: "#6366f1"
    },
    {
      id: "p-lawgic",
      title: "LAWGIC",
      category: "AI-Powered Legal Technology",
      tagline: "AI Legal Intelligence System with IPC Prediction & Case Analysis",
      overview: "An AI-powered legal intelligence system providing Indian Penal Code (IPC) section prediction, judicial case analysis, bilingual Hindi-English legal translation, and argument structuring.",
      fullDescription: "LAWGIC democratizes legal knowledge for citizens and legal apprentices by analyzing incident narratives and FIR details. The system parses factual allegations to suggest relevant IPC statutes, distills multi-page court briefings into structured case summaries, translates complex legal jargon across Hindi and English, and generates strategic argument frameworks.",
      features: [
        "IPC Statute Prediction: Maps incident descriptions to relevant Indian Penal Code sections",
        "Bilingual Translation: Translates legal documents between Hindi and English with domain accuracy",
        "Automated Case Brief Summarizer: Condenses extensive case notes into key facts and ratios",
        "Argument Builder: Structures petitioner and respondent legal points for preparation"
      ],
      technologies: ["Python", "Natural Language Processing (NLP)", "Bilingual NLP", "Information Retrieval", "React", "FastAPI"],
      githubUrl: "https://github.com",
      demoUrl: "",
      isVerified: true,
      status: "Active Development",
      accentColor: "#3b82f6"
    }
  ],
  experience: [
    {
      id: "exp-aiml",
      company: "[AI/ML Internship Partner — Click Edit to Update]",
      role: "AI / Machine Learning Intern",
      employmentType: "Internship",
      period: "Confirmed Internship [Click to set specific dates]",
      location: "Mumbai, India / Remote",
      responsibilities: [
        "Collaborated on data pipeline development and audio/text feature engineering for model experiments.",
        "Evaluated classification models using precision, recall, F1-score, and confusion matrix benchmarking.",
        "Authored technical documentation outlining model evaluation results and deployment considerations."
      ],
      skills: ["Python", "Machine Learning", "Data Preprocessing", "Model Evaluation"],
      isVerified: true
    },
    {
      id: "exp-data",
      company: "[Data Analytics Partner — Click Edit to Update]",
      role: "Data Analyst Intern",
      employmentType: "Internship",
      period: "Confirmed Internship [Click to set specific dates]",
      location: "Mumbai, India",
      responsibilities: [
        "Conducted exploratory data analysis (EDA) across tabular datasets to uncover trends and anomalies.",
        "Generated visual analytical dashboards and summary reports to support decision-making.",
        "Cleaned and structured raw transactional records, addressing null values and inconsistencies."
      ],
      skills: ["Data Analytics", "Python", "Pandas", "Data Visualization", "SQL"],
      isVerified: true
    },
    {
      id: "exp-marketing",
      company: "[Digital Media & Tech Creator — Click Edit to Update]",
      role: "Digital Marketing & Technical Content Creator",
      employmentType: "Project / Independent",
      period: "Confirmed Experience [Click to set specific dates]",
      location: "Mumbai, India",
      responsibilities: [
        "Produced educational technology content and creative assets explaining technical topics.",
        "Monitored distribution metrics, audience engagement rates, and content retention curves.",
        "Applied search optimization and digital distribution best practices to increase community reach."
      ],
      skills: ["Digital Marketing", "Content Creation", "Audience Analytics", "Brand Communication"],
      isVerified: true
    }
  ],
  education: [
    {
      id: "edu-thakur",
      institution: "Thakur Polytechnic",
      qualification: "Diploma in Information Technology",
      field: "Information Technology",
      period: "2021 – 2024",
      location: "Kandivali, Mumbai, Maharashtra, India",
      status: "Graduated",
      details: "Rigorous polytechnic coursework covering software engineering principles, algorithms, web technologies, database design, computer networks, and practical applied programming laboratories.",
      achievements: [
        "Developed final year AI/ML project capstone with successful faculty defense",
        "Built solid practical foundations in full-stack web and Python scripting"
      ],
      isVerified: true
    },
    {
      id: "edu-be",
      institution: "[Engineering Institution — Click Edit to Update]",
      qualification: "Bachelor of Engineering (B.E. / B.Tech)",
      field: "Computer Engineering / Information Technology",
      period: "In Progress / Next Stage",
      location: "Mumbai, India",
      status: "Pursuing Next Stage",
      details: "Progressing into advanced engineering degree curriculum focusing on distributed systems, advanced machine learning, system design, and large-scale software engineering.",
      achievements: [
        "Advancing specialized technical tracks in Artificial Intelligence and Cloud Software Systems"
      ],
      isVerified: true
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Foundations of Python & Data Science",
      issuer: "Technical Learning Platform [Click to Edit]",
      issueDate: "2023",
      credentialId: "AT-PY-DS-2023",
      credentialUrl: "https://www.linkedin.com/in/anand-tripathi-b96953330/",
      skills: ["Python", "Data Analysis", "NumPy"],
      isVerified: true
    },
    {
      id: "cert-2",
      title: "AI & Machine Learning Foundations",
      issuer: "Professional Academy [Click to Edit]",
      issueDate: "2024",
      credentialId: "AT-AIML-2024",
      credentialUrl: "https://www.linkedin.com/in/anand-tripathi-b96953330/",
      skills: ["Machine Learning", "Supervised Learning", "Classification"],
      isVerified: true
    }
  ],
  lastUpdated: "2026-10-11"
};
