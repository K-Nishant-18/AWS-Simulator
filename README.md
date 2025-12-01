# ☁️ AWS Real-Life Simulator

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white)

**Master the Cloud, Risk-Free.**

> *"What if I forget to terminate these EC2 instances? What if I accidentally rack up a massive bill?"*  
> If this thought has ever stopped you from practicing AWS, this simulator is for you.

The **AWS Real-Life Simulator** is a high-fidelity, browser-based educational tool that eliminates the fear of learning AWS. Practice with realistic consoles, make mistakes freely, and build confidence—all without spending a penny or risking unexpected charges.

**🎯 Zero Cost. Zero Consequences. 100% Learning.**

---

## 🚀 Features

### 📦 S3: Object Storage
- **Bucket Management**: Create and delete buckets with region selection
- **Object Operations**: Upload, list, and delete files
- **Static Website Hosting**: Enable public access and host static sites
- **Lab Guide**: "Host a Static Website" walkthrough

### 🖥️ EC2: Virtual Servers
- **Instance Launch Wizard**: Select AMIs (Amazon Linux, Ubuntu), instance types (t2.micro, t2.small)
- **Lifecycle Management**: Launch and terminate instances
- **Security Groups**: Configure firewall rules
- **Lab Guide**: "Launch Your First Server"

### 🛡️ IAM: Identity & Access Management
- **User Management**: Create IAM users with programmatic access
- **Policy Attachment**: Attach managed policies (AdministratorAccess, ReadOnly, S3FullAccess)
- **Groups**: Organize users for easier permission management
- **Lab Guide**: "Secure Your Account" with least-privilege principles

### 🗄️ RDS: Managed Databases
- **Database Provisioning**: Launch MySQL or PostgreSQL instances
- **Engine Selection**: Choose between popular database engines
- **Connection Endpoints**: View simulated connection strings
- **Lab Guide**: "Launch a Database"

### 🌐 Route 53: DNS Management
- **Hosted Zones**: Create public hosted zones for your domains
- **DNS Records**: Manage A, CNAME, MX, TXT records
- **Lab Guide**: "Setup Custom Domain"

### ⚖️ ELB: Load Balancing
- **Application Load Balancers**: Distribute traffic across multiple targets
- **Target Groups**: Register EC2 instances with health checks
- **Lab Guide**: "Scale Your Application" for high availability

### 📊 Architecture Visualization
- **Real-time Diagrams**: Visualize your infrastructure as you build
- **Interactive Flow**: See connections between services (EC2 → ELB → RDS)

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) with TypeScript
- **Build Tool**: [Vite 5](https://vitejs.dev/) for lightning-fast development
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with custom AWS theme
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) for global simulation state
- **Routing**: [React Router](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom AWS Service SVGs
- **Diagrams**: [React Flow](https://reactflow.dev/) for architecture visualization

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/K-Nishant-18/AWS-Simulator.git
    cd AWS-Simulator
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open your browser**
    ```
    Navigate to http://localhost:5173
    ```

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder, ready for deployment.

---

## 📚 How to Use

1. **Start with S3** – Learn object storage fundamentals by creating buckets and uploading files
2. **Progress to EC2** – Launch virtual servers and configure security groups
3. **Master IAM** – Understand access control and security best practices
4. **Explore Advanced Services** – Set up databases (RDS), DNS (Route 53), and load balancers (ELB)
5. **Visualize Your Architecture** – Use the Diagram tab to see your infrastructure
6. **Experiment Fearlessly** – Make mistakes, break things, and learn without consequences!

---

## 🎨 Project Structure

```
AWS-Simulator/
├── public/              # Static assets (AWS logos, icons)
├── src/
│   ├── components/      # Reusable UI components (Button, Card, Modal, etc.)
│   ├── layouts/         # Layout components (LabLayout)
│   ├── pages/           # Lab pages (S3Lab, EC2Lab, IAMConsole, etc.)
│   ├── store/           # Zustand state management (simulationStore)
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main app component with routing
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js   # Tailwind configuration with AWS theme
└── vite.config.ts       # Vite configuration
```

---

## 🔮 Roadmap (Phase 3)

Planning to add:
- **Serverless**: AWS Lambda & API Gateway simulation
- **Monitoring**: CloudWatch metrics, logs, and alarms
- **Infrastructure as Code**: CloudFormation template deployment
- **NoSQL**: DynamoDB table management
- **Cost Management**: Simulated billing dashboard and budget alerts

**Have a suggestion?** Open an issue or submit a PR!

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug fixes, new features, or documentation improvements.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **AWS** for creating the amazing cloud platform that inspired this project
- **Google Antigravity** for accelerating the development process
- The open-source community for incredible tools and libraries

---

<div align="center">
  <p>Made with ❤️ by <a href="https://www.kumar-nishant.me/">KUMAR NISHANT</a> for Cloud Enthusiasts</p>
  <p>
    <a href="https://github.com/K-Nishant-18/AWS-Simulator">⭐ Star this repo</a> if you found it helpful!
  </p>
</div>
