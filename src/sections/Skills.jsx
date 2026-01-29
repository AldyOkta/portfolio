import { skills } from '../data/portfolioData';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { TbBrandThreejs } from 'react-icons/tb';

const Skills = () => {
    // Mapping skill names to their respective icons and colors
    const skillIcons = {
        "React": { icon: <FaReact />, color: "text-blue-400" },
        "Tailwind CSS": { icon: <SiTailwindcss />, color: "text-cyan-400" },
        "Node.js": { icon: <FaNodeJs />, color: "text-green-500" },
        "Three.js": { icon: <TbBrandThreejs />, color: "text-white" }
    };

    return (
        <section id="skills" className="py-24 px-8 bg-black/30">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-text">Skills</h2>
                <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
                    {skills.map((skill, index) => {
                        const skillData = skillIcons[skill] || { icon: null, color: "text-gray-400" };

                        return (
                            <div key={index} className="group flex flex-col items-center gap-4 p-8 bg-white/5 rounded-2xl hover:bg-theme-purple/20 transition-all duration-300 border border-white/10 hover:border-theme-purple hover:-translate-y-2">
                                <div className={`text-6xl ${skillData.color} drop-shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                                    {skillData.icon}
                                </div>
                                <span className="text-xl font-medium text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
