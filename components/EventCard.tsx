import React from 'react';
import { EventData } from '../types';
import { MapPinIcon, ClockIcon, TicketIcon, CalendarIcon } from './Icons';
import { CATEGORY_COLORS } from '../constants';

interface EventCardProps {
  event: EventData;
  onClick: (event: EventData) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const categoryColor = CATEGORY_COLORS[event.category] || CATEGORY_COLORS['Other'];

  return (
    <div 
      onClick={() => onClick(event)}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${categoryColor}`}>
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-sm text-red-600 font-medium">
             <CalendarIcon className="w-4 h-4 mr-1.5" />
             {event.date}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {event.title}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {event.description}
        </p>
        
        <div className="pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>
          {event.requirements && event.requirements.length > 0 && (
            <div className="flex items-center text-xs mt-2 bg-gray-50 p-2 rounded text-gray-500">
              <TicketIcon className="w-3 h-3 mr-2" />
              <span className="truncate">
                Requires: {event.requirements[0]} {event.requirements.length > 1 ? `+${event.requirements.length - 1} more` : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
