import SearchBar from '../ui/SearchBar'

export default function ServiceFilters({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  departments,
  resultCount,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <SearchBar
            id="service-search"
            label="Search government services"
            value={search}
            onChange={onSearchChange}
            placeholder="Search by name, ID, department, or keyword..."
            size="md"
          />
        </div>

        <div className="lg:w-64">
          <label htmlFor="department-filter" className="mb-1.5 block text-sm font-medium text-slate-700">
            Department
          </label>
          <select
            id="department-filter"
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
          >
            <option value="">All departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-slate-500">
        Showing <span className="font-medium text-slate-700">{resultCount}</span> service
        {resultCount !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
