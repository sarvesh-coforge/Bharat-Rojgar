'use client';

import React, { useEffect, useState } from 'react';
import {
  Globe,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Clock,
  Loader2,
  Check,
} from 'lucide-react';

export default function AdminSourcesPage() {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [resultMsg, setResultMsg] = useState<{ id: string; text: string; error?: boolean } | null>(null);

  const loadSources = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/sources');
      if (res.ok) {
        const json = await res.json();
        setSources(json.sources || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSources();
  }, []);

  const handleSyncSource = async (id: string, name: string) => {
    setSyncingId(id);
    setResultMsg(null);
    try {
      const res = await fetch(`/api/admin/sources/${id}/sync`, { method: 'POST' });
      const json = await res.json();
      if (res.ok && json.success) {
        setResultMsg({
          id,
          text: `Success: Found ${json.result.itemsFound} notices, ingested ${json.result.itemsNew} new items.`,
        });
        loadSources();
      } else {
        setResultMsg({
          id,
          text: `Error: ${json.error || 'Failed to sync'}`,
          error: true,
        });
      }
    } catch (err: any) {
      setResultMsg({ id, text: err.message, error: true });
    } finally {
      setSyncingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            Official Source Connectors
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated monitoring feeds for UPSC, SSC, Railways, IBPS, NTA, and State Service Commissions.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSources}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Sources</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sources.map((src) => {
          const isSyncing = syncingId === src.id;
          const msg = resultMsg?.id === src.id ? resultMsg : null;
          return (
            <div
              key={src.id}
              className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700/60 font-mono">
                      {src.code}
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1.5">
                      {src.name}
                    </h3>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      src.lastStatus === 'SUCCESS'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : src.lastStatus === 'ERROR'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {src.lastStatus || 'IDLE'}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <a
                      href={src.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1 truncate"
                    >
                      <span>{src.websiteUrl}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>
                      Check Interval: <strong>Every {src.checkIntervalMinutes} mins</strong>
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500">
                    Last Checked:{' '}
                    {src.lastFetchedAt
                      ? new Date(src.lastFetchedAt).toLocaleString()
                      : 'Never'}
                  </div>
                </div>

                {msg && (
                  <div
                    className={`mt-3 p-2.5 rounded text-xs flex items-center gap-2 ${
                      msg.error
                        ? 'bg-red-950/80 text-red-200 border border-red-800'
                        : 'bg-emerald-950/80 text-emerald-200 border border-emerald-800'
                    }`}
                  >
                    {msg.error ? (
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                    )}
                    <span>{msg.text}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Method: <span className="font-mono text-slate-300">{src.monitorType}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleSyncSource(src.id, src.name)}
                  disabled={isSyncing}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Fetching...' : 'Sync Now'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
