
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User, Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate login - in a real app, this would call an authentication API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any login
      toast.success('Login successful!');
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
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
        
        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
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
          
          <Button 
            type="submit" 
            className="auth-btn login-btn"
            disabled={loading}
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </Button>
        </form>
        
        <Button 
          variant="ghost" 
          className="auth-btn signup-btn"
          onClick={() => navigate('/signup')}
          disabled={loading}
        >
          SIGN UP
        </Button>
        
        <div className="mt-4">
          <Link to="/forgot-password" className="auth-link">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
