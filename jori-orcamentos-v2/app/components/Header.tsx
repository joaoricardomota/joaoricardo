'use client';

import { Building2, Award } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo e Nome */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Building2 className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-secondary-900">
                  JORI PAPEL
                </h1>
                <p className="text-sm text-secondary-600 font-medium">
                  Sistema de Orçamentos
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="hidden md:flex items-center gap-3">
            <div className="badge bg-amber-100 text-amber-800 border border-amber-200">
              <Award className="w-3.5 h-3.5" />
              40 Anos de Mercado
            </div>
            <div className="badge badge-primary border border-primary-200">
              Distribuidor Oficial Santher
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
