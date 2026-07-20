import { FaGraduationCap, FaBriefcase, FaUsers, FaLaptopCode } from 'react-icons/fa';
import { experience, education, organization, training } from '../data/portfolioData';
import { motion } from 'framer-motion';

const Experience = () => {

    const Card = ({ item, icon: Icon, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group relative pl-8 pb-10 last:pb-0 border-l border-white/10 hover:border-theme-purple transition-colors duration-300"
        >
            {/* Dot */}
            <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-theme-purple group-hover:shadow-[0_0_10px_#8750f7] transition-all duration-300"></div>

            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="flex justify-between items-start mb-3">
                    <span className="text-theme-purple font-semibold text-xs tracking-wider uppercase">{item.year}</span>
                    <Icon className="text-xl text-theme-purple/60" />
                </div>
                <h3 className="text-base font-bold text-white mb-0.5 group-hover:text-theme-purple transition-colors leading-snug">{item.role}</h3>
                <p className="text-gray-400 text-xs mb-3">{item.company || item.institution}</p>
                {Array.isArray(item.description) ? (
                    <ul className="text-gray-500 text-xs leading-relaxed list-disc list-outside ml-4 space-y-1.5">
                        {item.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                )}
            </div>
        </motion.div>
    );

    const SectionHeading = ({ icon: Icon, title }) => (
        <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-theme-purple/20 border border-theme-purple/30 flex items-center justify-center">
                <Icon className="text-theme-purple text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-text">{title}</h2>
        </div>
    );

    return (
        <section id="experience" className="py-24 px-8 bg-theme-dark">
            <div className="container mx-auto">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-text mb-3">Perjalanan Saya</h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm">Rekam jejak pengalaman, pendidikan, organisasi, dan pelatihan yang membentuk saya.</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* LEFT: Experience */}
                    <div>
                        <SectionHeading icon={FaBriefcase} title="Pengalaman Kerja" />
                        <div>
                            {experience.map((item, index) => (
                                <Card key={index} item={item} icon={FaBriefcase} delay={index * 0.1} />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Education + Organisasi + Pelatihan stacked */}
                    <div className="space-y-12">

                        {/* Pendidikan */}
                        <div>
                            <SectionHeading icon={FaGraduationCap} title="Pendidikan" />
                            <div>
                                {education.map((item, index) => (
                                    <Card key={index} item={item} icon={FaGraduationCap} delay={0.1} />
                                ))}
                            </div>
                        </div>

                        {/* Organisasi */}
                        <div>
                            <SectionHeading icon={FaUsers} title="Organisasi" />
                            <div>
                                {organization.map((item, index) => (
                                    <Card key={index} item={item} icon={FaUsers} delay={0.1 + index * 0.1} />
                                ))}
                            </div>
                        </div>

                        {/* Pelatihan */}
                        <div>
                            <SectionHeading icon={FaLaptopCode} title="Pelatihan" />
                            <div>
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
