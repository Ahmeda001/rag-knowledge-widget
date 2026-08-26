// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
//       <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
//         AI Knowledge Widget for Support & Docs
//       </h1>
//       <p className="text-lg text-gray-600 max-w-xl mb-8">
//         Upload your documentations, train your custom RAG chatbot, and embed it on your website in seconds.
//       </p>
//       <Link
//         href="/dashboard"
//         className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
//       >
//         Go to Dashboard →
//       </Link>
//     </div>
//   );
// }




// "use client"

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { 
//   MessageCircle, 
//   FileText, 
//   Zap, 
//   Code2, 
//   CheckCircle2, 
//   ArrowRight, 
//   Users, 
//   ShieldCheck, 
//   BarChart3, 
//   Send,
//   LifeBuoy,
//   ChevronDown
// } from "lucide-react";

// export default function LandingPage() {
//   const [demoMessages, setDemoMessages] = useState([
//     { role: "assistant", content: "Hi there! 👋 I'm the automated support guide for Acme Inc. How can I help you today?" }
//   ]);
//   const [demoInput, setDemoInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [activeTab, setActiveTab] = useState("html");
//   const [billingCycle, setBillingCycle] = useState("monthly");

//   const handleDemoSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!demoInput.trim()) return;

//     const userText = demoInput;
//     setDemoMessages((prev) => [...prev, { role: "user", content: userText }]);
//     setDemoInput("");
//     setIsTyping(true);

//     setTimeout(() => {
//       let botReply = "I found that in our setup guide! To authenticate your requests, you'll need to include your unique API key in the headers.";
//       if (userText.toLowerCase().includes("price") || userText.toLowerCase().includes("cost")) {
//         botReply = "Our standard plans start at $29/mo, which covers up to 1,000 monthly inquiries. Let me know if you want me to link you to the full pricing page!";
//       } else if (userText.toLowerCase().includes("human") || userText.toLowerCase().includes("support")) {
//         botReply = "I can definitely connect you with our human support team. Just a moment while I pull up the contact form for you.";
//       }
//       setDemoMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
//       setIsTyping(false);
//     }, 1200);
//   };

//   const codeSnippets = {
//     html: `<script \n  src="https://cdn.helpsync.co/v1/widget.js" \n  data-widget-id="ws_82f9a"\n  async defer>\n</script>`,
//     react: `import { useEffect } from 'react';\n\nexport default function App() {\n  useEffect(() => {\n    const script = document.createElement('script');\n    script.src = "https://cdn.helpsync.co/v1/widget.js";\n    script.setAttribute('data-widget-id', 'ws_82f9a');\n    document.body.appendChild(script);\n  }, []);\n  return <div>Your App</div>;\n}`,
//   };

//   // Animation Variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
//   };
  
//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden">
      
//       {/* Navigation */}
//       <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
//             <div className="p-1.5 bg-blue-600 rounded-lg shadow-sm">
//               <LifeBuoy className="w-5 h-5 text-white" />
//             </div>
//             <span>HelpSync</span>
//           </div>
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
//             <a href="#features" className="hover:text-slate-900 transition-colors">How it Works</a>
//             <a href="#demo" className="hover:text-slate-900 transition-colors">Live Demo</a>
//             <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
//           </nav>
//           <div className="flex items-center gap-4">
//             <a href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition hidden sm:block">Log in</a>
//             <a href="/dashboard" className="text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full shadow-sm transition flex items-center gap-1.5">
//               <span>Start Free Trial</span>
//             </a>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto">
//         <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 opacity-70" />
        
//         <motion.div 
//           className="text-center max-w-3xl mx-auto"
//           initial="hidden"
//           animate="visible"
//           variants={staggerContainer}
//         >
//           <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
//             <Users className="w-4 h-4" />
//             <span>Scale your customer support effortlessly</span>
//           </motion.div>
          
//           <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
//             Answer Customer Questions <br className="hidden sm:block"/>
//             <span className="text-blue-600">Instantly.</span>
//           </motion.h1>
          
//           <motion.p variants={fadeInUp} className="mt-6 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
//             Upload your help docs, guides, or PDFs. We generate a sleek, embeddable chat widget that gives your users accurate answers 24/7—reducing your support tickets instantly.
//           </motion.p>

//           <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
//             <a href="#demo" className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2">
//               <span>See it in Action</span>
//               <ArrowRight className="w-4 h-4" />
//             </a>
//             <a href="#integration" className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-full border border-slate-200 shadow-sm transition flex items-center justify-center gap-2">
//               <Code2 className="w-4 h-4 text-slate-400" />
//               <span>View setup code</span>
//             </a>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Interactive Demo Section - Humanized UI */}
//       <section id="demo" className="py-20 px-6 max-w-7xl mx-auto">
//         <motion.div 
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.7 }}
//           className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row"
//         >
//           {/* Left Context Info */}
//           <div className="md:w-2/5 p-8 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between">
//             <div>
//               <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center mb-6">
//                 <FileText className="w-6 h-6 text-blue-600" />
//               </div>
//               <h3 className="font-bold text-slate-900 text-2xl mb-3">Your Knowledge Base</h3>
//               <p className="text-slate-600 text-sm leading-relaxed mb-6">
//                 Your widget learns directly from the documents you provide. It reads your PDFs and web pages to provide accurate, helpful answers to your visitors.
//               </p>
              
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
//                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
//                   <span className="text-sm font-medium text-slate-700">User_Manual_v3.pdf</span>
//                 </div>
//                 <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
//                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
//                   <span className="text-sm font-medium text-slate-700">acme.com/billing-faq</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Simulated Widget Box */}
//           <div className="md:w-3/5 p-6 sm:p-8 bg-white flex flex-col h-[500px]">
//             {/* Widget Header */}
//             <div className="pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
//                     <MessageCircle className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-slate-900">Support Assistant</h4>
//                   <span className="text-xs text-slate-500 font-medium">Typically replies instantly</span>
//                 </div>
//               </div>
//             </div>

//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
//               {demoMessages.map((msg, i) => (
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.95, y: 10 }}
//                   animate={{ opacity: 1, scale: 1, y: 0 }}
//                   key={i} 
//                   className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed shadow-sm ${
//                     msg.role === "user" 
//                       ? "bg-slate-900 text-white rounded-2xl rounded-br-sm" 
//                       : "bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl rounded-bl-sm"
//                   }`}>
//                     {msg.content}
//                   </div>
//                 </motion.div>
//               ))}
//               {isTyping && (
//                 <motion.div 
//                   initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                   className="flex justify-start"
//                 >
//                   <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5 shadow-sm">
//                     <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
//                     <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
//                     <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
//                   </div>
//                 </motion.div>
//               )}
//             </div>

//             {/* Chat Input */}
//             <form onSubmit={handleDemoSend} className="mt-4 flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Type your question here..."
//                 value={demoInput}
//                 onChange={(e) => setDemoInput(e.target.value)}
//                 className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
//               />
//               <button
//                 type="submit"
//                 disabled={!demoInput.trim()}
//                 className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white w-12 h-12 rounded-full transition-colors flex items-center justify-center shadow-md shadow-blue-600/20"
//               >
//                 <Send className="w-4 h-4 ml-0.5" />
//               </button>
//             </form>
//           </div>
//         </motion.div>
//       </section>

//       {/* Feature Grid */}
//       <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl font-bold text-slate-900">Designed for Human Support Teams</h2>
//           <p className="text-slate-600 mt-4 text-lg">Automate the repetitive questions so your team can focus on the complex ones.</p>
//         </div>

//         <motion.div 
//           initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
//           className="grid grid-cols-1 md:grid-cols-3 gap-8"
//         >
//           <motion.div variants={fadeInUp} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
//             <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
//               <LifeBuoy className="w-6 h-6" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 mb-3">Deflect Support Tickets</h3>
//             <p className="text-slate-600 leading-relaxed">
//               Resolve up to 40% of standard customer inquiries instantly without human intervention by routing questions through your uploaded manuals.
//             </p>
//           </motion.div>

//           <motion.div variants={fadeInUp} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
//             <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
//               <ShieldCheck className="w-6 h-6" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 mb-3">Seamless Hand-off</h3>
//             <p className="text-slate-600 leading-relaxed">
//               If the widget doesn't know the answer, it seamlessly collects the user's email and question, forwarding it directly to your existing support inbox.
//             </p>
//           </motion.div>

//           <motion.div variants={fadeInUp} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
//             <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6">
//               <Zap className="w-6 h-6" />
//             </div>
//             <h3 className="text-xl font-semibold text-slate-900 mb-3">Beautiful, Fast UI</h3>
//             <p className="text-slate-600 leading-relaxed">
//               A meticulously designed widget that loads asynchronously. It never slows down your website and matches your brand colors perfectly.
//             </p>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Code Snippet / Embed Section */}
//       <section id="integration" className="py-24 px-6 max-w-7xl mx-auto bg-slate-900 rounded-[3rem] my-12 text-white relative overflow-hidden shadow-2xl">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full" />
        
//         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div className="p-4 sm:p-8">
//             <h2 className="text-3xl font-bold mb-4">Integrate in 60 seconds</h2>
//             <p className="text-slate-400 text-lg mb-8 leading-relaxed">
//               You don't need a development team to set this up. Just copy and paste one line of code into your website's header, and your widget is live immediately.
//             </p>
//             <ul className="space-y-4 text-slate-300">
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Works with WordPress, Webflow, & Shopify</li>
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Native React & Next.js support</li>
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Isolated styles won't break your site</li>
//             </ul>
//           </div>

//           <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl mr-4 sm:mr-8 mb-8 lg:mb-0">
//             <div className="flex gap-2 mb-6 border-b border-slate-800 pb-4">
//               {["html", "react"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     activeTab === tab ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"
//                   }`}
//                 >
//                   {tab.toUpperCase()}
//                 </button>
//               ))}
//             </div>
//             <pre className="text-sm font-mono text-blue-300 overflow-x-auto">
//               <code>{codeSnippets[activeTab as keyof typeof codeSnippets]}</code>
//             </pre>
//           </div>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl font-bold text-slate-900">Simple, predictable pricing</h2>
//           <p className="text-slate-600 mt-4 text-lg">Start for free, upgrade when your traffic grows.</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {/* Starter Plan */}
//           <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col">
//             <h3 className="text-xl font-bold text-slate-900">Starter</h3>
//             <p className="text-slate-500 mt-2">Perfect for small teams and single projects.</p>
//             <div className="my-8">
//               <span className="text-5xl font-extrabold text-slate-900">$29</span>
//               <span className="text-slate-500 font-medium">/mo</span>
//             </div>
//             <ul className="space-y-4 mb-8 flex-1 text-slate-700">
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 1,000 monthly inquiries</li>
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 5 document uploads (PDF/URL)</li>
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Standard chat widget</li>
//             </ul>
//             <button className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-xl transition-colors">
//               Start 14-Day Trial
//             </button>
//           </div>

//           {/* Pro Plan */}
//           <div className="bg-slate-900 border-2 border-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-900/10 flex flex-col relative text-white">
//             <div className="absolute -top-4 right-8 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
//               Most Popular
//             </div>
//             <h3 className="text-xl font-bold text-white">Professional</h3>
//             <p className="text-slate-400 mt-2">For growing businesses managing high support volume.</p>
//             <div className="my-8">
//               <span className="text-5xl font-extrabold text-white">$79</span>
//               <span className="text-slate-400 font-medium">/mo</span>
//             </div>
//             <ul className="space-y-4 mb-8 flex-1 text-slate-300">
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> 10,000 monthly inquiries</li>
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Unlimited document uploads</li>
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Remove branding & custom colors</li>
//               <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Human hand-off & lead capture</li>
//             </ul>
//             <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/20">
//               Get Started Now
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white border-t border-slate-200 py-12 px-6">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-2 font-bold text-slate-900">
//             <LifeBuoy className="w-5 h-5 text-blue-600" />
//             <span>HelpSync</span>
//           </div>
//           <p className="text-slate-500 text-sm">© 2026 HelpSync Technologies. All rights reserved.</p>
//           <div className="flex gap-6 text-sm font-medium text-slate-600">
//             <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
//             <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
//             <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



// 'use client'

