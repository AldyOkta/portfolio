import { getEmail, getWhatsApp, getWhatsAppDisplay } from '../utils/contact';

export const portfolioData = {
  personal: {
    name: "Aldy Oktaviano",
    role: "Quality Assurance Tester & Frontend/Mobile Developer",
    status: "Open for Opportunities",
    summary: "Lulusan S1 Teknik Informatika (IPK 3,63/4,00) dengan pengalaman sebagai Quality Assurance Tester (program magang) pada aplikasi desktop enterprise serta pengembangan aplikasi mobile menggunakan React Native dan Expo. Terbiasa mengelola siklus pengujian end-to-end, mulai dari analisis kebutuhan, penyusunan test case, pelaporan dan retest defect, hingga pendampingan UAT. Memiliki latar belakang pengembangan aplikasi (UI, koneksi database, optimisasi performa) yang memperkuat pemahaman terhadap SDLC dan standar kualitas kode. Memiliki pengalaman membangun antarmuka chatbot AI yang terintegrasi dengan workflow n8n. Teliti, adaptif, dan siap berkontribusi dalam tim pengembangan software.",
    location: "Surakarta, Jawa Tengah, Indonesia",
    get email() {
      return getEmail();
    },
    get whatsapp() {
      return getWhatsApp();
    },
    get whatsappDisplay() {
      return getWhatsAppDisplay();
    },
    linkedin: "https://www.linkedin.com/in/aldy-oktaviano-548174280",
    github: "https://github.com/AldyOkta",
    cvPath: "https://drive.google.com/file/d/1Ez6NzttGfwHsggKy0apQlq2_679Qrntf/view?usp=sharing",
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
      description: {
        en: "Interactive movie search Single Page Application built collaboratively during the MSIB Hacktiv8 program. Features instant search, category filtering, and responsive UI with React.js, Tailwind CSS, Axios, and live OMDb API.",
        id: "Single Page Application pencarian film yang saya kembangkan bersama tim di program MSIB Hacktiv8. Menggunakan React.js, Tailwind CSS, Axios, dan integrasi live OMDb API dengan pencarian instan dan responsivitas penuh."
      },
      tags: ["Team Project", "React.js", "Tailwind CSS", "Axios", "OMDb API", "Netlify"],
      colSpan: "md:col-span-7",
      borderAccent: true,
      delay: 0,
      roleKey: "p1Role",
      action: {
        type: "link",
        href: "https://chic-sawine-f22630.netlify.app",
        labelKey: "openDemo"
      }
    },
    {
      id: "aksara-assistant",
      title: "Aksara Assistant AI",
      category: "Fullstack & AI Integration",
      badge: "PT Tiga Serangkai Inti Corpora Internal Project",
      description: {
        en: "Intelligent enterprise AI assistant featuring an interactive web chat connected to n8n AI Agents and Socket.io at PT Tiga Serangkai Inti Corpora. Helps sales teams validate, aggregate, and query field visit data automatically.",
        id: "Asisten AI cerdas berbasis antarmuka web chat terhubung ke n8n AI Agent dan Socket.io di PT Tiga Serangkai Inti Corpora. Digunakan tim sales lapangan untuk validasi, rekapitulasi, dan pelaporan data kunjungan secara otomatis."
      },
      tags: ["Enterprise AI", "React.js", "Socket.io", "n8n AI", "REST API"],
      colSpan: "md:col-span-5",
      borderAccent: false,
      delay: 0.08,
      action: {
        type: "internal",
        labelKey: "p2Internal"
      }
    },
    {
      id: "hotel-booking",
      title: "Hotel Booking Mobile",
      category: "Mobile App",
      badge: "Team Project (Hacktiv8 Batch 5)",
      description: {
        en: "Cross-platform mobile hotel booking app built with React Native and Expo (Hacktiv8 Batch 5). Includes dynamic search, price range filtering, bookmarking, and user profile management.",
        id: "Aplikasi reservasi hotel mobile multiplatform berbasis React Native dan Expo (Hacktiv8 Batch 5). Memiliki fitur pencarian akomodasi, filter rentang harga, bookmark hotel favorit, dan halaman akun pengguna."
      },
      tags: ["Mobile App", "React Native", "Expo", "Context API", "JavaScript"],
      colSpan: "md:col-span-5",
      borderAccent: false,
      delay: 0.12,
      action: {
        type: "roleOnly",
        labelKey: "p3Role"
      }
    },
    {
      id: "rodaku",
      title: "Rodaku : Vehicle Service Logbook",
      category: "Mobile App",
      badge: "Personal Project",
      description: {
        en: "100% offline-first personal mobile logbook for tracking vehicle maintenance, fuel fill-ups, and dual-trigger service reminders (mileage or date). Built with React Native, Expo Router, and local SQLite with WAL mode.",
        id: "Aplikasi buku catatan (logbook) digital perawatan motor, mobil, dan pengisian BBM berarsitektur 100% offline-first. Dilengkapi pencatatan kilat (<30 detik), validasi odometer, pengingat servis dwi-faktor (kilometer atau tanggal), dan analitik pengeluaran berbasis SQLite lokal."
      },
      tags: ["Personal Project", "React Native", "Expo SDK 57", "Expo Router", "SQLite (WAL)", "Offline-First", "Android"],
      colSpan: "md:col-span-7",
      borderAccent: false,
      delay: 0.16,
      roleKey: "rodakuRole",
      action: {
        type: "github",
        href: "https://github.com/AldyOkta/Rodaku",
        labelKey: "openGithub"
      }
    },
    {
      id: "hydroponic-iot",
      title: "Hydroponic Smart Automation System",
      category: "IoT & Automation",
      badge: "Project-Based Learning BPVP",
      description: {
        en: "Microcontroller-based smart automation system controlling nutrition dosing, realtime pH/TDS sensor telemetry, and water pump cycles for hydroponic agriculture at BPVP Surakarta. Officially verified competent by BNSP.",
        id: "Sistem kendali otomatis berbasis mikrokontroler untuk mengatur kadar nutrisi, pembacaan sensor pH/TDS secara realtime, dan siklus pompa air tanaman hidroponik di BPVP Surakarta. Dinyatakan Kompeten oleh BNSP."
      },
      tags: ["IoT & Hardware", "Microcontroller", "Sensor TDS & pH", "Embedded C++", "Sertifikasi BNSP"],
      colSpan: "md:col-span-12",
      borderAccent: true,
      delay: 0.2,
      action: {
        type: "badge",
        labelKey: "p4Predicate"
      }
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
      current: true,
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
      year: "2026"
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
