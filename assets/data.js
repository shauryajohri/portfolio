/* ============================================================
   PROJECT DATA — edit here, the site rebuilds itself
   status: 'done' | 'wip' | 'plan'
   ============================================================ */
const PROJECTS = {

  aura: {
    glyph:'🌌', name:'AURA', status:'wip', statusLabel:'In Progress · Flagship',
    tagline:'An intelligent desktop AI companion — voice, memory, multi-model routing and proactive assistance in one application.',
    category:'AI Desktop Assistant',
    overview:'AURA goes beyond a traditional chatbot. It combines voice interaction, long-term memory, multi-model AI routing and proactive assistance into a unified desktop application. Instead of waiting for user prompts, AURA observes context, remembers past interactions, and intelligently assists throughout the workflow. It isn\'t trying to replace your tools — it\'s designed to connect them.',
    problem:'Every AI assistant is stateless and reactive. You re-explain your project every session, you have to summon it manually, and each one locks you into a single model with a single price. Nothing watches the work you\'re actually doing.',
    solution:'A desktop-native brain that persists. AURA keeps long-term memory across sessions, indexes your projects, routes each request to whichever of 8 models fits best across 2 providers, and speaks up on its own when it notices something worth saying — through a voice interface you never have to click.',
    architecture:['Electron Desktop App','React + TypeScript UI','WebSocket Bridge','Python Brain','45+ Brain Modules','Multiple LLM Providers'],
    features:[
      ['Multi-model AI routing','automatic model selection across 8 models and 2 providers, with fallback, prompt optimisation and context-aware responses.'],
      ['Voice pipeline','wake word, speech-to-text, text-to-speech and continuous conversation without touching the keyboard.'],
      ['Memory system','long-term persistent memory, retrieval and full project indexing — it recalls instead of restarting.'],
      ['Intelligence layer','Curiosity Engine, Attention Engine, Personality Layer and a Proactive Assistant that stays quiet unless it helps.'],
      ['Productivity surface','tasks, notes, research and a built-in Workbench. Calendar planned.'],
      ['Cosmic UI','black-hole orb, white-hole speaking animation, the Great Attractor, planet-based model selection, memory timeline and cosmic web.']
    ],
    stack:{
      'Frontend':['React','TypeScript','Electron','Three.js','Tailwind CSS'],
      'Backend':['Python','FastAPI','WebSocket','SQLite','VOSK','Whisper','Edge-TTS','Pygame'],
      'AI':['OpenRouter','Groq','Ollama','Multi-LLM routing']
    },
    metrics:[['22,000+','lines of code'],['110+','files'],['45+','brain modules'],['8','AI models'],['2','providers']],
    timeline:[
      ['Phase 1','Python brain, model router and the first PySide6 desktop shell.'],
      ['Phase 2','Memory layer, project indexing and the voice pipeline.'],
      ['Phase 3','Intelligence engines — curiosity, attention, personality, proactivity.'],
      ['Phase 4 · now','React + Electron rewrite with the cosmic UI over a WebSocket bridge.']
    ],
    challenges:[
      'Routing across providers without the user ever noticing a handoff — including rate-limit fallback mid-conversation.',
      'Making memory useful rather than just large: retrieval that surfaces the right fact at the right moment.',
      'Tuning proactivity so the assistant interrupts only when it genuinely adds value — silence is a feature.',
      'Keeping a heavy 3D cosmic UI at a smooth frame rate while a Python brain streams over WebSocket.'
    ],
    future:['Plugin system','Mobile companion','Automation workflows','Better agent workflows','Multi-device sync','Calendar integration'],
    repo:'https://github.com/shauryajohri/AURA', demo:''
  },

  smartconnect: {
    glyph:'🏫', name:'SmartConnect', status:'plan', statusLabel:'Planned',
    tagline:'A full-stack educational metaverse where students learn together inside a real-time virtual campus.',
    category:'Multiplayer Metaverse',
    overview:'A full-stack educational metaverse platform where students interact inside a virtual campus using real-time multiplayer technology. The platform focuses on collaboration, communication and immersive learning rather than gaming.',
    problem:'Remote learning flattened education into a grid of muted video tiles. There is no hallway, no walking into a club, no sitting down next to someone — the accidental social layer that makes a campus work simply disappeared.',
    solution:'Rebuild the campus as a shared 3D space. Students move, gather and talk in real time inside buildings that map to real activities — classrooms, clubs, events — with an AI assistant that suggests collaborations rather than policing attendance.',
    architecture:['Next.js Client','Three.js Campus','WebSocket Server','Node.js + Python Services','PostgreSQL'],
    features:[
      ['Multiplayer core','real-time movement, player synchronisation, voice chat and live communication.'],
      ['Virtual campus','interactive buildings, classrooms, clubs and events.'],
      ['AI layer','in-world assistant, smart notifications and collaboration suggestions.'],
      ['Research angle','educational metaverse, AI collaboration, smart learning and social interaction.']
    ],
    stack:{
      'Frontend':['Next.js','React','Three.js'],
      'Backend':['Node.js','WebSockets','Python'],
      'Data':['PostgreSQL']
    },
    metrics:[],
    timeline:[['Stage 1','Campus world design and movement prototype.'],['Stage 2','Multiplayer sync and voice channels.'],['Stage 3','AI assistant and collaboration engine.'],['Stage 4','Research write-up.']],
    challenges:[
      'Keeping many players in sync at low latency without a game-engine budget.',
      'Spatial voice chat that feels natural rather than like a conference call.',
      'Designing for learning outcomes, not engagement metrics.'
    ],
    future:['Class scheduling inside the world','Persistent student profiles','Cross-institution campuses','Published research paper'],
    repo:'', demo:''
  },

  digitaltwin: {
    glyph:'🌆', name:'Smart City Digital Twin', status:'plan', statusLabel:'Planned',
    tagline:'A live 3D mirror of a city — infrastructure, traffic, environment and services, driven by IoT data and AI analytics.',
    category:'3D Smart City',
    overview:'A real-time 3D representation of a smart city that visualises infrastructure, traffic, environmental conditions and public services while integrating AI-powered analytics and IoT data.',
    problem:'City data already exists — traffic counters, air quality sensors, grid load, weather stations — but it lives in disconnected dashboards nobody reads together. There is no single place where you can see the city as one system.',
    solution:'A digital twin: one 3D model of the city where every live feed is rendered in place. Traffic flows on the actual roads, pollution shades the actual districts, and an AI layer turns that combined picture into predictions, recommendations and early disaster alerts.',
    architecture:['IoT Sensors','Ingestion Layer','PostgreSQL + GIS','Python Analytics','Next.js + Three.js Twin'],
    features:[
      ['Visualisation','3D city model with buildings, roads and parks.'],
      ['Analytics','traffic, pollution, weather and energy monitoring.'],
      ['AI','predictions, recommendations and disaster alerts.'],
      ['IoT','sensor integration feeding live dashboards and monitoring.']
    ],
    stack:{'Frontend':['Next.js','Three.js'],'Backend':['Python','GIS APIs'],'Data':['PostgreSQL']},
    metrics:[],
    timeline:[['Stage 1','City geometry and GIS import.'],['Stage 2','Live data ingestion and dashboards.'],['Stage 3','Predictive models and alerting.'],['Stage 4','Simulation tooling.']],
    challenges:[
      'Rendering a full city at interactive frame rates in the browser.',
      'Reconciling messy, irregular sensor feeds into one coherent timeline.',
      'Making predictions that are actionable for planners, not just plausible.'
    ],
    future:['AI citizens','Emergency simulation','Urban planning tools','Resource optimisation'],
    repo:'', demo:''
  },

  wasabikiri: {
    glyph:'🏯', name:'WasabiKiri', status:'done', statusLabel:'Completed',
    tagline:'わさび切り — a native C++ desktop file manager built around duplicate detection and OS-level algorithms.',
    category:'Desktop File Manager',
    overview:'A desktop file management application focused on efficient file organisation and duplicate detection. It applies operating system concepts through practical file management utilities.',
    problem:'Storage fills up invisibly. The duplicates, the forgotten downloads, the folders you copied "just in case" — no native tool tells you where the weight actually is, and the ones that do are bloated and cloud-tethered.',
    solution:'A fast, native, dependency-light desktop app in C++ and Qt that scans directories quickly, finds true duplicates, and applies real OS caching algorithms — LRU and SRU — to file management rather than leaving them in a textbook.',
    architecture:['Qt GUI','Scan Engine','Duplicate Detector','LRU / SRU Cache Layer','File System'],
    features:[
      ['Duplicate file detection','across large directory trees.'],
      ['Fast directory scanning','built for depth, not just breadth.'],
      ['LRU algorithm','applied to real file access patterns.'],
      ['SRU algorithm','a second replacement strategy for comparison.'],
      ['File searching','through a native Qt interface.']
    ],
    stack:{'Language':['C++'],'UI':['Qt']},
    metrics:[],
    timeline:[['Build','Scan engine and duplicate detection.'],['Build','LRU / SRU implementation.'],['Ship','Native Qt interface, completed.']],
    challenges:[
      'Scanning deep trees without freezing the UI thread.',
      'Duplicate detection that is accurate without hashing every byte of every file.',
      'Doing it all in C++ with native GUI technology rather than reaching for a web wrapper.'
    ],
    future:['Superseded by WasabiKiri 2.0 — see the next building in the village.'],
    repo:'https://github.com/shauryajohri', demo:''
  },

  wasabikiri2: {
    glyph:'⛩️', name:'WasabiKiri 2.0', status:'plan', statusLabel:'Planned',
    tagline:'A full redesign — Japanese-inspired interface, deeper storage intelligence and visual analytics.',
    category:'Desktop File Manager · Next Gen',
    overview:'A complete redesign of WasabiKiri with a Japanese-inspired interface, improved performance and additional storage management capabilities. Design theme: samurai, torii gates, sakura, traditional Japanese architecture and colour palette.',
    problem:'The original proved the engine but looked like a utility. It also stopped at detection — it could tell you what was duplicated, but not what your storage actually looked like or what to do next.',
    solution:'Rebuild the whole surface. A calm, deliberately Japanese interface, automatic scanning that runs without being asked, category-level analytics with real charts, and cleanup actions that go beyond duplicates to old files, large files and empty folders.',
    architecture:['Qt GUI (redesigned)','Auto-Scan Scheduler','Cleanup Engine','Analytics + Charts','SQLite Persistence'],
    features:[
      ['Storage engine','automatic scanning, duplicate cleanup, old-file, large-file and empty-folder detection.'],
      ['Analytics','storage visualisation, file-category statistics and interactive charts.'],
      ['UI','smooth animations, better navigation and a modern desktop experience.'],
      ['Design theme','samurai motifs, torii gates, sakura and a traditional colour palette.']
    ],
    stack:{'Language':['C++'],'UI':['Qt'],'Data':['SQLite']},
    metrics:[],
    timeline:[['Stage 1','Visual language and design system.'],['Stage 2','Cleanup engine expansion.'],['Stage 3','Analytics and charts.'],['Stage 4','Packaging and release.']],
    challenges:[
      'Making a cleanup tool feel calm rather than alarming.',
      'Charting large file systems without a slow first paint.',
      'Safe deletion — nothing should ever be unrecoverable by accident.'
    ],
    future:['Scheduled background cleanup','Cloud storage awareness','Cross-platform build'],
    repo:'', demo:''
  },

  yatra: {
    glyph:'🧳', name:'Yatra AI', status:'done', statusLabel:'Completed',
    tagline:'A deployed web app that recommends tourist destinations from user preferences using machine learning.',
    category:'AI Recommendation System',
    overview:'A web application that recommends tourist destinations using machine learning and user preferences. The project demonstrates AI-assisted recommendation systems deployed through a modern web stack.',
    problem:'Travel search gives you the most popular result, not the right one. Preference — budget, pace, terrain, season — gets flattened into a ranked list that is identical for everybody.',
    solution:'A recommendation model that takes stated preferences as input and returns destinations matched to them, served live through a Next.js interface and deployed publicly rather than left in a notebook.',
    architecture:['Next.js Client','Preference Input','Python ML Inference','Recommendation Output','Vercel Deployment'],
    features:[
      ['Tourist recommendations','driven by a trained model, not a static list.'],
      ['Preference-based suggestions','tuned to what the user actually asks for.'],
      ['ML inference','served live behind the web interface.'],
      ['Interactive web interface','built in Next.js and deployed on Vercel.']
    ],
    stack:{'Frontend':['Next.js'],'ML':['Python','Machine Learning'],'Deploy':['Vercel']},
    metrics:[],
    timeline:[['Stage 1','Dataset and model.'],['Stage 2','Web interface.'],['Stage 3','Deployment on Vercel.']],
    challenges:[
      'Serving a Python model behind a Next.js front end without a heavy backend.',
      'Turning fuzzy travel preferences into usable model features.',
      'Keeping inference fast enough to feel instant.'
    ],
    future:['Larger destination dataset','User accounts and saved trips','Seasonal awareness'],
    repo:'https://github.com/shauryajohri', demo:''
  },

  prediction: {
    glyph:'📈', name:'Tourist Prediction System', status:'done', statusLabel:'Completed',
    tagline:'Forecasting tourist arrivals from historical and seasonal data to support planning and resource allocation.',
    category:'Machine Learning Forecasting',
    overview:'A machine learning project that forecasts tourist arrivals using historical and seasonal data. The system is intended to support tourism planning and resource allocation.',
    problem:'Tourism infrastructure is staffed and stocked on instinct. Under-prepare and the season overwhelms you; over-prepare and the cost sits idle — and the historical data that would answer it is rarely modelled.',
    solution:'A complete forecasting pipeline over historical arrival data, with seasonality made explicit as a feature, producing arrival predictions and clear visualisations planners can actually act on.',
    architecture:['Data Collection','Cleaning','Feature Engineering','Model Training','Evaluation','Prediction'],
    features:[
      ['Tourist forecasting','arrival predictions from historical series.'],
      ['Seasonal trend analysis','seasonality treated as signal, not noise.'],
      ['Historical data processing','collection and cleaning pipeline.'],
      ['Predictive analytics','with model evaluation.'],
      ['Data visualisation','of trends and forecasts.']
    ],
    stack:{'Language':['Python'],'ML':['Scikit-learn','Pandas','NumPy'],'Viz':['Matplotlib']},
    metrics:[],
    timeline:[['Stage 1','Data collection and cleaning.'],['Stage 2','Feature engineering.'],['Stage 3','Model training and evaluation.'],['Stage 4','Visualisation and reporting.']],
    challenges:[
      'Incomplete and irregular historical records.',
      'Separating genuine seasonality from one-off events.',
      'Choosing a model that generalises rather than memorises the series.'
    ],
    future:['Live data feed','Multi-region forecasting','Confidence intervals in the UI'],
    repo:'https://github.com/shauryajohri', demo:''
  },

  finguard: {
    glyph:'🛡️', name:'FinGuard', status:'done', statusLabel:'Completed',
    tagline:'A fraud detection platform that scores financial transactions for suspicious activity using machine learning.',
    category:'Fraud Detection · Applied ML',
    overview:'A fraud detection platform that analyses financial transactions using machine learning to identify suspicious activity and assign fraud risk scores.',
    problem:'Fraud is rare, which is exactly what makes it hard — a model that flags nothing is right 99% of the time. Rule-based systems miss new patterns and drown analysts in false positives.',
    solution:'A trained classifier over engineered transaction features that outputs a risk score rather than a binary verdict, surfaced in a dashboard so an analyst can triage by severity instead of reading every row.',
    architecture:['Transaction Data','Preprocessing','Feature Engineering','Model Training','Fraud Classification','Risk Dashboard'],
    features:[
      ['Fraud prediction','classification over transaction data.'],
      ['Risk scoring','per-transaction severity rather than yes/no.'],
      ['Transaction analysis','with full preprocessing pipeline.'],
      ['Model evaluation','measured on the metrics that matter for imbalanced data.'],
      ['Interactive dashboard','for reviewing flagged activity.']
    ],
    stack:{'Language':['Python'],'ML':['Scikit-learn','Pandas','NumPy'],'App':['Flask','HTML','CSS','JavaScript']},
    metrics:[],
    timeline:[['Stage 1','Dataset preprocessing.'],['Stage 2','Feature engineering.'],['Stage 3','Model training and fraud classification.'],['Stage 4','Evaluation and dashboard.']],
    challenges:[
      'Severe class imbalance — accuracy is a misleading metric here.',
      'Engineering features that catch behaviour, not just amounts.',
      'Balancing recall against analyst workload from false positives.'
    ],
    future:['Real-time scoring stream','Explainability for each flag','Model drift monitoring'],
    repo:'https://github.com/shauryajohri', demo:''
  }
};

