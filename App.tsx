import React, { useState, useEffect, useCallback } from 'react';
import { CITIES } from './constants';
import { City, EventData, LoadingState } from './types';
import { fetchEventsForCity } from './services/gemini';
import Header from './components/Header';
import CitySelector from './components/CitySelector';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';
import { SearchIcon, CalendarIcon } from './components/Icons';

function App() {
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadEvents = useCallback(async (city: City) => {
    setLoadingState('loading');
    setErrorMsg(null);
    setEvents([]); // Clear previous events immediately for better UX indicating change
    
    try {
      const data = await fetchEventsForCity(city.name);
      setEvents(data);
      setLoadingState('success');
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load events. Please try again or check your connection.");
      setLoadingState('error');
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadEvents(selectedCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const handleCitySelect = (city: City) => {
    if (city.slug === selectedCity.slug) return;
    setSelectedCity(city);
    loadEvents(city);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero / City Info */}
        <div className="bg-white pb-6 pt-8 px-4">
            <div className="max-w-6xl mx-auto text-center mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                    Events in <span className="text-red-600 underline decoration-red-200 decoration-4 underline-offset-4">{selectedCity.name}</span>
                </h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">{selectedCity.description}</p>
            </div>
        </div>

        {/* Sticky City Selector */}
        <div className="sticky top-16 z-40 bg-white">
            <CitySelector selectedCity={selectedCity} onSelectCity={handleCitySelect} />
        </div>

        {/* Main Content Area */}
        <div className="max-w-6xl mx-auto px-4 py-8 min-h-[50vh]">
            
            {loadingState === 'loading' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 h-96 animate-pulse border border-gray-100">
                            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            )}

            {loadingState === 'error' && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-red-50 p-4 rounded-full mb-4">
                        <SearchIcon className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong.</h3>
                    <p className="text-gray-600 mb-6">{errorMsg}</p>
                    <button 
                        onClick={() => loadEvents(selectedCity)}
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {loadingState === 'success' && events.length === 0 && (
                 <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <CalendarIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600">We couldn't find any specific upcoming events for {selectedCity.name} right now.</p>
                </div>
            )}

            {loadingState === 'success' && events.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <EventCard 
                            key={event.id} 
                            event={event} 
                            onClick={setSelectedEvent} 
                        />
                    ))}
                </div>
            )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Tukio Kenya. Powered by Gemini.
            </p>
        </div>
      </footer>

      {/* Modal Layer */}
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </div>
  );
}

export default App;