// import { useState, useEffect, useRef, Fragment } from 'react'

// // ─── Types ──────────────────────────────────────────────────────────────────
// type Phase = 'start' | 'thinking' | 'typing' | 'done'
// interface Msg { role: 'user' | 'bot'; text: string }

// // ─── Data ───────────────────────────────────────────────────────────────────
// const CONVERSATIONS = [
//   {
//     question: "What's your refund policy?",
//     answer: 'You can request a refund within 30 days of purchase. Just email support and we\'ll process it within 5–7 business days.',
//   },
//   {
//     question: 'How do I reset my password?',
//     answer: 'Go to Settings → Security → Reset Password. You\'ll get an email link within 2 minutes. Check spam if it doesn\'t arrive.',
//   },
//   {
//     question: 'Do you offer annual billing?',
//     answer: 'Yes — annual plans save 20% compared to monthly. You can switch at any time from the Billing tab in your dashboard.',
//   },
// ]

// const STEPS = [
//   { n: '01', icon: '📂', title: 'Upload your content', body: 'Drop in PDFs, paste URLs, or connect a Notion page. Chunking, embedding, and indexing happen automatically.' },
//   { n: '02', icon: '🔗', title: 'Copy your snippet', body: 'Grab the single <script> tag from your dashboard. Paste it before your closing </body> tag.' },
//   { n: '03', icon: '✅', title: 'Visitors get answers', body: 'The widget draws from your content only. Every answer cites its source so visitors can trust it.' },
// ]

// const FEATURES = [
//   { icon: '📎', title: 'Multi-source indexing', body: 'PDFs, URLs, plain text — mix them in one knowledge base. Add or remove sources at any time.' },
//   { icon: '🔍', title: 'Source-cited answers', body: 'Every response names the document it came from. Visitors can verify. You build trust.' },
//   { icon: '⚡', title: 'One script tag', body: 'Async loading. Zero layout shift. Works on WordPress, Webflow, Shopify, Framer, or plain HTML.' },
//   { icon: '🎨', title: 'Fully brandable', body: 'Set your colors, logo, and tone. The widget looks like you built it — because you did.' },
//   { icon: '📊', title: 'Query analytics', body: 'See what your visitors ask most. Fill doc gaps before they become refund requests.' },
//   { icon: '🔒', title: 'Private by design', body: "Your content stays in your vector store. We don't train on it, share it, or retain it." },
// ]

// const PLANS = [
//   {
//     name: 'Starter', price: 'Free', period: '',
//     desc: 'Good enough to know it works.',
//     features: ['1 knowledge base', '100 queries / month', 'Up to 3 sources', 'Embeddable widget', 'Community support'],
//     cta: 'Start free', featured: false,
//   },
//   {
//     name: 'Pro', price: '$29', period: '/mo',
//     desc: 'For products with real support volume.',
//     features: ['10 knowledge bases', '5,000 queries / month', 'Unlimited sources', 'Custom branding', 'Query analytics', 'Email support'],
//     cta: 'Start 14-day trial', featured: true,
//   },
//   {
//     name: 'Business', price: '$99', period: '/mo',
//     desc: 'When support availability is non-negotiable.',
//     features: ['Unlimited knowledge bases', 'Unlimited queries', 'Priority indexing', 'API access', 'Team seats (5)', 'Priority support'],
//     cta: 'Get started', featured: false,
//   },
// ]

// // ─── CSS ────────────────────────────────────────────────────────────────────
// const CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   body {
//     font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
//     background: #FAFAF9;
//     color: #111117;
//     overflow-x: hidden;
//   }

//   /* ── Keyframes ── */
//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes floatA {
//     0%, 100% { transform: translateY(0px); }
//     50%       { transform: translateY(-10px); }
//   }
//   @keyframes floatB {
//     0%, 100% { transform: translateY(0px); }
//     50%       { transform: translateY(-7px); }
//   }
//   @keyframes dotBounce {
//     0%, 80%, 100% { transform: scale(0.55); opacity: 0.4; }
//     40%           { transform: scale(1);    opacity: 1; }
//   }
//   @keyframes slideInMsg {
//     from { opacity: 0; transform: translateX(-8px); }
//     to   { opacity: 1; transform: translateX(0); }
//   }
//   @keyframes slideInMsgR {
//     from { opacity: 0; transform: translateX(8px); }
//     to   { opacity: 1; transform: translateX(0); }
//   }
//   @keyframes cursorBlink {
//     0%, 100% { opacity: 1; }
//     50%       { opacity: 0; }
//   }

//   /* ── Hero stagger ── */
//   .h1 { animation: fadeUp .65s 0.00s ease both; }
//   .h2 { animation: fadeUp .65s 0.10s ease both; }
//   .h3 { animation: fadeUp .65s 0.20s ease both; }
//   .h4 { animation: fadeUp .65s 0.30s ease both; }
//   .h5 { animation: fadeUp .65s 0.40s ease both; }

//   /* ── Floating badges ── */
//   .fa { animation: floatA 5s ease-in-out infinite; }
//   .fb { animation: floatB 4.6s .9s ease-in-out infinite; }
//   .fc { animation: floatB 5.4s 1.7s ease-in-out infinite; }

//   /* ── Chat dots ── */
//   .dot { animation: dotBounce 1.3s ease-in-out infinite; }
//   .dot:nth-child(2) { animation-delay: .18s; }
//   .dot:nth-child(3) { animation-delay: .36s; }

//   /* ── Message appear ── */
//   .msg-l { animation: slideInMsg  .25s ease forwards; }
//   .msg-r { animation: slideInMsgR .25s ease forwards; }

//   /* ── Scroll reveal ── */
//   .reveal {
//     opacity: 0;
//     transform: translateY(22px);
//     transition: opacity .65s ease, transform .65s ease;
//   }
//   .reveal.visible { opacity: 1; transform: translateY(0); }

//   /* ── Interactive elements ── */
//   .btn-cta {
//     display: inline-flex; align-items: center; gap: 6px;
//     background: #4F46E5; color: white;
//     padding: 13px 26px; border-radius: 10px;
//     font-size: 15px; font-weight: 600;
//     border: none; cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     transition: background .2s, transform .2s, box-shadow .2s;
//     text-decoration: none;
//   }
//   .btn-cta:hover {
//     background: #4338CA;
//     transform: translateY(-1px);
//     box-shadow: 0 8px 28px rgba(79,70,229,.32);
//   }
//   .btn-ghost {
//     display: inline-flex; align-items: center; gap: 6px;
//     background: transparent; color: #111117;
//     padding: 13px 26px; border-radius: 10px;
//     font-size: 15px; font-weight: 500;
//     border: 1.5px solid #E4E4E7; cursor: pointer;
//     font-family: 'DM Sans', sans-serif;
//     transition: border-color .2s, color .2s;
//     text-decoration: none;
//   }
//   .btn-ghost:hover { border-color: #4F46E5; color: #4F46E5; }

//   .feat-card {
//     background: white;
//     border: 1.5px solid #EBEBEA;
//     border-radius: 16px; padding: 28px;
//     transition: border-color .2s, transform .2s, box-shadow .2s;
//   }
//   .feat-card:hover {
//     border-color: #C7D2FE;
//     transform: translateY(-2px);
//     box-shadow: 0 8px 32px rgba(79,70,229,.08);
//   }

//   .price-card {
//     background: white;
//     border: 1.5px solid #EBEBEA;
//     border-radius: 20px; padding: 36px 32px;
//     transition: border-color .25s, box-shadow .25s;
//   }
//   .price-card:hover {
//     border-color: #A5B4FC;
//     box-shadow: 0 8px 40px rgba(79,70,229,.1);
//   }
//   .price-card.featured {
//     background: #4F46E5; border-color: #4F46E5;
//   }
//   .price-card.featured:hover {
//     box-shadow: 0 8px 40px rgba(79,70,229,.3);
//   }

//   .nav-a {
//     color: #6B7280; font-size: 15px; text-decoration: none;
//     font-weight: 500; transition: color .15s;
//   }
//   .nav-a:hover { color: #111117; }

//   .foot-a {
//     display: block; font-size: 14px; color: #52525B;
//     text-decoration: none; margin-bottom: 10px;
//     transition: color .15s;
//   }
//   .foot-a:hover { color: white; }

//   /* ── Responsive ── */
//   @media (max-width: 820px) {
//     .hero-grid   { grid-template-columns: 1fr !important; }
//     .code-grid   { grid-template-columns: 1fr !important; }
//     .hide-m      { display: none !important; }
//     .steps-row   { flex-direction: column !important; align-items: center !important; }
//     .step-line   { display: none !important; }
//   }
//   @media (max-width: 680px) {
//     .feat-grid  { grid-template-columns: 1fr !important; }
//     .price-grid { grid-template-columns: 1fr !important; }
//   }
// `

// // ─── Component ──────────────────────────────────────────────────────────────
// export default function LandingPage() {
//   const [messages, setMessages] = useState<Msg[]>([])
//   const [typingText, setTypingText] = useState('')
//   const [showDots, setShowDots]   = useState(false)
//   const [convIdx, setConvIdx]     = useState(0)
//   const [phase, setPhase]         = useState<Phase>('start')
//   const timerRef = useRef<ReturnType<typeof setTimeout>>()

//   // Scroll reveal
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
//       { threshold: 0.12 }
//     )
//     document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
//     return () => obs.disconnect()
//   }, [])

//   // Chat animation state-machine
//   useEffect(() => {
//     const conv = CONVERSATIONS[convIdx]
//     let cancelled = false
//     const kill = () => { cancelled = true; clearTimeout(timerRef.current) }

//     if (phase === 'start') {
//       setMessages([{ role: 'user', text: conv.question }])
//       setTypingText(''); setShowDots(false)
//       timerRef.current = setTimeout(() => setPhase('thinking'), 700)
//     }

//     else if (phase === 'thinking') {
//       setShowDots(true)
//       timerRef.current = setTimeout(() => {
//         if (cancelled) return
//         setShowDots(false); setTypingText(''); setPhase('typing')
//       }, 1400)
//     }

//     else if (phase === 'typing') {
//       const text = conv.answer
//       let i = 0
//       const type = () => {
//         if (cancelled) return
//         if (i <= text.length) {
//           setTypingText(text.slice(0, i++))
//           timerRef.current = setTimeout(type, 20)
//         } else {
//           setMessages(prev => [...prev, { role: 'bot', text }])
//           setTypingText('')
//           timerRef.current = setTimeout(() => { if (!cancelled) setPhase('done') }, 500)
//         }
//       }
//       type()
//     }

//     else if (phase === 'done') {
//       timerRef.current = setTimeout(() => {
//         if (cancelled) return
//         setConvIdx(prev => (prev + 1) % CONVERSATIONS.length)
//         setPhase('start')
//       }, 2800)
//     }

//     return kill
//   }, [phase, convIdx])

//   // ─── Shared tokens ──────────────────────────────────────────────────────
//   const indigo      = '#4F46E5'
//   const indigoLight = '#EEF0FF'
//   const ink         = '#111117'
//   const muted       = '#71717A'
//   const border      = '#EBEBEA'
//   const serif: React.CSSProperties = { fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400 }

//   const pill = (label: string) => (
//     <div style={{ display:'inline-block', background: indigoLight, color: indigo,
//                   padding:'5px 14px', borderRadius: 99, fontSize: 13, fontWeight: 600,
//                   letterSpacing: '0.02em', marginBottom: 18 }}>
//       {label}
//     </div>
//   )

//   // ─── Render ─────────────────────────────────────────────────────────────
//   return (
//     <>
//       <style>{CSS}</style>

//       <div style={{ background: '#FAFAF9', color: ink, overflowX: 'hidden' }}>

//         {/* ══ NAV ══════════════════════════════════════════════════════════ */}
//         <nav style={{
//           position: 'sticky', top: 0, zIndex: 100,
//           background: 'rgba(250,250,249,.9)',
//           backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
//           borderBottom: `1px solid ${border}`,
//         }}>
//           <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px',
//                         height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

//             {/* Logo */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
//               <div style={{ width: 32, height: 32, background: indigo, borderRadius: 8,
//                             display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <span style={{ color: 'white', fontSize: 13, fontWeight: 800, letterSpacing: '-0.02em' }}>KB</span>
//               </div>
//               <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>KnowBase</span>
//             </div>

