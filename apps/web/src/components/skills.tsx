export default function Skills() {
    const skills = {
        Backend: ["NestJS", "PHP", "Laravel", "CodeIgniter"],
        Frontend: ["React", "Next.js", "TypeScript"],
        Database: ["PostgreSQL", "MySQL", "Prisma"],
        DevOps: ["Docker", "Linux", "Git", "Vercel"],
    }

    return (
        <section>
            <h2 className="text-2x1 font-bold mb-8">Skills</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(skills).map(([category, items]) => (
                    <div key={category} className="border rounded-lg p-6">
                        <h3 className="font-semibold mb-4">{category}</h3>

                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span
                                    key={skill}
                                    className="text-sm border px-3 py-1 rounded"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}