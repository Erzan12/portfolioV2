export default function Footer() {
    return (
        <footer className="border-t mt-20">
            <div className="max-w-5x1 mx-auto px-6 py-8 flex justify-between text-sm text-gray-500">
                <p>© {new Date().getFullYear()} erzan.dev</p>

                <div className="flex gap-6">
                    <a href="https://github.com/Erzan12">GitHub</a>
                    <a href="https://docs.erzan.dev">Docs</a>
                </div>
            </div>
        </footer>
    )
}