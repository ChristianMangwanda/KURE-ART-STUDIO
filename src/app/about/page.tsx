'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const stats = [
    { number: '50+', label: 'Verified Artists' },
    { number: '200+', label: 'Authentic Artworks' },
    { number: '15+', label: 'Countries Reached' },
    { number: '98%', label: 'Artist Satisfaction' }
  ]

  const impactPoints = [
    {
      title: 'Direct Artist Support',
      description: 'Artists receive 70% of each sale, ensuring fair compensation and sustainable livelihoods.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'Cultural Preservation',
      description: 'Every purchase helps preserve traditional techniques and stories for future generations.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: 'Global Connection',
      description: 'Bridging diaspora communities with their homeland through authentic artistic expression.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous verification ensures every piece meets our standards for authenticity and craftsmanship.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ]

  const verificationSteps = [
    {
      step: '01',
      title: 'Artist Application',
      description: 'Artists submit their portfolio, background, and verification documents through our comprehensive application process.'
    },
    {
      step: '02',
      title: 'Portfolio Review',
      description: 'Our expert panel evaluates technical skill, cultural authenticity, and artistic merit of submitted works.'
    },
    {
      step: '03',
      title: 'Background Verification',
      description: 'We verify the artist\'s identity, location, and artistic credentials through independent sources and references.'
    },
    {
      step: '04',
      title: 'Cultural Assessment',
      description: 'Cultural experts evaluate the authenticity and significance of the artist\'s work within Zimbabwean traditions.'
    },
    {
      step: '05',
      title: 'Final Approval',
      description: 'Approved artists receive verification badges and ongoing support to showcase their work on our platform.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Breadcrumb */}
            <motion.div 
              className="flex items-center space-x-4 text-sm text-gray-600 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="uppercase tracking-wider">About Us</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.9] text-black tracking-tight mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              Preserving
              <br />
              <span className="font-serif italic text-amber-700">Heritage</span>
              <br />
              Through Art
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 max-w-3xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              We connect authentic Zimbabwean artistry with the global diaspora, 
              creating bridges between heritage and modernity, artists and collectors.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-light text-black">{stat.number}</div>
                <div className="text-gray-600 text-sm uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-[1px] bg-gray-400"></div>
                  <span className="uppercase tracking-wider">Our Mission</span>
                  <div className="w-8 h-[1px] bg-gray-400"></div>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">
                  Empowering Artists, Preserving Culture
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Our mission is to create a sustainable ecosystem where Zimbabwean artists can thrive 
                  while sharing their cultural heritage with the world. We believe that art is more than 
                  decoration—it's a living bridge between past and present, between homeland and diaspora.
                </p>
                <p>
                  Through our platform, we provide verified artists with fair compensation, global exposure, 
                  and the resources they need to continue their craft. Every purchase supports not just an 
                  individual artist, but the preservation of techniques, stories, and traditions that have 
                  been passed down through generations.
                </p>
                <p>
                  We envision a world where authentic African art is celebrated, accessible, and properly 
                  valued—where collectors can connect directly with the stories and hands that create 
                  each piece, fostering genuine cultural exchange and understanding.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

              {/* Meaning of Kura Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center space-x-4 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-8 h-[1px] bg-gray-400"></div>
                                      <span className="uppercase tracking-wider">Meaning of Kura</span>
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-light text-black leading-tight mb-8">
                  What Does <em className="font-serif italic text-amber-700">Kura</em> Mean?
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  In the Shona language, "Kura" means <strong>growth</strong>—a concept that perfectly
                  embodies our mission. We are more than just an art gallery; we are a nurturing space 
                  where artistic talent can grow and reach its full potential. Kura represents:
                </p>
                <ul className="space-y-3 pl-6">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-700 rounded-full mt-3 flex-shrink-0"></div>
                    <span><strong>Personal Growth:</strong> Supporting artists in developing their skills and reaching new audiences</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-700 rounded-full mt-3 flex-shrink-0"></div>
                    <span><strong>Cultural Growth:</strong> Helping traditions evolve while maintaining their essence</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-700 rounded-full mt-3 flex-shrink-0"></div>
                    <span><strong>Community Growth:</strong> Building connections between diaspora and homeland</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-700 rounded-full mt-3 flex-shrink-0"></div>
                    <span><strong>Economic Growth:</strong> Creating sustainable livelihoods for creative communities</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/download-_5_.jpg"
                  alt="Zimbabwean Cultural Art"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Model Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.div 
                className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-[1px] bg-gray-400"></div>
                <span className="uppercase tracking-wider">Impact Model</span>
                <div className="w-8 h-[1px] bg-gray-400"></div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">
                Creating Meaningful Change
              </h2>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Our impact model ensures that every transaction creates ripple effects of positive change 
                across communities, cultures, and individual lives.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {impactPoints.map((point, index) => (
              <motion.div
                key={point.title}
                className="bg-white p-8 space-y-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-amber-700">
                  {point.icon}
                </div>
                <h3 className="text-xl font-medium text-black">
                  {point.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Verification Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <motion.div 
                className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-8 h-[1px] bg-gray-400"></div>
                <span className="uppercase tracking-wider">Artist Verification</span>
                <div className="w-8 h-[1px] bg-gray-400"></div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-light text-black leading-tight">
                Ensuring Authenticity & Quality
              </h2>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Our rigorous verification process guarantees that every artist and artwork meets 
                our standards for authenticity, quality, and cultural significance.
              </p>
            </div>
          </motion.div>

          <div className="space-y-8">
            {verificationSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 pb-8 border-b border-gray-200 last:border-b-0"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-amber-700 text-white flex items-center justify-center text-xl font-light">
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-grow space-y-2">
                  <h3 className="text-xl font-medium text-black">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16 pt-16 border-t border-gray-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-black">
                Interested in Becoming a Verified Artist?
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto">
                Join our community of verified Zimbabwean artists and share your work with collectors around the world.
              </p>
              <button className="group inline-flex items-center bg-black text-white px-8 py-4 hover:bg-gray-900 transition-all duration-300 text-lg font-medium">
                Apply for Verification
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Join Our Growing Community
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Whether you're an art collector, cultural enthusiast, or member of the diaspora, 
              discover your next meaningful connection through authentic Zimbabwean art.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/gallery"
                className="group inline-flex items-center bg-amber-700 text-white px-8 py-4 hover:bg-amber-600 transition-all duration-500 text-lg font-medium"
              >
                Explore Gallery
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <button className="group inline-flex items-center border border-gray-600 text-white px-8 py-4 hover:border-white transition-all duration-300 text-lg font-medium">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 