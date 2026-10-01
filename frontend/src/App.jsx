import { useEffect, useState } from "react";
import {
  Sparkles,
  BrainCircuit,
  Plus,
  ArrowRight,
  ArrowUpRight,
  X,
  Target,
  BarChart3,
  Compass,
  CheckCircle2,
  AlertCircle,
  Code2,
  Database,
  Lightbulb,
  TrendingUp,
  Sun,
  Moon,
} from "lucide-react";

import "./App.css";

const API_URL = "https://skillsense-ai-8u7m.onrender.com";

const suggestedSkills = [
  "Machine Learning",
  "Data Analysis",
  "Power BI",
  "Node.js",
  "AWS",
  "Docker",
  "FastAPI",
  "Statistics",
];

function App() {
  const [skills, setSkills] = useState(["Python", "Pandas", "SQL"]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiOnline, setApiOnline] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((res) => {
        if (res.ok) setApiOnline(true);
      })
      .catch(() => setApiOnline(false));
  }, []);

  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  const addSkill = (skill) => {
    const cleanSkill = skill.trim();
    if (!cleanSkill) return;

    const exists = skills.some(
      (item) => item.toLowerCase() === cleanSkill.toLowerCase()
    );

    if (!exists) {
      setSkills((prev) => [...prev, cleanSkill]);
    }

    setInput("");
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(input);
    }
  };

  const analyzeSkills = async () => {
    if (skills.length === 0 || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skills }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 700);
    } catch (error) {
      console.error(error);
      setLoading(false);

      setResult({
        error:
          "Unable to connect to the AI model. Make sure FastAPI is running.",
      });
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`app ${darkMode ? "dark-mode" : ""}`}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mouse.x}px`,
        "--mouse-y": `${mouse.y}px`,
      }}
    >
      <div className="cursor-glow" />

      <nav className="navbar">
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={19} />
          </div>
          <div>
            <strong>SkillSense</strong>
            <span>AI CAREER INTELLIGENCE</span>
          </div>
        </div>

        <div className="nav-links">
          <button onClick={() => scrollTo("analyzer")}>Analyzer</button>
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("roadmap")}>Roadmap</button>
        </div>

        <div className="nav-actions">
          <div className={`api-status ${apiOnline ? "online" : ""}`}>
            <span />
            {apiOnline ? "API Online" : "API Offline"}
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-badge">
            <Sparkles size={14} />
            AI-POWERED CAREER INTELLIGENCE
          </div>

          <h1>
            Turn your <span>skills</span>
            <br />
            into your next career move.
          </h1>

          <p>
            Discover career roles that match your technical skills,
            understand your gaps, and follow a personalized learning path.
          </p>

          <div className="hero-stats">
            <div>
              <strong>ML</strong>
              <span>Prediction</span>
            </div>
            <div>
              <strong>TOP 3</strong>
              <span>Career Matches</span>
            </div>
            <div>
              <strong>AI</strong>
              <span>Skill Analysis</span>
            </div>
          </div>
        </section>

        <section id="analyzer" className="analyzer-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CAREER ANALYZER</span>
              <h2>Where can your skills take you?</h2>
            </div>
            <p>
              Add the technologies you know and let SkillSense analyze your
              career direction.
            </p>
          </div>

          <div className="analyzer-grid">
            <div className="panel skills-panel">
              <div className="panel-label">
                <div className="panel-icon">
                  <Code2 size={18} />
                </div>
                <div>
                  <span>YOUR SKILLS</span>
                  <p>Build your technical profile</p>
                </div>
              </div>

              <div className="skill-input">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a skill (e.g. React, Python, SQL...)"
                />

                <button
                  className="add-button"
                  onClick={() => addSkill(input)}
                  aria-label="Add skill"
                >
                  <Plus size={21} />
                </button>
              </div>

              <div className="skill-chips">
                {skills.map((skill) => (
                  <div className="skill-chip" key={skill}>
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="suggested">
                <div className="suggested-title">
                  <Lightbulb size={16} />
                  Suggested for you
                  <button type="button">View all</button>
                </div>

                <div className="suggested-list">
                  {suggestedSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className={`analyze-button ${loading ? "loading" : ""}`}
                onClick={analyzeSkills}
                disabled={loading || skills.length === 0}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Analyzing your profile...
                  </>
                ) : (
                  <>
                    Analyze My Skills
                    <ArrowRight size={21} />
                  </>
                )}
              </button>

              <div className="how-it-works">
                <div className="how-header">
                  <div className="how-icon">
                    <Sparkles size={17} />
                  </div>
                  <div>
                    <span>HOW SKILLSENSE WORKS</span>
                    <p>From your skills to your next career move.</p>
                  </div>
                </div>

                <div className="how-steps">
                  <div className="how-step">
                    <div className="step-number">01</div>
                    <div>
                      <h4>Add your skills</h4>
                      <p>Tell us the technologies you already know.</p>
                    </div>
                  </div>

                  <div className="how-step">
                    <div className="step-number">02</div>
                    <div>
                      <h4>AI analyzes your profile</h4>
                      <p>Your skills are processed by the ML model.</p>
                    </div>
                  </div>

                  <div className="how-step">
                    <div className="step-number">03</div>
                    <div>
                      <h4>Discover career matches</h4>
                      <p>Get your top matching career roles.</p>
                    </div>
                  </div>

                  <div className="how-step">
                    <div className="step-number">04</div>
                    <div>
                      <h4>Build your roadmap</h4>
                      <p>See what skills you can learn next.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="career-intelligence-card">
                <div className="intelligence-header">
                  <div className="intelligence-icon">
                    <BrainCircuit size={17} />
                  </div>

                  <div>
                    <span>CAREER INTELLIGENCE</span>
                    <p>Everything SkillSense analyzes for you.</p>
                  </div>
                </div>

                <div className="intelligence-items">
                  <div className="intelligence-item">
                    <CheckCircle2 size={15} />
                    <div>
                      <strong>Skill Matching</strong>
                      <span>Find roles aligned with your skills.</span>
                    </div>
                  </div>

                  <div className="intelligence-item">
                    <CheckCircle2 size={15} />
                    <div>
                      <strong>Career Prediction</strong>
                      <span>Discover your strongest directions.</span>
                    </div>
                  </div>

                  <div className="intelligence-item">
                    <CheckCircle2 size={15} />
                    <div>
                      <strong>Skill Gap Detection</strong>
                      <span>Understand what you should learn next.</span>
                    </div>
                  </div>

                  <div className="intelligence-item">
                    <CheckCircle2 size={15} />
                    <div>
                      <strong>Learning Roadmap</strong>
                      <span>Follow a structured path toward your goal.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="next-steps-card">
                <div className="next-steps-header">
                  <div className="next-steps-icon">
                    <ArrowUpRight size={17} />
                  </div>

                  <div>
                    <span>YOUR NEXT STEPS</span>
                    <p>Simple actions to strengthen your career profile.</p>
                  </div>
                </div>

                <div className="next-step-list">
                  <div className="next-step">
                    <div className="next-step-number">01</div>
                    <div>
                      <strong>Strengthen your core skills</strong>
                      <span>Practice Python, SQL and Power BI.</span>
                    </div>
                  </div>

                  <div className="next-step">
                    <div className="next-step-number">02</div>
                    <div>
                      <strong>Close your skill gaps</strong>
                      <span>Learn Excel, Tableau and Statistics.</span>
                    </div>
                  </div>

                  <div className="next-step">
                    <div className="next-step-number">03</div>
                    <div>
                      <strong>Build a real project</strong>
                      <span>Apply your skills to a practical dataset.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel result-panel">
              {!result && !loading && (
                <div className="empty-result">
                  <div className="brain-icon">
                    <BrainCircuit size={38} />
                  </div>

                  <h2>Career Analysis</h2>

                  <p>
                    Your personalized career prediction
                    <br />
                    will appear here.
                  </p>

                  <div className="result-tags">
                    <span>
                      <CheckCircle2 size={14} />
                      ML Prediction
                    </span>
                    <span>
                      <CheckCircle2 size={14} />
                      Skill Analysis
                    </span>
                  </div>
                </div>
              )}

              {loading && (
                <div className="loading-result">
                  <div className="ai-loader">
                    <BrainCircuit size={42} />
                  </div>

                  <h2>Analyzing your skills</h2>

                  <p>
                    Processing your profile through the
                    <br />
                    SkillSense machine learning model...
                  </p>

                  <div className="loading-bars">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {result && !result.error && <CareerResult result={result} />}

              {result?.error && (
                <div className="error-result">
                  <AlertCircle size={42} />
                  <h2>Analysis unavailable</h2>
                  <p>{result.error}</p>
                  <button onClick={analyzeSkills}>Try Again</button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="features" className="features-section">
          <div className="section-heading centered">
            <span className="eyebrow">INTELLIGENCE LAYER</span>
            <h2>More than a prediction.</h2>
            <p>
              SkillSense connects career prediction with practical next steps.
            </p>
          </div>

          <div className="feature-grid">
            <FeatureCard
              icon={<Target size={20} />}
              title="Career Matching"
              text="Identify career roles that align with your current technical skill profile."
              number="01"
            />
            <FeatureCard
              icon={<BarChart3 size={20} />}
              title="Skill Gap Analysis"
              text="Compare your current skills with the capabilities expected for a target role."
              number="02"
            />
            <FeatureCard
              icon={<Compass size={20} />}
              title="Learning Direction"
              text="Turn missing skills into an actionable learning sequence."
              number="03"
            />
            <FeatureCard
              icon={<TrendingUp size={20} />}
              title="Career Growth"
              text="Build a stronger technical profile by continuously expanding your skill set."
              number="04"
            />
          </div>
        </section>

        <section id="roadmap" className="roadmap-summary">
          <div className="roadmap-summary-icon">
            <Compass size={24} />
          </div>
          <div>
            <span className="eyebrow">PERSONALIZED LEARNING</span>
            <h2>From prediction to progress.</h2>
            <p>
              SkillSense transforms your career match into a practical roadmap
              with technologies, topics, and learning priorities.
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <strong>SkillSense AI</strong>
          <span>ML-powered career intelligence</span>
        </div>
        <div className="footer-api">
          <Database size={15} />
          FastAPI + Scikit-learn
        </div>
      </footer>
    </div>
  );
}

function CareerResult({ result }) {
  const roleSkills = {
    "Data Analyst": [
      "Python",
      "Pandas",
      "SQL",
      "Excel",
      "Power BI",
      "Tableau",
      "Statistics",
      "Data Visualization",
    ],
    "Machine Learning Engineer": [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-Learn",
      "Machine Learning",
      "TensorFlow",
      "PyTorch",
      "Statistics",
    ],
    "AI Engineer": [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "PyTorch",
      "TensorFlow",
      "NLP",
      "Transformers",
      "Computer Vision",
    ],
    "Frontend Developer": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "TypeScript",
      "Redux",
      "Bootstrap",
    ],
    "Backend Developer": [
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "MySQL",
      "REST API",
      "FastAPI",
    ],
    "Full Stack Developer": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "MySQL",
    ],
    "Java Developer": [
      "Java",
      "OOP",
      "Spring",
      "Spring Boot",
      "Hibernate",
      "SQL",
      "REST API",
      "Microservices",
    ],
  };

  const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

  const analyzedSkills = result.skills_analyzed || [];
  const topMatches = result.top_matches || [];

  const primaryRole = result.primary_role || topMatches[0]?.role || "Career Match";
  const primaryConfidence =
    result.primary_confidence ?? topMatches[0]?.percentage ?? 0;

  const expectedSkills = roleSkills[primaryRole] || [];

  const matchedSkills = expectedSkills.filter((skill) =>
    analyzedSkills.some((item) => normalize(item) === normalize(skill))
  );

  const missingSkills = expectedSkills.filter(
    (skill) =>
      !analyzedSkills.some((item) => normalize(item) === normalize(skill))
  );

  const readiness = expectedSkills.length
    ? Math.round((matchedSkills.length / expectedSkills.length) * 100)
    : Math.round(primaryConfidence);

  return (
    <div className="career-result">
      <div className="result-header">
        <div>
          <span className="eyebrow">CAREER SIGNALS</span>
          <h2>Your career profile</h2>
        </div>

        <div className="match-badge">
          <TrendingUp size={14} />
          {Number(primaryConfidence).toFixed(1)}% MATCH
        </div>
      </div>

      <div className="career-profile">
        <div className="profile-icon">
          <BrainCircuit size={25} />
        </div>

        <div className="profile-main">
          <span>AI CAREER SNAPSHOT</span>
          <h3>{primaryRole}</h3>
          <p>Primary direction based on your current technical skills.</p>
        </div>

        <div className="profile-score">
          <strong>{Number(primaryConfidence).toFixed(0)}%</strong>
          <span>AI Match</span>
        </div>
      </div>

      <div className="career-metrics">
        <div>
          <span>SKILLS ANALYZED</span>
          <strong>{analyzedSkills.length}</strong>
        </div>
        <div>
          <span>SKILLS MATCHED</span>
          <strong>{matchedSkills.length}</strong>
        </div>
        <div>
          <span>SKILLS TO LEARN</span>
          <strong>{missingSkills.length}</strong>
        </div>
        <div>
          <span>READINESS</span>
          <strong>{readiness}%</strong>
        </div>
      </div>

      <div className="career-progress">
        <div className="progress-label">
          <span>Career match progress</span>
          <strong>{readiness}%</strong>
        </div>
        <div className="progress-track">
          <span style={{ width: `${Math.min(readiness, 100)}%` }} />
        </div>
      </div>

      <div className="top-matches">
        <div className="subheading">
          <Target size={17} />
          <span>TOP CAREER MATCHES</span>
        </div>

        <div className="match-list">
          {topMatches.map((item, index) => (
            <div className="match-row" key={item.role}>
              <div className="match-rank">0{index + 1}</div>
              <div className="match-role">
                <strong>{item.role}</strong>
                <span>AI career match</span>
              </div>
              <div className="match-percent">
                {Number(item.percentage ?? item.confidence * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="analyzed-skills">
        <div className="subheading">
          <Code2 size={17} />
          <span>SKILLS ANALYZED</span>
        </div>

        <div className="result-skill-list">
          {analyzedSkills.map((skill) => (
            <span key={skill}>
              <CheckCircle2 size={12} />
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="skill-gap">
        <div className="subheading">
          <AlertCircle size={17} />
          <span>SKILL GAP ANALYSIS</span>
        </div>

        <div className="gap-grid">
          <div className="gap-card matched">
            <div className="gap-title">
              <CheckCircle2 size={16} />
              <span>Already Have</span>
            </div>
            <div className="gap-items">
              {matchedSkills.length ? (
                matchedSkills.map((skill) => <span key={skill}>{skill}</span>)
              ) : (
                <small>No direct matches yet.</small>
              )}
            </div>
          </div>

          <div className="gap-card missing">
            <div className="gap-title">
              <AlertCircle size={16} />
              <span>Learn Next</span>
            </div>
            <div className="gap-items">
              {missingSkills.length ? (
                missingSkills.map((skill) => <span key={skill}>{skill}</span>)
              ) : (
                <small>Your current profile covers the mapped skills.</small>
              )}
            </div>
          </div>
        </div>
      </div>

      <LearningRoadmap role={primaryRole} missingSkills={missingSkills} />
    </div>
  );
}

function LearningRoadmap({ role, missingSkills }) {
  const roadmapData = {
    "Data Analyst": [
      {
        title: "Excel & Data Foundations",
        topics: ["Advanced Excel", "Data Cleaning", "Pivot Tables"],
        focus: "Build strong data preparation fundamentals.",
      },
      {
        title: "SQL",
        topics: ["Joins", "Subqueries", "CTEs", "Window Functions"],
        focus: "Query and transform real-world datasets.",
      },
      {
        title: "Power BI",
        topics: ["Power Query", "Data Modeling", "DAX", "Dashboards"],
        focus: "Create interactive business dashboards.",
      },
      {
        title: "Statistics",
        topics: ["Descriptive Statistics", "Probability", "Hypothesis Testing"],
        focus: "Develop analytical reasoning.",
      },
    ],
    "Machine Learning Engineer": [
      {
        title: "Python for ML",
        topics: ["NumPy", "Pandas", "Data Cleaning", "Visualization"],
        focus: "Strengthen the Python data stack.",
      },
      {
        title: "Machine Learning",
        topics: ["Regression", "Classification", "Clustering", "Model Evaluation"],
        focus: "Build and evaluate predictive models.",
      },
      {
        title: "Deep Learning",
        topics: ["Neural Networks", "TensorFlow", "PyTorch", "CNNs"],
        focus: "Move from classical ML to deep learning.",
      },
      {
        title: "MLOps",
        topics: ["Model Serving", "APIs", "Docker", "Deployment"],
        focus: "Learn how models become production systems.",
      },
    ],
    "AI Engineer": [
      {
        title: "Python & ML Foundations",
        topics: ["NumPy", "Pandas", "Scikit-Learn", "Statistics"],
        focus: "Build a reliable ML foundation.",
      },
      {
        title: "Deep Learning",
        topics: ["Neural Networks", "PyTorch", "TensorFlow", "CNNs"],
        focus: "Understand modern neural architectures.",
      },
      {
        title: "NLP & Transformers",
        topics: ["Text Processing", "Embeddings", "Transformers", "LLMs"],
        focus: "Work with modern language AI systems.",
      },
      {
        title: "AI Applications",
        topics: ["RAG", "APIs", "Model Integration", "Deployment"],
        focus: "Turn AI models into usable applications.",
      },
    ],
    "Frontend Developer": [
      {
        title: "Web Foundations",
        topics: ["HTML", "CSS", "Responsive Design"],
        focus: "Build accessible responsive interfaces.",
      },
      {
        title: "JavaScript",
        topics: ["ES6+", "DOM", "Async JavaScript", "APIs"],
        focus: "Build interactive web applications.",
      },
      {
        title: "React",
        topics: ["Components", "Hooks", "State", "Routing"],
        focus: "Create modern component-based applications.",
      },
      {
        title: "Advanced Frontend",
        topics: ["TypeScript", "Redux", "Performance", "Testing"],
        focus: "Build scalable production-ready frontends.",
      },
    ],
    "Backend Developer": [
      {
        title: "JavaScript Backend",
        topics: ["Node.js", "Express", "REST APIs"],
        focus: "Build reliable backend services.",
      },
      {
        title: "Databases",
        topics: ["MongoDB", "MySQL", "Schema Design", "Queries"],
        focus: "Store and retrieve application data effectively.",
      },
      {
        title: "API Architecture",
        topics: ["Authentication", "Validation", "Error Handling", "Security"],
        focus: "Design production-ready APIs.",
      },
      {
        title: "Deployment",
        topics: ["Docker", "Cloud Basics", "CI/CD", "Monitoring"],
        focus: "Move backend applications toward production.",
      },
    ],
    "Full Stack Developer": [
      {
        title: "Frontend Foundations",
        topics: ["HTML", "CSS", "JavaScript", "Responsive UI"],
        focus: "Create polished client-side experiences.",
      },
      {
        title: "React",
        topics: ["Components", "Hooks", "State", "Routing"],
        focus: "Build modern frontend applications.",
      },
      {
        title: "Backend",
        topics: ["Node.js", "Express", "REST APIs", "Authentication"],
        focus: "Connect applications to scalable services.",
      },
      {
        title: "Database & Deployment",
        topics: ["MongoDB", "MySQL", "Docker", "Cloud"],
        focus: "Complete the full application lifecycle.",
      },
    ],
    "Java Developer": [
      {
        title: "Java Foundations",
        topics: ["OOP", "Collections", "Exception Handling", "Streams"],
        focus: "Strengthen core Java programming.",
      },
      {
        title: "Spring Boot",
        topics: ["REST APIs", "Dependency Injection", "JPA"],
        focus: "Build enterprise backend services.",
      },
      {
        title: "Databases",
        topics: ["SQL", "MySQL", "Hibernate", "Transactions"],
        focus: "Work confidently with persistent data.",
      },
      {
        title: "Microservices",
        topics: ["Service Architecture", "Docker", "API Gateway", "Cloud"],
        focus: "Move toward distributed backend systems.",
      },
    ],
  };

  const roadmap = roadmapData[role] || roadmapData["Full Stack Developer"];
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="learning-roadmap">
      <div className="roadmap-heading">
        <div>
          <span className="eyebrow">PERSONALIZED LEARNING ROADMAP</span>
          <h3>Build toward {role}</h3>
        </div>

        <div className="roadmap-count">
          {roadmap.length} learning stages
        </div>
      </div>

      <div className="roadmap-list">
        {roadmap.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              className={`roadmap-item ${isOpen ? "active" : ""}`}
              key={item.title}
            >
              <div className="roadmap-number">0{index + 1}</div>

              <div className="roadmap-main">
                <strong>{item.title}</strong>
                <span>{item.focus}</span>
              </div>

              <button
                className="roadmap-toggle"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {isOpen ? "CLOSE" : index === 0 ? "START LEARNING" : "VIEW"}
                <ArrowRight
                  size={14}
                  style={{
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {isOpen && (
                <div className="roadmap-details">
                  <div>
                    <span className="detail-label">WHAT TO LEARN</span>
                    <div className="roadmap-topics">
                      {item.topics.map((topic) => (
                        <span key={topic}>
                          <CheckCircle2 size={13} />
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="roadmap-focus">
                    <Lightbulb size={15} />
                    <span>{item.focus}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {missingSkills.length > 0 && (
        <div className="roadmap-footer">
          <Lightbulb size={16} />
          <span>
            Focus next on: <strong>{missingSkills.slice(0, 3).join(", ")}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, text, number }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <span className="feature-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
      <ArrowRight className="feature-arrow" size={17} />
    </div>
  );
}

export default App;
