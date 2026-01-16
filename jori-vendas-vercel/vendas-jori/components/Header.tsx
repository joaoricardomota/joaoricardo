'use client';

import { LayoutDashboard, Upload, Users, Target, Calendar, Mail } from 'lucide-react';

interface HeaderProps {
  view: string;
  setView: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'importar', label: 'Importar', icon: Upload },
  { id: 'contatos', label: 'Contatos', icon: Users },
  { id: 'funil', label: 'Funil', icon: Target },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'email', label: 'E-mail', icon: Mail },
];

export default function Header({ view, setView }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary px-8 py-5 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-extrabold text-xl text-white">
          JP
        </div>
        <div>
          <h1 className="text-white text-2xl font-bold">Jori Papel</h1>
          <p className="text-white/70 text-sm">Sistema de Gestão de Vendas</p>
        </div>
      </div>

      <nav className="flex gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm text-white transition-all ${
                view === item.id
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