//             {/* Links */}
//             <div className="hide-m" style={{ display: 'flex', gap: 32 }}>
//               {['How it works', 'Features', 'Pricing', 'Docs'].map(l => (
//                 <a key={l} href="#" className="nav-a">{l}</a>
//               ))}
//             </div>

//             {/* CTAs */}
//             <div style={{ display: 'flex', gap: 10 }}>
//               <button className="btn-ghost" style={{ padding: '8px 18px', fontSize: 14 }}>Log in</button>
//               <button className="btn-cta"   style={{ padding: '8px 18px', fontSize: 14 }}>Get started free</button>
//             </div>
//           </div>
//         </nav>

//         {/* ══ HERO ══════════════════════════════════════════════════════════ */}
//         <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px 64px' }}>
//           <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
//                                               gap: 60, alignItems: 'center' }}>

//             {/* ── Left: copy ── */}
//             <div>
//               <div className="h1">
//                 <div style={{ display:'inline-flex', alignItems:'center', gap: 6,
//                               background: indigoLight, color: indigo,
//                               padding:'5px 10px 5px 6px', borderRadius: 99,
//                               fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
//                   <span style={{ background: indigo, color: 'white', padding:'2px 7px',
//                                  borderRadius: 99, fontSize: 11, fontWeight: 700 }}>NEW</span>
//                   Instant answers from your own docs
//                 </div>
//               </div>

//               <h1 className="h2" style={{ ...serif,
//                 fontSize: 'clamp(36px, 4.5vw, 56px)', lineHeight: 1.1,
//                 marginBottom: 22, letterSpacing: '-0.01em' }}>
//                 Your docs,<br />
//                 <em style={{ color: indigo }}>working for you.</em><br />
//                 While you sleep.
//               </h1>

//               <p className="h3" style={{ fontSize: 17, color: '#52525B', lineHeight: 1.72,
//                                          marginBottom: 36, maxWidth: 440 }}>
//                 Paste one script tag. Upload your PDFs or URLs. Give every visitor
//                 accurate, instant answers — pulled straight from your own content, 24 / 7.
//               </p>

//               <div className="h4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
//                 <button className="btn-cta" style={{ fontSize: 15 }}>Start for free →</button>
//                 <button className="btn-ghost" style={{ fontSize: 15 }}>Watch it live</button>
//               </div>

//               <div className="h5" style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
//                 {['No credit card', '5 min setup', 'Works on any site'].map(t => (
//                   <div key={t} style={{ display:'flex', alignItems:'center', gap: 6,
//                                         fontSize: 13, color: muted, fontWeight: 500 }}>
//                     <span style={{ width:16, height:16, background: indigoLight, borderRadius: 4,
//                                    display:'flex', alignItems:'center', justifyContent:'center',
//                                    fontSize:10, color: indigo, fontWeight:700, flexShrink:0 }}>✓</span>
//                     {t}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* ── Right: animated widget ── */}
//             <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 48 }}>

//               {/* Ambient glow */}
//               <div style={{ position:'absolute', inset:0, pointerEvents:'none',
//                             background:'radial-gradient(ellipse at 55% 45%, rgba(79,70,229,.09) 0%, transparent 70%)' }} />

//               {/* Floating badge — PDF */}
//               <div className="fa" style={{ position:'absolute', top: 4, left: 4,
//                 background:'white', border:`1.5px solid ${border}`, borderRadius:12,
//                 padding:'10px 14px', display:'flex', alignItems:'center', gap: 8,
//                 boxShadow:'0 4px 20px rgba(0,0,0,.08)', zIndex: 2 }}>
//                 <span style={{ fontSize: 20 }}>📄</span>
//                 <div>
//                   <div style={{ fontSize:13, fontWeight:600 }}>help-center.pdf</div>
//                   <div style={{ fontSize:11, color:'#10B981', fontWeight:600 }}>● Indexed</div>
//                 </div>
//               </div>

//               {/* Floating badge — URL */}
//               <div className="fb" style={{ position:'absolute', top: 16, right: 0,
//                 background:'white', border:`1.5px solid ${border}`, borderRadius:12,
//                 padding:'10px 14px', display:'flex', alignItems:'center', gap: 8,
//                 boxShadow:'0 4px 20px rgba(0,0,0,.08)', zIndex: 2 }}>
//                 <span style={{ fontSize: 20 }}>🔗</span>
//                 <div>
//                   <div style={{ fontSize:13, fontWeight:600 }}>docs.example.com</div>
//                   <div style={{ fontSize:11, color:'#10B981', fontWeight:600 }}>● Indexed</div>
//                 </div>
//               </div>

//               {/* The widget itself */}
//               <div style={{ width: 318, background:'white', borderRadius:20, marginTop:48,
//                             boxShadow:'0 24px 64px rgba(0,0,0,.13), 0 4px 16px rgba(0,0,0,.05)',
//                             border:`1.5px solid ${border}`, overflow:'hidden',
//                             position:'relative', zIndex:1 }}>

//                 {/* Widget header */}
//                 <div style={{ background: indigo, padding:'13px 16px',
//                               display:'flex', alignItems:'center', gap:10 }}>
//                   <div style={{ width:34, height:34, background:'rgba(255,255,255,.18)',
//                                 borderRadius:10, display:'flex', alignItems:'center',
//                                 justifyContent:'center', fontSize:16 }}>💬</div>
//                   <div>
//                     <div style={{ color:'white', fontSize:14, fontWeight:600 }}>Support</div>
//                     <div style={{ display:'flex', alignItems:'center', gap:4 }}>
//                       <span style={{ width:6, height:6, background:'#4ADE80',
//                                      borderRadius:'50%', display:'inline-block' }} />
//                       <span style={{ color:'rgba(255,255,255,.75)', fontSize:11 }}>
//                         Online · powered by your docs
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Messages area */}
//                 <div style={{ background:'#F7F7F5', minHeight:206, maxHeight:206,
//                               padding:'14px', display:'flex', flexDirection:'column',
//                               gap:9, overflow:'hidden' }}>

//                   {/* Greeting (always visible) */}
//                   <div style={{ display:'flex', gap:8 }}>
//                     <div style={{ width:26, height:26, background: indigoLight, borderRadius:7,
//                                   flexShrink:0, display:'flex', alignItems:'center',
//                                   justifyContent:'center', fontSize:12 }}>💬</div>
//                     <div style={{ background:'white', border:`1px solid ${border}`,
//                                   borderRadius:'4px 12px 12px 12px', padding:'8px 11px',
//                                   fontSize:13, color: ink, lineHeight:1.5, maxWidth:210 }}>
//                       Hi! Ask me anything — I have your full docs.
//                     </div>
//                   </div>

//                   {/* User question */}
//                   {messages[0] && (
//                     <div className="msg-r" style={{ display:'flex', justifyContent:'flex-end' }}>
//                       <div style={{ background: indigo, color:'white',
//                                     borderRadius:'12px 4px 12px 12px',
//                                     padding:'8px 11px', fontSize:13,
//                                     maxWidth:210, lineHeight:1.5 }}>
//                         {messages[0].text}
//                       </div>
//                     </div>
//                   )}

//                   {/* Typing dots */}
//                   {showDots && (
//                     <div className="msg-l" style={{ display:'flex', gap:8 }}>
//                       <div style={{ width:26, height:26, background: indigoLight, borderRadius:7,
//                                     flexShrink:0, display:'flex', alignItems:'center',
//                                     justifyContent:'center', fontSize:12 }}>💬</div>
//                       <div style={{ background:'white', border:`1px solid ${border}`,
//                                     borderRadius:'4px 12px 12px 12px',
//                                     padding:'10px 14px', display:'flex', gap:4, alignItems:'center' }}>
//                         <div className="dot" style={{ width:6, height:6, background:'#A5B4FC', borderRadius:'50%' }} />
//                         <div className="dot" style={{ width:6, height:6, background:'#A5B4FC', borderRadius:'50%' }} />
//                         <div className="dot" style={{ width:6, height:6, background:'#A5B4FC', borderRadius:'50%' }} />
//                       </div>
//                     </div>
//                   )}

//                   {/* Typing answer */}
//                   {typingText && (
//                     <div className="msg-l" style={{ display:'flex', gap:8 }}>
//                       <div style={{ width:26, height:26, background: indigoLight, borderRadius:7,
//                                     flexShrink:0, display:'flex', alignItems:'center',
//                                     justifyContent:'center', fontSize:12 }}>💬</div>
//                       <div style={{ background:'white', border:`1px solid ${border}`,
//                                     borderRadius:'4px 12px 12px 12px',
//                                     padding:'8px 11px', fontSize:13, color: ink,
//                                     maxWidth:210, lineHeight:1.5 }}>
//                         {typingText}
//                         <span style={{ display:'inline-block', width:1.5, height:13,
//                                        background: indigo, marginLeft:1.5, verticalAlign:'middle',
//                                        animation:'cursorBlink .9s step-end infinite' }} />
//                       </div>
//                     </div>
//                   )}

//                   {/* Final bot answer */}
//                   {messages[1] && !typingText && (
//                     <div style={{ display:'flex', gap:8 }}>
//                       <div style={{ width:26, height:26, background: indigoLight, borderRadius:7,
//                                     flexShrink:0, display:'flex', alignItems:'center',
//                                     justifyContent:'center', fontSize:12 }}>💬</div>
//                       <div style={{ background:'white', border:`1px solid ${border}`,
//                                     borderRadius:'4px 12px 12px 12px',
//                                     padding:'8px 11px', fontSize:13, color: ink,
//                                     maxWidth:210, lineHeight:1.5 }}>
//                         {messages[1].text}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Input bar */}
//                 <div style={{ background:'white', padding:'10px 12px',
//                               borderTop:`1px solid ${border}`,
//                               display:'flex', gap:8 }}>
//                   <div style={{ flex:1, background:'#F4F4F6', borderRadius:8,
//                                 padding:'8px 12px', fontSize:13, color:'#A1A1AA' }}>
//                     Ask a question…
//                   </div>
//                   <div style={{ width:34, height:34, background: indigo, borderRadius:8,
//                                 display:'flex', alignItems:'center', justifyContent:'center',
//                                 cursor:'pointer', color:'white', fontSize:16 }}>→</div>
//                 </div>
//               </div>

//               {/* Response-time badge */}
//               <div className="fc" style={{ position:'absolute', bottom:-8, right:2,
//                 background:'white', border:`1.5px solid ${border}`, borderRadius:10,
//                 padding:'7px 12px', boxShadow:'0 4px 18px rgba(0,0,0,.07)',
//                 fontSize:12, fontWeight:600, zIndex:2 }}>
//                 ⚡ avg. 1.2 s response
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ══ PLATFORM BAR ════════════════════════════════════════════════ */}
//         <div style={{ background:'#F4F3F0', borderTop:`1px solid ${border}`,
//                       borderBottom:`1px solid ${border}`, padding:'20px 24px' }}>
//           <div style={{ maxWidth:1100, margin:'0 auto', display:'flex',
//                         alignItems:'center', justifyContent:'center',
//                         flexWrap:'wrap', gap:10 }}>
//             <span style={{ fontSize:13, color:'#A1A1AA', fontWeight:600,
//                            textTransform:'uppercase', letterSpacing:'0.08em', marginRight:8 }}>
//               Works on
//             </span>
//             {['WordPress', 'Webflow', 'Framer', 'Shopify', 'Next.js', 'Raw HTML'].map(p => (
//               <span key={p} style={{ fontSize:14, fontWeight:600, color: muted,
//                                      background:'white', border:`1px solid ${border}`,
//                                      padding:'5px 12px', borderRadius:99 }}>{p}</span>
//             ))}
//           </div>
//         </div>

//         {/* ══ HOW IT WORKS ════════════════════════════════════════════════ */}
//         <section id="how" style={{ maxWidth:1100, margin:'0 auto', padding:'100px 24px' }}>
//           <div className="reveal" style={{ textAlign:'center', marginBottom:64 }}>
//             {pill('Simple by design')}
//             <h2 style={{ ...serif, fontSize:'clamp(28px,3.5vw,44px)', marginBottom:14 }}>
//               Three steps. Then it runs itself.
//             </h2>
//             <p style={{ fontSize:16, color: muted, maxWidth:400, margin:'0 auto', lineHeight:1.7 }}>
//               No ongoing maintenance. No prompt engineering.
//               Just your content, doing the work.
//             </p>
//           </div>

