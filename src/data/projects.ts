export type Category = "products" | "datascience";

export type Project = {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  summary: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  images?: { src: string; caption: string }[];
  honest?: string[]; // limitations / what I'd do differently
  private?: boolean;
};

const GH = "https://github.com/symekah1999";

export const projects: Project[] = [
  {
    id: "renttrack",
    name: "Menetekel RentTrack",
    category: "products",
    tagline: "Rent collection for a 34-unit Nairobi apartment building I manage.",
    summary:
      "A full-stack app I built and use to run rent collection at Menetekel Apartments. The home screen is the building itself: every unit is a window that fills with colour as its rent arrives.",
    highlights: [
      "Append-only payment ledger: mistakes are fixed with negative reversal rows, never edits, so there is always an audit trail.",
      "M-Pesa payments are de-duplicated with unique indexes on the receipt and on the checkout id, so a repeated Safaricom callback cannot create a second row.",
      "Months are independent; a separate Cumulative page adds them up per calendar year so reports, exports and the dashboard always agree.",
      "Excel and PDF reports, 12-month trend, floor table, backup and restore, team access.",
      "Pages: dashboard, collect, cumulative, reports, settings, plus a public intro page.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "M-Pesa", "ExcelJS", "jsPDF", "Vitest"],
    links: [
      { label: "Live app", href: "https://menetekel-renttrack.vercel.app" },
      { label: "Source", href: `${GH}/menetekel-renttrack` },
    ],
    images: [
      { src: "/projects/renttrack/dashboard.png", caption: "Dashboard: the month's collection and the building, unit by unit" },
      { src: "/projects/renttrack/login.png", caption: "Members portal sign-in" },
    ],
    honest: [
      "Screenshots show the dashboard and sign-in only. The tenant, payment and settings pages are left out because they hold real tenants' names and phone numbers.",
    ],
  },
  {
    id: "growth-os",
    name: "Growth OS",
    category: "products",
    tagline: "A private all-in-one system for tracking growth across every area of life.",
    summary:
      "A single-owner PWA covering journal, goals, habits, recovery tracking, mantras, the full KJV Bible with a verse of the day, quotes, to-dos, savings and a debt payoff planner, with an AI assistant that can read and act on all of it.",
    highlights: [
      "Single-owner by design: Supabase handles auth only, sign-ups are disabled, and the app rejects any email that is not the owner's.",
      "Claude-powered assistant that reads and acts on the data through conversation.",
      "Debt payoff planner (snowball and avalanche) and savings tracker.",
      "Installable PWA with web-push notifications; Android APK path documented.",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind v4", "Neon Postgres", "Drizzle ORM", "Supabase Auth", "Claude API", "Recharts"],
    links: [
      { label: "Live app (login required)", href: "https://growth-app-ruddy-two.vercel.app" },
      { label: "Source", href: `${GH}/Growth-App` },
    ],
    images: [
      { src: "/projects/growth-os/dashboard.png", caption: "Dashboard: life score, jump-to grid, great life / system / verse / quote of the day" },
      { src: "/projects/growth-os/life-systems.png", caption: "Life Systems: 75 systems from Stoics, scripture and high performers" },
      { src: "/projects/growth-os/quick-capture.png", caption: "Quick capture: works offline and syncs later" },
      { src: "/projects/growth-os/search.png", caption: "Search across journal, goals, lessons, quotes, Bible and libraries" },
    ],
    honest: [
      "It is a personal app behind a login, so the screenshots cover only the pages without private data. Journal, recovery, goals, finances and assistant chats are deliberately not shown.",
      "A seeded demo mode would let visitors try it; that is the next step.",
    ],
  },
  {
    id: "fitness-os",
    name: "Fitness OS",
    category: "products",
    tagline: "A powerbuilding app that programs, logs and coaches one lifter.",
    summary:
      "Generates programs around squat, bench, deadlift and overhead press, logs every set in the gym, tracks progress against all-time PRs, and includes an AI coach that knows the lifter's numbers.",
    highlights: [
      "Live workout logging: top set at target RPE, back-offs recalculate from what was lifted, rest timer, plate calculator, PR alerts.",
      "Works offline: sets queue on the device and sync later.",
      "Progress views: e1RM trends vs all-time PR, DOTS score, sets per muscle, weekly tonnage, consistency heatmap.",
      "64-exercise library, 17 achievements, PDF session reports, streaming Claude coach.",
      "Installs on iPhone, Android and Windows.",
    ],
    stack: ["Next.js", "TypeScript", "Drizzle", "Postgres", "Supabase", "Claude API", "Vitest", "Recharts", "PWA"],
    links: [],
    private: true,
    images: [
      { src: "/projects/fitness/home-wide.png", caption: "Home: next session, comeback rings, streak, weekly goal" },
      { src: "/projects/fitness/session-phone.png", caption: "Live session logging on phone" },
      { src: "/projects/fitness/home-phone.png", caption: "Home on phone" },
    ],
    honest: ["The repository is private, so the code is shown through screenshots and this write-up."],
  },
  {
    id: "kdhs",
    name: "KDHS 2022: Contraceptive Use Prediction",
    category: "datascience",
    tagline: "County-level modelling of family-planning use across Kenya, with a live prediction API.",
    summary:
      "A CRISP-DM capstone on the Kenya Demographic and Health Survey 2022: 32,156 women aged 15 to 49 across all 47 counties, four outcome classes (no method, folkloric, traditional, modern). Five model families compared, SHAP explainability, and deployment as a Flask API with an HTML form for non-technical users.",
    highlights: [
      "Five models: logistic regression, random forest, LightGBM, a deep MLP and a TabTransformer.",
      "Optuna tuning and SHAP to explain which factors drive predictions.",
      "Motivation: modern-method use ranges from about 1 in 100 women in Mandera to over half in Embu, a gap national averages hide.",
      "Deployed as an authenticated REST API (single and batch prediction) on Render, plus a form front-end.",
      "Team project (The Insight Architects).",
    ],
    metrics: [
      { label: "Respondents", value: "32,156" },
      { label: "Counties", value: "47" },
      { label: "Models compared", value: "5" },
      { label: "Notebook", value: "136 cells" },
    ],
    stack: ["Python", "scikit-learn", "LightGBM", "PyTorch", "SHAP", "Optuna", "Flask", "Docker", "Render"],
    links: [
      { label: "Live API / form", href: "https://kdhs-contraceptive-api.onrender.com" },
      { label: "Capstone repo", href: `${GH}/Predicting-contraceptive-use-among-women_Capstone-Project-The-Insight-Architects-` },
    ],
    images: [
      { src: "/projects/kdhs/county_modern_use.png", caption: "Modern-method use by county" },
      { src: "/projects/kdhs/shap_summary.png", caption: "SHAP summary: what drives predictions" },
      { src: "/projects/kdhs/wealth_index.png", caption: "Use by wealth index" },
      { src: "/projects/kdhs/confusion_matrix.png", caption: "Confusion matrix" },
    ],
    honest: [
      "Model metrics are deliberately not quoted here yet: the README headline matches the untuned LightGBM, and the notebook's tuned run reports near-perfect results on the 'Modern' class that need a leakage check first.",
      "The free Render tier sleeps, so the live API can take a minute to wake.",
    ],
  },
  {
    id: "dropout",
    name: "Student Dropout and Academic Success",
    category: "datascience",
    tagline: "Predicting who will drop out, stay enrolled or graduate, then routing students to the right support.",
    summary:
      "A multi-class study on 4,424 students from a Portuguese polytechnic (36 predictors). Six model families compared, SHAP for interpretability, an NLP side-analysis, threshold calibration for deployment, and an intervention recommender that routes at-risk students to academic, financial or pastoral support.",
    highlights: [
      "Full CRISP-DM workflow with the business framing and asymmetric costs of errors stated up front.",
      "Strongest signals: second- and first-semester approved units, engineered pass rate, tuition fees up to date, age at enrolment.",
      "Enrolled is the hardest class (recall 0.44); the write-up says so rather than hiding it.",
      "A text-only Naive Bayes on categorical profiles reaches macro-F1 0.607, showing the profile alone carries real signal.",
    ],
    metrics: [
      { label: "Test macro-F1", value: "0.695" },
      { label: "Macro AUC", value: "0.879" },
      { label: "Test accuracy", value: "76%" },
      { label: "Students", value: "4,424" },
    ],
    stack: ["Python", "pandas", "scikit-learn", "XGBoost", "LightGBM", "SHAP", "NLP (TF-IDF, Naive Bayes)"],
    links: [{ label: "Source", href: `${GH}/WeekFourProjectTh` }],
    images: [
      { src: "/projects/dropout/target.png", caption: "Class balance" },
      { src: "/projects/dropout/semester.png", caption: "Semester performance: the strongest predictors" },
      { src: "/projects/dropout/evolution.png", caption: "Model performance across iterations" },
      { src: "/projects/dropout/shap.png", caption: "Global SHAP feature importance" },
      { src: "/projects/dropout/waterfall.png", caption: "Explaining one student's prediction" },
    ],
    honest: [
      "On the held-out test set XGBoost (0.718) and random forest (0.708) scored slightly higher macro-F1 than the tuned LightGBM (0.695); the differences are small.",
      "Figures here come from the notebook outputs. The README's 78.6% accuracy does not match the notebook's 76%.",
    ],
  },
  {
    id: "chicago",
    name: "Chicago Traffic Crash Injury Prediction",
    category: "datascience",
    tagline: "Flagging crashes likely to involve injury so EMS can be dispatched sooner.",
    summary:
      "A binary classifier on City of Chicago crash records (800,000+ in the source data) built for a CDOT and CPD audience. Recall and F1 are the primary metrics because a model that always says 'no injury' scores about 73% accuracy while catching nothing.",
    highlights: [
      "Five models compared against a dummy baseline; tuned HistGradientBoosting won on validation F1, recall and AUC.",
      "Held-out test set of 30,000 crashes, untouched until the final evaluation.",
      "Operating threshold analysis (optimum near 0.55) and a precision-recall view of the operational trade-off.",
      "Delivered with a non-technical stakeholder presentation.",
    ],
    metrics: [
      { label: "Test F1", value: "0.599" },
      { label: "Recall", value: "0.689" },
      { label: "Precision", value: "0.529" },
      { label: "ROC-AUC", value: "0.803" },
    ],
    stack: ["Python", "pandas", "scikit-learn", "HistGradientBoosting", "RandomizedSearchCV"],
    links: [{ label: "Source", href: `${GH}/phasethreeproject` }],
    images: [
      { src: "/projects/chicago/target.png", caption: "Target distribution and class imbalance" },
      { src: "/projects/chicago/temporal.png", caption: "Injury patterns by hour and weekday" },
      { src: "/projects/chicago/final-model.png", caption: "Final model selection" },
      { src: "/projects/chicago/importance.png", caption: "What the final model learned" },
      { src: "/projects/chicago/precision-recall.png", caption: "Precision-recall and operational value" },
    ],
    honest: [
      "Precision is 0.53, so almost half of flagged crashes are false alarms; the value is in catching about 69% of injuries, not in precision.",
      "Metrics are from the notebook's test output; the README rounds F1 to about 0.61.",
    ],
  },
];

export const byId = (id: string) => projects.find((p) => p.id === id);
