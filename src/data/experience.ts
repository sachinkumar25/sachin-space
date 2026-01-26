export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    date: string;
    location: string;
    description: string[];
    skills: string[];
}

export const schoolExperiences: ExperienceItem[] = [
    {
        id: 'losert-lab',
        role: 'Undergraduate Student Researcher',
        company: 'University of Maryland (Losert Biodynamics Lab)',
        date: 'Mar 2025 – Present',
        location: 'College Park, MD',
        description: [
            "Conducting research at the Losert Biodynamics Lab."
        ],
        skills: ['Research', 'Biodynamics']
    },
    {
        id: 'apex-fund-sr',
        role: 'Quantitative Analyst',
        company: 'Apex Fund',
        date: 'Sep 2024 – Present',
        location: 'College Park, MD',
        description: [
            "Creating efficient trading systems and strategies."
        ],
        skills: ['Trading Systems', 'Quantitative Analysis']
    },
    {
        id: 'apex-fund-jr',
        role: 'Junior Quantitative Analyst',
        company: 'Apex Fund',
        date: 'Mar 2024 – Sep 2024',
        location: 'College Park, MD',
        description: [
            "Assisted in developing quantitative strategies and backtesting models."
        ],
        skills: ['Backtesting', 'Financial Modeling']
    },
    {
        id: 'xfoundry',
        role: 'AI Product Integration Engineer',
        company: 'xFoundry@UMD',
        date: 'Jan 2024 – Present',
        location: 'College Park, MD',
        description: [
            "Working on AI product integration."
        ],
        skills: ['AI', 'Product Integration']
    }
];

export const educationExperiences: ExperienceItem[] = [
    {
        id: 'umd-degree',
        role: 'B.S. in Computer Science and Mathematics',
        company: 'University of Maryland',
        date: 'Expected May 2027',
        location: 'College Park, MD',
        description: [
            "Minor in Data Science",
            "GPA: 3.84/4.0",
            "Academic Distinctions: Dean's List [All Semesters], President Scholarship, Perplexity Campus Partner.",
            "Activities & Societies: Apex Quant, AWS Cloud Club, Google Developer Student Club, Xperience, Losert Biodynamics Lab.",
            "Relevant Coursework: Algorithms, Advanced Data Structures, Android Development, Compilers, Data Science, Organization of Prog. Languages, Computer Systems, Discrete Structures, Linear Algebra, Human-Computer Interaction."
        ],
        skills: ['Computer Science', 'Mathematics', 'Data Science']
    },
    {
        id: 'tjhsst',
        role: 'High School Diploma',
        company: 'Thomas Jefferson High School for Science and Technology',
        date: 'Graduated',
        location: 'Alexandria, VA',
        description: [
            "Honors & Awards: Innovation Award (VA State Science Fair), 1st Place (VA State Science Fair), Business Innovation Excellence Award (Diamond Challenge), Top 10 & People Choice (Blue Ocean Competition), Conrad Innovator.",
            "Activities & Societies: Machine Learning Club, Mock Trial Club (Executive Officer), Code++ (President), Cloud Computing Club, Model United Nations, Congressional Debate, Eagle Scout."
        ],
        skills: ['STEM', 'Innovation', 'Leadership']
    }
];

export const careerExperiences: ExperienceItem[] = [
    {
        id: 'cap-one',
        role: 'Software Engineering Intern',
        company: 'Capital One',
        date: 'Aug 2025 – Present',
        location: 'McLean, VA',
        description: [
            "Architected a FastAPI gateway routing LLM traffic across providers, cutting latency 55% (to 90ms) via connection pools.",
            "Implemented REST APIs with auth, configs, and feature flags so product teams could safely roll out new model routes.",
            "Built a distributed Redis cache with LRU eviction, cutting redundant calls by 40% and saving $2.1M in annual cloud costs.",
            "Hardened system reliability by writing Pytest suites, defining OpenAPI specs, and configuring Grafana alerts for prod."
        ],
        skills: ['FastAPI', 'Redis', 'System Design', 'Python', 'Grafana']
    },
    {
        id: 'anavation',
        role: 'Software Engineering Intern',
        company: 'AnaVation LLC',
        date: 'May 2025 – Aug 2025',
        location: 'Chantilly, VA',
        description: [
            "Engineered a satellite analysis platform (Flask, React) to query and filter feeds, rendering live map data 2.2x faster.",
            "Deployed serverless microservices on AWS Lambda to serve vision models (YOLOv5), handling a 5x spike in daily traffic.",
            "Enabled GPT-4o vision search with LangChain, Pinecone so analysts query 10k+ mission scenes using natural language.",
            "Orchestrated CI/CD pipelines via GitHub Actions and Docker, automating testing to ensure zero-downtime production builds."
        ],
        skills: ['React', 'Flask', 'AWS Lambda', 'LangChain', 'Docker']
    },
    {
        id: 'sentinel',
        role: 'Quantitative Software Engineer',
        company: 'Sentinel Capital',
        date: 'May 2024 – May 2025',
        location: 'Philadelphia, PA',
        description: [
            "Engineered signal generator (LLaMA+Pandas) yielding 22% net alpha across 1.2k+ MT5-executed trades via NLP logic.",
            "Added ZeroMQ, scikit-learn streaming with Python backtests so PMs and risk teams shipped 3.2s strategies with 730ms latency."
        ],
        skills: ['Python', 'Pandas', 'Machine Learning', 'ZeroMQ']
    },
    {
        id: 'gmu',
        role: 'Software Engineering Intern',
        company: 'George Mason University (Dept. of Geospatial Information Sciences)',
        date: 'Mar 2022 – Nov 2023',
        location: 'Fairfax, VA',
        description: [
            "Built GeoPandas, PySAL data pipelines 25% faster on 50+ regions, raising clustering accuracy from 78.3% to 91.2%.",
            "Refactored lab scripts into modular Python packages with configs, tests, Git, onboarding graduate researchers to use them."
        ],
        skills: ['GeoPandas', 'Python', 'Data Engineering']
    },
    {
        id: 'dartmouth',
        role: 'Bioinformatics Research Team Development Leader',
        company: 'Dartmouth Hitchcock Medical Center',
        date: 'July 2022 – August 2023',
        location: 'Lebanon, NH',
        description: [
            "Contributed to surgical automation and bioinformatics solutions."
        ],
        skills: ['Bioinformatics', 'Research']
    },
    {
        id: 'express-search',
        role: 'Patent Law Research Intern',
        company: 'Express Search',
        date: 'June 2022 – September 2022',
        location: 'Alexandria, VA',
        description: [
            "Conducted patent law research."
        ],
        skills: ['Patent Law', 'Research']
    }
];