//           <div className="steps-row reveal" style={{ display:'flex', alignItems:'flex-start' }}>
//             {STEPS.map((step, i) => (
//               <Fragment key={step.n}>
//                 <div style={{ flex:1, textAlign:'center', padding:'0 16px' }}>
//                   <div style={{ width:60, height:60, background: indigoLight, borderRadius:18,
//                                 display:'flex', alignItems:'center', justifyContent:'center',
//                                 margin:'0 auto 14px', fontSize:26 }}>
//                     {step.icon}
//                   </div>
//                   <div style={{ fontSize:11, fontWeight:700, color:'#C7D2FE',
//                                 letterSpacing:'0.1em', marginBottom:8 }}>{step.n}</div>
//                   <h3 style={{ fontSize:18, fontWeight:600, marginBottom:10 }}>{step.title}</h3>
//                   <p style={{ fontSize:14, color: muted, lineHeight:1.7 }}>{step.body}</p>
//                 </div>
//                 {i < 2 && (
//                   <div className="step-line" style={{
//                     width:48, height:1, flexShrink:0,
//                     background:'linear-gradient(90deg,#C7D2FE,#E4E4E7)',
//                     marginTop:30,
//                   }} />
//                 )}
//               </Fragment>
//             ))}
//           </div>
//         </section>

//         {/* ══ STATS BAR ═══════════════════════════════════════════════════ */}
//         <div style={{ background:'#F7F7F5', borderTop:`1px solid ${border}`,
//                       borderBottom:`1px solid ${border}`, padding:'40px 24px' }}>
//           <div style={{ maxWidth:900, margin:'0 auto', display:'grid',
//                         gridTemplateColumns:'repeat(4,1fr)', gap:24, textAlign:'center' }}>
//             {[
//               { n: '< 2 min', label: 'Average install time' },
//               { n: '< 2 s',   label: 'Typical response time' },
//               { n: '1 tag',   label: 'To add to your site' },
//               { n: '6+',      label: 'Platforms supported' },
//             ].map(s => (
//               <div key={s.label}>
//                 <div style={{ ...serif, fontSize:36, color: indigo, marginBottom:6 }}>{s.n}</div>
//                 <div style={{ fontSize:14, color: muted, fontWeight:500 }}>{s.label}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ══ FEATURES ════════════════════════════════════════════════════ */}
//         <section id="features" style={{ background:'#F7F7F5', padding:'100px 24px' }}>
//           <div style={{ maxWidth:1100, margin:'0 auto' }}>
//             <div className="reveal" style={{ marginBottom:52 }}>
//               {pill('What you get')}
//               <h2 style={{ ...serif, fontSize:'clamp(28px,3.5vw,44px)' }}>
//                 Everything it needs.<br />Nothing it doesn't.
//               </h2>
//             </div>

//             <div className="feat-grid reveal" style={{ display:'grid',
//               gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
//               {FEATURES.map(f => (
//                 <div key={f.title} className="feat-card">
//                   <div style={{ fontSize:28, marginBottom:14 }}>{f.icon}</div>
//                   <h3 style={{ fontSize:16, fontWeight:600, marginBottom:8 }}>{f.title}</h3>
//                   <p style={{ fontSize:14, color: muted, lineHeight:1.65 }}>{f.body}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══ CODE SECTION ════════════════════════════════════════════════ */}
//         <section style={{ maxWidth:1100, margin:'0 auto', padding:'100px 24px' }}>
//           <div className="code-grid reveal" style={{ display:'grid',
//             gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>

//             {/* Copy */}
//             <div>
//               {pill('Deploy in 60 seconds')}
//               <h2 style={{ ...serif, fontSize:'clamp(26px,3vw,40px)', marginBottom:18 }}>
//                 Copy. Paste.<br />You're live.
//               </h2>
//               <p style={{ fontSize:16, color: muted, lineHeight:1.72, marginBottom:28 }}>
//                 No npm install. No build step. One async script tag and one data attribute.
//                 The widget handles the rest — and it updates automatically when you re-index your docs.
//               </p>
//               <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
//                 {[
//                   'Loads after your page — no Core Web Vitals impact',
//                   'Auto-updates when you re-index your docs',
//                   'Mobile-responsive out of the box',
//                 ].map(pt => (
//                   <div key={pt} style={{ display:'flex', alignItems:'flex-start', gap:10,
//                                          fontSize:15, color:'#52525B', lineHeight:1.55 }}>
//                     <span style={{ color: indigo, fontWeight:700, marginTop:1, flexShrink:0 }}>✓</span>
//                     {pt}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Terminal */}
//             <div style={{ background:'#0E0E14', borderRadius:16, overflow:'hidden',
//                           boxShadow:'0 24px 60px rgba(0,0,0,.18)' }}>
//               <div style={{ background:'#18181F', padding:'12px 16px',
//                             display:'flex', alignItems:'center', gap:6 }}>
//                 {['#FF5F57','#FEBC2E','#28C840'].map(c => (
//                   <div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }} />
//                 ))}
//                 <span style={{ fontSize:12, color:'#4B5563', marginLeft:8,
//                                fontFamily:'monospace' }}>index.html</span>
//               </div>
//               <div style={{ padding:'24px 28px', fontFamily:'"Fira Code","Cascadia Code",monospace',
//                             fontSize:13.5, lineHeight:2.1 }}>
//                 <div style={{ color:'#4B5563' }}>{`<!-- Paste before </body> -->`}</div>
//                 <div>
//                   <span style={{ color:'#818CF8' }}>&lt;</span>
//                   <span style={{ color:'#60A5FA' }}>script</span>
//                 </div>
//                 <div style={{ paddingLeft:18 }}>
//                   <span style={{ color:'#86EFAC' }}>src</span>
//                   <span style={{ color:'#94A3B8' }}>{"=\""}</span>
//                   <span style={{ color:'#FCA5A5' }}>https://cdn.knowbase.io/widget.js</span>
//                   <span style={{ color:'#94A3B8' }}>{"\" "}</span>
//                 </div>
//                 <div style={{ paddingLeft:18 }}>
//                   <span style={{ color:'#86EFAC' }}>data-id</span>
//                   <span style={{ color:'#94A3B8' }}>{"=\""}</span>
//                   <span style={{ color:'#FCD34D' }}>YOUR_PROJECT_ID</span>
//                   <span style={{ color:'#94A3B8' }}>{"\""}</span>
//                 </div>
//                 <div style={{ paddingLeft:18 }}>
//                   <span style={{ color:'#86EFAC' }}>async</span>
//                 </div>
//                 <div>
//                   <span style={{ color:'#818CF8' }}>&gt;&lt;/</span>
//                   <span style={{ color:'#60A5FA' }}>script</span>
//                   <span style={{ color:'#818CF8' }}>&gt;</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ══ PRICING ══════════════════════════════════════════════════════ */}
//         <section id="pricing" style={{ background:'#F7F7F5', padding:'100px 24px' }}>
//           <div style={{ maxWidth:1100, margin:'0 auto' }}>
//             <div className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
//               {pill('Pricing')}
//               <h2 style={{ ...serif, fontSize:'clamp(28px,3.5vw,44px)', marginBottom:12 }}>
//                 Start free. Grow when you're ready.
//               </h2>
//               <p style={{ fontSize:16, color: muted }}>No setup fees. No contracts. Cancel anytime.</p>
//             </div>

//             <div className="price-grid reveal" style={{ display:'grid',
//               gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
//               {PLANS.map(plan => (
//                 <div key={plan.name} className={`price-card${plan.featured ? ' featured' : ''}`}>

//                   <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.08em',
//                                 textTransform:'uppercase', marginBottom:10,
//                                 color: plan.featured ? 'rgba(255,255,255,.6)' : '#A1A1AA' }}>
//                     {plan.name}
//                   </div>

//                   {plan.featured && (
//                     <div style={{ display:'inline-block', background:'rgba(255,255,255,.2)',
//                                   color:'white', padding:'3px 10px', borderRadius:99,
//                                   fontSize:11, fontWeight:700, marginBottom:12 }}>
//                       Most popular
//                     </div>
//                   )}

//                   <div style={{ display:'flex', alignItems:'baseline', gap:2, marginBottom:8 }}>
//                     <span style={{ ...serif, fontSize:44, letterSpacing:'-0.02em' }}>{plan.price}</span>
//                     {plan.period && (
//                       <span style={{ fontSize:16,
//                                      color: plan.featured ? 'rgba(255,255,255,.6)' : '#A1A1AA' }}>
//                         {plan.period}
//                       </span>
//                     )}
//                   </div>

//                   <p style={{ fontSize:14, lineHeight:1.55, marginBottom:24,
//                               color: plan.featured ? 'rgba(255,255,255,.7)' : muted }}>
//                     {plan.desc}
//                   </p>

//                   <ul style={{ listStyle:'none', padding:0, marginBottom:28,
//                                display:'flex', flexDirection:'column', gap:10 }}>
//                     {plan.features.map(f => (
//                       <li key={f} style={{ display:'flex', gap:10, fontSize:14,
//                                            alignItems:'flex-start',
//                                            color: plan.featured ? 'rgba(255,255,255,.9)' : '#374151' }}>
//                         <span style={{ fontWeight:700, flexShrink:0, fontSize:15,
//                                        color: plan.featured ? '#86EFAC' : indigo }}>✓</span>
//                         {f}
//                       </li>
//                     ))}
//                   </ul>

//                   <button style={plan.featured ? {
//                     width:'100%', padding:'13px',
//                     background:'white', color: indigo,
//                     border:'none', borderRadius:10,
//                     fontWeight:700, fontSize:15, cursor:'pointer',
//                     fontFamily:"'DM Sans',sans-serif",
//                     transition:'opacity .2s',
//                   } : {
//                     width:'100%', padding:'13px',
//                     background: indigo, color:'white',
//                     border:'none', borderRadius:10,
//                     fontWeight:600, fontSize:15, cursor:'pointer',
//                     fontFamily:"'DM Sans',sans-serif",
//                     transition:'background .2s',
//                   }}>
//                     {plan.cta}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══ FINAL CTA ════════════════════════════════════════════════════ */}
//         <section style={{ padding:'120px 24px', textAlign:'center' }}>
//           <div className="reveal" style={{ maxWidth:560, margin:'0 auto' }}>
//             <h2 style={{ ...serif, fontSize:'clamp(32px,4.5vw,52px)',
//                          lineHeight:1.15, marginBottom:20 }}>
//               Your documentation<br />is already written.
//               <br /><em style={{ color: indigo }}>Put it to work.</em>
//             </h2>
//             <p style={{ fontSize:17, color: muted, marginBottom:36, lineHeight:1.7 }}>
//               5 minutes to set up. Free on the Starter plan, forever.<br />
//               No credit card required.
//             </p>
//             <button className="btn-cta" style={{ fontSize:16, padding:'16px 36px' }}>
//               Create your free account →
//             </button>
//           </div>
//         </section>

//         {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
//         <footer style={{ background:'#0E0E14', color:'white',
//                          padding:'64px 24px 40px' }}>
//           <div style={{ maxWidth:1100, margin:'0 auto' }}>
//             <div style={{ display:'flex', justifyContent:'space-between',
//                           flexWrap:'wrap', gap:40, marginBottom:52 }}>

//               {/* Brand */}
//               <div style={{ maxWidth:240 }}>
//                 <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
//                   <div style={{ width:32, height:32, background: indigo, borderRadius:8,
//                                 display:'flex', alignItems:'center', justifyContent:'center' }}>
//                     <span style={{ color:'white', fontSize:13, fontWeight:800,
//                                    letterSpacing:'-0.02em' }}>KB</span>
//                   </div>
//                   <span style={{ fontWeight:700, fontSize:16 }}>KnowBase</span>
//                 </div>
//                 <p style={{ fontSize:14, color:'#52525B', lineHeight:1.7 }}>
//                   A support widget built from your own documentation.
//                   No bloat. No enterprise pricing. No nonsense.
//                 </p>
//               </div>

