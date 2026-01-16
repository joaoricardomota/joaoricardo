'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Importar from '@/components/Importar';
import Contatos from '@/components/Contatos';
import Funil from '@/components/Funil';
import Agenda from '@/components/Agenda';
import EmailSender from '@/components/EmailSender';
import ContatoModal from '@/components/ContatoModal';
import { type Contato } from '@/lib/store';

export default function Home() {
  const [view, setView] = useState('dashboard');
  const [selectedContato, setSelectedContato] = useState<Contato | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Notificação */}
      {notification && (
        <div
          className={`fixed top-5 right-5 px-6 py-4 rounded-xl text-white font-semibold z-50 shadow-lg animate-slide-in ${
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}

      <Header view={view} setView={setView} />

      <main className="p-8 max-w-[1600px] mx-auto">
        {view === 'dashboard' && <Dashboard />}
        
        {view === 'importar' && (
          <Importar
            onComplete={() => setView('contatos')}
            showNotification={showNotification}
          />
        )}
        
        {view === 'contatos' && (
          <Contatos
            onViewContato={setSelectedContato}
            onNavigate={setView}
            showNotification={showNotification}
          />
        )}
        
        {view === 'funil' && (
          <Funil onViewContato={setSelectedContato} />
        )}
        
        {view === 'agenda' && <Agenda />}
        
        {view === 'email' && <EmailSender />}
      </main>

      {/* Modal de Contato */}
      {selectedContato && (
        <ContatoModal
          contato={selectedContato}
          onClose={() => setSelectedContato(null)}
        />
      )}
    </div>
  );
}
