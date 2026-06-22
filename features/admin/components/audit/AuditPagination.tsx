interface Props {
    page: number;
    size: number;
    logsLength: number;
    setPage: (page: number) => void;
    setSize: (size: number) => void;
}

export function AuditPagination({ page, size, logsLength, setPage, setSize }: Props) {
    return (
        <div className="p-6 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:inline">Registros:</span>
                <select
                    value={size}
                    onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }}
                    className="bg-white border border-slate-200 text-xs font-bold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${page === 0 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                    ⬅️ Anterior
                </button>
                <span className="text-xs font-black text-slate-400 w-20 text-center">PÁG {page + 1}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={logsLength < size}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${logsLength < size ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                    Siguiente ➡️
                </button>
            </div>
        </div>
    );
}
