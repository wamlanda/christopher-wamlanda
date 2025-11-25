import React, { useEffect } from 'react';
import { EventData } from '../types';
import { XIcon, MapPinIcon, ClockIcon, TicketIcon, CalendarIcon, ExternalLinkIcon } from './Icons';
import { CATEGORY_COLORS } from '../constants';

interface EventModalProps {
  event: EventData | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [event]);

  if (!event) return null;

  const categoryColor = CATEGORY_COLORS[event.category] || CATEGORY_COLORS['Other'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-[fadeIn_0.2s_ease-out]">
        
        {/* Header Image */}
        <div className="relative h-64 shrink-0">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white text-gray-900 transition-colors shadow-lg"
          >
            <XIcon className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4">
             <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-sm ${categoryColor}`}>
              {event.category}
            </span>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <CalendarIcon className="w-4 h-4 mr-2 text-red-500" />
                {event.date}
              </div>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <ClockIcon className="w-4 h-4 mr-2 text-blue-500" />
                {event.time}
              </div>
              <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                {event.location}, {event.city}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">About Event</h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {event.description}
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-start">
                <div className="p-2 bg-orange-100 rounded-lg mr-4">
                    <TicketIcon className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Requirements to Join</h3>
                  <ul className="space-y-2">
                    {event.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <span className="mr-2 mt-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0"></span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                  {event.requirements.length === 0 && (
                      <p className="text-gray-500 italic">No specific requirements listed.</p>
                  )}
                </div>
              </div>
            </div>

            {event.sourceUrl && (
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <a 
                        href={event.sourceUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Visit Event Page
                        <ExternalLinkIcon className="w-4 h-4 ml-2" />
                    </a>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
