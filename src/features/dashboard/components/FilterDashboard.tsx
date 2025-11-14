import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterDashboardProps {
    dataDropdown?: {
        label: string
        value: string
    }[]
    limit: number
    setLimit: (limit: number) => void
    search: string
    setSearch: (search: string) => void
    selectedFilter?: string
    setSelectedFilter?: (value: string) => void
}

export function FilterDashboard({ 
    dataDropdown = [], 
    limit, 
    search, 
    setLimit, 
    setSearch,
    selectedFilter,
    setSelectedFilter
}: FilterDashboardProps) {
    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || /^\d+$/.test(value)) {
            setLimit(value === '' ? 0 : Number(value))
        }
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[400px]">
            {/* Dropdown Filter */}
            {dataDropdown.length > 0 && setSelectedFilter && (
                <div className="w-full sm:w-48 space-y-2">
                    <Label htmlFor="filter">Filter</Label>
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger id="filter" className="w-full">
                            <SelectValue placeholder="Pilih filter" />
                        </SelectTrigger>
                        <SelectContent>
                            {dataDropdown.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            
            {/* Search Input */}
            <div className="flex-1 space-y-2">
                <Input
                    id="search"
                    type="text"
                    placeholder="Cari data..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                />
            </div>
            
            {/* Limit Input */}
            <div className="w-full sm:w-32 space-y-2">
                <Input
                    id="limit"
                    type="number"
                    placeholder="10"
                    min="1"
                    value={limit || ''}
                    onChange={handleLimitChange}
                    className="w-full"
                />
            </div>
        </div>
    )
}