//               {/* Columns */}
//               {[
//                 { title:'Product',   links:['How it works','Features','Pricing','Changelog'] },
//                 { title:'Resources', links:['Docs','API reference','Blog','Status'] },
//                 { title:'Company',   links:['About','Twitter','Privacy','Terms'] },
//               ].map(col => (
//                 <div key={col.title}>
//                   <div style={{ fontSize:12, fontWeight:700, color:'#3F3F47',
//                                 textTransform:'uppercase', letterSpacing:'0.08em',
//                                 marginBottom:16 }}>
//                     {col.title}
//                   </div>
//                   {col.links.map(link => (
//                     <a key={link} href="#" className="foot-a">{link}</a>
//                   ))}
//                 </div>
//               ))}
//             </div>

//             <div style={{ borderTop:'1px solid #18181F', paddingTop:24,
//                           display:'flex', justifyContent:'space-between',
//                           alignItems:'center', flexWrap:'wrap', gap:12 }}>
//               <p style={{ fontSize:13, color:'#3F3F47' }}>
//                 © 2026 KnowBase. Made with care, not a committee.
//               </p>
//               <div style={{ display:'flex', gap:20 }}>
//                 {['Privacy','Terms','Cookies'].map(l => (
//                   <a key={l} href="#" style={{ fontSize:13, color:'#3F3F47', textDecoration:'none' }}>{l}</a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </footer>

//       </div>
//     </>
//   )
// }










// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   MessageSquare,
//   FileText,
//   Zap,
//   Code2,
//   CheckCircle2,
//   ArrowRight,
//   Users,
//   ShieldCheck,
//   BarChart3,
//   Send,
//   LifeBuoy,
//   ChevronDown,
//   ChevronRight,
//   Copy,
//   Check,
//   Search,
//   BookOpen,
//   Headphones,
//   Globe,
//   Sliders,
//   Star,
//   Layers,
//   Sparkles,
//   Lock,
//   RefreshCw,
//   Clock,
//   Heart,
//   Smile,
//   ExternalLink,
//   Inbox,
//   HelpCircle,
//   Laptop,
//   CheckCheck,
//   UserCheck,
//   FileCode,
//   Menu,
//   X
// } from "lucide-react";

// // --- Demo Conversation Presets ---
// const DEMO_PRESETS = [
//   {
//     category: "Onboarding",
//     question: "How do I invite my team members to the workspace?",
//     answer: "You can invite team members by navigating to Settings → Team & Permissions → 'Invite Member'. Enter their email address, select their role (Admin, Editor, or Viewer), and they'll receive an instant invitation link valid for 48 hours.",
//     source: "Team_Administration_Guide.pdf · Page 3",
//     confidence: "99.4%"
//   },
//   {
//     category: "Billing",
//     question: "Can we get invoices with our company VAT number?",
//     answer: "Yes! Go to Workspace Settings → Billing → Invoicing Details. You can add your company legal name, tax/VAT identification number, and custom billing email. All past and future invoices will automatically update with these details.",
//     source: "Billing_FAQ_and_Tax_Guide.pdf · Section 4.2",
//     confidence: "98.9%"
//   },
//   {
//     category: "Integration",
//     question: "Does the chat widget support dark mode and custom colors?",
//     answer: "Absolutely. The widget automatically respects your visitor's system theme or can be forced to light/dark mode. You can customize the brand hex color, launcher icon, greeting text, and border radius in the Widget Customizer.",
//     source: "Widget_Styling_Documentation.md",
//     confidence: "99.8%"
//   },
//   {
//     category: "Support Handoff",
//     question: "What happens if a customer question isn't in our docs?",
//     answer: "When a query can't be answered with high confidence, the widget automatically prompts the customer for their email address and creates a ticket forwarded directly to your support inbox or Slack channel, preserving the chat history.",
//     source: "Escalation_and_Human_Routing.pdf · Page 12",
//     confidence: "99.1%"
//   }
// ];

// // --- Code Snippets for Integrations ---
// const CODE_SNIPPETS = {
//   html: `<!-- Add to your website before the </body> tag -->
// <script 
//   src="https://cdn.docupulse.io/v1/widget.js"
//   data-workspace-id="ws_live_94f8a2"
//   data-theme="auto"
//   async defer>
// </script>`,
//   react: `// In your React / Next.js layout or component
// import { useEffect } from "react";

// export function SupportWidget() {
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://cdn.docupulse.io/v1/widget.js";
//     script.setAttribute("data-workspace-id", "ws_live_94f8a2");
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return null;
// }`,
//   wordpress: `// In your WordPress Theme header.php or via 'WPCode' plugin:
// function add_docupulse_widget() {
//     ?>
//     <script 
//       src="https://cdn.docupulse.io/v1/widget.js"
//       data-workspace-id="ws_live_94f8a2"
//       async defer>
//     </script>
//     <?php
// }
// add_action('wp_footer', 'add_docupulse_widget');`,
//   shopify: `<!-- In your Shopify theme.liquid, just before </body> -->
// <script 
//   src="https://cdn.docupulse.io/v1/widget.js"
//   data-workspace-id="ws_live_94f8a2"
//   data-accent-color="#4F46E5"
//   async defer>
// </script>`
// };

// // --- Testimonials Data ---
// const TESTIMONIALS = [
//   {
//     name: "Sarah Jenkins",
//     role: "Head of Customer Experience",
//     company: "Northwind SaaS",
//     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
//     quote: "Our customer support team was overwhelmed with 800+ repetitive tickets every week. Within 48 hours of installing DocuPulse, our first-response time dropped from 4 hours to 8 seconds, and customer satisfaction went up 34%.",
//     metric: "62% ticket deflection"
//   },
//   {
//     name: "Marcus Vance",
//     role: "VP of Product & Support",
//     company: "HyperScale Cloud",
//     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
//     quote: "Unlike generic chat solutions that make up answers, this widget cites the exact manual and page number. It gives our enterprise clients immense confidence, and the human handoff feature works like magic.",
//     metric: "99.2% answer accuracy"
//   },
//   {
//     name: "Elena Rostova",
//     role: "Founder & Lead Developer",
//     company: "Craftly Studio",
//     avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
//     quote: "Setting this up took literally 3 minutes. We dropped in our help center URL and uploaded 3 PDF user manuals. Now our customers get warm, polite answers around the clock while we sleep.",
//     metric: "3 min total setup time"
//   }
// ];

// // --- FAQ Data ---
// const FAQ_ITEMS = [
//   {
//     q: "How does the widget learn our documentation?",
//     a: "You simply upload your existing documents (PDFs, Word documents, text guides) or enter the URL of your help center/documentation site. DocuPulse indexes the content, breaks it down into searchable sections, and prepares instant, precise answers based strictly on your verified material."
//   },
//   {
//     q: "Will it ever make up answers or hallucinate information?",
//     a: "No. The system is strictly grounded in your provided documents. Every response includes a verified source citation referencing the exact file and section. If the answer cannot be found in your uploaded knowledge base with high confidence, it gracefully offers to connect the visitor to your human support team."
//   },
//   {
//     q: "How does human handoff work?",
//     a: "When a customer needs human assistance or when a query falls outside your docs, the widget seamlessly collects their email and inquiry summary. It can forward the message directly to your existing helpdesk (Zendesk, Intercom, HelpScout, or standard email/Slack) with full conversation history."
//   },
//   {
//     q: "Will adding the widget slow down my website?",
//     a: "Not at all. The widget script is under 15KB, loads asynchronously in the background, and has zero impact on your Core Web Vitals, page speed scores, or SEO performance."
//   },
//   {
//     q: "Can I customize the design to match my brand?",
//     a: "Yes! You can customize the launcher style, brand hex colors, widget size, avatar image, greeting message, suggested questions, and light/dark theme directly from your workspace dashboard without touching any code."
//   },
//   {
//     q: "Is our internal company data safe and private?",
//     a: "Yes, 100%. Your knowledge documents and customer conversations are isolated in your own encrypted workspace. We never sell your data or use your proprietary company documents to train public models."
//   }
// ];

// export default function LandingPage() {
//   // --- State for Interactive Demo ---
//   const [activePresetIndex, setActivePresetIndex] = useState(0);
//   const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string; source?: string; confidence?: string }>>([
//     {
//       role: "assistant",
//       text: "Hello there! 👋 I'm here to help answer questions directly from our knowledge base and documentation. What can I help you find today?"
//     },
//     {
//       role: "user",
//       text: DEMO_PRESETS[0].question
//     },
//     {
//       role: "assistant",
//       text: DEMO_PRESETS[0].answer,
//       source: DEMO_PRESETS[0].source,
//       confidence: DEMO_PRESETS[0].confidence
//     }
//   ]);
//   const [userInput, setUserInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [activeCodeTab, setActiveCodeTab] = useState<"html" | "react" | "wordpress" | "shopify">("html");
//   const [copiedCode, setCopiedCode] = useState(false);
//   const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
//   const [inquiryVolume, setInquiryVolume] = useState(2500);
//   const [openFaq, setOpenFaq] = useState<number | null>(0);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll chat inside widget demo
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatMessages, isTyping]);

//   // Handle Preset Question Selection
//   const handleSelectPreset = (index: number) => {
//     setActivePresetIndex(index);
//     const preset = DEMO_PRESETS[index];

//     setChatMessages((prev) => [
//       ...prev,
//       { role: "user", text: preset.question }
//     ]);
//     setIsTyping(true);

//     setTimeout(() => {
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           text: preset.answer,
//           source: preset.source,
//           confidence: preset.confidence
//         }
//       ]);
//       setIsTyping(false);
//     }, 900);
//   };

//   // Handle Custom Question Submission
//   const handleSendCustomMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userInput.trim()) return;

//     const query = userInput.trim();
//     setUserInput("");

//     setChatMessages((prev) => [...prev, { role: "user", text: query }]);
//     setIsTyping(true);

//     setTimeout(() => {
//       // Human-friendly contextual reply simulation
//       let reply = `I found that in your knowledge guides! According to the documentation, requests can be managed seamlessly through your workspace dashboard with full revision history.`;
//       let src = "Knowledge_Base_Index.pdf · Section 2";
//       let conf = "98.5%";

//       const lower = query.toLowerCase();
//       if (lower.includes("price") || lower.includes("cost") || lower.includes("plan")) {
//         reply = "Our plans start with a generous Free Tier (100 chats/mo), with Pro at $29/mo for up to 5,000 monthly customer answers. Annual subscriptions include 2 months free.";
//         src = "Pricing_and_Plans_2026.pdf · Page 1";
//         conf = "99.7%";
//       } else if (lower.includes("human") || lower.includes("agent") || lower.includes("support")) {
//         reply = "I can immediately forward your request to a team specialist! Just leave your email and our human support team will respond within a few hours.";
//         src = "Human_Handoff_Policy.pdf · Page 5";
//         conf = "99.2%";
//       } else if (lower.includes("install") || lower.includes("code") || lower.includes("embed")) {
//         reply = "You can embed the widget in under 60 seconds by copying a single <script> tag into your HTML, WordPress, Shopify, or React application.";
//         src = "Quickstart_Embed_Guide.md";
//         conf = "99.9%";
//       }

//       setChatMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           text: reply,
//           source: src,
//           confidence: conf
//         }
//       ]);
//       setIsTyping(false);
//     }, 1100);
//   };

//   // Copy code handler
//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab]);
//     setCopiedCode(true);
//     setTimeout(() => setCopiedCode(false), 2000);
//   };

//   // ROI Calculator formula
//   const hoursSavedPerMonth = Math.round((inquiryVolume * 0.58 * 4.5) / 60);
//   const costSavedPerYear = (hoursSavedPerMonth * 28 * 12).toLocaleString();

