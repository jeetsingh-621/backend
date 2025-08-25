import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-pink-50/10 dark:from-blue-900/10 dark:via-purple-900/5 dark:to-pink-900/5 -z-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {/* Large floating circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-pink-200 to-blue-200 dark:from-pink-800/30 dark:to-blue-800/30 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[length:20px_20px] opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center fade-in-up">
          <div className="mb-12">
            {/* Animated Logo */}
            <div className="w-28 h-28 mx-auto mb-8 gradient-bg-primary rounded-2xl flex items-center justify-center shadow-2xl hover-lift transform-gpu">
              <div className="relative">
                <span className="text-4xl font-bold text-white">AI</span>
                <div className="absolute -inset-2 bg-white/20 rounded-full blur-md"></div>
              </div>
            </div>
            
            <h1 className="hero-title text-gradient-primary mb-6">
              Atlas AI
            </h1>
            <p className="hero-subtitle max-w-3xl mx-auto">
              Your intelligent assistant for the modern world. Experience the power of artificial intelligence at your fingertips with seamless, intuitive interactions.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl">
            <div className="card glass-effect hover-lift group">
              <div className="w-16 h-16 gradient-bg-primary rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Smart AI Assistant</h3>
              <p className="text-secondary leading-relaxed">
                Intelligent conversations powered by cutting-edge AI technology that understands context and provides meaningful responses.
              </p>
            </div>

            <div className="card glass-effect hover-lift group">
              <div className="w-16 h-16 gradient-bg-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Lightning Fast</h3>
              <p className="text-secondary leading-relaxed">
                Instant responses with minimal latency for seamless interactions that feel natural and responsive.
              </p>
            </div>

            <div className="card glass-effect hover-lift group">
              <div className="w-16 h-16 gradient-bg-accent rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl text-white">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-primary">Secure & Private</h3>
              <p className="text-secondary leading-relaxed">
                Your data is protected with enterprise-grade security measures and end-to-end encryption for complete privacy.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mb-20">
            <Link 
              to="/register" 
              className="btn-primary px-8 py-4 text-lg font-semibold"
            >
              <span className="relative z-10">Get Started Free</span>
            </Link>
            <Link 
              to="/login" 
              className="btn-outline px-8 py-4 text-lg font-semibold"
            >
              <span className="relative z-10">Sign In</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
            <div className="card glass-effect">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-secondary font-medium">Uptime</div>
            </div>
            <div className="card glass-effect">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1M+</div>
              <div className="text-secondary font-medium">Users</div>
            </div>
            <div className="card glass-effect">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-secondary font-medium">Support</div>
            </div>
            <div className="card glass-effect">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">AI</div>
              <div className="text-secondary font-medium">Powered</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="card glass-effect max-w-2xl mx-auto scale-in">
            <div className="text-4xl mb-4 text-primary opacity-60">"</div>
            <p className="text-lg italic text-secondary mb-6 leading-relaxed">
              Atlas AI has transformed how we interact with technology. The intuitive interface and powerful capabilities make it an indispensable tool for our daily operations. The AI understands context like no other.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 gradient-bg-primary rounded-full mr-4"></div>
              <div>
                <div className="font-semibold text-primary">Sarah Chen</div>
                <div className="text-secondary text-sm">CTO, Tech Innovations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="particle particle-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={i + 25}
            className="particle particle-md"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${5 + Math.random() * 2}s`
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={i + 40}
            className="particle particle-lg"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${6 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
