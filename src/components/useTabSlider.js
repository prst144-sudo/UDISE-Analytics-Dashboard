/**
 * useTabSlider — drives the CSS sliding pill and panel slide direction.
 *
 * Usage:
 *   const { tab, setTab, tabsRef, panelDir } = useTabSlider(TAB_KEYS);
 *
 *   <div className="socio-chart-tabs" ref={tabsRef}>
 *     <button className={`sct-tab ${tab==='a' ? 'sct-active' : ''}`} onClick={() => setTab('a')}>...</button>
 *     <button className={`sct-tab ${tab==='b' ? 'sct-active' : ''}`} onClick={() => setTab('b')}>...</button>
 *   </div>
 *
 *   {tab === 'a' && <div key={tab} data-dir={panelDir} className="socio-chart-panel">...</div>}
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export function useTabSlider(tabKeys, initial) {
  const first = initial ?? tabKeys[0];
  const [tab, _setTab] = useState(first);
  const [panelDir, setPanelDir] = useState('fwd');
  const tabsRef = useRef(null);
  const prevIndex = useRef(tabKeys.indexOf(first));

  // Measure and apply pill position
  const movePill = useCallback((activeTab) => {
    const container = tabsRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll('.sct-tab');
    const idx = tabKeys.indexOf(activeTab);
    if (idx < 0 || !buttons[idx]) return;
    const btn = buttons[idx];
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    container.style.setProperty('--pill-left', `${btnRect.left - containerRect.left}px`);
    container.style.setProperty('--pill-width', `${btnRect.width}px`);
  }, [tabKeys]);

  // Set pill on mount + tab change
  useEffect(() => {
    // slight delay so DOM is painted
    const id = requestAnimationFrame(() => movePill(tab));
    return () => cancelAnimationFrame(id);
  }, [tab, movePill]);

  // Re-measure on window resize
  useEffect(() => {
    const onResize = () => movePill(tab);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [tab, movePill]);

  const setTab = useCallback((newTab) => {
    const oldIdx = prevIndex.current;
    const newIdx = tabKeys.indexOf(newTab);
    setPanelDir(newIdx >= oldIdx ? 'fwd' : 'back');
    prevIndex.current = newIdx;
    _setTab(newTab);
  }, [tabKeys]);

  return { tab, setTab, tabsRef, panelDir };
}
