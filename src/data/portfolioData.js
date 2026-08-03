
export const profile = {
    name: "Aldy Oktaviano",
    role: "QA Tester & Mobile Developer",
    tagline: "Lulusan S1 Teknik Informatika dengan keahlian dalam Software Quality Assurance (QA) dan integrasi AI. Berpengalaman dalam validasi output LLM, pengujian model AI, dan otomasi alur kerja menggunakan n8n.",
    about: "Saya adalah QA Tester dan Developer yang fokus pada kualitas aplikasi dan optimasi workflow menggunakan AI. Memiliki rekam jejak dalam mengelola bug life cycle secara end-to-end via OpenProject, serta melakukan benchmarking model AI lokal (DeepSeek, Sailor2) pada GPU NVIDIA. Latar belakang sebagai Mobile Developer memperkuat kemampuan analisis sistem secara komprehensif.",
    contact: {
        email: "oktavianoaldy777@gmail.com",
        phone: "+6289601579321",
        location: "Sukoharjo, Jawa Tengah",
    },
    socialLinks: [
        { icon: "FaGithub", href: "https://github.com/AldyOkta" },
        { icon: "FaLinkedin", href: "https://www.linkedin.com/in/aldy-oktaviano-548174280" },
        { icon: "FaInstagram", href: "https://www.instagram.com/oktaldyy?igsh=MTdkbWR5Z2N5NDU0Nw==" },
    ],
    stats: [
        { number: "1", label: "Tahun Pengalaman" },
        { number: "3.63", label: "IPK" },
        { number: "10+", label: "Test Cases Dikelola" },
    ]
};

export const projects = [
    {
        id: 1,
        title: "Airbnb Clone",
        category: "Apps",
        description: "Aplikasi mobile pemesanan hotel berbasis React Native dengan fitur Pencarian, Bookmark, dan Profil Pengguna. Dilakukan deployment ke Netlify.",
        images: ["/assets/1.jpg"],
        link: "#"
    },
    {
        id: 2,
        title: "Hydroponic Automation System",
        category: "Web",
        description: "Proyek pelatihan BPVP Surakarta × Edutic Academy (200 jam). Membangun Smart Nutrition System berbasis IoT untuk mengotomasi pencampuran nutrisi tanaman hidroponik secara presisi. Menggunakan sensor pH, TDS, dan suhu yang terintegrasi dengan mikrokontroler untuk monitoring real-time dan kontrol otomatis pompa nutrisi.",
        images: [
            "/assets/1.jpg",
            "/assets/2.jpg",
            "/assets/3.jpg",
            "/assets/4.jpg",
            "/assets/5.jpg",
        ],
        link: "#"
    }
];

export const services = [
    {
        id: "01",
        title: "Pengujian Kualitas (QA)",
        description: "Merancang dan mengelola lebih dari 10 test cases, mengelola siklus hidup bug end-to-end via OpenProject, serta menjalankan regression testing untuk memastikan stabilitas sistem."
    },
    {
        id: "02",
        title: "Otomasi Workflow AI (n8n + LLM)",
        description: "Merancang alur otomasi koreksi ejaan konten pendidikan menggunakan n8n terintegrasi dengan LLM lokal, termasuk benchmarking model DeepSeek dan Sailor2 pada GPU NVIDIA."
    },
    {
        id: "03",
        title: "Pengembangan Aplikasi Mobile",
        description: "Mengembangkan aplikasi mobile yang responsif dan performan menggunakan React Native dan Expo, mulai dari implementasi desain UI/UX hingga pengujian unit dan integrasi."
    },
    {
        id: "04",
        title: "Pengembangan Web Front-End",
        description: "Transformasi desain UI/UX menjadi antarmuka web yang interaktif menggunakan React, Vite, dan Tailwind CSS dengan fokus pada performa dan keterbacaan kode."
    }
];

