import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { S3Lab } from './pages/S3Lab';
import { EC2Lab } from './pages/EC2Lab';
import { IAMLab } from './pages/IAMLab';
import { RDSLab } from './pages/RDSLab';
import { Route53Lab } from './pages/Route53Lab';
import { ELBLab } from './pages/ELBLab';
import { NavCard } from './components/NavCard';
import { Cloud, HardDrive, Server, Shield, Database, Globe, Network } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-aws-blue via-gray-800 to-aws-dark flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-aws-orange rounded-2xl mb-6">
            <Cloud size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">AWS Real-Life Simulator</h1>
          <p className="text-xl text-gray-300">
            Learn AWS hands-on with safe, sandboxed simulations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <NavCard
            title="S3: Static Website"
            description="Host a static website with high availability and scalability."
            link="/s3"
            icon={HardDrive}
            color="green"
          />
          <NavCard
            title="EC2: Launch a Server"
            description="Provision and manage virtual servers in the cloud."
            link="/ec2"
            icon={Server}
            color="orange"
          />
          <NavCard
            title="IAM: Secure Your Account"
            description="Manage users, groups, and permissions to secure your cloud environment."
            link="/iam"
            icon={Shield}
            color="blue"
          />
          <NavCard
            title="RDS: Launch a Database"
            description="Provision a managed relational database (MySQL/Postgres)."
            link="/rds"
            icon={Database}
            color="purple"
          />
          <NavCard
            title="Route 53: Custom Domain"
            description="Manage DNS records and route traffic to your application."
            link="/route53"
            icon={Globe}
            color="orange"
          />
          <NavCard
            title="ELB: Scale Your App"
            description="Distribute traffic across multiple instances for high availability."
            link="/elb"
            icon={Network}
            color="blue"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            100% Safe • No AWS Account Required • Zero Cost
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/s3" element={<S3Lab />} />
        <Route path="/ec2" element={<EC2Lab />} />
        <Route path="/iam" element={<IAMLab />} />
        <Route path="/rds" element={<RDSLab />} />
        <Route path="/route53" element={<Route53Lab />} />
        <Route path="/elb" element={<ELBLab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
