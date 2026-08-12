import { useRef, useState } from 'react';
import Button from '../components/Button';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaRocket, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { profile } from '../data/portfolioData';

// Roket: persiapan (getar) -> meluncur sambil berputar -> menghilang di atas
const RocketLaunchOverlay = ({ origin }) => {
    const travelDistance = origin.y + 260;

    return (
        <motion.div
            className="fixed z-[70] pointer-events-none"
            style={{ left: origin.x, top: origin.y }}
            initial={{ y: 0, x: '-50%', rotate: -45, scale: 1, opacity: 1 }}
            animate={{
                // Fase 1 (0 - 25%): persiapan, getar di tempat, belum naik
                // Fase 2 (25% - 85%): meluncur ke atas sambil berputar-putar (2x putaran penuh)
                // Fase 3 (85% - 100%): memudar menghilang di ketinggian
                y: [0, 0, -2, 2, -3, 0, -40, -140, -travelDistance],
                x: ['-50%', '-52%', '-48%', '-51%', '-49%', '-50%', '-46%', '-54%', '-50%'],
                rotate: [-45, -48, -42, -50, -40, -45, 60, 420, 750],
                scale: [1, 1.05, 0.98, 1.05, 0.98, 1, 1, 1, 1],
                opacity: [1, 1, 1, 1, 1, 1, 1, 1, 0],
            }}
            transition={{
                duration: 2,
                times: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.45, 0.75, 1],
                ease: 'easeInOut',
            }}
        >
            <div className="relative flex flex-col items-center">
                {/* Jejak api, makin panjang & intens begitu masuk fase meluncur */}
                <motion.div
                    className="absolute top-[85%] left-1/2 -translate-x-1/2 w-2 rounded-full bg-gradient-to-b from-orange-400 via-amber-500/70 to-transparent"
                    initial={{ height: 4, opacity: 0.5 }}
                    animate={{ height: [4, 6, 8, 6, 10, 8, 50, 110, 140], opacity: [0.5, 0.6, 0.5, 0.6, 0.5, 0.7, 0.9, 0.7, 0] }}
                    transition={{ duration: 2, times: [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.45, 0.75, 1] }}
                />
                {/* Glow biru berdenyut di sekitar roket selama fase persiapan & meluncur */}
                <motion.div
                    className="absolute w-10 h-10 rounded-full bg-blue-400/40 blur-md"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 0.35, repeat: Infinity }}
                />
                <div className="relative text-3xl text-white drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
                    <FaRocket />
                </div>
            </div>
        </motion.div>
    );
};

const Contact = () => {
    const { contact } = profile;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSent, setIsSent] = useState(false);
    const [launchOrigin, setLaunchOrigin] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const buttonWrapperRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, lastName, email, phone, message } = formData;

        // Form validation check
        if (!firstName || !email || !message) {
            alert("Please fill in the required fields (First Name, Email, and Message).");
            return;
        }

        setIsSubmitting(true);

        const templateParams = {
            from_name: `${firstName} ${lastName}`, // Akan muncul di {{from_name}} di dashboard
            reply_to: email,                       // Akan muncul di {{reply_to}} di dashboard
            phone_number: phone,
            message: message,
            to_name: 'Aldy'
        };

        const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);

                // Ambil posisi tombol saat ini untuk titik awal roket
                if (buttonWrapperRef.current) {
                    const rect = buttonWrapperRef.current.getBoundingClientRect();
                    setLaunchOrigin({ x: rect.left + rect.width / 2, y: rect.top });
                }

                setIsSent(true);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });

                // Toast + roket hilang setelah animasi (2s) + jeda baca (1.5s)
                setTimeout(() => {
                    setIsSent(false);
                    setLaunchOrigin(null);
                }, 3500);
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert("Failed to send message. Please try again later.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <section id="contact" aria-labelledby="contact-heading" className="py-24 px-8 bg-theme-surface relative overflow-hidden">
            {/* Roket: persiapan -> meluncur berputar -> menghilang */}
            <AnimatePresence>
                {isSent && launchOrigin && (
                    <RocketLaunchOverlay origin={launchOrigin} />
                )}
            </AnimatePresence>

            {/* Toast Notification (muncul setelah jeda, seiring roket lepas landas) */}
            <AnimatePresence>
                {isSent && (
                    <motion.div
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ delay: 0.3 }}
                        className="fixed top-24 right-8 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3"
                    >
                        <FaCheckCircle className="text-2xl" aria-hidden="true" />
                        <div>
                            <h4 className="font-bold">Pesan Terkirim!</h4>
                            <p className="text-sm text-green-100">Mengalihkan ke aplikasi email anda...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Info */}
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                        Kualitas Bukan Kebetulan itu Proses!
                    </h2>
                    <p className="text-gray-300 max-w-md">Saya membantu Anda memastikan integritas data, efisiensi workflow AI, dan kualitas aplikasi yang bebas dari bug. Mari berkolaborasi untuk menciptakan solusi digital yang teruji dan stabil.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div aria-hidden="true" className="w-12 h-12 rounded-full bg-gradient-to-r from-theme-purple to-theme-gray flex items-center justify-center text-white">
                                <FaPhone />
                            </div>
                            <div>
                                <p className="text-gray-300 text-sm">Telepon</p>
                                <p className="text-white font-bold">{contact.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div aria-hidden="true" className="w-12 h-12 rounded-full bg-gradient-to-r from-theme-purple to-theme-gray flex items-center justify-center text-white">
                                <FaEnvelope />
                            </div>
                            <div>
                                <p className="text-gray-300 text-sm">Email</p>
                                <p className="text-white font-bold">{contact.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div aria-hidden="true" className="w-12 h-12 rounded-full bg-gradient-to-r from-theme-purple to-theme-gray flex items-center justify-center text-white">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <p className="text-gray-300 text-sm">Alamat</p>
                                <p className="text-white font-bold">{contact.location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-gray-300">Nama Depan</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Nama Depan Anda"
                                    aria-required="true"
                                    className="w-full p-4 bg-theme-dark rounded-lg border border-white/10 focus:border-theme-purple outline-none transition text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Nama Belakang</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Nama Belakang Anda"
                                    className="w-full p-4 bg-theme-dark rounded-lg border border-white/10 focus:border-theme-purple outline-none transition text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">Alamat Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="anda@example.com"
                                    aria-required="true"
                                    className="w-full p-4 bg-theme-dark rounded-lg border border-white/10 focus:border-theme-purple outline-none transition text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-300">Nomor Telepon</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+62 812 3456 7890"
                                    className="w-full p-4 bg-theme-dark rounded-lg border border-white/10 focus:border-theme-purple outline-none transition text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-300">Pesan</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tulis pesan anda disini..."
                                aria-required="true"
                                className="w-full p-4 bg-theme-dark rounded-lg border border-white/10 focus:border-theme-purple outline-none transition text-white"
                            ></textarea>
                        </div>

                        <div ref={buttonWrapperRef}>
                            <Button type="submit" className="w-full py-4 text-base" disabled={isSubmitting}>
                                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;