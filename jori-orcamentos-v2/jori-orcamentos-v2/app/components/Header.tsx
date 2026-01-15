'use client';

import { Award } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo e Nome */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-14 w-auto">
                <img 
                  src="/logo-jori.jpeg" 
                  alt="Jori Papel" 
                  className="h-full w-auto object-contain"
                />
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
