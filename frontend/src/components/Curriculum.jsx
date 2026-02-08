export default function Curriculum() {
  const modules = [
    {
      number: "01",
      title: "Cybersecurity Fundamentals",
      duration: "4 weeks",
      topics: [
        "Introduction to Information Security",
        "CIA Triad: Confidentiality, Integrity, Availability",
        "Common Cyber Threats and Attack Vectors",
        "Security Principles and Best Practices",
        "Risk Management Fundamentals"
      ],
      color: "from-blue-500 to-indigo-600"
    },
    {
      number: "02",
      title: "Network Security & Defense",
      duration: "4 weeks",
      topics: [
        "TCP/IP Protocol Suite and Network Architecture",
        "Firewalls, IDS/IPS Configuration",
        "VPN Technologies and Secure Remote Access",
        "Network Monitoring and Traffic Analysis",
        "Wireless Security (WPA3, 802.1X)"
      ],
      color: "from-emerald-500 to-teal-600"
    },
    {
      number: "03",
      title: "Ethical Hacking & Penetration Testing",
      duration: "5 weeks",
      topics: [
        "Reconnaissance and Information Gathering",
        "Vulnerability Scanning and Assessment",
        "Exploitation Techniques and Tools (Metasploit)",
        "Web Application Penetration Testing (OWASP Top 10)",
        "Social Engineering and Phishing Attacks"
      ],
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "04",
      title: "Cryptography & Secure Communications",
      duration: "3 weeks",
      topics: [
        "Symmetric and Asymmetric Encryption",
        "Hash Functions and Digital Signatures",
        "Public Key Infrastructure (PKI)",
        "SSL/TLS and HTTPS Implementation",
        "Cryptographic Protocols and Standards"
      ],
      color: "from-orange-500 to-red-600"
    },
    {
      number: "05",
      title: "Incident Response & Digital Forensics",
      duration: "4 weeks",
      topics: [
        "Incident Response Lifecycle (NIST Framework)",
        "Malware Analysis and Reverse Engineering",
        "Digital Evidence Collection and Preservation",
        "Memory and Disk Forensics",
        "Threat Intelligence and IOC Analysis"
      ],
      color: "from-cyan-500 to-blue-600"
    },
    {
      number: "06",
      title: "Cloud Security & DevSecOps",
      duration: "3 weeks",
      topics: [
        "Cloud Security Architecture (AWS, Azure, GCP)",
        "Container Security (Docker, Kubernetes)",
        "CI/CD Pipeline Security",
        "Infrastructure as Code Security",
        "Cloud Compliance and Governance"
      ],
      color: "from-teal-500 to-emerald-600"
    },
    {
      number: "07",
      title: "Security Governance & Compliance",
      duration: "3 weeks",
      topics: [
        "Security Frameworks (ISO 27001, NIST CSF)",
        "Compliance Requirements (GDPR, NDPR, PCI DSS)",
        "Security Policy Development",
        "Security Awareness Training Programs",
        "Third-Party Risk Management"
      ],
      color: "from-indigo-500 to-purple-600"
    },
    {
      number: "08",
      title: "Capstone Project",
      duration: "2 weeks",
      topics: [
        "Real-world Security Assessment",
        "Comprehensive Penetration Test",
        "Security Architecture Design",
        "Incident Response Simulation",
        "Final Project Presentation"
      ],
      color: "from-rose-500 to-pink-600"
    }
  ];

  return (
    <section id="curriculum" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            Comprehensive Curriculum
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A structured 6-month journey covering everything from fundamentals to advanced cybersecurity 
            practices. Each module includes hands-on labs and real-world scenarios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${module.color} p-6 text-white`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-6xl font-black opacity-20">{module.number}</div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {module.duration}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{module.title}</h3>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3">
                  {module.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Learning outcomes */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-8 text-center">What You'll Achieve</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2">Security Expertise</h4>
              <p className="text-slate-400 text-sm">Master core security concepts and techniques</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="font-bold mb-2">Practical Skills</h4>
              <p className="text-slate-400 text-sm">Hands-on experience with industry tools</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2">Certification</h4>
              <p className="text-slate-400 text-sm">Industry-recognized certificate</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2">Career Ready</h4>
              <p className="text-slate-400 text-sm">Job-ready skills for the market</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
