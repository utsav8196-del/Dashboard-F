import { useState } from 'react';
import { ArrowRight, Zap, Users, TrendingUp, CheckCircle, Globe, ShoppingCart, Menu, X } from 'lucide-react';

const LandingPage = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                                <ShoppingCart size={24} className="text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                                PulseCart
                            </span>
                        </div>
                        <div className="hidden md:flex gap-8">
                            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                            <a href="#benefits" className="text-gray-300 hover:text-white transition">Benefits</a>
                            <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="hidden md:block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                                Get Started
                            </button>
                            <button
                                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-purple-500/40 text-white"
                                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                            >
                                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                    {/* Mobile nav */}
                    {mobileNavOpen && (
                        <div className="md:hidden pb-4 space-y-3">
                            <a href="#features" onClick={() => setMobileNavOpen(false)} className="block text-gray-300 hover:text-white transition py-2">Features</a>
                            <a href="#benefits" onClick={() => setMobileNavOpen(false)} className="block text-gray-300 hover:text-white transition py-2">Benefits</a>
                            <a href="#pricing" onClick={() => setMobileNavOpen(false)} className="block text-gray-300 hover:text-white transition py-2">Pricing</a>
                            <button className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                                Get Started
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    E-Commerce Made <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Simple</span>
                </h1>
                <p className="text-base sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Powerful e-commerce platform with real-time inventory management, automated billing, and professional email notifications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-purple-500/50 transition flex items-center justify-center gap-2">
                        Start Shopping <ArrowRight size={20} />
                    </button>
                    <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-purple-500 text-purple-400 font-semibold text-base sm:text-lg hover:bg-purple-500/10 transition">
                        Learn More
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-16">Powerful Features</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                        {
                            icon: <Zap size={32} />,
                            title: "Real-Time Inventory",
                            desc: "Automatic stock updates when orders are placed and paid"
                        },
                        {
                            icon: <Users size={32} />,
                            title: "Smart Notifications",
                            desc: "Multi-language email notifications with retry system"
                        },
                        {
                            icon: <TrendingUp size={32} />,
                            title: "Analytics Dashboard",
                            desc: "Track sales, revenue, and customer behavior in real-time"
                        },
                        {
                            icon: <Globe size={32} />,
                            title: "Global Ready",
                            desc: "Support for multiple languages and currencies"
                        },
                        {
                            icon: <CheckCircle size={32} />,
                            title: "Secure Payments",
                            desc: "Multiple payment methods with encrypted transactions"
                        },
                        {
                            icon: <ShoppingCart size={32} />,
                            title: "Easy Management",
                            desc: "Intuitive interface for managing products and orders"
                        }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/50 transition group">
                            <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-8 sm:mb-16">Why Choose PulseCart?</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        {[
                            "Increase sales with professional storefront",
                            "Automate inventory management",
                            "Reduce manual work with smart notifications",
                            "Track performance with analytics",
                            "Secure your business data",
                            "Scale as you grow"
                        ].map((benefit, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={24} />
                                <span className="text-lg text-gray-300">{benefit}</span>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-8 border border-purple-500/30">
                        <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg"></div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    {[
                        { number: "10K+", label: "Active Users" },
                        { number: "500K+", label: "Products Sold" },
                        { number: "99.9%", label: "Uptime" },
                        { number: "24/7", label: "Support" }
                    ].map((stat, i) => (
                        <div key={i} className="p-6">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-8 sm:p-12 text-center">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to grow your business?</h2>
                    <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8">Join thousands of entrepreneurs using PulseCart</p>
                    <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-white text-purple-600 font-semibold text-base sm:text-lg hover:shadow-xl transition">
                        Get Started Free
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-purple-500/20 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <ShoppingCart size={24} className="text-purple-400" />
                                <span className="font-bold text-white">PulseCart</span>
                            </div>
                            <p className="text-gray-400">Professional e-commerce platform</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Features</a></li>
                                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-purple-500/20 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 PulseCart. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
