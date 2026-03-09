export default function Footer() {
    return (
        <footer className="border-t mt-20">
            <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col items-center gap-4 text-sm text-gray-500">
                <p>© {new Date().getFullYear()} erzan.dev. Built with NextJS ❤️</p>

                <div className="flex gap-6">
                    <a href="https://github.com/Erzan12">GitHub</a>
                    <a href="https://docs.erzan.dev">Docs</a>
                </div>
            </div>
        </footer>
    )
}