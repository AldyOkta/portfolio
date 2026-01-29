import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Experience = () => {
    const experiences = [
        {
            year: "2020 - Present",
            title: "Framer Designer & Developer",
            company: "Bluebase Designs",
            description: "Defining the problem, identifying the scope and finally organising."
        },
        {
            year: "2018 - 2020",
            title: "Front-End Developer",
            company: "Larsen & Toubro",
            description: "Defining the problem, identifying the scope and finally organising."
        }
    ];

    const education = [
        {
            year: "2020",
            title: "Graphic Design Course",
            institution: "University of Denmark",
            description: "Defining the problem, identifying the scope and finally organising."
        },
        {
            year: "2018",
            title: "Web Design Course",
            institution: "University of California",
            description: "Defining the problem, identifying the scope and finally organising."
        }
    ];

    const Card = ({ item, icon: Icon }) => (
        <div className="group relative pl-8 pb-12 last:pb-0 border-l border-white/10 hover:border-theme-purple transition-colors duration-300">
            {/* Dot */}
            <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-theme-purple group-hover:shadow-[0_0_10px_#8750f7] transition-all duration-300"></div>

            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-theme-purple font-bold text-sm tracking-wider">{item.year}</span>
                    <Icon className="text-2xl text-theme-purple" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-theme-purple transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{item.company || item.institution}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
        </div>
    );

    return (
        <section id="experience" className="py-24 px-8 bg-theme-dark">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Experience Column */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <FaBriefcase className="text-theme-purple text-3xl" />
                            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-text">My Experience</h2>
                        </div>
                        <div>
                            {experiences.map((item, index) => <Card key={index} item={item} icon={FaBriefcase} />)}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <FaGraduationCap className="text-theme-purple text-3xl" />
                            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-text">My Education</h2>
                        </div>
                        <div>
                            {education.map((item, index) => <Card key={index} item={item} icon={FaGraduationCap} />)}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Experience;
