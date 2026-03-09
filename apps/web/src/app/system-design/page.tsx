import Link from "next/link";

export default function SystemDesign() {
    const systems = [
        {
            title: "ERP Backend Architecture",
            description:
                "Architecture behind the ERP backend API including modules, database design, and role-based access control.",
            link: "http://localhost:3000/docs/Case-studies/erp-backend-api",
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
            <h1 className="text-3x1 font-bold mb-8">
                System Design
            </h1>
            
            <p className="text-gray-500 mb-12">
                This section highlights architectural thinking behind the systems
                I design and build. It includes backend architecture, authentication
                systems, and platform infrastructure.
            </p>

            <div className="grid md:grid-colds-2 gap-6">
                {systems.map((systems) => (
                    <div
                        key={systems.title}
                        className="border rounded-lg p-6"
                    >
                        <h3 className="text-x1 fond-semibold">
                            {systems.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            {systems.description}
                        </p>

                        <link
                            href={systems.link}
                            className="inline-block mt-4 underline"
                        >
                            Read Architecture
                        </link>
                    </div>
                ))}
            </div>
        </main>
    )
}