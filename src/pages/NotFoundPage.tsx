import { Link } from 'react-router'

function NotFoundPage() {
    return (
        <section className="h-full w-full flex flex-col items-center justify-center gap-6 text-center lg:justify-start lg:pt-40">
            <h1 className="text-8xl font-bold tracking-tight">
                404
            </h1>
            <div className="flex flex-col gap-2">
                <p className="text-xl font-medium">
                    Página no encontrada
                </p>
                <p className="text-sm opacity-70 max-w-sm">
                    Parece que esta página no existe o se ha movido a otro lugar.
                </p>
            </div>
            <Link to="/home" className="mt-4 px-5 py-2 rounded-xl bg-accent text-accent-foreground font-medium hover:scale-110 hover:bg-accent-hover transition-all">
                Volver al inicio
            </Link>
        </section>
    )
}

export default NotFoundPage
