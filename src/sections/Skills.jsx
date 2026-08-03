import { skills } from '../data/portfolioData';
import { FaReact, FaGithub, FaRobot, FaFlask, FaMicrosoft, FaGoogle } from 'react-icons/fa';
import { SiTailwindcss, SiFigma, SiVite, SiJavascript, SiSelenium, SiPostman, SiMysql, SiN8N } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { TbBrandReactNative, TbApi } from 'react-icons/tb';

const Skills = () => {
    // Mapping skill names to their respective icons and colors
    const skillIcons = {
        "React.js": { icon: <FaReact />, color: "text-blue-400" },
        "React Native": { icon: <TbBrandReactNative />, color: "text-blue-500" },
        "Vite": { icon: <SiVite />, color: "text-yellow-400" },
        "Tailwind CSS": { icon: <SiTailwindcss />, color: "text-cyan-400" },
        "Javascript": { icon: <SiJavascript />, color: "text-yellow-300" },

        "LLM Benchmarking": { icon: <FaRobot />, color: "text-rose-500" },
        "AI Agent": { icon: <TbApi />, color: "text-emerald-400" },
        "Functional Testing": { icon: <FaFlask />, color: "text-green-400" },
        "Selenium": { icon: <SiSelenium />, color: "text-green-600" },
        "Postman": { icon: <SiPostman />, color: "text-orange-500" },

        "Git/GitHub": { icon: <FaGithub />, color: "text-white" },
        "MySQL": { icon: <SiMysql />, color: "text-blue-600" },
        "Figma": { icon: <SiFigma />, color: "text-purple-400" },
        "VS Code": { icon: <VscVscode />, color: "text-blue-500" },
        "n8n": { icon: <SiN8N />, color: "text-red-500" },
        "Microsoft Office": { icon: <FaMicrosoft />, color: "text-orange-500" },
        "Google Workspace": { icon: <FaGoogle />, color: "text-blue-400" },
    };

    const categories = [
        { key: "development", title: "Development" },
        { key: "tools", title: "Tools" }
    ];

    return (
        <section id="skills" className="py-24 px-8 bg-theme-dark">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-text">Skills</h2>

                <div className="space-y-16">
                    {categories.map((category) => (
                        <div key={category.key}>
                            <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-theme-purple pl-4">{category.title}</h3>
                            <div className="flex flex-wrap gap-6">
                                {skills[category.key]?.map((skill, index) => {
                                    const skillData = skillIcons[skill] || { icon: <FaRobot />, color: "text-gray-400" };
                                    return (
                                        <div key={index} className="group flex flex-col items-center gap-4 p-6 bg-white/5 rounded-2xl hover:bg-theme-purple/20 transition-all duration-300 border border-white/10 hover:border-theme-purple hover:-translate-y-2 min-w-[120px]">
                                            <div className={`text-5xl ${skillData.color} drop-shadow-lg transition-transform duration-500 group-hover:scale-110`}>
                                                {skillData.icon}
                                            </div>
                                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{skill}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
