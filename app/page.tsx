"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, BookOpen, Route, Award, ExternalLink, 
  Search, Plus, Download, Upload, Check, Bookmark, BookmarkCheck,
  Menu, X, ChevronDown, Target
} from "lucide-react";
import { DATA } from "@/lib/data";
import AIIcon from "@/components/AIIcon";

// Type definition for our LocalStorage state
type AppState = {
  checkpoints: Record<string, boolean>;
  savedResources: Record<string, boolean>;
  notes: Record<string, string>;
  customResources: Array<{
    topicId: string;
    type: string;
    title: string;
    url: string;
    why: string;
    availability: string;
  }>;
};

const defaultState: AppState = { checkpoints: {}, savedResources: {}, notes: {}, customResources: [] };

export default function Home() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [libraryMode, setLibraryMode] = useState("all");
  
  // Responsive / Layout State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // App State (Persisted)
  const [state, setState] = useState<AppState>(defaultState);
  
  // Topbar State
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResource, setNewResource] = useState({ topicId: "", type: "paper", title: "", url: "", why: "" });
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const trackDetailsRef = useRef<HTMLDivElement>(null);

  const { curriculum, roadmap, capstone } = DATA;

  // --- PERSISTENCE LOGIC ---
  useEffect(() => {
    const saved = localStorage.getItem("ai_mastery_os_state");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      const timeoutId = window.setTimeout(() => {
        setState(parsed);
      }, 0);

      return () => window.clearTimeout(timeoutId);
    } catch {
      console.error("Failed to load state");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ai_mastery_os_state", JSON.stringify(state));
  }, [state]);

  // --- ACTIONS ---
  const toggleCheckpoint = (id: string) => setState(prev => ({ ...prev, checkpoints: { ...prev.checkpoints, [id]: !prev.checkpoints[id] } }));
  const toggleSave = (id: string) => setState(prev => ({ ...prev, savedResources: { ...prev.savedResources, [id]: !prev.savedResources[id] } }));
  const updateNote = (id: string, text: string) => setState(prev => ({ ...prev, notes: { ...prev.notes, [id]: text } }));
  
  const handleNavClick = (view: string) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrackClick = (trackId: string) => {
    setActiveTrack(activeTrack === trackId ? null : trackId);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      trackDetailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const exportState = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-mastery-progress.json';
    a.click();
  };

  const importState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setState({ ...defaultState, ...parsed });
        alert("Progress imported successfully!");
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const saveCustomResource = () => {
    if (!newResource.title || !newResource.url || !newResource.topicId) return alert("Topic, Title, and URL are required.");
    setState(prev => ({
      ...prev,
      customResources: [...prev.customResources, { ...newResource, availability: "Added by you" }]
    }));
    setIsModalOpen(false);
    setNewResource({ topicId: "", type: "paper", title: "", url: "", why: "" });
  };

  // --- COMPUTED DATA ---
  const allTopics = curriculum.flatMap(t => t.topics.map(topic => ({ ...topic, trackName: t.track })));
  
  const allResources = curriculum.flatMap(track => 
    track.topics.flatMap(topic => [
      ...(topic.resources || []).map(r => ({ ...r, topicId: topic.id, trackName: track.track, topicName: topic.title, key: `${topic.id}-${r.title}` })),
      ...state.customResources.filter(cr => cr.topicId === topic.id).map(cr => ({ ...cr, topicId: topic.id, trackName: track.track, topicName: topic.title, key: `${topic.id}-${cr.title}` }))
    ])
  );

  const filteredResources = allResources.filter(r => {
  const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.why?.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesType = typeFilter === "all" || r.type === typeFilter;
  const matchesSaved = libraryMode === "all" || state.savedResources[r.key];
  return matchesSearch && matchesType && matchesSaved;
});

  const getTrackProgress = (track: typeof curriculum[0]) => {
    let totalCps = 0;
    let doneCps = 0;
    track.topics.forEach(t => {
      t.checkpoints.forEach((_, i) => {
        totalCps++;
        if (state.checkpoints[`${t.id}-cp-${i}`]) doneCps++;
      });
    });
    return { done: doneCps, total: totalCps, pct: totalCps ? Math.round((doneCps / totalCps) * 100) : 0 };
  };

  const globalTotalCheckpoints = curriculum.reduce((acc, t) => acc + getTrackProgress(t).total, 0);
  const globalDoneCheckpoints = curriculum.reduce((acc, t) => acc + getTrackProgress(t).done, 0);
  const globalSavedCount = Object.values(state.savedResources).filter(Boolean).length;

  return (
    <div className="flex min-h-screen bg-background text-[#f7f2ea] selection:bg-gold/30">
      
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside className={`w-72 fixed top-0 left-0 h-screen border-r border-border bg-background/95 lg:bg-background/80 backdrop-blur-xl flex flex-col z-50 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold via-aqua to-violet flex items-center justify-center text-background shadow-[0_0_20px_rgba(125,230,209,0.3)] flex-shrink-0">
                <AIIcon size={22} className="text-background stroke-[2.5]" />
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-tight text-white">AI Mastery OS</h1>
                <p className="text-muted text-[11px] uppercase tracking-wider mt-0.5">Production Pipeline</p>
              </div>
            </div>
            <button className="lg:hidden text-muted hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3 px-2">Navigate</div>
          <nav className="flex flex-col gap-1 mb-8">
            {[
              { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "library", label: "Library", icon: BookOpen },
              { id: "roadmap", label: "Roadmap", icon: Route },
              { id: "capstone", label: "Capstone", icon: Award },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm w-full text-left ${activeView === item.id ? "bg-surface text-white border border-border shadow-md" : "text-muted hover:text-white hover:bg-surface/50"}`}
              >
                <item.icon size={16} className={activeView === item.id ? "text-gold" : "opacity-70"} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3 px-2">Track Progress</div>
          <div className="flex flex-col gap-2 mb-8">
            {curriculum.map((track) => {
              const p = getTrackProgress(track);
              return (
                <button key={track.id} onClick={() => { setActiveView("Dashboard"); handleTrackClick(track.id); }} className={`p-3 rounded-lg border text-left transition-colors ${activeTrack === track.id && activeView === "Dashboard" ? "bg-surface border-border" : "border-transparent hover:bg-surface/50"}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold truncate mr-2">{track.track}</span>
                    <span className="text-[10px] text-muted whitespace-nowrap">{p.done}/{p.total} · {p.pct}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold to-aqua rounded-full transition-all duration-500" style={{ width: `${p.pct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3 px-2">Data</div>
          <div className="flex flex-col gap-2 pb-6">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-surface border border-border hover:border-gold/50 transition-colors text-white"><Plus size={14} className="text-gold"/> Add Resource</button>
            <button onClick={exportState} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-surface border border-border hover:border-white/30 transition-colors text-white"><Download size={14}/> Export JSON</button>
            <label className="flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-surface border border-border hover:border-white/30 transition-colors text-white cursor-pointer">
              <Upload size={14}/> Import JSON
              <input type="file" accept=".json" className="hidden" onChange={importState} />
            </label>
          </div>
        </div>
      </aside>

      {/* MAIN LAYOUT */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen w-full max-w-[100vw]">
        
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 lg:px-8 py-4 flex gap-4 items-center justify-between">
          <button className="lg:hidden text-muted hover:text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                placeholder="Search topics, questions, resources..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-aqua/50 transition-colors placeholder:text-muted"
              />
            </div>
          </div>

          <div className="hidden sm:flex items-center">
            {activeView === "library" && (
              <select 
                value={libraryMode} 
                onChange={(e) => setLibraryMode(e.target.value)}
                className="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none text-white appearance-none pr-8 relative cursor-pointer hidden sm:block mr-3"
                style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right .7rem top 50%", backgroundSize: ".65rem auto" }}
              >
                <option value="all" className="bg-[#0d0f15] text-white">All Library</option>
                <option value="saved" className="bg-[#0d0f15] text-white">Saved Only</option>
              </select>
            )}
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-surface border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none text-white appearance-none pr-8 relative cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right .7rem top 50%", backgroundSize: ".65rem auto" }}
            >
              <option value="all" className="bg-[#0d0f15] text-white">All resources</option>
              <option value="paper" className="bg-[#0d0f15] text-white">Paper</option>
              <option value="book" className="bg-[#0d0f15] text-white">Book</option>
              <option value="repo" className="bg-[#0d0f15] text-white">Repo</option>
              <option value="docs" className="bg-[#0d0f15] text-white">Docs</option>
              <option value="course" className="bg-[#0d0f15] text-white">Course</option>
              <option value="article" className="bg-[#0d0f15] text-white">Article</option>
            </select>
          </div>
        </header>

        {/* CONTENT VIEW */}
        <main className="p-4 sm:p-8 lg:p-12 w-full max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* Dashboard & TRACKS */}
            {activeView === "Dashboard" && (
              <motion.div key="Dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                
                {/* Hero */}
                <div className="mb-12 md:mb-16">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-[1.1]">
                    From surface-level to <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-aqua to-violet">systems mastery.</span>
                  </h1>
                  <p className="text-base md:text-lg text-muted max-w-2xl">A systematic environment for designing, testing, and deploying production-grade RAG and agent architectures. Move teams from basic prototypes to resilient systems with structured implementation tracks, reference standards, and validation benchmarks.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
                  {[
                    { label: "Mastery Topics", val: curriculum.reduce((acc, t) => acc + t.topics.length, 0) },
                    { label: "Validation Criteria", val: `${globalDoneCheckpoints}/${globalTotalCheckpoints}` },
                    { label: "Saved Resources", val: globalSavedCount },
                    { label: "Total Resources", val: allResources.length }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 md:p-5 rounded-2xl border border-border bg-surface">
                      <div className="text-2xl md:text-3xl font-black tracking-tighter mb-1">{stat.val}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">Execution Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12">
                  {curriculum.map((track, i) => {
                    const p = getTrackProgress(track);
                    return (
                      <div key={track.id} onClick={() => handleTrackClick(track.id)} className={`relative p-5 md:p-6 rounded-3xl border transition-all cursor-pointer group overflow-hidden ${activeTrack === track.id ? "bg-surface border-gold/50 shadow-[0_0_30px_rgba(243,201,105,0.1)]" : "bg-surface/50 border-border hover:border-white/20"}`}>
                        <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 transition-opacity group-hover:opacity-60" style={{ backgroundColor: track.accent.replace('0.15', '1') }} />
                        <div className="font-mono text-muted text-xs mb-4">0{i + 1} / {curriculum.length}</div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 tracking-tight">{track.track}</h3>
                        <p className="text-xs md:text-sm text-muted leading-relaxed mb-8">{track.goal}</p>
                        <div className="mt-auto">
                          <div className="flex justify-between text-xs text-muted mb-2 font-mono"><span>{p.done}/{p.total} CPs</span><span>{p.pct}%</span></div>
                          <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-gold to-aqua rounded-full" style={{ width: `${p.pct}%` }}/></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* TRACK DETAILS (Auto-Scroll Target) */}
                <div ref={trackDetailsRef} className="scroll-mt-32">
                  <AnimatePresence>
                    {activeTrack && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="pt-8 border-t border-border">
                        {curriculum.filter(t => t.id === activeTrack).map(track => (
                          <div key={`${track.id}-details`}>
                            <div className="flex flex-col mb-8">
                              <h3 className="text-2xl md:text-3xl font-bold mb-2">{track.track}</h3>
                              <p className="text-sm md:text-base text-muted max-w-2xl">{track.goal}</p>
                            </div>
                            
                            <div className="grid gap-6">
                              {track.topics.filter(topic => topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || topic.why.toLowerCase().includes(searchQuery.toLowerCase())).map((topic) => {
                                const topicResources = allResources.filter(r => r.topicId === topic.id && (typeFilter === "all" || r.type === typeFilter));
                                
                                return (
                                  <div key={topic.id} className="p-5 md:p-8 rounded-3xl border border-border bg-surface">
                                    <div className="text-xs text-aqua mb-3 font-mono font-bold tracking-wider uppercase">{topic.level}</div>
                                    <h4 className="text-xl md:text-2xl font-bold mb-3 tracking-tight">{topic.title}</h4>
                                    <p className="text-sm text-muted mb-6 leading-relaxed">{topic.why}</p>
                                    
                                    <div className="bg-gold/5 border border-gold/20 p-4 md:p-5 rounded-2xl mb-8">
                                      <span className="text-gold font-bold text-sm block mb-1 uppercase tracking-widest text-[11px]">Objective Specification</span>
                                      <span className="text-sm text-gray-200">{topic.deliverable}</span>
                                    </div>

                                    {topic.questions && topic.questions.length > 0 && (
                                      <div className="mb-8">
                                        <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">Architectural Review Questions</div>
                                        <div className="flex flex-wrap gap-2">
                                          {topic.questions.map((q, idx) => (
                                            <span key={idx} className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-gray-300">{q}</span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                      {/* CHECKPOINTS */}
                                      <div className="bg-background/50 p-5 md:p-6 rounded-2xl border border-border">
                                        <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-4">Validation Criteria</div>
                                        <ul className="space-y-4">
                                          {topic.checkpoints.map((cp, idx) => {
                                            const checkpointId = `${topic.id}-cp-${idx}`;
                                            const isChecked = state.checkpoints[checkpointId];
                                            return (
                                              <li key={idx} onClick={() => toggleCheckpoint(checkpointId)} className="flex items-start gap-3 text-sm cursor-pointer group">
                                                <div className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-colors border ${isChecked ? 'bg-aqua border-aqua text-background' : 'bg-surface border-border group-hover:border-white/50'}`}>
                                                  {isChecked && <Check size={14} strokeWidth={3} />}
                                                </div>
                                                <span className={`transition-all leading-relaxed ${isChecked ? 'line-through text-white/30' : 'text-gray-300 group-hover:text-white'}`}>{cp}</span>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                        
                                        {/* NOTES BOX */}
                                        <div className="mt-6 pt-6 border-t border-border">
                                          <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">Personal Notes</div>
                                          <textarea 
                                            value={state.notes[topic.id] || ""}
                                            onChange={(e) => updateNote(topic.id, e.target.value)}
                                            placeholder="Implementation ideas, failure cases, code links..."
                                            className="w-full bg-surface border border-border rounded-xl p-3 text-sm min-h-[100px] text-white focus:outline-none focus:border-aqua/50 placeholder:text-muted/50"
                                          />
                                        </div>
                                      </div>
                                      
                                      {/* RESOURCES */}
                                      {topicResources.length > 0 && (
                                        <div>
                                          <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-4">Resources</div>
                                          <div className="space-y-3">
                                            {topicResources.map((res, idx) => {
                                              const isSaved = state.savedResources[res.key];
                                              return (
                                                <div key={idx} className="block p-4 rounded-2xl border border-border bg-background/30 hover:bg-surface transition-colors group relative">
                                                  <div className="flex justify-between items-start mb-2">
                                                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${res.type === 'paper' ? 'text-violet bg-violet/10 border-violet/20' : res.type === 'repo' ? 'text-aqua bg-aqua/10 border-aqua/20' : 'text-gold bg-gold/10 border-gold/20'}`}>
                                                      {res.type}
                                                    </span>
                                                    <button onClick={(e) => { e.preventDefault(); toggleSave(res.key); }} className="text-muted hover:text-gold transition-colors z-10">
                                                      {isSaved ? <BookmarkCheck size={18} className="text-gold" /> : <Bookmark size={18} />}
                                                    </button>
                                                  </div>
                                                  <a href={res.url} target="_blank" rel="noopener noreferrer" className="block">
                                                    <div className="font-bold text-sm mb-1.5 group-hover:text-aqua transition-colors pr-6 flex items-center gap-2">
                                                      {res.title} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <div className="text-xs text-muted leading-relaxed mb-3">{res.why}</div>
                                                    <div className="text-[10px] text-muted/60 uppercase tracking-wider font-semibold">{res.availability}</div>
                                                  </a>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* LIBRARY VIEW */}
            {activeView === "library" && (
              <motion.div key="library" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-10 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Resource Library</h2>
                  <p className="text-sm md:text-base text-muted">All mapped papers, repositories, and documentation. Use the top bar to search or filter.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                  {filteredResources.map((res, i) => {
                    const isSaved = state.savedResources[res.key];
                    return (
                      <div key={i} className="p-4 md:p-5 rounded-2xl border border-border bg-surface flex flex-col h-full relative group">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border text-muted border-border bg-background">{res.type}</span>
                          <button onClick={() => toggleSave(res.key)} className="text-muted hover:text-gold transition-colors">
                            {isSaved ? <BookmarkCheck size={18} className="text-gold" /> : <Bookmark size={18} />}
                          </button>
                        </div>
                        <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex flex-col flex-grow">
                          <h3 className="font-bold text-sm md:text-base mb-2 group-hover:text-aqua transition-colors">{res.title}</h3>
                          <p className="text-xs text-muted mb-6 flex-grow leading-relaxed">{res.why}</p>
                          <div className="mt-auto text-[10px] text-muted border-t border-border pt-4 truncate uppercase tracking-widest font-semibold">
                            {res.trackName} <span className="opacity-50 mx-1">/</span> {res.topicName}
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ROADMAP VIEW */}
            {activeView === "roadmap" && (
              <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-10 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">6-Month Roadmap</h2>
                  <p className="text-sm md:text-base text-muted">Depth-first sequence: retrieval → advanced RAG → agent workflows → agent evaluation → productionization → observability.</p>
                </div>
                <div className="space-y-6">
                  {roadmap.map((phase, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8 rounded-3xl border border-border bg-surface items-center md:items-start">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-gold/20 to-violet/20 border border-gold/30 flex items-center justify-center font-black text-center leading-tight flex-shrink-0 shadow-lg shadow-gold/5">
                        {phase.month.replace(" ", "\n")}
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{phase.title}</h3>
                        <p className="text-sm md:text-base text-muted mb-6">{phase.goal}</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {phase.outputs.map((out, idx) => (
                            <span key={idx} className="px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20">
                              {out}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CAPSTONE VIEW */}
            {activeView === "capstone" && (
              <motion.div key="capstone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 <div className="mb-12 md:mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet/20 bg-violet/10 text-violet text-xs font-bold tracking-widest uppercase mb-6">Final Objective</div>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{capstone.title}</h2>
                  <p className="text-lg md:text-xl text-muted max-w-3xl">{capstone.thesis}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-6 md:p-8 rounded-3xl border border-border bg-surface">
                    <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3"><Target size={24} className="text-aqua"/> System Components</h3>
                    <ul className="space-y-4">
                      {capstone.components.map((c, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted text-sm"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-aqua flex-shrink-0" />{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 md:p-8 rounded-3xl border border-border bg-surface">
                    <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3 text-gold">Questions to Answer</h3>
                    <ul className="space-y-4">
                      {capstone.questions.map((q, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted text-sm"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />{q}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 md:p-8 rounded-3xl border border-border bg-surface">
                    <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3"><Award size={24} className="text-violet"/> Milestones</h3>
                    <ul className="space-y-4">
                      {capstone.milestones.map((m, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted text-sm"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet flex-shrink-0" />{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 md:p-8 rounded-3xl border border-border bg-surface">
                    <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3">Engineering Notes</h3>
                    <ul className="space-y-4">
                      {capstone.engineeringNotes.map((n, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted text-sm"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />{n}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* CUSTOM RESOURCE MODAL WITH CUSTOM DROPDOWNS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0d0f15] border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Add Custom Resource</h2>
            <div className="grid gap-4 mb-8">
              
              {/* Custom Topic Dropdown */}
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Topic</label>
                <button 
                  onClick={() => { setTopicDropdownOpen(!topicDropdownOpen); setTypeDropdownOpen(false); }}
                  className="w-full flex justify-between items-center bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none text-white text-left"
                >
                  <span className="truncate pr-4">
                    {newResource.topicId 
                      ? allTopics.find(t => t.id === newResource.topicId)?.title 
                      : "Select a topic..."}
                  </span>
                  <ChevronDown size={16} className="text-muted flex-shrink-0" />
                </button>
                
                {topicDropdownOpen && (
                  <ul className="absolute z-50 w-full mt-2 max-h-48 overflow-y-auto bg-[#0d0f15] border border-border rounded-xl shadow-2xl p-1">
                    {allTopics.map(t => (
                      <li 
                        key={t.id}
                        onClick={() => { setNewResource({ ...newResource, topicId: t.id }); setTopicDropdownOpen(false); }}
                        className="px-3 py-2.5 text-sm text-gray-300 hover:bg-surface hover:text-white rounded-lg cursor-pointer truncate"
                      >
                        {t.trackName} · {t.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Custom Type Dropdown */}
                <div className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Type</label>
                  <button 
                    onClick={() => { setTypeDropdownOpen(!typeDropdownOpen); setTopicDropdownOpen(false); }}
                    className="w-full flex justify-between items-center bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none text-white capitalize text-left"
                  >
                    <span>{newResource.type}</span>
                    <ChevronDown size={16} className="text-muted flex-shrink-0" />
                  </button>
                  
                  {typeDropdownOpen && (
                    <ul className="absolute z-50 w-full mt-2 bg-[#0d0f15] border border-border rounded-xl shadow-2xl p-1">
                      {["paper", "book", "repo", "docs", "course", "article"].map(type => (
                        <li 
                          key={type}
                          onClick={() => { setNewResource({ ...newResource, type }); setTypeDropdownOpen(false); }}
                          className="px-3 py-2.5 text-sm text-gray-300 hover:bg-surface hover:text-white rounded-lg cursor-pointer capitalize"
                        >
                          {type}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Title</label>
                  <input type="text" value={newResource.title} onChange={e => setNewResource({...newResource, title: e.target.value})} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none text-white" placeholder="Resource title" />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">URL</label>
                <input type="url" value={newResource.url} onChange={e => setNewResource({...newResource, url: e.target.value})} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none text-white" placeholder="https://" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">Why it matters</label>
                <textarea value={newResource.why} onChange={e => setNewResource({...newResource, why: e.target.value})} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm focus:outline-none text-white min-h-[80px]" placeholder="Brief note..." />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setIsModalOpen(false); setTopicDropdownOpen(false); setTypeDropdownOpen(false); }} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted hover:text-white transition-colors">Cancel</button>
              <button onClick={saveCustomResource} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gold text-background hover:bg-gold/90 transition-colors">Save Resource</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}