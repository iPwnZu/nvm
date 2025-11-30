import React, { useState, useEffect } from 'react';
import { Cloud, Zap, Database, Radio } from 'lucide-react';

export default function CloudMirror() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('ready');

  // Simulates cloud backend call
  const fetchFromCloud = async () => {
    setLoading(true);
    setStatus('fetching');
    
    try {
      // In production: replace with your cloud endpoint
      // Example: https://your-api.railway.app/process
      await new Promise(r => setTimeout(r, 1000));
      
      const result = {
        timestamp: new Date().toISOString(),
        processed: Math.random() > 0.5,
        latency: Math.random() * 50,
        region: 'edge-compute-1'
      };
      
      setData(result);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Radio className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Cloud Mirror</h1>
          </div>
          <p className="text-slate-300">Device: Dumb Terminal | Logic: Cloud</p>
        </div>

        {/* Architecture Diagram */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">Device (I/O)</p>
            <p className="text-xs text-slate-500 mt-1">Mirror only</p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 border border-cyan-500 text-center relative">
            <div className="absolute inset-0 rounded-lg bg-cyan-500/10 animate-pulse"></div>
            <Cloud className="w-6 h-6 text-cyan-400 mx-auto mb-2 relative z-10" />
            <p className="text-sm text-cyan-300 font-semibold relative z-10">Cloud Engine</p>
            <p className="text-xs text-slate-500 mt-1 relative z-10">Python, Logic</p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 text-center">
            <Database className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-slate-300">Free Tier DB</p>
            <p className="text-xs text-slate-500 mt-1">Persistent state</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={fetchFromCloud}
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-all mb-6"
        >
          {loading ? 'Processing in cloud...' : 'Trigger Cloud Process'}
        </button>

        {/* Status Display */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 mb-6">
          <p className="text-xs text-slate-500 mb-2">STATUS</p>
          <p className="text-xl font-mono text-cyan-400">
            {status.toUpperCase()}
          </p>
        </div>

        {/* Data Display */}
        {data && (
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-3">
            <p className="text-xs text-slate-500 mb-4">CLOUD RESPONSE</p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Timestamp:</span>
                <span className="text-green-400">{data.timestamp.slice(11, 19)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Processed:</span>
                <span className={data.processed ? 'text-green-400' : 'text-orange-400'}>
                  {data.processed ? 'TRUE' : 'FALSE'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Latency:</span>
                <span className="text-blue-400">{data.latency.toFixed(1)}ms</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Region:</span>
                <span className="text-purple-400">{data.region}</span>
              </div>
            </div>
          </div>
        )}

        {/* Code Example */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-700 mt-12">
          <p className="text-xs text-slate-500 mb-3">PYTHON BACKEND (5 lines)</p>
          <pre className="text-xs text-green-400 font-mono overflow-x-auto">
{`from flask import Flask
app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process(): return {'status': 'ok'}`}
          </pre>
          <p className="text-xs text-slate-500 mt-4">Deploy free: Railway.app | Render.com | Vercel</p>
        </div>
      </div>
    </div>
  );
}