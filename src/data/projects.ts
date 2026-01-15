export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    githubUrl?: string;
    demoUrl?: string;
    codeSnippet: string;
}

export const projects: Project[] = [
    {
        id: 'ai-trading-bot',
        title: 'AI Trading Bot',
        description: 'A reinforcement learning agent that trades crypto futures using PPO algorithms and sentiment analysis from Twitter/X.',
        techStack: ['Python', 'PyTorch', 'FastAPI', 'Redis'],
        githubUrl: 'https://github.com/sachin/trading-bot',
        codeSnippet: `import torch
import torch.nn as nn

class TradingAgent(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(TradingAgent, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, output_dim)
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        return self.fc3(x)

# Initialize PPO Agent
agent = TradingAgent(input_dim=24, output_dim=3)
print("Agent initialized ready for backtesting...")`,
    },
    {
        id: 'portfolio-os',
        title: 'Portfolio OS',
        description: 'A React-based operating system simulation running completely in the browser. Features a working terminal, window manager, and AI integration.',
        techStack: ['Next.js', 'Typescript', 'Tailwind', 'Zustand'],
        githubUrl: 'https://github.com/sachin/portfolio-os',
        demoUrl: 'https://sachin.dev',
        codeSnippet: `// The core window management store
export const useWindowStore = create<WindowStore>((set) => ({
  windows: {},
  activeWindow: null,
  
  openWindow: (id) => set((state) => {
    // Logic to open window with glassmorphism
    // and z-index handling
    return { ...state, activeWindow: id };
  }),
}));`,
    },
    {
        id: 'rag-knowledge-base',
        title: 'RAG Knowledge Base',
        description: 'Enterprise search engine utilizing RAG (Retrieval Augmented Generation) to answer questions from millions of PDF documents.',
        techStack: ['LangChain', 'Pinecone', 'OpenAI', 'React'],
        githubUrl: 'https://github.com/sachin/rag-kb',
        codeSnippet: `from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

# Setup RAG Pipeline
qa = RetrievalQA.from_chain_type(
    llm=OpenAI(temperature=0),
    chain_type="stuff",
    retriever=vector_store.as_retriever()
)

query = "What are the Q3 risks?"
response = qa.run(query)
print(f"Answer: {response}")`,
    },
];