//   return (
//     <div className="min-h-screen bg-[#FAFAF9] text-[#19191C] font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      
//       {/* ─────────────────────────────────────────────────────────────
//           1. TOP ANNOUNCEMENT BAR & NAVIGATION
//       ────────────────────────────────────────────────────────────── */}
//       <div className="bg-[#111116] text-white py-2 px-4 text-xs sm:text-sm font-medium text-center flex items-center justify-center gap-2 border-b border-white/10">
//         <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-indigo-500/30">
//           <Smile className="w-3.5 h-3.5 text-indigo-400" /> Human-First Support
//         </span>
//         <span className="text-zinc-300">Turn your knowledge documents into instant, 24/7 customer satisfaction.</span>
//         <Link href="/dashboard" className="underline font-semibold text-white hover:text-indigo-300 ml-1 inline-flex items-center gap-0.5">
//           Try it free <ChevronRight className="w-3.5 h-3.5" />
//         </Link>
//       </div>

//       <header className="sticky top-0 z-50 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
//           {/* Brand Logo */}
//           <Link href="/" className="flex items-center gap-2.5 group">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
//               <BookOpen className="w-5 h-5 text-white" />
//             </div>
//             <div className="flex flex-col">
//               <span className="font-extrabold text-xl tracking-tight text-zinc-900 flex items-center gap-1">
//                 DocuPulse
//               </span>
//               <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 -mt-1">
//                 Knowledge Widget
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation Links */}
//           <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
//             <a href="#how-it-works" className="hover:text-zinc-900 transition-colors">How It Works</a>
//             <a href="#interactive-demo" className="hover:text-zinc-900 transition-colors">Live Preview</a>
//             <a href="#features" className="hover:text-zinc-900 transition-colors">Features</a>
//             <a href="#calculator" className="hover:text-zinc-900 transition-colors">ROI Calculator</a>
//             <a href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</a>
//             <a href="#faq" className="hover:text-zinc-900 transition-colors">FAQ</a>
//           </nav>

//           {/* Action Buttons */}
//           <div className="hidden sm:flex items-center gap-3">
//             <Link
//               href="/dashboard"
//               className="text-sm font-semibold text-zinc-700 hover:text-zinc-900 px-3.5 py-2 transition"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/dashboard"
//               className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white px-5 py-2.5 rounded-xl shadow-sm shadow-indigo-600/25 transition-all flex items-center gap-2"
//             >
//               <span>Launch Dashboard</span>
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>

//           {/* Mobile Menu Toggle Button */}
//           <button 
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
//             className="md:hidden p-2 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden bg-white border-b border-zinc-200 px-6 py-5 flex flex-col gap-4 text-base font-medium shadow-xl"
//             >
//               <a 
//                 href="#how-it-works" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-zinc-700 hover:text-indigo-600"
//               >
//                 How It Works
//               </a>
//               <a 
//                 href="#interactive-demo" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-zinc-700 hover:text-indigo-600"
//               >
//                 Live Preview
//               </a>
//               <a 
//                 href="#features" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-zinc-700 hover:text-indigo-600"
//               >
//                 Features
//               </a>
//               <a 
//                 href="#calculator" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-zinc-700 hover:text-indigo-600"
//               >
//                 ROI Calculator
//               </a>
//               <a 
//                 href="#pricing" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-zinc-700 hover:text-indigo-600"
//               >
//                 Pricing
//               </a>
//               <a 
//                 href="#faq" 
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-zinc-700 hover:text-indigo-600"
//               >
//                 FAQ
//               </a>
//               <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2.5">
//                 <Link
//                   href="/dashboard"
//                   className="w-full text-center py-2.5 font-semibold text-zinc-800 bg-zinc-100 rounded-xl"
//                 >
//                   Sign In
//                 </Link>
//                 <Link
//                   href="/dashboard"
//                   className="w-full text-center py-2.5 font-semibold text-white bg-indigo-600 rounded-xl shadow-md"
//                 >
//                   Start Free Trial
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </header>

//       {/* ─────────────────────────────────────────────────────────────
//           2. HERO SECTION (Warm, Human, High Trust)
//       ────────────────────────────────────────────────────────────── */}
//       <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
//         {/* Subtle Warm Background Glow */}
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-100/60 via-purple-100/40 to-amber-50/50 blur-3xl -z-10 rounded-full pointer-events-none" />

//         <div className="text-center max-w-4xl mx-auto">
          
//           {/* Trust Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200/90 shadow-sm text-zinc-800 text-xs sm:text-sm font-medium mb-8"
//           >
//             <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
//             <span className="text-zinc-600 font-normal">Trusted by support leaders</span>
//             <span className="text-zinc-300">|</span>
//             <span className="text-indigo-600 font-semibold flex items-center gap-1">
//               <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9/5 Rating
//             </span>
//           </motion.div>

//           {/* Headline */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] sm:leading-[1.1]"
//           >
//             Customer support that feels{" "}
//             <span className="relative whitespace-nowrap text-indigo-600">
//               <span className="relative z-10">warm & human</span>
//               <span className="absolute bottom-1 left-0 right-0 h-3 bg-indigo-100/80 -rotate-1 rounded-sm -z-0" />
//             </span>
//             — around the clock.
//           </motion.h1>

//           {/* Subtitle */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="mt-6 text-lg sm:text-xl text-zinc-600 font-normal max-w-2xl mx-auto leading-relaxed"
//           >
//             Upload your user guides, PDFs, or FAQs. Embed a beautiful, brand-matched chat widget that gives customers instant, verified answers—and gracefully hands off to your team when needed.
//           </motion.p>

//           {/* Call to Actions */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
//           >
//             <Link
//               href="/dashboard"
//               className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-base rounded-2xl shadow-xl shadow-indigo-600/25 transition-all flex items-center justify-center gap-2.5 group"
//             >
//               <span>Get Started Free</span>
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
            
//             <a
//               href="#interactive-demo"
//               className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 font-semibold text-base rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
//             >
//               <Headphones className="w-4 h-4 text-indigo-600" />
//               <span>Try Live Widget Demo</span>
//             </a>
//           </motion.div>

//           {/* Micro Reassurances */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-zinc-500 font-medium"
//           >
//             <div className="flex items-center gap-1.5">
//               <Check className="w-4 h-4 text-emerald-600" />
//               <span>No credit card required</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <Check className="w-4 h-4 text-emerald-600" />
//               <span>Embeds in under 2 minutes</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <Check className="w-4 h-4 text-emerald-600" />
//               <span>100% data privacy isolation</span>
//             </div>
//           </motion.div>

//         </div>

//         {/* Social Proof Logos Bar */}
//         <div className="mt-20 pt-10 border-t border-zinc-200/80 max-w-5xl mx-auto">
//           <p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-6">
//             Empowering modern support teams across fast-growing companies
//           </p>
//           <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
//             <span className="font-extrabold text-xl tracking-tighter text-zinc-800">CAMPUSFLOW</span>
//             <span className="font-bold text-lg tracking-tight text-zinc-800 flex items-center gap-1">
//               <span className="w-3 h-3 bg-zinc-800 rounded-sm inline-block" /> LUMINA
//             </span>
//             <span className="font-semibold text-lg tracking-wider text-zinc-800">ARCHETYPE</span>
//             <span className="font-black text-xl tracking-tight text-zinc-800">STACKPULSE</span>
//             <span className="font-bold text-lg tracking-normal text-zinc-800">VERIDIAN</span>
//           </div>
//         </div>

//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           3. INTERACTIVE LIVE WIDGET PREVIEW (Humanized UI Playground)
//       ────────────────────────────────────────────────────────────── */}
//       <section id="interactive-demo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        
//         <div className="text-center max-w-3xl mx-auto mb-12">
//           <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
//             <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Live Interactive Simulator
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
//             See how your visitors experience instant answers
//           </h2>
//           <p className="mt-3 text-zinc-600 text-base sm:text-lg">
//             Click any common customer question below or type your own to test the real-time citation engine.
//           </p>
//         </div>

//         {/* Demo Stage Container */}
//         <div className="bg-white border border-zinc-200/90 rounded-3xl shadow-2xl shadow-zinc-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-6xl mx-auto">
          
//           {/* Left Panel: Knowledge Documents & Scenario Selector */}
//           <div className="lg:col-span-5 bg-zinc-50/70 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-zinc-200 flex flex-col justify-between">
//             <div>
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-bold text-zinc-900 text-lg flex items-center gap-2">
//                   <BookOpen className="w-5 h-5 text-indigo-600" />
//                   Your Knowledge Source
//                 </h3>
//                 <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Synced
//                 </span>
//               </div>
              
//               <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
//                 The widget draws directly from documents uploaded to this workspace. It never guesses—every answer is backed by your actual manuals.
//               </p>

//               {/* Uploaded Documents List */}
//               <div className="space-y-2.5 mb-8">
//                 <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm flex items-center justify-between text-xs sm:text-sm">
//                   <div className="flex items-center gap-2.5 truncate">
//                     <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
//                     <span className="font-medium text-zinc-800 truncate">Team_Administration_Guide.pdf</span>
//                   </div>
//                   <span className="text-zinc-400 text-xs font-mono">142 KB</span>
//                 </div>

//                 <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm flex items-center justify-between text-xs sm:text-sm">
//                   <div className="flex items-center gap-2.5 truncate">
//                     <FileText className="w-4 h-4 text-indigo-600 flex-shrink-0" />
//                     <span className="font-medium text-zinc-800 truncate">Billing_FAQ_and_Tax_Guide.pdf</span>
//                   </div>
//                   <span className="text-zinc-400 text-xs font-mono">88 KB</span>
//                 </div>

//                 <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm flex items-center justify-between text-xs sm:text-sm">
//                   <div className="flex items-center gap-2.5 truncate">
//                     <Globe className="w-4 h-4 text-indigo-600 flex-shrink-0" />
//                     <span className="font-medium text-zinc-800 truncate">https://help.acme.co/widget-styling</span>
//                   </div>
//                   <span className="text-zinc-400 text-xs font-mono">URL</span>
//                 </div>
//               </div>

//               {/* Suggested Questions to Click */}
//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-2.5">
//                   Try asking a scenario question:
//                 </label>
//                 <div className="space-y-2">
//                   {DEMO_PRESETS.map((preset, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => handleSelectPreset(idx)}
//                       className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 border ${
//                         activePresetIndex === idx
//                           ? "bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm"
//                           : "bg-white border-zinc-200/80 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300"
//                       }`}
//                     >
//                       <span className="truncate">{preset.question}</span>
//                       <ChevronRight className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Quick Status */}
//             <div className="mt-8 pt-4 border-t border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
//               <span>Avg. Response Time: <strong>0.8s</strong></span>
//               <span>Source Grounding: <strong>100%</strong></span>
//             </div>
//           </div>

//           {/* Right Panel: Simulated Live Chat Widget */}
//           <div className="lg:col-span-7 p-4 sm:p-8 bg-white flex flex-col justify-between min-h-[560px]">
            
//             {/* Widget Window Mockup Header */}
//             <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl p-4 shadow-md flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-white backdrop-blur-sm">
//                     <LifeBuoy className="w-5 h-5" />
//                   </div>
//                   <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-indigo-700 rounded-full" />
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-sm sm:text-base leading-tight">Help Center Guide</h4>
//                   <p className="text-xs text-indigo-100 font-medium">DocuPulse Verified Support · Replies instantly</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-lg font-medium hidden sm:inline-block">
//                   Live Preview
//                 </span>
//               </div>
//             </div>

//             {/* Chat Messages Feed */}
//             <div className="flex-1 overflow-y-auto max-h-[380px] space-y-4 px-1 py-2 scrollbar-thin">
//               {chatMessages.map((msg, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
//                 >
//                   <div
//                     className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
//                       msg.role === "user"
//                         ? "bg-indigo-600 text-white rounded-tr-xs shadow-md shadow-indigo-600/10"
//                         : "bg-zinc-100 text-zinc-900 border border-zinc-200/70 rounded-tl-xs shadow-xs"
//                     }`}
//                   >
//                     <p>{msg.text}</p>
                    
//                     {/* Source Citation Chip */}
//                     {msg.source && (
//                       <div className="mt-2.5 pt-2 border-t border-zinc-200 text-[11px] font-medium text-indigo-700 flex items-center gap-1.5 flex-wrap">
//                         <span className="bg-indigo-100/90 text-indigo-800 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
//                           <CheckCheck className="w-3 h-3 text-indigo-600" />
//                           Source
//                         </span>
//                         <span className="text-zinc-600 truncate">{msg.source}</span>
//                         {msg.confidence && (
//                           <span className="text-emerald-600 font-semibold ml-auto">
//                             {msg.confidence} Match
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               ))}

