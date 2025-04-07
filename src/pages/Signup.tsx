
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User, Lock, Mail, UserPlus } from 'lucide-react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Please fill out all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate signup - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center auth-gradient">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        <div className="flex justify-center space-x-4">
          <img 
            src="/lovable-uploads/8515b465-52f2-4f7b-a34e-4399dfc8009e.png" 
            alt="Organization Logos"
            className="w-32 h-32 object-contain" 
          />
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-white">
          MDC-CAST BUDGET TRACKER SYSTEM
        </h1>
        <h2 className="text-xl text-white/90">Create an Account</h2>
        
        <form className="mt-8 space-y-4" onSubmit={handleSignup}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input pl-10"
              disabled={loading}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input pl-10"
              disabled={loading}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input pl-10"
              disabled={loading}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
            <Input
              type="password"
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input pl-10"
              disabled={loading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="auth-btn signup-btn"
            disabled={loading}
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </Button>
        </form>
        
        <div className="mt-4 flex justify-center">
          <span className="text-white/80 mr-2">Already have an account?</span>
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
