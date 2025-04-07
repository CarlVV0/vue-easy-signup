
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate password reset email - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
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
        
        {!submitted ? (
          <>
            <h2 className="text-xl text-white/90">Reset Your Password</h2>
            
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
              
              <Button 
                type="submit" 
                className="auth-btn login-btn"
                disabled={loading}
              >
                {loading ? 'SENDING...' : 'RESET PASSWORD'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-white space-y-4">
            <p className="text-lg">Password reset email sent!</p>
            <p>Check your inbox for instructions to reset your password.</p>
            <Button 
              className="auth-btn login-btn mt-4"
              onClick={() => navigate('/login')}
            >
              RETURN TO LOGIN
            </Button>
          </div>
        )}
        
        <div className="mt-4">
          <Link to="/login" className="auth-link">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
