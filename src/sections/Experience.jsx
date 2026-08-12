import { FaGraduationCap, FaBriefcase, FaUsers, FaLaptopCode } from 'react-icons/fa';
import { experience, education, organization, training } from '../data/portfolioData';
import { motion } from 'framer-motion';

const Experience = () => {

    const Card = ({ item, icon: Icon, delay = 0, isFirst = false, color = "theme-purple", link = null }) => {
        // Map color to tailwind classes explicitly since tailwind doesn't support dynamic string interpolation for custom colors out of the box unless configured in safelist.
        // But since we use standard tailwind colors like teal-400, orange-400, blue-400, we can define the classes here.
        const colorClasses = {
            "purple": {
                text: "text-theme-purple",
                textLight: "text-theme-purple/60",
                bg: "bg-theme-purple",
                shadow: "group-hover:shadow-[0_0_10px_#8750f7]",
                borderHover: "hover:border-theme-purple",
                groupHoverText: "group-hover:text-theme-purple"
            },
            "teal": {
                text: "text-teal-400",
                textLight: "text-teal-400/60",
                bg: "bg-teal-400",
                shadow: "group-hover:shadow-[0_0_10px_#2dd4bf]",
                borderHover: "hover:border-teal-400",
                groupHoverText: "group-hover:text-teal-400"
            },
            "orange": {
                text: "text-orange-400",
                textLight: "text-orange-400/60",
                bg: "bg-orange-400",
                shadow: "group-hover:shadow-[0_0_10px_#fb923c]",
                borderHover: "hover:border-orange-400",
                groupHoverText: "group-hover:text-orange-400"
            },
            "blue": {
                text: "text-blue-400",
                textLight: "text-blue-400/60",
                bg: "bg-blue-400",
                shadow: "group-hover:shadow-[0_0_10px_#60a5fa]",
                borderHover: "hover:border-blue-400",
                groupHoverText: "group-hover:text-blue-400"
            }
        }[color] || colorClasses["purple"];

        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay }}
                className={`group relative pl-8 pb-10 last:pb-0 border-l-2 border-white/10 ${colorClasses.borderHover} transition-colors duration-300`}
            >
                {/* Dot */}
                <div className={`absolute -left-[7px] top-1 w-[12px] h-[12px] rounded-full ${colorClasses.bg} ${colorClasses.shadow} transition-all duration-300`}></div>
                
                {/* Connector Line glow effect */}
                <div className={`absolute -left-[2px] top-1 bottom-0 w-[2px] bg-gradient-to-b from-${colorClasses.bg} to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>

                {isFirst && (
                    <div className={`absolute -left-12 -top-6 text-[9px] font-bold px-2 py-0.5 rounded border border-white/20 ${colorClasses.text} bg-white/5`}>
                        SEKARANG
                    </div>
                )}

                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors duration-300 mt-1">
                    <div className="flex justify-between items-start mb-3">
                        <span className={`${colorClasses.text} font-semibold text-xs tracking-wider uppercase`}>{item.year}</span>
                        <Icon className={`text-xl ${colorClasses.textLight}`} />
                    </div>
                    <h3 className={`text-base font-bold text-white mb-0.5 ${colorClasses.groupHoverText} transition-colors leading-snug`}>{item.role}</h3>
                    <p className="text-gray-300 text-xs mb-3">{item.company || item.institution}</p>
                    
                    {Array.isArray(item.description) ? (
                        <ul className="text-gray-300 text-sm leading-relaxed list-disc list-outside ml-4 space-y-1.5">
                            {item.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    )}

                    {link && (
                        <a
                            href={link}
                            aria-label={`Lihat CV lengkap Aldy Oktaviano (buka file PDF)`}
                            className={`inline-block mt-4 text-xs font-medium ${colorClasses.text} hover:underline`}
                        >
                            Lihat CV Lengkap →
                        </a>
                    )}
                </div>
            </motion.div>
        );
    };

    const SectionHeading = ({ icon: Icon, title, color = "purple" }) => {
        const colorClasses = {
            "purple": { bg: "bg-theme-purple/20", border: "border-theme-purple/30", text: "text-theme-purple" },
            "teal": { bg: "bg-teal-400/20", border: "border-teal-400/30", text: "text-teal-400" },
            "orange": { bg: "bg-orange-400/20", border: "border-orange-400/30", text: "text-orange-400" },
            "blue": { bg: "bg-blue-400/20", border: "border-blue-400/30", text: "text-blue-400" }
        }[color] || colorClasses["purple"];

        return (
            <div className="flex items-center gap-3 mb-10">
                <div className={`w-10 h-10 rounded-xl ${colorClasses.bg} border ${colorClasses.border} flex items-center justify-center`}>
                    <Icon className={`${colorClasses.text} text-xl`} />
                </div>
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{title}</h2>
            </div>
        );
    };

    return (
        <section id="experience" aria-labelledby="experience-heading" className="py-24 px-8 bg-theme-surface">
            <div className="container mx-auto">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 id="experience-heading" className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-text mb-3">Perjalanan Saya</h2>
                    <p className="text-gray-300 max-w-xl mx-auto text-sm">Rekam jejak pengalaman, pendidikan, organisasi, dan pelatihan yang membentuk saya.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT: Experience */}
                    <div role="region" aria-label="Pengalaman Kerja">
                        <SectionHeading icon={FaBriefcase} title="Pengalaman Kerja" color="purple" />
                        <div className="mt-8">
                            {experience.map((item, index) => (
                                <Card 
                                    key={index} 
                                    item={item} 
                                    icon={FaBriefcase} 
                                    delay={index * 0.1} 
                                    isFirst={index === 0}
                                    color="purple"
                                    link={index === 0 ? "/assets/CV - ALDY OKTAVIANO.pdf" : null}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Education + Organisasi + Pelatihan stacked */}
                    <div role="region" aria-label="Pendidikan, Organisasi, dan Pelatihan" className="space-y-16">

                        {/* Pendidikan */}
                        <div>
                            <SectionHeading icon={FaGraduationCap} title="Pendidikan" color="teal" />
                            <div className="mt-8">
                                {education.map((item, index) => (
                                    <Card key={index} item={item} icon={FaGraduationCap} delay={0.1} color="teal" />
                                ))}
                            </div>
                        </div>

                        {/* Organisasi */}
                        <div>
                            <SectionHeading icon={FaUsers} title="Organisasi" color="orange" />
                            <div className="mt-8">
                                {organization.map((item, index) => (
                                    <Card key={index} item={item} icon={FaUsers} delay={0.1 + index * 0.1} color="orange" />
                                ))}
                            </div>
                        </div>

                        {/* Pelatihan */}
                        <div>
                            <SectionHeading icon={FaLaptopCode} title="Pelatihan" color="blue" />
                            <div className="mt-8">
                                {training.map((item, index) => (
                                    <Card
                                        key={index}
                                        item={{
                                            ...item,
                                            role: item.title,
                                            company: `${item.institution} • ${item.duration}`,
                                            year: item.year,
                                        }}
                                        icon={FaLaptopCode}
                                        delay={0.1 + index * 0.1}
                                        color="blue"
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
