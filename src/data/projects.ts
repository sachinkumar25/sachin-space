export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    demoUrl?: string;
    codeSnippet: string;
    metrics?: string[];
    image?: string;
}

export const projects: Project[] = [
    {
        id: 'econavix-ai',
        title: 'EcoNavixAI',
        description: 'Sustainable routing engine optimizing for fuel efficiency using ML. Reduces carbon footprint by up to 15% per trip.',
        metrics: [
            "Reduced carbon footprint by up to 15% per trip",
            "Optimized fuel consumption curves via topographic analysis",
            "Implemented custom A* variant for environmental cost"
        ],
        image: '/projects/econavix.png',
        techStack: ['Python', 'TensorFlow', 'Google Maps API', 'React Native'],
        githubUrl: 'https://github.com/sachinkumar25/EcoNavixAI',
        demoUrl: '',
        codeSnippet: `class EcoRouter:
    def calculate_green_route(self, start, end, vehicle_profile):
        """
        Optimizes pathfinding for minimal fuel consumption using A* variant.
        """
        graph = self.load_topography_graph()
        
        def fuel_heuristic(node, target):
            distance = self.haversine(node, target)
            elevation_change = self.get_elevation(target) - self.get_elevation(node)
            
            # Penalize uphill gradients heavily
            fuel_cost = distance * (1 + max(0, elevation_change * 0.05))
            return fuel_cost

        return a_star_search(
            graph, 
            start, 
            end, 
            heuristic=fuel_heuristic,
            weight_fn=self.calculate_segment_emission
        )`,
    },
    {
        id: 'tributum',
        title: 'Tributum',
        description: 'Automated financial analysis and tax estimation tool with predictive savings analysis.',
        metrics: [
            "Real-time transaction aggregation & tax code application",
            "Predictive analysis for automated deduction discovery",
            "Handles complex multi-region tax rule sets"
        ],
        image: '/projects/tributum.png',
        techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Stripe API'],
        githubUrl: 'https://github.com/sachinkumar25/tributum',
        demoUrl: '',
        codeSnippet: `// Core calculation engine for tax deduction estimation
export const calculateDeductibles = (transactions: Transaction[]): TaxSummary => {
  return transactions.reduce((acc, tx) => {
    const rule = TaxRules.find(r => r.category === tx.category);
    
    if (rule && rule.isDeductible) {
      const deductionAmount = tx.amount * rule.percentage;
      
      return {
        ...acc,
        totalDeduction: acc.totalDeduction + deductionAmount,
        qualifiedItems: [...acc.qualifiedItems, { id: tx.id, saved: deductionAmount }]
      };
    }
    return acc;
  }, { totalDeduction: 0, qualifiedItems: [] });
};`,
    },
    {
        id: 'recruit-raptor',
        title: 'RecruitRaptor',
        description: 'High-velocity resume parsing and candidate scoring engine using NLP to reduce time-to-hire.',
        metrics: [
            "Significantly reduced time-to-hire via automation",
            "High-precision entity extraction from unstructured PDFs",
            "Intelligent candidate scoring against job descriptions"
        ],
        image: '/projects/recruit-raptor.png',
        techStack: ['Python', 'Spacy (NLP)', 'Flask', 'Selenium'],
        githubUrl: 'https://github.com/sachinkumar25/recruitraptor',
        demoUrl: '',
        codeSnippet: `def score_candidate(resume_text, job_description):
    """
    Uses Named Entity Recognition (NER) to match skills.
    """
    resume_doc = nlp(resume_text)
    job_doc = nlp(job_description)
    
    # Extract entities labeled as SKILLS or ORG
    resume_skills = set([ent.text.lower() for ent in resume_doc.ents if ent.label_ == "SKILL"])
    required_skills = set([ent.text.lower() for ent in job_doc.ents if ent.label_ == "SKILL"])
    
    match_score = len(resume_skills.intersection(required_skills)) / len(required_skills)
    
    return {
        "score": round(match_score * 100, 2),
        "missing_skills": list(required_skills - resume_skills),
        "highlighted_matches": list(resume_skills.intersection(required_skills))
    }`,
    },
    {
        id: 'protechxion-sw',
        title: 'ProTechXionSW',
        description: 'Advanced security monitoring and threat detection system integrating intrusion detection.',
        metrics: [
            "Real-time threat detection and deep packet inspection",
            "Integrated system monitoring & automated incident response",
            "Built with C++ & Qt for high-performance enterprise security"
        ],
        image: '/projects/protechxion.png',
        techStack: ['C++', 'Qt', 'OpenSSL', 'Wireshark Libs'],
        githubUrl: 'https://github.com/sachinkumar25/ProTechXionSW',
        demoUrl: '',
        codeSnippet: `// Real-time packet inspection loop
void PacketSniffer::startCapture() {
    char errbuf[PCAP_ERRBUF_SIZE];
    pcap_t* handle = pcap_open_live(device, BUFSIZ, 1, 1000, errbuf);
    
    if (handle == nullptr) {
        throw std::runtime_error("Could not open device for sniffing");
    }

    // Capture loop
    pcap_loop(handle, 0, [](u_char* args, const pcap_pkthdr* header, const u_char* packet) {
        IPHeader* ip = (IPHeader*)(packet + 14); // Skip Ethernet header
        
        if (ThreatDatabase::isBlacklisted(ip->src_ip)) {
            AlertSystem::trigger("Malicious IP Detected", ip->src_ip);
            Firewall::block(ip->src_ip);
        }
    }, nullptr);
}`,
    },
];
