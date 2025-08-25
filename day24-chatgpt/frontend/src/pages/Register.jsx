import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register form submitted:', formData);

    axios.post("/api/auth/register",{
      email:formData.email,
     fullname:{
       firstname:formData.firstName,
      lastname:formData.lastName,
     },
      password:formData.password,
    },{
      withCredentials:true,
    }).then((res)=>{
      console.log(res);
      navigate("/");
      
      
    }).catch((err)=>{
      console.log("Registration failed",err);
      
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/20 dark:from-blue-900/15 dark:via-purple-900/10 dark:to-pink-900/10 -z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/25 dark:to-purple-800/25 rounded-full opacity-15 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-gradient-to-l from-pink-200 to-blue-200 dark:from-pink-800/25 dark:to-blue-800/25 rounded-full opacity-15 blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 gradient-bg-primary rounded-2xl flex items-center justify-center shadow-2xl hover-lift transform-gpu">
            <div className="relative">
              <span className="text-3xl font-bold text-white">AI</span>
              <div className="absolute -inset-2 bg-white/20 rounded-full blur-md"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-3 text-gradient-primary">Join Atlas AI</h1>
          <p className="text-secondary">Create your account to get started</p>
        </div>

        {/* Register Form */}
        <div className="card glass-effect shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Fields */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Terms Agreement */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
                required
              />
              <span className="ml-2 text-sm text-secondary">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-accent transition-colors font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-accent transition-colors font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-lg font-semibold"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-accent font-semibold transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-primary hover:text-accent text-sm transition-colors font-medium">
            ← Back to Home
          </Link>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle particle-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={i + 20}
              className="particle particle-md"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${5 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;