//               {/* Typing Animation */}
//               {isTyping && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 5 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center gap-2 text-zinc-500 text-xs pl-2"
//                 >
//                   <div className="bg-zinc-100 border border-zinc-200 px-3.5 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
//                     <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
//                     <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
//                     <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
//                   </div>
//                   <span className="text-[11px] text-zinc-400">Searching your documents...</span>
//                 </motion.div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             {/* Interactive User Input Form */}
//             <form onSubmit={handleSendCustomMessage} className="mt-4 pt-3 border-t border-zinc-100 flex gap-2">
//               <input
//                 type="text"
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 placeholder="Ask anything about docs, billing, setup..."
//                 className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
//               />
//               <button
//                 type="submit"
//                 disabled={!userInput.trim() || isTyping}
//                 className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white px-5 rounded-xl transition-colors font-medium flex items-center justify-center shadow-md shadow-indigo-600/20"
//                 aria-label="Send message"
//               >
//                 <Send className="w-4 h-4" />
//               </button>
//             </form>

//           </div>

//         </div>

//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           4. HOW IT WORKS (3 Simple Steps)
//       ────────────────────────────────────────────────────────────── */}
//       <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
        
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
//             <Layers className="w-3.5 h-3.5 text-indigo-600" /> Frictionless Setup
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
//             Up and running in three effortless steps
//           </h2>
//           <p className="mt-3 text-zinc-600 text-base sm:text-lg">
//             No complex infrastructure, no machine learning PhD needed. Your documentation is already written—just connect it.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
//           {/* Step 1 */}
//           <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
//             <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-extrabold text-xl mb-6">
//               01
//             </div>
//             <h3 className="text-xl font-bold text-zinc-900 mb-3">Upload Knowledge Files</h3>
//             <p className="text-zinc-600 text-sm sm:text-base leading-relaxed flex-1">
//               Drag and drop your PDF manuals, markdown files, or enter your help center URL. Our parser cleans, indexes, and organizes your data automatically.
//             </p>
//             <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs font-semibold text-indigo-600">
//               <FileText className="w-4 h-4" />
//               <span>Supports PDF, DOCX, TXT & URLs</span>
//             </div>
//           </div>

//           {/* Step 2 */}
//           <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
//             <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 font-extrabold text-xl mb-6">
//               02
//             </div>
//             <h3 className="text-xl font-bold text-zinc-900 mb-3">Style to Your Brand</h3>
//             <p className="text-zinc-600 text-sm sm:text-base leading-relaxed flex-1">
//               Pick your brand accent colors, custom logo, welcome message, and response tone. It feels like an integral part of your product, not a generic third-party popup.
//             </p>
//             <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs font-semibold text-purple-600">
//               <Sliders className="w-4 h-4" />
//               <span>100% Brand Customization</span>
//             </div>
//           </div>

//           {/* Step 3 */}
//           <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
//             <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-extrabold text-xl mb-6">
//               03
//             </div>
//             <h3 className="text-xl font-bold text-zinc-900 mb-3">Paste 1 Line of Code</h3>
//             <p className="text-zinc-600 text-sm sm:text-base leading-relaxed flex-1">
//               Copy our lightweight script tag and paste it into your website, WordPress, Shopify, or React app. Your widget is immediately live and resolving questions.
//             </p>
//             <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
//               <Code2 className="w-4 h-4" />
//               <span>Works on any web platform</span>
//             </div>
//           </div>

//         </div>

//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           5. BENTO FEATURES GRID (Human Focus, Craftsmanship)
//       ────────────────────────────────────────────────────────────── */}
//       <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
        
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
//             <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Enterprise-Grade Craftsmanship
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
//             Built for accuracy, empathy, and peace of mind
//           </h2>
//           <p className="mt-3 text-zinc-600 text-base sm:text-lg">
//             Everything your support team needs to reduce ticket volume without ever sacrificing customer trust.
//           </p>
//         </div>

//         {/* Bento Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
//           {/* Bento 1: Exact Citations (Spans 2 columns on desktop) */}
//           <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
//             <div>
//               <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
//                 <Search className="w-6 h-6" />
//               </div>
//               <h3 className="text-2xl font-bold text-zinc-900 mb-3">100% Verifiable Source Citations</h3>
//               <p className="text-zinc-600 text-base leading-relaxed max-w-xl">
//                 Every response names the exact document, section, and page it referenced. If your documentation changes, re-indexing takes one click and all future answers update instantly.
//               </p>
//             </div>

//             <div className="mt-8 p-4 bg-zinc-50 rounded-2xl border border-zinc-200/80 flex items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
//                 <span className="text-sm font-medium text-zinc-800">
//                   Zero hallucinations · Strictly grounded in your manuals
//                 </span>
//               </div>
//               <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
//                 Verified Engine
//               </span>
//             </div>
//           </div>

//           {/* Bento 2: Seamless Human Escalation */}
//           <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
//             <div>
//               <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
//                 <UserCheck className="w-6 h-6" />
//               </div>
//               <h3 className="text-xl font-bold text-zinc-900 mb-3">Graceful Human Handoff</h3>
//               <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
//                 When an issue needs human care, the widget smoothly captures the customer email and forwards the full conversation history to your support inbox.
//               </p>
//             </div>
//             <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700">
//               <Inbox className="w-4 h-4" />
//               <span>Direct Zendesk, Intercom & Email routing</span>
//             </div>
//           </div>

//           {/* Bento 3: Fast & Zero Layout Shift */}
//           <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
//             <div>
//               <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
//                 <Zap className="w-6 h-6" />
//               </div>
//               <h3 className="text-xl font-bold text-zinc-900 mb-3">Ultra-Fast Async Loader</h3>
//               <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
//                 Under 15KB footprint. Non-blocking asynchronous script guarantees 100/100 Lighthouse performance and zero layout shifts.
//               </p>
//             </div>
//             <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-amber-700">
//               <Clock className="w-4 h-4" />
//               <span>Loads in &lt; 50ms worldwide</span>
//             </div>
//           </div>

//           {/* Bento 4: Document Gap Analytics */}
//           <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
//             <div>
//               <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
//                 <BarChart3 className="w-6 h-6" />
//               </div>
//               <h3 className="text-xl font-bold text-zinc-900 mb-3">Documentation Gap Insights</h3>
//               <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
//                 Discover what your customers are asking that isn’t yet in your guides. Expand your help center based on real user confusion patterns.
//               </p>
//             </div>
//             <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-purple-700">
//               <TrendingUp className="w-4 h-4" />
//               <span>Real-time inquiry analytics</span>
//             </div>
//           </div>

//           {/* Bento 5: Strict Privacy & Isolation */}
//           <div className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
//             <div>
//               <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
//                 <Lock className="w-6 h-6" />
//               </div>
//               <h3 className="text-xl font-bold text-zinc-900 mb-3">Private & SOC2 Grounded</h3>
//               <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
//                 Your proprietary PDFs and customer data remain strictly quarantined in your workspace vector database. We never train public foundation models on your data.
//               </p>
//             </div>
//             <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-700">
//               <ShieldCheck className="w-4 h-4" />
//               <span>End-to-end AES-256 encryption</span>
//             </div>
//           </div>

//         </div>

//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           6. INTERACTIVE ROI CALCULATOR (Real Value for Human Teams)
//       ────────────────────────────────────────────────────────────── */}
//       <section id="calculator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
//         <div className="bg-gradient-to-br from-[#111116] to-[#1E1E28] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          
//           {/* Ambient light */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
//             {/* Left Explanation & Slider */}
//             <div className="lg:col-span-7 space-y-6">
//               <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
//                 <BarChart3 className="w-3.5 h-3.5" /> Support Impact Calculator
//               </div>

//               <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
//                 Calculate how many hours your team will save
//               </h2>

//               <p className="text-zinc-300 text-base leading-relaxed">
//                 Support agents spend over 60% of their day repeatedly explaining common onboarding and billing procedures. Automate the routine questions so your team can tackle high-value complex conversations.
//               </p>

//               {/* Slider Control */}
//               <div className="pt-4 space-y-4">
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-zinc-300">Estimated Monthly Inquiries:</span>
//                   <span className="text-2xl font-extrabold text-indigo-400 font-mono">
//                     {inquiryVolume.toLocaleString()} chats
//                   </span>
//                 </div>

//                 <input
//                   type="range"
//                   min="500"
//                   max="20000"
//                   step="500"
//                   value={inquiryVolume}
//                   onChange={(e) => setInquiryVolume(Number(e.target.value))}
//                   className="w-full h-2.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
//                 />

//                 <div className="flex justify-between text-xs text-zinc-400 font-mono">
//                   <span>500</span>
//                   <span>5,000</span>
//                   <span>10,000</span>
//                   <span>20,000+</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Projected Numbers Card */}
//             <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm flex flex-col gap-6">
              
//               <div className="border-b border-white/10 pb-4">
//                 <p className="text-xs uppercase font-bold tracking-wider text-zinc-400">Monthly Support Hours Saved</p>
//                 <div className="text-4xl sm:text-5xl font-black text-white mt-1 flex items-baseline gap-2">
//                   <span>{hoursSavedPerMonth}</span>
//                   <span className="text-lg font-medium text-indigo-400">hrs/month</span>
//                 </div>
//                 <p className="text-xs text-zinc-400 mt-1">Based on ~4.5 mins saved per standard support ticket</p>
//               </div>

//               <div>
//                 <p className="text-xs uppercase font-bold tracking-wider text-zinc-400">Projected Annual Savings</p>
//                 <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1 font-mono">
//                   ${costSavedPerYear}
//                 </div>
//                 <p className="text-xs text-zinc-400 mt-1">Equivalent to standard support desk hourly labor value</p>
//               </div>

//               <Link
//                 href="/dashboard"
//                 className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-center text-sm transition-all shadow-lg shadow-indigo-600/30"
//               >
//                 Start Saving Support Hours Today →
//               </Link>

//             </div>

//           </div>

//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           7. CODE SNIPPET INTEGRATION VIEWER
//       ────────────────────────────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="bg-white border border-zinc-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
//           {/* Left Description */}
//           <div className="lg:col-span-5 space-y-4">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
//               <Code2 className="w-3.5 h-3.5" /> 60-Second Embed
//             </div>
//             <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
//               One simple snippet. Works everywhere.
//             </h2>
//             <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
//               No npm packages or build pipelines required if you just want quick installation. Drop it into your Webflow, Shopify, WordPress, or custom React code and you’re immediately live.
//             </p>

//             <ul className="space-y-2.5 pt-2 text-sm text-zinc-700 font-medium">
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                 <span>Isolated Shadow DOM — never conflicts with your styles</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                 <span>Automatic dark / light mode synchronization</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//                 <span>Zero page speed degradation</span>
//               </li>
//             </ul>
//           </div>

//           {/* Right Code Viewer */}
//           <div className="lg:col-span-7 bg-[#0F0F14] rounded-2xl p-4 sm:p-6 shadow-xl border border-zinc-800 text-zinc-100">
//             {/* Tab Selector & Copy Button */}
//             <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4 flex-wrap gap-2">
//               <div className="flex gap-1.5">
//                 {(["html", "react", "wordpress", "shopify"] as const).map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveCodeTab(tab)}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
//                       activeCodeTab === tab
//                         ? "bg-indigo-600 text-white shadow-sm"
//                         : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
//                     }`}
//                   >
//                     {tab.toUpperCase()}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={handleCopyCode}
//                 className="flex items-center gap-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded-lg transition-colors"
//               >
//                 {copiedCode ? (
//                   <>
//                     <Check className="w-3.5 h-3.5 text-emerald-400" />
//                     <span className="text-emerald-400 font-semibold">Copied!</span>
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="w-3.5 h-3.5 text-zinc-400" />
//                     <span>Copy Code</span>
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Code Body */}
//             <pre className="font-mono text-xs sm:text-sm text-indigo-300 overflow-x-auto p-2 leading-relaxed max-h-72 scrollbar-thin">
//               <code>{CODE_SNIPPETS[activeCodeTab]}</code>
//             </pre>
//           </div>

