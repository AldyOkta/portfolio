export const portfolioData = {
  personal: {
    name: "Aldy Oktaviano",
    role: "Quality Assurance Tester & Frontend/Mobile Developer",
    status: "Open for Opportunities",
    summary: "Lulusan S1 Teknik Informatika (IPK 3,63/4,00) dengan pengalaman sebagai Quality Assurance Tester (program magang) pada aplikasi desktop enterprise serta pengembangan aplikasi mobile menggunakan React Native dan Expo. Terbiasa mengelola siklus pengujian end-to-end, mulai dari analisis kebutuhan, penyusunan test case, pelaporan dan retest defect, hingga pendampingan UAT. Memiliki latar belakang pengembangan aplikasi (UI, koneksi database, optimisasi performa) yang memperkuat pemahaman terhadap SDLC dan standar kualitas kode. Memiliki pengalaman membangun antarmuka chatbot AI yang terintegrasi dengan workflow n8n. Teliti, adaptif, dan siap berkontribusi dalam tim pengembangan software.",
    location: "Surakarta, Jawa Tengah, Indonesia",
    email: "oktavianoaldy777@gmail.com",
    whatsapp: "+6289601579321",
    whatsappDisplay: "+62 896-0157-9321",
    linkedin: "https://www.linkedin.com/in/aldy-oktaviano-548174280",
    github: "https://github.com/AldyOkta",
    cvPath: "/CV_Aldy_Oktaviano.pdf",
    domain: "aldyokta.my.id"
  },

  stats: [
    { label: "Pengalaman Kerja & Magang", value: "2+ Tahun" },
    { label: "Proyek Selesai", value: "6+ Proyek" },
    { label: "IPK Kelulusan S1", value: "3.63 / 4.00" },
    { label: "Sertifikasi Kompetensi", value: "4 Sertifikat" }
  ],

  projects: [
    {
      id: "movie-discovery",
      title: "Movie Search & Discovery Web App",
      category: "Frontend Web",
      badge: "Team Project (MSIB Hacktiv8)",
      description: "Aplikasi Single Page Application (SPA) eksplorasi film interaktif menggunakan React.js, Tailwind CSS, Axios, dan OMDb API. Menghadirkan fitur pencarian real-time, filtering kategori film/serial, pagination, dan responsivitas penuh.",
      tags: ["React.js", "Tailwind CSS", "Axios", "OMDb API", "Netlify"],
      liveUrl: "https://chic-sawine-f22630.netlify.app",
      featured: true,
      role: "Frontend Developer (Kolaborasi Tim & Integrasi API)"
    },
    {
      id: "aksara-assistant",
      title: "Aksara Assistant - AI Sales Data Agent",
      category: "Fullstack & AI Integration",
      badge: "PT Tiga Serangkai Internal Project",
      description: "Asisten cerdas berbasis web chat UI interaktif terintegrasi Socket.io dan n8n AI Agent. Membantu tim sales merekapitulasi, memvalidasi, dan mengkueri data kunjungan lapangan secara otomatis.",
      tags: ["React.js", "Socket.io", "n8n AI Agent", "Tailwind CSS", "REST API"],
      featured: true,
      role: "QA Tester & Frontend Support"
    },
    {
      id: "hotel-booking",
      title: "Hotel Booking Mobile Application",
      category: "Mobile App",
      badge: "Team Project (Hacktiv8 Batch 5)",
      description: "Aplikasi pemesanan hotel berbasis React Native cross-platform dengan antarmuka dinamis, sistem bookmark favorit, pencarian akomodasi cepat, serta detail informasi fasilitas hotel.",
      tags: ["React Native", "Expo", "JavaScript", "Context API"],
      featured: true,
      role: "Mobile Developer (Home, Search & Profile Module)"
    },
    {
      id: "hydroponic-iot",
      title: "Hydroponic Smart Automation System",
      category: "IoT & Automation",
      badge: "Project-Based Learning BPVP",
      description: "Sistem otomatisasi nutrisi dan pemantauan kondisi tanaman hidroponik berbasis mikrokontroler dengan sertifikasi BNSP resmi. Mengontrol kadar pH, TDS, dan siklus pompa secara otomatis.",
      tags: ["Microcontroller", "IoT Sensors", "Automation", "Embedded C++"],
      featured: false,
      role: "IoT System Developer & QA Verifier"
    },
    {
      id: "asset-management",
      title: "Asset Management Mobile System",
      category: "Mobile App",
      badge: "PT Tiga Serangkai Pustaka Mandiri",
      description: "Aplikasi pelacakan dan pencatatan aset inventaris perusahaan internal dengan optimasi performa loading data dan sinkronisasi database lokal/remote.",
      tags: ["React Native", "Expo", "SQLite", "REST API"],
      featured: false,
      role: "Mobile Developer Intern"
    }
  ],

  skills: {
    qa: [
      { name: "Manual & Exploratory Testing", level: "Expert" },
      { name: "Automation (Playwright & Selenium)", level: "Advanced" },
      { name: "API Testing (Postman)", level: "Basic" },
      { name: "Test Case & Bug Reporting", level: "Expert" },
      { name: "UAT (User Acceptance Testing)", level: "Advanced" },
      { name: "OpenProject & Issue Tracking", level: "Advanced" }
    ],
    frontend: [
      { name: "React.js & Vite", level: "Expert" },
      { name: "React Native (Expo)", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "JavaScript (ES6+)", level: "Expert" },
      { name: "HTML5 & CSS3 Semantic", level: "Expert" },
      { name: "Axios & REST Integration", level: "Advanced" }
    ],
    tools: [
      { name: "Git & GitHub CI/CD" },
      { name: "Figma (UI/UX Spec)" },
      { name: "Postman" },
      { name: "VS Code / Antigravity" },
      { name: "n8n Automation" },
      { name: "SQL" },
      { name: "Mcp tools" },
    ]
  },

  experiences: [
    {
      role: "Quality Assurance Tester",
      company: "PT Tiga Serangkai Inti Corpora",
      period: "Desember 2025 - Sekarang",
      type: "Full-time",
      responsibilities: [
        "Melakukan functional testing, regression testing, dan UAT support untuk sistem enterprise internal.",
        "Menulis dokumentasi test plan, skenario pengujian, dan logging bug terstruktur di OpenProject.",
      ]
    },
    {
      role: "Project-Based Learning - Smart Automation",
      company: "BPVP Surakarta",
      period: "Oktober 2025",
      type: "Pelatihan & Sertifikasi",
      responsibilities: [
        "Mengembangkan dan menguji sistem otomatisasi kendali nutrisi hidroponik berbasis sensor.",
        "Meraih predikat kompeten bersertifikasi resmi Badan Nasional Sertifikasi Profesi (BNSP)."
      ]
    },
    {
      role: "Mobile Developer (Intern)",
      company: "PT Tiga Serangkai Pustaka Mandiri",
      period: "Februari 2024 - Juli 2024",
      type: "Magang",
      responsibilities: [
        "Mengembangkan modul antarmuka mobile internal menggunakan React Native & Expo.",
        "Mengoptimasi query data dan memastikan responsivitas UI pada ragam ukuran layar Android."
      ]
    },
    {
      role: "Front End Web Developer Trainee",
      company: "Hacktiv8 Academy (MSIB Kampus Merdeka)",
      period: "Agustus 2023 - Januari 2024",
      type: "Studi Independen Bersertifikat",
      responsibilities: [
        "Menyelesaikan kurikulum intensif React.js, Tailwind CSS, state management, dan modern JavaScript.",
        "Berkolaborasi dalam tim mengembangkan Web App Movie Search & Discovery (live di Netlify)."
      ]
    }
  ],

  education: [
    {
      degree: "S1 Teknik Informatika",
      institution: "Universitas Tiga Serangkai",
      gpa: "3.63 / 4.00",
      focus: "Rekayasa Perangkat Lunak, Pengujian Sistem & Pengembangan Aplikasi"
    }
  ],

  certifications: [
    {
      title: "Sertifikasi BNSP Otomatisasi Nutrisi Hidroponik",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP) & BPVP",
      year: "2025"
    },
    {
      title: "Padepokan QA Certified Tester",
      issuer: "Padepokan QA Testing Academy",
      year: "2024"
    },
    {
      title: "Certified Front-End Web Developer",
      issuer: "Hacktiv8 Academy (Kampus Merdeka)",
      year: "2024"
    },
    {
      title: "English Proficiency Test (Score: 467)",
      issuer: "Universitas Tiga Serangkai Language Center",
      year: "2024"
    }
  ]
};
