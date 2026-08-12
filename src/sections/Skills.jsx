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
        <section id="skills" aria-labelledby="skills-heading" className="py-24 px-8 bg-theme-dark">
            <div className="container mx-auto max-w-5xl">
                <h2 id="skills-heading" className="text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
                    Skills
                </h2>

                <div className="space-y-14">
                    {categories.map((category) => (
                        <div key={category.key}>
                            <h3 className="text-xs font-semibold tracking-[0.3em] uppercase text-white-600 mb-6 pb-3 border-b border-white/10">
                                {category.title}
                            </h3>

                            <ul
                                aria-label={`Daftar skill ${category.title}`}
                                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 list-none p-0 m-0"
                            >
                                {skills[category.key]?.map((skill, index) => {
                                    const skillData = skillIcons[skill] || { icon: <FaRobot />, color: "text-gray-400" };
                                    return (
                                        <li
                                            key={index}
                                            className="group flex flex-col items-center justify-center gap-3 aspect-square p-4 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-theme-purple/15 hover:border-theme-purple/60 hover:-translate-y-1"
                                        >
                                            <div
                                                aria-hidden="true"
                                                className={`flex items-center justify-center text-4xl ${skillData.color} transition-transform duration-300 group-hover:scale-110`}
                                            >
                                                {skillData.icon}
                                            </div>
                                            <span className="text-xs font-medium text-gray-300 text-center leading-tight group-hover:text-white transition-colors">
                                                {skill}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;