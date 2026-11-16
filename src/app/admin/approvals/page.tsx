'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FileCheck,
  CheckCircle,
  XCircle,
  ExternalLink,
  ShieldAlert,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export default function AdminApprovalsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const loadPending = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/notifications?verification=PENDING');
      if (res.ok) {
        const json = await res.json();
        setItems(json.items || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/notifications/${id}/approve`, {
        method: 'POST',
      });
      if (res.ok) {
        setMessage('Notification successfully verified & published to public portal!');
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Please enter rejection reason:');
    if (!reason) return;

    setProcessingId(id);
    setMessage('');
    try {
      const res = await fetch(`/api/admin/notifications/${id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (res.ok) {
        setMessage('Notification rejected and archived.');
        setItems(items.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight uppercase">
              Pending Approvals Queue
            </h1>
            <span className="text-xs bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
              {items.length} Pending
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official scraped records queued for verification before public release. No fake notifications allowed.
          </p>
        </div>

        <button
          type="button"
          onClick={loadPending}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 self-start sm:self-center"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Queue</span>
        </button>
      </div>

      {message && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-200 rounded text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{message}</span>
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-slate-400">Loading pending approval records...</div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-lg">
          <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <h3 className="font-bold text-white text-sm">All Clear! No Pending Approvals</h3>
          <p className="text-xs text-slate-400 mt-1">
            All automatically ingested official notices have been reviewed and processed.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-lg bg-slate-900 border border-amber-500/40 hover:border-amber-400 transition-all shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700/60">
                      {item.organization.shortName}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Category: <strong className="text-white">{item.category.name}</strong>
                    </span>
                    {item.sourceReference && (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-600/40">
                        Ref: {item.sourceReference}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-white">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    {item.officialWebsiteUrl && (
                      <a
                        href={item.officialWebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {item.officialPdfUrl && (
                      <a
                        href={item.officialPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Original PDF Notice</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleApprove(item.id)}
                    disabled={processingId === item.id}
                    className="flex-1 lg:flex-none px-4 py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
                  >
                    {processingId === item.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                    <span>Approve & Publish</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReject(item.id)}
                    disabled={processingId === item.id}
                    className="flex-1 lg:flex-none px-4 py-2 rounded bg-red-950 hover:bg-red-900 text-red-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-red-800 transition-colors disabled:opacity-50"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <Link
                    href={`/admin/notifications/edit/${item.id}`}
                    className="flex-1 lg:flex-none px-4 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold text-center transition-colors border border-slate-700"
                  >
                    Edit Fields
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
