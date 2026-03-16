import Link from "next/link";

export default function SystemDesign() {
    const systems = [
        {
            title: "ERP Backend Architecture",
            description:
                "Architecture behind the ERP backend API including modules, database design, and role-based access control.",
            stack: ["NestJS", "PostgreSQL", "Prisma", "JWT"],
            topics: ["RBAC", "REST APIs", "Modular Architecture"],
            link: "/docs/Case-studies/erp-backend-api",
        },
        {
            title: "Authentication System",
            description:
                "JWT authentication flow and role-based permission model used in enterprise backend systems.",
            link: "http://localhost:3000/docs/Case-studies/erp-backend-api",
        },
        {
            title: "Portfolio Monorepo Architecture",
            description:
                "Design of the monorepo platform powering this portfolio and documentation system.",
            link: "http://localhost:3000/docs/Case-studies/portfolio-platform",
        },
    ];

    return (
        <main className="container mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-8">
                System Design
            </h1>
            
            <p className="text-gray-500 mb-12">
                This section highlights architectural thinking behind the systems
                I design and build. It includes backend architecture, authentication
                systems, and platform infrastructure.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {systems.map((system) => (
                    <div
                        key={system.title}
                        className="border rounded-lg p-6"
                    >
                        <h3 className="text-xl font-semibold">
                            {system.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {system.description}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            {system.stack}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            {system.topics}
                        </p>

                        <Link
                            href={system.link}
                            className="inline-block mt-4 underline"
                            target="_blank"
                        >
                            Read Architecture
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    )
}