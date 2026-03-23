import { useState, useEffect } from 'react';
import './StateModal.css';

const ALL_STATES = [
  { value: 'national', label: '🇮🇳 National (All States)', quick: true },
  { value: 'AN', label: 'Andaman & Nicobar Islands' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'DN', label: 'Dadra & Nagar Haveli' },
  { value: 'DD', label: 'Daman & Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu & Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'LA', label: 'Ladakh' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OD', label: 'Odisha' },
  { value: 'PY', label: 'Puducherry' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UK', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' },
];

export default function StateModal({ selectedState, onSelect, onClose }) {
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState(selectedState);

  const filtered = query.trim()
    ? ALL_STATES.filter(s =>
        s.label.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_STATES;

  // Close on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <h2 className="modal-title">Select a State or Union Territory</h2>
        <p className="modal-sub">Data will update for your chosen region across all charts and metrics.</p>

        <input
          className="modal-search"
          type="text"
          placeholder="Search states and UTs..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />

        {!query && (
          <>
            <div className="modal-section-lbl">Quick Select</div>
            <button
              className={`state-pill national ${pending === 'national' ? 'selected' : ''}`}
              onClick={() => setPending('national')}
            >
              🇮🇳 National (All States)
            </button>
          </>
        )}

        <div className="modal-section-lbl" style={{ marginTop: query ? 0 : 20 }}>
          {query ? `Results for "${query}"` : 'All States & UTs'}
        </div>

        <div className="state-pills">
          {filtered
            .filter(s => s.value !== 'national')
            .map(s => (
              <button
                key={s.value}
                className={`state-pill ${pending === s.value ? 'selected' : ''}`}
                onClick={() => setPending(s.value)}
              >
                {s.label}
              </button>
            ))}
        </div>

        <div className="modal-actions">
          <button
            className="btn-apply"
            onClick={() => onSelect(pending)}
          >
            Apply Filter
          </button>
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
