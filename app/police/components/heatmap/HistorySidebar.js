import { FaHistory, FaExclamationTriangle, FaBullhorn, FaFileAlt } from 'react-icons/fa';
import PanicHistoryCard from './PanicHistoryCard';
import IncidentHistoryCard from './IncidentHistoryCard';
import EfirHistoryCard from './EfirHistoryCard';

export default function HistorySidebar({ alerts, incidents, efirs, isOpen, onSelectItem, selectedItemId }) {
  return (
    <aside className={`absolute top-0 left-0 w-96 h-full bg-background text-foreground flex flex-col z-10 transform transition-transform duration-300 border-r border-border-color ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 border-b border-border-color">
        <h2 className="text-xl font-bold flex items-center text-gray-100">
          <FaHistory className="mr-3" />
          History Records
        </h2>
        <p className="text-sm text-gray-400">Past alerts, incidents, and E-FIRs</p>
      </div>

      <div className="flex-grow overflow-y-auto p-2">
        <div className="px-2 py-4">
            <h3 className="font-semibold text-red-400 flex items-center mb-2"><FaExclamationTriangle className="mr-2"/>Panic Alert History</h3>
             {alerts.map(alert => (
                <PanicHistoryCard key={alert.id} alert={alert} isSelected={selectedItemId === alert.id} onClick={() => onSelectItem(alert)} />
            ))}
        </div>

        <div className="px-2 py-4 border-t border-border-color">
            <h3 className="font-semibold text-amber-400 flex items-center mb-2"><FaBullhorn className="mr-2"/>Incident History</h3>
            {incidents.map(incident => (
                <IncidentHistoryCard key={incident.id} incident={incident} isSelected={selectedItemId === incident.id} onClick={() => onSelectItem(incident)}/>
            ))}
        </div>

        <div className="px-2 py-4 border-t border-border-color">
            <h3 className="font-semibold text-blue-400 flex items-center mb-2"><FaFileAlt className="mr-2"/>E-FIR Records</h3>
            {efirs.map(efir => (
                <EfirHistoryCard key={efir.id} efir={efir} isSelected={selectedItemId === efir.id} onClick={() => onSelectItem(efir)} />
            ))}
        </div>
      </div>
    </aside>
  );
}