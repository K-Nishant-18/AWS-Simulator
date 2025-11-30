import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { S3Lab } from './pages/S3Lab';
import { EC2Lab } from './pages/EC2Lab';
import { IAMLab } from './pages/IAMLab';
import { Cloud } from 'lucide-react';

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

        <div className="grid md:grid-cols-3 gap-6">
          {/* S3 Lab Card */}
          <Link
            to="/labs/s3"
            className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">S3 Static Website</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn to host a static website using Amazon S3
            </p>
            <div className="flex items-center text-aws-orange text-sm font-medium">
              Start Lab →
            </div>
          </Link>

          {/* EC2 Lab Card */}
          <Link
            to="/labs/ec2"
            className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🖥️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">EC2 Basics</h3>
            <p className="text-gray-600 text-sm mb-4">
              Launch and configure virtual servers
            </p>
            <div className="flex items-center text-aws-orange text-sm font-medium">
              Start Lab →
            </div>
          </Link>

          {/* IAM Lab Card */}
          <Link
            to="/labs/iam"
            className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">IAM Security</h3>
            <p className="text-gray-600 text-sm mb-4">
              Manage users, roles, and permissions
            </p>
            <div className="flex items-center text-aws-orange text-sm font-medium">
              Start Lab →
            </div>
          </Link>
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
        <Route path="/labs/s3" element={<S3Lab />} />
        <Route path="/labs/ec2" element={<EC2Lab />} />
        <Route path="/labs/iam" element={<IAMLab />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