const SKILLS = {
  'Frontend':['React','Next.js','TypeScript','Tailwind CSS','Three.js','Electron'],
  'Backend':['Python','FastAPI','Node.js','WebSockets','Flask','PostgreSQL','SQLite'],
  'AI / ML':['LLM Routing','Prompt Engineering','OpenRouter','Groq','Ollama','Gemini','Whisper','Scikit-learn','Pandas','NumPy'],
  'Languages':['C++','Python','JavaScript','TypeScript','Java','SQL'],
  'Tools':['Git','Docker','VS Code','Qt','Figma','Linux','Vercel']
};

const TIMELINE = [
  ['2023','Started Programming','First lines of code — C++ and the fundamentals. Data structures, algorithms, and learning to actually finish things rather than abandon them at 80%.'],
  ['2024','Web Development','Moved into full-stack: JavaScript, React, Next.js, backends and databases. Started shipping projects other people could open in a browser.'],
  ['2025','Machine Learning','Scikit-learn, Pandas, real pipelines. Tourist Prediction, Yatra AI and FinGuard came out of this year — forecasting, recommendation and fraud detection end to end.'],
  ['2025','AURA begins','The flagship. A desktop AI companion with memory, voice and multi-model routing — the project that pulled everything else together.'],
  ['2026','Internship','Applying the work in a professional environment.'],
  ['2026','SmartConnect','Designing a real-time multiplayer educational metaverse — the first project built as much for research as for shipping.'],
  ['2026','Digital Twin','Smart City digital twin: 3D visualisation over live IoT and AI analytics.'],
  ['2026','Japan Preparation','Language, culture and the goal — software engineering in Japan.']
];

const ACHIEVEMENTS = [
  ['🏆','Hackathons','Competitive build events — shipping working software against the clock.'],
  ['📜','Certificates','Formal coursework and certifications across AI, web and systems.'],
  ['🔬','Research','Educational metaverse and smart-city work aimed at publication.'],
  ['⚡','Competitive Coding','Regular practice in algorithmic problem solving.'],
  ['🚀','Projects','8 projects spanning AI, ML, desktop and 3D web.'],
  ['💼','Internship','Professional engineering experience.'],
  ['🌐','ICPC','International Collegiate Programming Contest participation.'],
  ['💻','CodeVita','TCS CodeVita global coding contest participation.']
];

const STATS = [
  [8,'+','Projects'],
  [25000,'+','Lines of Code'],
  [20,'+','Technologies'],
  [10,'+','Repositories'],
  [0,'∞','Coffee ☕']
];
