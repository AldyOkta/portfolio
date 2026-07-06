
export const profile = {
    name: "Aldy Oktaviano",
    role: "Mobile Developer",
    tagline: "Membangun aplikasi mobile dan web yang inovatif serta memastikan kualitas sistem melalui pengujian fungsional dan optimasi workflow berbasis AI.",
    about: "Saya adalah QA Tester dan Developer yang fokus pada kualitas aplikasi dan optimasi workflow menggunakan AI. Dengan pengalaman di Mobile Development dan Quality Assurance, saya menjembatani kode yang tangguh dengan pengalaman pengguna yang mulus.",
    socialLinks: [
        { icon: "FaGithub", href: "https://github.com/AldyOkta" },
        { icon: "FaLinkedin", href: "https://www.linkedin.com/in/aldy-oktaviano-548174280" },
        { icon: "FaInstagram", href: "https://www.instagram.com/oktaldyy?igsh=MTdkbWR5Z2N5NDU0Nw==" },
    ],
    stats: [
        { number: "2+", label: "Tahun Pengalaman" },
        { number: "3.63", label: "IPK" },
    ]
};

export const projects = [
    {
        id: 1,
        title: "Project Wira (Stock Opname)",
        description: "Optimasi modul stock opname dengan integrasi QR Code dan validasi box/retail.",
        image: "/assets/project1.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Airbnb Clone",
        description: "Aplikasi mobile fitur lengkap dengan kemampuan Pencarian, Bookmark, dan Profil.",
        image: "/assets/project2.jpg",
        link: "#"
    }
];

export const services = [
    {
        id: "01",
        title: "Pengujian Kualitas (QA)",
        description: "Melakukan pengujian fungsionalitas menyeluruh pada aplikasi desktop dan web untuk menjamin reliabilitas produk sebelum rilis."
    },
    {
        id: "02",
        title: "Optimasi Workflow AI",
        description: "Melakukan benchmarking pada model LLM (seperti Sailor dan Qwen) untuk kebutuhan koreksi ejaan dengan stabilitas output JSON yang tinggi."
    },
    {
        id: "03",
        title: "Pengembangan Aplikasi Mobile",
        description: "Mengembangkan aplikasi mobile yang responsif dan performan menggunakan React Native dan Expo."
    },
    {
        id: "04",
        title: "Pengembangan Web Front-End",
        description: "Transformasi desain UI/UX menjadi antarmuka web yang interaktif menggunakan React, Vite, dan Tailwind CSS."
    }
];

export const experience = [
    {
        id: 1,
        role: "QA Tester",
        company: "PT Tiga Serangkai Pustaka Mandiri",
        year: "Des 2025 - Sekarang",
        description: [
            "Mengembangkan workflow koreksi ejaan berbasis AI menggunakan model Sailor2:20b (stabilitas JSON pada context length 4096) dan Qwen2.5:14b (untuk teks hingga 10.000+ karakter).",
            "Melakukan benchmarking limit token pada model Mistral dan DeepSeek untuk memastikan reliabilitas sistem.",
            "Mengelola pengujian pada Project Wira, termasuk validasi modul Stock Opname, scanning nomor box/retail, dan integrasi QR Code lokasi dengan sinkronisasi nomor STA.",
            "Memastikan integritas data dengan validasi status stok hanya pada kondisi 'OPEN'."
        ]
    },
    {
        id: 2,
        role: "Mobile & Front-End Developer (Intern)",
        company: "PT Tiga Serangkai Pustaka Mandiri",
        year: "Feb 2024 - Juli 2024",
        description: [
            "Implementasi desain UI/UX ke aplikasi mobile serta optimasi performa antarmuka agar lebih ringan dan cepat.",
            "Menampilkan desain mobile sesuai apa yang dibuat tim UI/UX",
            "Melakukan pengujian unit dan integrasi untuk memastikan antarmuka pengguna mobile berfungsi dengan baik.",
            "Mengoptimalkan performa antarmuka pengguna mobile untuk memastikan kelancaran dan kecepatan loading.",
            "Mengimplementasikan antarmuka pengguna mobile dengan menggunakan HTML, CSS, JavaScript, dan framework mobile menggunakan React Native dan Expo.",
            "Membuat koneksi dengan Database."
        ]
    },
    {
        id: 3,
        role: "Android Developer",
        company: "MSIB Hacktiv8",
        year: "2023",
        description: [
            "Membangun aplikasi Airbnb Clone fungsional dengan fitur Pencarian, Bookmark, dan Profil Pengguna.",
            "Membuat proyek akhir bersama tim membuat aplikasi mobile Airbnb pemesanan hotel. Aplikasi ini untuk pengguna mencari hotel yang popular di indonesia ataupun di area sekitar terdekat, aplikasi ini ketika user belum mempunyai akun akan menampilkan halaman untuk register/registrasi membuat akun. Aplikasi ini mempunyai banyak fitur yaitu home, search, bookmark, profile.",
            "Melakukan deploy aplikasi ke netfly.com",
            "Membuat dokumentasi dan laporan proyek secara rinci dan jelas, berkolaborasi dengan anggota tim untuk bertanggung jawab atas proyek tersebut untuk android for front end developer.",
        ]
    }
];

export const education = [
    {
        id: 1,
        role: "S1 Teknik Informatika",
        institution: "Universitas Tiga Serangkai",
        year: "2021 - 2025",
        description: "Lulus dengan IPK 3.63"
    }
];

export const skills = {
    development: ["React Native", "React.js", "Vite", "Tailwind CSS", "Javascript"],
    qa_ai: ["LLM Benchmarking", "AI Agent", "Functional Testing", "Postman"],
    tools: ["Git/GitHub", "MySQL", "Figma", "VS Code"]
};
