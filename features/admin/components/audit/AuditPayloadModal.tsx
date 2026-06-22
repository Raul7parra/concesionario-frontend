import { useState } from 'react';

interface Props {
    payload: string;
    onClose: () => void;
}

export function AuditPayloadModal({ payload, onClose }: Props) {
    const [copied, setCopied] = useState(false);

    const formatJSON = (rawStr: string) => {
        try {
            return JSON.stringify(JSON.parse(rawStr), null, 2);
        } catch (e) {
            return rawStr;
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formatJSON(payload));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-slate-900 w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden border border-slate-800 animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h3 className="text-sm font-black uppercase tracking-widest text-emerald-400">Payload Forense Analizado</h3>
                    <div className="flex gap-2">
                        <button onClick={copyToClipboard} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-colors">
                            {copied ? '¡Copiado!' : 'Copiar JSON'}
                        </button>
                        <button onClick={onClose} className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 rounded-lg text-xs font-bold transition-colors">
                            Cerrar
                        </button>
                    </div>
                </div>
                <div className="p-6 overflow-auto max-h-[60vh]">
                    <pre className="text-xs font-mono text-emerald-300 leading-relaxed">
                        <code>{formatJSON(payload)}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