//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           8. TESTIMONIALS & HUMAN REVIEWS
//       ────────────────────────────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
//             <Heart className="w-3.5 h-3.5 text-indigo-600" /> Loved by Support Teams
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
//             Real stories from teams delivering better support
//           </h2>
//           <p className="mt-3 text-zinc-600 text-base sm:text-lg">
//             Hear from customer support heads, developers, and founders who transformed their user experience.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {TESTIMONIALS.map((t, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-3xl p-8 border border-zinc-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
//             >
//               <div>
//                 {/* Metric Badge */}
//                 <span className="inline-block bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full mb-6">
//                   {t.metric}
//                 </span>

//                 {/* Stars */}
//                 <div className="flex gap-1 mb-4 text-amber-400">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 fill-amber-400" />
//                   ))}
//                 </div>

//                 <p className="text-zinc-700 text-sm sm:text-base leading-relaxed italic mb-6">
//                   &ldquo;{t.quote}&rdquo;
//                 </p>
//               </div>

//               {/* Author Info */}
//               <div className="pt-4 border-t border-zinc-100 flex items-center gap-3">
//                 <img
//                   src={t.avatar}
//                   alt={t.name}
//                   className="w-11 h-11 rounded-full object-cover border border-zinc-200"
//                 />
//                 <div>
//                   <h4 className="font-bold text-sm text-zinc-900">{t.name}</h4>
//                   <p className="text-xs text-zinc-500">{t.role}, {t.company}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           9. TRANSPARENT PRICING SECTION
//       ────────────────────────────────────────────────────────────── */}
//       <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
        
//         <div className="text-center max-w-3xl mx-auto mb-12">
//           <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
//             <Zap className="w-3.5 h-3.5 text-indigo-600" /> Transparent Pricing
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
//             Simple plans for businesses of every scale
//           </h2>
//           <p className="mt-3 text-zinc-600 text-base sm:text-lg">
//             Start completely free. Upgrade only when your customer inquiry volume grows.
//           </p>

//           {/* Billing Cycle Toggle */}
//           <div className="mt-8 inline-flex items-center p-1 bg-zinc-200/80 rounded-2xl">
//             <button
//               onClick={() => setBillingCycle("monthly")}
//               className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
//                 billingCycle === "monthly"
//                   ? "bg-white text-zinc-900 shadow-sm"
//                   : "text-zinc-600 hover:text-zinc-900"
//               }`}
//             >
//               Monthly Billing
//             </button>
//             <button
//               onClick={() => setBillingCycle("annual")}
//               className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
//                 billingCycle === "annual"
//                   ? "bg-white text-zinc-900 shadow-sm"
//                   : "text-zinc-600 hover:text-zinc-900"
//               }`}
//             >
//               <span>Annual Billing</span>
//               <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
//                 Save 20%
//               </span>
//             </button>
//           </div>
//         </div>

//         {/* Pricing Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          
//           {/* Free Starter Tier */}
//           <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
//             <div>
//               <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Starter</div>
//               <h3 className="text-xl font-bold text-zinc-900">For early projects</h3>
//               <p className="text-sm text-zinc-500 mt-1">Test the widget on your personal or staging site.</p>

//               <div className="my-6">
//                 <span className="text-4xl sm:text-5xl font-black text-zinc-950">$0</span>
//                 <span className="text-zinc-500 font-medium text-sm ml-1.5">/ forever</span>
//               </div>

//               <ul className="space-y-3 text-sm text-zinc-700 mb-8">
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>1 Knowledge Workspace</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>100 answered queries / month</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>Up to 3 PDF or URL uploads</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>Standard chat widget</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>Community support</span>
//                 </li>
//               </ul>
//             </div>

//             <Link
//               href="/dashboard"
//               className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-sm rounded-xl text-center transition"
//             >
//               Get Started Free
//             </Link>
//           </div>

//           {/* Pro / Growth Tier (Highlighted) */}
//           <div className="bg-[#111116] text-white border-2 border-indigo-500 rounded-3xl p-8 shadow-2xl shadow-indigo-600/20 flex flex-col justify-between relative transform md:-translate-y-2">
//             <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
//               Most Popular Choice
//             </div>

//             <div>
//               <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Professional</div>
//               <h3 className="text-xl font-bold text-white">For growing companies</h3>
//               <p className="text-sm text-zinc-400 mt-1">Full support deflection for SaaS and e-commerce.</p>

//               <div className="my-6">
//                 <span className="text-4xl sm:text-5xl font-black text-white">
//                   {billingCycle === "annual" ? "$23" : "$29"}
//                 </span>
//                 <span className="text-zinc-400 font-medium text-sm ml-1.5">/ month</span>
//                 {billingCycle === "annual" && (
//                   <p className="text-xs text-indigo-300 mt-1">Billed annually ($276/yr)</p>
//                 )}
//               </div>

//               <ul className="space-y-3 text-sm text-zinc-200 mb-8">
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
//                   <span><strong>10 Workspaces</strong> (Separate products)</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
//                   <span><strong>5,000 answered queries</strong> / month</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
//                   <span>Unlimited Document & URL Uploads</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
//                   <span>Remove DocuPulse Branding</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
//                   <span>Human Email & Zendesk Handoff</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />
//                   <span>Priority indexing & Email Support</span>
//                 </li>
//               </ul>
//             </div>

//             <Link
//               href="/dashboard"
//               className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl text-center transition shadow-lg shadow-indigo-600/40"
//             >
//               Start 14-Day Free Trial
//             </Link>
//           </div>

//           {/* Scale / Enterprise Tier */}
//           <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
//             <div>
//               <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Scale / Business</div>
//               <h3 className="text-xl font-bold text-zinc-900">For high traffic volume</h3>
//               <p className="text-sm text-zinc-500 mt-1">Dedicated SLA, high volume limits, and custom webhooks.</p>

//               <div className="my-6">
//                 <span className="text-4xl sm:text-5xl font-black text-zinc-950">
//                   {billingCycle === "annual" ? "$63" : "$79"}
//                 </span>
//                 <span className="text-zinc-500 font-medium text-sm ml-1.5">/ month</span>
//               </div>

//               <ul className="space-y-3 text-sm text-zinc-700 mb-8">
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>Unlimited Workspaces</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span><strong>25,000 inquiries</strong> / month</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>Custom Webhooks & REST API</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>Multi-seat Team Permissions</span>
//                 </li>
//                 <li className="flex items-center gap-2.5">
//                   <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
//                   <span>Dedicated Account Manager & 99.9% SLA</span>
//                 </li>
//               </ul>
//             </div>

//             <Link
//               href="/dashboard"
//               className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-sm rounded-xl text-center transition"
//             >
//               Get Started with Scale
//             </Link>
//           </div>

//         </div>

//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           10. FREQUENTLY ASKED QUESTIONS (Accordion)
//       ────────────────────────────────────────────────────────────── */}
//       <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-16">
        
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-3">
//             <HelpCircle className="w-3.5 h-3.5 text-indigo-600" /> Got Questions?
//           </div>
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
//             Frequently Asked Questions
//           </h2>
//           <p className="mt-3 text-zinc-600 text-base">
//             Everything you need to know about setting up and running your knowledge widget.
//           </p>
//         </div>

//         <div className="space-y-4">
//           {FAQ_ITEMS.map((item, index) => {
//             const isOpen = openFaq === index;
//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-2xl border border-zinc-200 overflow-hidden transition-all shadow-xs"
//               >
//                 <button
//                   onClick={() => setOpenFaq(isOpen ? null : index)}
//                   className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-zinc-900 hover:text-indigo-600 transition-colors"
//                 >
//                   <span>{item.q}</span>
//                   <ChevronDown
//                     className={`w-5 h-5 text-zinc-400 transition-transform duration-200 flex-shrink-0 ${
//                       isOpen ? "rotate-180 text-indigo-600" : ""
//                     }`}
//                   />
//                 </button>

//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="px-5 sm:px-6 pb-6 text-zinc-600 text-sm sm:text-base leading-relaxed border-t border-zinc-100 pt-3"
//                     >
//                       {item.a}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             );
//           })}
//         </div>

//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           11. FINAL HIGH-CONVERSION CTA BANNER
//       ────────────────────────────────────────────────────────────── */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
          
//           {/* Subtle decorative circles */}
//           <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
//           <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

//           <div className="relative z-10 max-w-2xl mx-auto space-y-6">
//             <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
//               Ready to give your support team their time back?
//             </h2>
//             <p className="text-indigo-100 text-base sm:text-lg leading-relaxed font-normal">
//               Join over 1,200+ companies delivering instant, accurate, human-grade support from their existing documentation.
//             </p>

//             <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link
//                 href="/dashboard"
//                 className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-zinc-100 text-indigo-900 font-bold text-base rounded-2xl shadow-xl transition-all active:scale-95"
//               >
//                 Create Your Free Widget →
//               </Link>
//               <a
//                 href="#interactive-demo"
//                 className="w-full sm:w-auto px-7 py-4 bg-indigo-800/60 hover:bg-indigo-800 text-white font-semibold text-base rounded-2xl border border-white/20 transition-all"
//               >
//                 Test Live Simulator
//               </a>
//             </div>

//             <p className="text-xs text-indigo-200/80 pt-2">
//               Free plan available · No credit card required · Live in 2 minutes
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────────────
//           12. COMPREHENSIVE FOOTER
//       ────────────────────────────────────────────────────────────── */}
//       <footer className="bg-[#111116] text-white pt-16 pb-12 border-t border-zinc-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
            
//             {/* Brand Column */}
//             <div className="md:col-span-2 space-y-4">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
//                   <BookOpen className="w-5 h-5" />
//                 </div>
//                 <span className="font-extrabold text-xl tracking-tight text-white">DocuPulse</span>
//               </div>
//               <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
//                 Empowering customer service teams and product companies with verified, source-backed knowledge widgets that deliver warmth, clarity, and immediate help.
//               </p>
//               <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//                 <span>All systems operational · 99.99% Uptime</span>
//               </div>
//             </div>

//             {/* Links Column 1: Product */}
//             <div>
//               <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">Product</h4>
//               <ul className="space-y-2.5 text-sm text-zinc-400">
//                 <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
//                 <li><a href="#interactive-demo" className="hover:text-white transition-colors">Live Demo Widget</a></li>
//                 <li><a href="#features" className="hover:text-white transition-colors">Features & Accuracy</a></li>
//                 <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
//                 <li><Link href="/dashboard" className="hover:text-white transition-colors">Workspace Dashboard</Link></li>
//               </ul>
//             </div>

//             {/* Links Column 2: Integrations */}
//             <div>
//               <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">Integrations</h4>
//               <ul className="space-y-2.5 text-sm text-zinc-400">
//                 <li><span className="text-zinc-400">WordPress Plugin</span></li>
//                 <li><span className="text-zinc-400">Shopify App</span></li>
//                 <li><span className="text-zinc-400">React & Next.js</span></li>
//                 <li><span className="text-zinc-400">Webflow & Framer</span></li>
//                 <li><span className="text-zinc-400">Zendesk / Intercom Handoff</span></li>
//               </ul>
//             </div>

//             {/* Links Column 3: Trust & Legal */}
//             <div>
//               <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">Trust & Security</h4>
//               <ul className="space-y-2.5 text-sm text-zinc-400">
//                 <li><a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a></li>
//                 <li><a href="#faq" className="hover:text-white transition-colors">Terms of Service</a></li>
//                 <li><a href="#faq" className="hover:text-white transition-colors">SOC2 Compliance</a></li>
//                 <li><a href="#faq" className="hover:text-white transition-colors">Data Isolation Policy</a></li>
//                 <li><a href="#faq" className="hover:text-white transition-colors">Support Contact</a></li>
//               </ul>
//             </div>

//           </div>

//           {/* Bottom Bar */}
//           <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
//             <p>© {new Date().getFullYear()} DocuPulse Technologies, Inc. Built with care for human teams.</p>
//             <div className="flex items-center gap-6">
//               <span className="hover:text-zinc-400 cursor-pointer">Security Overview</span>
//               <span className="hover:text-zinc-400 cursor-pointer">Status Page</span>
//               <span className="hover:text-zinc-400 cursor-pointer">Documentation</span>
//             </div>
//           </div>

//         </div>
//       </footer>

//     </div>
//   );
// }