import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { S3Lab } from './pages/S3Lab';
import { EC2Lab } from './pages/EC2Lab';
import { IAMLab } from './pages/IAMLab';
import { RDSLab } from './pages/RDSLab';
import { Route53Lab } from './pages/Route53Lab';
import { ELBLab } from './pages/ELBLab';
import { NavCard } from './components/NavCard';
import { S3Icon, EC2Icon, IAMIcon, RDSIcon, Route53Icon, ELBIcon } from './components/ServiceIcons';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-aws-blue via-gray-900 to-aws-dark flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-48 h-48 mb-0 transform hover:scale-105 transition-transform duration-500">
            <img src="/aws-logo.png" alt="AWS Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
            Real AWS <span className="">Simulator</span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-2xl mx-auto font-light">
            Master the cloud with hands-on, risk-free simulations.
            <br />
            <span className="text-gray-400 text-lg mt-2 block">No account required. Zero cost.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          <NavCard
            title="S3: Object Storage"
            description="Create buckets, upload objects, and host static websites with 99.999999999% durability."
            link="/s3"
            icon={<S3Icon size={40} />}
            color="green"
          />
          <NavCard
            title="EC2: Virtual Servers"
            description="Launch secure, resizable compute capacity in the cloud. Configure security groups and networking."
            link="/ec2"
            icon={<EC2Icon size={40} />}
            color="orange"
          />
          <NavCard
            title="IAM: Identity & Access"
            description="Manage access to AWS services and resources securely. Create users, groups, and policies."
            link="/iam"
            icon={<IAMIcon size={40} />}
            color="blue"
          />
          <NavCard
            title="RDS: Managed Databases"
            description="Set up, operate, and scale a relational database in the cloud with just a few clicks."
            link="/rds"
            icon={<RDSIcon size={40} />}
            color="purple"
          />
          <NavCard
            title="Route 53: DNS Management"
            description="Reliable and cost-effective cloud Domain Name System (DNS) web service."
            link="/route53"
            icon={<Route53Icon size={40} />}
            color="orange"
          />
          <NavCard
            title="ELB: Load Balancing"
            description="Automatically distribute incoming application traffic across multiple targets."
            link="/elb"
            icon={<ELBIcon size={40} />}
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
