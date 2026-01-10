'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '@/store/useTaskStore';
import { Task, TaskPriority } from '@/types';
import { useRouter } from 'next/navigation';

// --- 1. Icons Definition (Must be present!) ---
const Icons = {
  Plus: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
  ),
  Trash: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
  ),
  Edit: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
  ),
  Calendar: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
  ),
  Check: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
  ),
  Grid: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
  ),
  List: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
  ),
  Search: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
  ),
  Sort: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
  ),
  Tag: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
  ),
  Filter: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
  ),
  Logout: ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12" /></svg>
  )
};

// --- 2. Components ---

const AuroraCard = ({ children, className = "", onClick }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.005, transition: { duration: 0.3 } }}
    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    onClick={onClick} 
    className={`relative overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] border-t-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-[24px] ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
    {children}
  </motion.div>
);

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const config = {
    high: { color: 'text-rose-300', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    medium: { color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    low: { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  };
  const style = config[priority];

  return (
    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest border ${style.bg} ${style.border} ${style.color} backdrop-blur-md`}>
      {priority}
    </span>
  );
};

// --- 3. Task Item ---

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isGrid?: boolean;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit, isGrid = false }: TaskItemProps) => {
  
  // Safe Tag Handling (Handles both Array and String from backend)
  let displayTags: string[] = [];
  if (Array.isArray(task.tags)) {
    displayTags = task.tags;
  } else if (typeof task.tags === 'string') {
    displayTags = (task.tags as string).split(',').map(t => t.trim()).filter(t => t !== '');
  }

  // Proper Date Formatting
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <motion.div
      layout
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative h-full`}
    >
      <AuroraCard className={`p-5 flex flex-col gap-3 h-full justify-between hover:bg-white/[0.04] transition-all duration-300`}>
        <div className="absolute -inset-px rounded-[24px] bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="flex items-start gap-4 z-10 relative">
          <button
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              task.status === 'completed' 
                ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]' 
                : 'border-white/20 hover:border-indigo-400 bg-white/5 hover:bg-white/10'
            }`}
          >
            {task.status === 'completed' && <Icons.Check className="w-3 h-3 text-white" />}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-base leading-tight truncate pr-4 transition-all duration-300 ${
              task.status === 'completed' ? 'text-white/30 line-through' : 'text-white/90'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-xs text-white/50 mt-1 leading-relaxed ${isGrid ? 'line-clamp-2' : 'line-clamp-1'}`}>
                {task.description}
              </p>
            )}

            {/* Tags Display */}
            {displayTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {displayTags.map((tag, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 font-medium uppercase tracking-wide whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between mt-auto pt-3 border-t border-white/5 z-10 relative">
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={task.priority} />
            {task.dueDate && (
              <span className="flex items-center gap-1 text-[9px] text-white/40 font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                <Icons.Calendar className="w-3 h-3" /> {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button onClick={() => onEdit(task)} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Icons.Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => onDelete(task.id)} className="p-1.5 text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"><Icons.Trash className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </AuroraCard>
    </motion.div>
  );
};

// --- 4. Main Page ---

export default function DashboardPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortType, setSortType] = useState<'date' | 'priority' | 'alpha'>('date');

  // Use 'stats' from the store (populated by the backend)
  const { tasks, stats, user, loading, error, fetchCurrentUser, fetchTasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useTaskStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'completed' | 'high' | 'medium' | 'low'>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    dueDate: '',
    tags: ''
  });

  useEffect(() => {
    setIsClient(true);
    fetchCurrentUser();
    fetchTasks();
  }, []);

  useEffect(() => { if (isClient && !user && !loading) router.push('/login'); }, [isClient, user, loading, router]);

  // Sync error from store to local state
  useEffect(() => {
    if (isClient) {
      setErrorMessage(error);
    }
  }, [error, isClient]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  const handleSaveTask = async () => {
    if (taskForm.title.trim()) {
      const tagsArray = taskForm.tags.split(',').map(t => t.trim()).filter(t => t !== '');
      const payload = {
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
        dueDate: taskForm.dueDate ? new Date(taskForm.dueDate) : undefined,
        tags: tagsArray
      };

      if (editingTask) {
        await updateTask(editingTask.id, payload);
      } else {
        await addTask(payload);
      }
      setShowModal(false);
      // Clear any error after successful save
      useTaskStore.getState().setError(null);
    }
  };

  const handleDelete = async (id: string) => {
      await deleteTask(id);
  };

  const handleToggle = async (id: string) => {
      await toggleTaskStatus(id);
  };

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (filterType === 'pending') matchesFilter = task.status === 'pending';
      else if (filterType === 'completed') matchesFilter = task.status === 'completed';
      else if (['high', 'medium', 'low'].includes(filterType)) matchesFilter = task.priority === filterType;

      return matchesSearch && matchesFilter;
    });

    return result.sort((a, b) => {
      if (sortType === 'alpha') return a.title.localeCompare(b.title);
      if (sortType === 'priority') {
        const map = { high: 3, medium: 2, low: 1 };
        return map[b.priority] - map[a.priority];
      }
      if (sortType === 'date') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });
  }, [tasks, searchQuery, filterType, sortType]);

  const openModal = (task?: Task) => {
    if (task) {
      setEditingTask(task);
      let tagString = '';
      if (Array.isArray(task.tags)) tagString = task.tags.join(', ');
      else if (typeof task.tags === 'string') tagString = task.tags;

      setTaskForm({ 
        title: task.title, 
        description: task.description || '', 
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
        tags: tagString
      });
    } else {
      setEditingTask(null);
      setTaskForm({ title: '', description: '', priority: 'medium', dueDate: '', tags: '' });
    }
    setShowModal(true);
  };

  if (!isClient || !user) return <div className="min-h-screen bg-[#020204]" />;

  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#020204] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-20">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse duration-[10s]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-2000 duration-[12s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-200 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">

        {/* Error message display */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-sm">
            Error: {errorMessage}
          </div>
        )}

        <header className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div>
            <h1 className="text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
              Dashboard<span className="text-indigo-500">.</span>
            </h1>
            <p className="text-white/40 font-medium ml-1 text-lg">
              Hello, <span className="text-white">{user?.fullName}</span>. You have <span className="text-indigo-400">{pendingCount} tasks</span> remaining.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto items-center">
            <div className="relative group w-full lg:w-auto">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30"><Icons.Search className="w-5 h-5" /></div>
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-64 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl py-3.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:bg-white/[0.08] focus:border-indigo-500/50 transition-all shadow-xl"
              />
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => openModal()}
                  className="flex-1 lg:flex-none bg-white text-black px-6 py-3.5 rounded-2xl font-bold text-sm shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] transition-shadow flex items-center justify-center gap-2"
                >
                  <Icons.Plus className="w-5 h-5" /> Create
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleLogout}
                  className="bg-white/5 text-white/60 hover:text-white border border-white/10 px-4 py-3.5 rounded-2xl font-medium text-sm transition-all flex items-center justify-center backdrop-blur-md"
                  title="Logout"
                >
                  <Icons.Logout className="w-5 h-5" />
                </motion.button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 h-auto md:h-64">
          <AuroraCard className="md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between h-64 md:h-full relative overflow-hidden">
              <div className="absolute right-[-20%] top-[-20%] w-60 h-60 bg-indigo-500/30 blur-[80px] rounded-full" />
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-indigo-200/80 font-bold uppercase tracking-widest text-xs mb-2">Productivity</h3>
                  <span className="text-white/40 text-xs font-mono uppercase border border-white/10 px-2 py-1 rounded-full">{stats.completedTasks}/{stats.totalTasks} Tasks</span>
                </div>
                <p className="text-7xl font-bold tracking-tighter text-white">{Math.round(stats.productivityScore)}%</p>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
                <motion.div initial={{ width: 0 }} animate={{ width: `${stats.productivityScore}%` }} transition={{ duration: 1 }} className="h-full bg-indigo-500 shadow-[0_0_15px_indigo]" />
              </div>
          </AuroraCard>

          <AuroraCard className="p-6 flex flex-col justify-center h-28 md:h-auto">
              <h3 className="text-emerald-200/60 font-bold uppercase tracking-widest text-[10px]">Completed Today</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-4xl font-bold tracking-tighter text-white">{stats.completedToday}</p>
                <Icons.Check className="w-6 h-6 text-emerald-400" />
              </div>
          </AuroraCard>

           <AuroraCard className="p-6 flex flex-col justify-center h-28 md:h-auto">
              <h3 className="text-amber-200/60 font-bold uppercase tracking-widest text-[10px]">Due Soon</h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-4xl font-bold tracking-tighter text-white">{stats.tasksDueSoon}</p>
                <Icons.Calendar className="w-6 h-6 text-amber-400" />
              </div>
          </AuroraCard>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-60 flex-shrink-0">
              <div className="sticky top-10 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-white/20 text-[10px] font-bold uppercase tracking-widest pl-1">Controls</h3>
                  <AuroraCard className="p-1.5 flex gap-1">
                    {(['list', 'grid'] as const).map(mode => (
                      <button key={mode} onClick={() => setViewMode(mode)} className={`flex-1 flex justify-center py-2 rounded-xl transition-all ${viewMode === mode ? 'bg-white text-black shadow' : 'text-white/40 hover:text-white'}`}>
                         {mode === 'grid' ? <Icons.Grid className="w-4 h-4" /> : <Icons.List className="w-4 h-4" />}
                      </button>
                    ))}
                  </AuroraCard>
                  <AuroraCard className="p-1.5 flex flex-col gap-1">
                    <button onClick={() => setSortType('date')} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${sortType === 'date' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                      <Icons.Calendar className="w-3.5 h-3.5" /> <span className="text-xs font-medium">Date</span>
                    </button>
                    <button onClick={() => setSortType('priority')} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${sortType === 'priority' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                      <Icons.Grid className="w-3.5 h-3.5" /> <span className="text-xs font-medium">Priority</span>
                    </button>
                    <button onClick={() => setSortType('alpha')} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${sortType === 'alpha' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                      <Icons.Filter className="w-3.5 h-3.5" /> <span className="text-xs font-medium">A-Z</span>
                    </button>
                  </AuroraCard>
                </div>
                <div>
                  <h3 className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-3 pl-1">Filters</h3>
                  <div className="space-y-1">
                    {[{ id: 'all', label: 'All Tasks' }, { id: 'pending', label: 'Pending' }, { id: 'completed', label: 'Done' }, { id: 'high', label: 'High Priority' }, { id: 'medium', label: 'Medium' }, { id: 'low', label: 'Low' }].map(f => (
                      <button key={f.id} onClick={() => setFilterType(f.id as any)} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filterType === f.id ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          <div className="flex-1 min-w-0">
              <motion.div layout className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-3'}>
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedTasks.length === 0 ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-40">
                       <Icons.Search className="w-12 h-12 mb-4" />
                       <p>No tasks found.</p>
                    </div>
                  ) : (
                    filteredAndSortedTasks.map((task) => (
                      <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} onEdit={openModal} isGrid={viewMode === 'grid'} />
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#09090b]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden"
            >
              <h2 className="text-xl font-bold text-white mb-6 pl-1">{editingTask ? 'Edit Task' : 'New Task'}</h2>
              <div className="space-y-4">
                <input className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.08] focus:border-indigo-500/50 transition-all text-lg font-medium" placeholder="Task title..." value={taskForm.title} onChange={e => setTaskForm({...taskForm, title: e.target.value})} autoFocus />
                <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.08] focus:border-indigo-500/50 transition-all min-h-[80px] text-sm resize-none" placeholder="Details..." value={taskForm.description} onChange={e => setTaskForm({...taskForm, description: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <label className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-1 block pl-1">Due Date</label>
                    <input type="date" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:bg-white/[0.08] [color-scheme:dark]" value={taskForm.dueDate} onChange={e => setTaskForm({...taskForm, dueDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-1 block pl-1">Priority</label>
                    <div className="flex gap-1">
                      {['low', 'medium', 'high'].map(p => (
                        <button key={p} onClick={() => setTaskForm({...taskForm, priority: p as TaskPriority})} className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all border ${taskForm.priority === p ? 'bg-white text-black border-white shadow-lg' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-white/30 font-bold mb-1 block pl-1">Tags (Comma separated)</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"><Icons.Tag className="w-4 h-4" /></div>
                      <input className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:bg-white/[0.08]" placeholder="work, home, urgent..." value={taskForm.tags} onChange={e => setTaskForm({...taskForm, tags: e.target.value})} />
                    </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white transition-colors">Cancel</button>
                <button onClick={handleSaveTask} className="bg-white hover:bg-white/90 text-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all">{editingTask ? 'Save' : 'Create'}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
