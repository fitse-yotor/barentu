import React from 'react';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  UsersIcon,
  CreditCardIcon,
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: CalendarIcon,
      title: 'Smart Scheduling',
      description: 'Plan and schedule posts across multiple platforms with our intuitive calendar interface.',
    },
    {
      icon: ChartBarIcon,
      title: 'Advanced Analytics',
      description: 'Track performance, engagement, and ROI with comprehensive analytics dashboards.',
    },
    {
      icon: UsersIcon,
      title: 'Team Management',
      description: 'Collaborate with your team using role-based access and workflow management.',
    },
    {
      icon: CreditCardIcon,
      title: 'Credit System',
      description: 'Flexible credit-based pricing that scales with your social media needs.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      credits: '100 credits/month',
      features: ['5 Social Accounts', 'Basic Analytics', 'Email Support'],
    },
    {
      name: 'Professional',
      price: '$79',
      credits: '300 credits/month',
      features: ['15 Social Accounts', 'Advanced Analytics', 'Team Collaboration', 'Priority Support'],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$199',
      credits: '1000 credits/month',
      features: ['Unlimited Accounts', 'Custom Analytics', 'White Label', 'Dedicated Support'],
    },
  ];

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <header className="bg-background-card border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-500">SocialHub</h1>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={onGetStarted}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onGetStarted}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-text-primary mb-6">
            Manage All Your Social Media
            <span className="text-primary-500 block">From One Dashboard</span>
          </h1>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Streamline your social media workflow with our powerful SaaS platform. 
            Schedule posts, analyze performance, and manage teams across all major social platforms.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button 
              onClick={onGetStarted}
              className="btn-primary text-lg px-8 py-3 flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              Watch Demo
            </button>
          </div>
          
          {/* Social Media Logos */}
          <div className="mt-12 flex items-center justify-center gap-8 opacity-60">
            <div className="w-8 h-8 bg-social-facebook rounded"></div>
            <div className="w-8 h-8 bg-social-instagram rounded"></div>
            <div className="w-8 h-8 bg-social-twitter rounded"></div>
            <div className="w-8 h-8 bg-social-linkedin rounded"></div>
            <div className="w-8 h-8 bg-social-tiktok rounded"></div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white mb-12">
            <span className="text-6xl mb-4 block">🤖</span>
            <h2 className="text-4xl font-bold mb-4">
              AI-Powered Social Media Management
            </h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to create engaging content, 
              optimize posting times, and gain intelligent insights into your social media performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-white mb-3">AI Content Generator</h3>
              <p className="text-purple-100">
                Generate engaging posts, captions, and hashtags tailored to your brand voice and audience.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Intelligence</h3>
              <p className="text-purple-100">
                Get AI-powered insights on optimal posting times, trending topics, and content performance.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
              <p className="text-purple-100">
                Deep dive into your social media performance with AI-enhanced analytics and predictions.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <button 
              onClick={onGetStarted}
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg"
            >
              Experience AI Features Now
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage, 
              schedule, and analyze your social media presence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-text-secondary text-lg">
              Choose the plan that fits your needs. All plans include our core features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`card p-8 relative ${
                  plan.popular ? 'border-2 border-primary-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-text-primary">
                      {plan.price}
                    </span>
                    <span className="text-text-secondary">/month</span>
                  </div>
                  <p className="text-text-secondary">{plan.credits}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckIcon className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-text-primary">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={onGetStarted}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'btn-secondary'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Social Media Strategy?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Join thousands of businesses already using SocialHub to streamline their social media management.
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-white text-primary-500 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors"
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-card border-t border-border-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-primary-500 mb-4">SocialHub</h3>
            <p className="text-text-secondary">
              © 2024 SocialHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;