export const experience = [
    {
        id: 1,
        role: "Quality Assurance Tester",
        company: "PT Tiga Serangkai Pustaka Mandiri",
        year: "Des 2025 - Sekarang",
        description: [
            "Merancang dan membangun alur otomasi koreksi ejaan dan tanda baca konten buku pendidikan menggunakan n8n terintegrasi dengan LLM lokal.",
            "Melakukan pengujian dan validasi linguistik terhadap output model AI untuk memastikan konsistensi, akurasi ejaan, dan ketepatan tanda baca sesuai kaidah Bahasa Indonesia.",
            "Menjalankan pengujian regresi prompt secara berkala dan mengaudit hasil inferensi model guna meminimalisir halusinasi AI pada konten pendidikan.",
            "Melakukan benchmarking performa model AI lokal (DeepSeek, Sailor2) termasuk monitoring penggunaan VRAM GPU NVIDIA.",
            "Merancang dan mengelola lebih dari 10 test cases menggunakan OpenProject, mencakup pengujian fungsional, integrasi, dan validasi data.",
            "Mengelola siklus hidup bug melalui OpenProject, melakukan pelaporan defect yang mendetail, serta menjalankan regression testing untuk memastikan stabilitas sistem.",
            "Bekerja sama dengan tim pengembang untuk mengoptimalkan performa aplikasi desktop dalam menangani beban data inventori dan jadwal produksi yang kompleks.",
            "Memberikan rekomendasi perbaikan dari sisi pengalaman pengguna (UX) agar aplikasi lebih mudah digunakan oleh operator mesin.",
        ]
    },
    {
        id: 2,
        role: "Mobile & Front-End Developer (Intern)",
        company: "PT Tiga Serangkai Pustaka Mandiri",
        year: "Feb 2024 - Jul 2024",
        description: [
            "Mengembangkan aplikasi mobile sistem manajemen aset menggunakan React Native dan Expo.",
            "Mengimplementasikan desain mobile sesuai arahan tim UI/UX.",
            "Melakukan pengujian unit dan integrasi untuk memastikan antarmuka pengguna mobile berfungsi dengan baik.",
            "Mengoptimalkan performa antarmuka pengguna mobile untuk memastikan kelancaran dan kecepatan loading.",
            "Mengimplementasikan antarmuka pengguna dengan HTML, CSS, JavaScript, React Native, dan Expo.",
            "Membuat koneksi dengan Database.",
        ]
    },
    {
        id: 3,
        role: "Android React Native Developer (MSIB)",
        company: "Hacktiv8 Academy - Batch 5",
        year: "Agu 2023 - Jan 2024",
        description: [
            "Program Magang Studi Independen Bersertifikat (MSIB) Kemendikbudristek yang dilakukan secara remote.",
            "Membangun aplikasi mobile pemesanan hotel berbasis React Native secara tim, mencakup fitur home, pencarian, bookmark, dan manajemen profil pengguna.",
            "Melakukan deployment aplikasi ke platform Netlify.",
            "Menyusun dokumentasi dan laporan proyek secara terstruktur sebagai bagian dari tanggung jawab tim.",
        ]
    },
    {
        id: 4,
        role: "Petugas KPPS - Operator SIREKAP",
        company: "KPU - Pemilihan Bupati & Gubernur",
        year: "27 Nov 2024",
        description: [
            "Bertugas sebagai operator SIREKAP (Sistem Informasi Rekapitulasi) dalam proses rekapitulasi suara di TPS.",
            "Melakukan input dan unggah data hasil penghitungan suara ke aplikasi SIREKAP secara tepat, cepat, dan akurat.",
            "Memastikan hasil foto formulir C1 Plano dapat terbaca dengan jelas sebelum dikirim melalui aplikasi.",
            "Mengkoordinasikan validasi data dengan Ketua KPPS serta anggota lainnya untuk menjamin keakuratan hasil rekapitulasi.",
            "Menangani kendala teknis terkait aplikasi maupun jaringan internet di lapangan dengan sigap.",
        ]
    }
];

export const education = [
    {
        id: 1,
        role: "S1 Teknik Informatika",
        institution: "Universitas Tiga Serangkai",
        year: "2021 - 2025",
        description: "Lulus dengan IPK 3.63/4.00"
    }
];

export const organization = [
    {
        id: 1,
        role: "Anggota Divisi PSDM",
        institution: "UKM Community of Information Technology (CIT)",
        year: "2021 - 2022",
        description: [
            "Merancang alur seleksi rekrutmen anggota baru serta menyusun program pelatihan internal demi meningkatkan potensi dan keahlian IT anggota UKM CIT.",
            "Bertugas sebagai Master of Ceremony (MC) utama pada Webinar Red Hat Academy 2022 yang dihadiri lebih dari 100 peserta.",
            "Memastikan seluruh rangkaian acara selesai 100% tepat waktu sesuai rundown.",
        ]
    }
];

export const training = [
    {
        id: 1,
        title: "Project Based Learning - Hydroponic Automation System",
        institution: "BPVP Surakarta × Edutic Academy",
        year: "1 Okt 2025 - 29 Okt 2025",
        duration: "200 Jam",
        description: [
            "Mengikuti program pelatihan berbasis proyek berfokus pada implementasi Smart Nutrition System untuk mengotomasi proses pencampuran nutrisi tanaman hidroponik secara presisi dan efisien.",
            "Mempelajari dan mempraktikkan penerapan prosedur K3, instalasi dan pemeliharaan sistem hidroponik, pembuatan larutan nutrisi, serta perakitan sensor dan integrasi perangkat elektronik berbasis mikrokontroler.",
            "Memperdalam kemampuan pemrograman embedded system pada mikrokontroler sebagai fondasi dalam membangun sistem otomasi berbasis Internet of Things (IoT).",
        ]
    }
];

export const skills = {
    development: ["React Native", "React.js", "Vite", "Tailwind CSS", "Javascript"],
    qa_ai: ["Manual Testing", "Bug Reporting", "AI Output Validation", "LLM Benchmarking", "Workflow Automation (n8n)", "Model Context Protocol (MCP)", "Postman", "OpenProject"],
    tools: ["Git/GitHub", "MySQL", "Figma", "VS Code", "n8n", "Microsoft Office", "Google Workspace"]
};
