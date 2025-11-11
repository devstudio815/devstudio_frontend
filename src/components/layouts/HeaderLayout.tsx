interface HeaderLayoutDashboardProps {
    name : string
    children?: React.ReactNode
}

export function HeaderLayoutDashboard({
    name,
    children
} : HeaderLayoutDashboardProps) {
    return (
        <header className=" sticky top-0 z-10">
            <div className="flex justify-between mx-auto px-4 sm:px-6 lg:px-8 ">
                <h1 className="text-2xl font-semibold hidden md:block">{name}</h1>
                {children}
            </div>
        </header>
    )
}