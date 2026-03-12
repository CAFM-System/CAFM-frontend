import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";

// ─── DB / SERVICE ─────────────────────────────────────────────────────────────
const DB_KEY = "umgmt_v2";
const db = {
  read: () => { try { return JSON.parse(localStorage.getItem(DB_KEY)) || { users: [] }; } catch { return { users: [] }; } },
  write: (d) => localStorage.setItem(DB_KEY, JSON.stringify(d)),
  all:   ()  => db.read().users,
  save:  (u) => { const d = db.read(); d.users.push(u); db.write(d); },
  put:   (id, patch) => {
    const d = db.read();
    const i = d.users.findIndex(u => u.id === id);
    if (i < 0) throw new Error("Not found");
    d.users[i] = { ...d.users[i], ...patch, updatedAt: new Date().toISOString() };
    db.write(d); return d.users[i];
  },
  del:      (id) => { const d = db.read(); d.users = d.users.filter(u => u.id !== id); db.write(d); },
  hasEmail: (e, ex) => db.read().users.some(u => u.email.toLowerCase() === e.toLowerCase() && u.id !== ex),
  hasNic:   (n, ex) => db.read().users.some(u => u.nic === n && u.id !== ex),
};
const svc = {
  all:  () => Promise.resolve(db.all()),
  register: (data) => {
    if (db.hasEmail(data.email)) return Promise.reject(new Error("Email already registered"));
    if (db.hasNic(data.nic))     return Promise.reject(new Error("NIC / Passport already in use"));
    const u = { ...data, id: `u_${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: "active" };
    db.save(u); return Promise.resolve(u);
  },
  update: (id, data) => {
    if (db.hasEmail(data.email, id)) return Promise.reject(new Error("Email already in use"));
    if (db.hasNic(data.nic, id))     return Promise.reject(new Error("NIC / Passport already in use"));
    return Promise.resolve(db.put(id, data));
  },
  delete:     (id) => { db.del(id); return Promise.resolve(); },
  unregister: (id) => Promise.resolve(db.put(id, { status: "unregistered" })),
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ROLES     = ["Admin", "Technician", "Resident"];
const TECHTYPES = ["Plumber", "Electrical", "Electronic", "Cleaner"];
const ROLE_BADGE  = {
  Admin:      "bg-[#EAB308]/15 text-[#EAB308] ring-1 ring-[#EAB308]/30",
  Technician: "bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/30",
  Resident:   "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30",
};
const ROLE_AVATAR = {
  Admin:      "bg-[#EAB308]/20 text-[#EAB308]",
  Technician: "bg-sky-500/20 text-sky-400",
  Resident:   "bg-emerald-500/20 text-emerald-400",
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const I = ({ d, s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d={d} />
  </svg>
);
const Ic = {
  sun:     () => <I d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />,
  moon:    () => <I d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  plus:    () => <I d="M12 5v14M5 12h14" />,
  search:  () => <I d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />,
  edit:    () => <I d="M11 4H4a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />,
  trash:   () => <I d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />,
  unreg:   () => <I d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 11l-4 4M19 11l4 4" />,
  x:       () => <I d="M18 6L6 18M6 6l12 12" />,
  chevron: () => <I d="M6 9l6 6 6-6" s={14} />,
};

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
function ThemeToggle({ isDarkMode, toggleTheme, border, subText }) {
  return (
    <button onClick={toggleTheme}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer
        ${border} ${subText} hover:border-[#EAB308] hover:text-[#EAB308] transition-all duration-200`}>
      <span className={`relative w-8 h-[18px] rounded-full transition-colors duration-300
        ${isDarkMode ? "bg-[#EAB308]/25" : "bg-zinc-200"}`}>
        <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-[#EAB308] shadow
          transition-all duration-300 ${isDarkMode ? "left-[18px]" : "left-0.5"}`} />
      </span>
      {isDarkMode ? <Ic.moon /> : <Ic.sun />}
      <span className="text-xs font-bold hidden sm:block">{isDarkMode ? "Dark" : "Light"}</span>
    </button>
  );
}

// ─── FORM MODAL ───────────────────────────────────────────────────────────────
const EMPTY_FORM = { name: "", email: "", nic: "", phone: "", role: "Resident", techType: "", apartmentNumber: "", status: "active" };

function UserFormModal({ initial, onSave, onCancel, error, theme }) {
  const { cardBg, text, subText, border, inputBg, isDarkMode } = theme;
  const [form, setForm] = useState(initial ? { ...EMPTY_FORM, ...initial } : EMPTY_FORM);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const iCls = `w-full px-3 py-2.5 rounded-xl border text-sm outline-none
    focus:border-[#EAB308] transition-colors duration-150 ${inputBg}`;
  const lCls = `block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${subText}`;

  const submit = () => {
    const payload = { ...form };
    if (payload.role !== "Technician") delete payload.techType;
    if (payload.role !== "Resident")   delete payload.apartmentNumber;
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl border shadow-2xl max-h-[92vh] overflow-y-auto ${cardBg}`}>

        {/* Mobile handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-zinc-400/40" />
        </div>

        <div className="px-5 pt-4 pb-6 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className={`text-lg font-bold ${text}`}>{initial?.id ? "Edit User" : "Register User"}</h2>
              <p className={`text-xs mt-0.5 ${subText}`}>{initial?.id ? "Update account details" : "Create a new system account"}</p>
            </div>
            <button onClick={onCancel}
              className={`p-2 rounded-xl border cursor-pointer ${border} ${subText}
                hover:border-[#EAB308] hover:text-[#EAB308] transition-all`}>
              <Ic.x />
            </button>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ⚠ {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className={lCls}>Full Name *</label>
              <input className={iCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Ayesha Fernando" />
            </div>
            <div>
              <label className={lCls}>Email Address *</label>
              <input className={iCls} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="ayesha@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lCls}>NIC / Passport *</label>
                <input className={iCls} value={form.nic} onChange={e => set("nic", e.target.value)} placeholder="123456789V" />
              </div>
              <div>
                <label className={lCls}>Phone</label>
                <input className={iCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+94 77 …" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lCls}>Role *</label>
                <select className={`${iCls} cursor-pointer`} value={form.role} onChange={e => set("role", e.target.value)}>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className={lCls}>Status</label>
                <select className={`${iCls} cursor-pointer`} value={form.status} onChange={e => set("status", e.target.value)}>
                  <option value="active">Active</option>
                  <option value="unregistered">Unregistered</option>
                </select>
              </div>
            </div>
            {form.role === "Technician" && (
              <div>
                <label className={lCls}>Technician Type *</label>
                <select className={`${iCls} cursor-pointer`} value={form.techType} onChange={e => set("techType", e.target.value)}>
                  <option value="">— Select Type —</option>
                  {TECHTYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            )}
            {form.role === "Resident" && (
              <div>
                <label className={lCls}>Apartment Number *</label>
                <input className={iCls} value={form.apartmentNumber} onChange={e => set("apartmentNumber", e.target.value)} placeholder="e.g. B-304" />
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onCancel}
              className={`flex-1 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer
                ${border} ${subText} hover:border-[#EAB308] hover:text-[#EAB308] transition-all`}>
              Cancel
            </button>
            <button onClick={submit}
              className="flex-1 py-2.5 rounded-xl bg-[#EAB308] text-[#18181B] text-sm font-bold
                hover:bg-[#EAB308]/90 active:scale-[.98] transition-all shadow-lg shadow-[#EAB308]/20 cursor-pointer">
              {initial?.id ? "Save Changes" : "Register User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONFIRM MODAL ────────────────────────────────────────────────────────────
function ConfirmModal({ msg, danger, onConfirm, onCancel, theme }) {
  const { cardBg, text, subText, border } = theme;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-xs rounded-2xl border p-5 shadow-2xl ${cardBg}`}>
        <p className={`text-sm leading-relaxed mb-5 ${text}`}>{msg}</p>
        <div className="flex gap-2">
          <button onClick={onCancel}
            className={`flex-1 py-2 rounded-xl border text-sm font-semibold cursor-pointer
              ${border} ${subText} hover:border-[#EAB308] hover:text-[#EAB308] transition-all`}>
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`flex-1 py-2 rounded-xl text-sm font-bold cursor-pointer transition-all
              ${danger ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#EAB308] hover:bg-[#EAB308]/90 text-[#18181B]"}`}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MOBILE USER CARD ─────────────────────────────────────────────────────────
function UserCard({ u, onEdit, onDelete, onUnregister, theme }) {
  const { cardBg, text, subText, border } = theme;
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${cardBg}`}>
      <div className="p-4 flex items-start gap-3 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${ROLE_AVATAR[u.role]}`}>
          {u.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold ${text}`}>{u.name}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-bold ${ROLE_BADGE[u.role]}`}>
              {u.role}{u.techType ? ` · ${u.techType}` : ""}
            </span>
          </div>
          <p className={`text-xs mt-0.5 truncate ${subText}`}>{u.email}</p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className={`text-[11px] font-mono ${subText}`}>{u.nic}</span>
            {u.apartmentNumber && <span className={`text-[11px] ${subText}`}>Apt {u.apartmentNumber}</span>}
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-400" : "bg-yellow-400"}`} />
              <span className={`text-[11px] ${subText}`}>{u.status === "active" ? "Active" : "Unregistered"}</span>
            </span>
          </div>
        </div>
        <span className={`mt-1 transition-transform duration-200 ${open ? "rotate-180" : ""} ${subText}`}>
          <Ic.chevron />
        </span>
      </div>

      {open && (
        <div className={`px-4 pb-4 pt-3 border-t flex gap-2 ${border}`}>
          <button onClick={() => onEdit(u)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer
              ${border} ${subText} hover:border-[#EAB308] hover:text-[#EAB308] transition-all`}>
            <Ic.edit /> Edit
          </button>
          <button onClick={() => onUnregister(u)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer
              ${border} ${subText} hover:border-yellow-400 hover:text-yellow-400 transition-all`}>
            <Ic.unreg /> Unregister
          </button>
          <button onClick={() => onDelete(u)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer
              ${border} ${subText} hover:border-red-500 hover:text-red-500 transition-all`}>
            <Ic.trash /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function UserManagement() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme, bg, cardBg, text, subText, border, inputBg } = theme;

  const [users,       setUsers]       = useState([]);
  const [search,      setSearch]      = useState("");
  const [roleFilter,  setRoleFilter]  = useState("All");
  const [techFilter,  setTechFilter]  = useState("All");
  const [showForm,    setShowForm]    = useState(false);
  const [editUser,    setEditUser]    = useState(null);
  const [formError,   setFormError]   = useState("");
  const [confirm,     setConfirm]     = useState(null);
  const [toast,       setToast]       = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const load = useCallback(() => svc.all().then(setUsers), []);
  useEffect(() => { load(); }, [load]);

  const notify = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || [u.name, u.email, u.nic, u.apartmentNumber, u.techType]
      .some(v => v?.toLowerCase().includes(q));
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchTech = roleFilter !== "Technician" || techFilter === "All" || u.techType === techFilter;
    return matchSearch && matchRole && matchTech;
  });

  const counts = {
    All: users.length,
    ...ROLES.reduce((a, r) => ({ ...a, [r]: users.filter(u => u.role === r).length }), {}),
  };

  const openEdit  = (u) => { setEditUser(u); setFormError(""); setShowForm(true); };
  const openNew   = ()  => { setEditUser(null); setFormError(""); setShowForm(true); };
  const closeForm = ()  => { setShowForm(false); setEditUser(null); };

  const handleSave = async (data) => {
    setFormError("");
    try {
      if (editUser?.id) { await svc.update(editUser.id, data); notify("User updated"); }
      else              { await svc.register(data);            notify("User registered"); }
      closeForm(); load();
    } catch (e) { setFormError(e.message); }
  };

  const askDelete     = (u) => setConfirm({ msg: `Permanently delete "${u.name}"? This cannot be undone.`, danger: true,  go: async () => { await svc.delete(u.id);     load(); notify("User deleted", "err"); } });
  const askUnregister = (u) => setConfirm({ msg: `Unregister "${u.name}"? They will lose system access.`, danger: false, go: async () => { await svc.unregister(u.id); load(); notify("User unregistered"); } });

  const Chip = ({ label, active, onClick, count }) => (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-all
        ${active
          ? "bg-[#EAB308] text-[#18181B] shadow-md shadow-[#EAB308]/20"
          : `border ${border} ${subText} hover:border-[#EAB308] hover:text-[#EAB308]`}`}>
      {label}{count !== undefined ? ` (${count})` : ""}
    </button>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3 flex-wrap">
          <div>
            <h1 className={`text-xl sm:text-3xl font-bold tracking-tight ${text}`}>User Management</h1>
            <p className={`text-xs sm:text-sm mt-0.5 ${subText}`}>Residents · Technicians · Admins</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} border={border} subText={subText} />
            <button onClick={openNew}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl cursor-pointer
                bg-[#EAB308] text-[#18181B] text-xs sm:text-sm font-bold
                hover:bg-[#EAB308]/90 active:scale-[.97] transition-all shadow-lg shadow-[#EAB308]/25">
              <Ic.plus />
              <span className="hidden sm:inline">Register User</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-5">
          {[
            { label: "Total Users",  value: counts.All,        color: "#EAB308" },
            { label: "Admins",       value: counts.Admin,      color: "#EAB308" },
            { label: "Technicians",  value: counts.Technician, color: "#38bdf8" },
            { label: "Residents",    value: counts.Resident,   color: "#34d399" },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border p-3 sm:p-4 ${cardBg}`}>
              <div className="text-2xl sm:text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-0.5 ${subText}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── SEARCH + FILTERS ── */}
        <div className={`rounded-2xl border p-3 sm:p-4 mb-4 ${cardBg}`}>
          <div className="relative mb-3">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${subText}`}><Ic.search /></span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, NIC, apartment…"
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none
                focus:border-[#EAB308] transition-colors ${inputBg}`}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${subText} mr-1`}>Role:</span>
            {["All", ...ROLES].map(r => (
              <Chip key={r} label={r} count={counts[r]} active={roleFilter === r}
                onClick={() => { setRoleFilter(r); setTechFilter("All"); }} />
            ))}
          </div>

          {roleFilter === "Technician" && (
            <div className={`flex gap-2 flex-wrap items-center mt-3 pt-3 border-t ${border}`}>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${subText} mr-1`}>Type:</span>
              {["All", ...TECHTYPES].map(t => (
                <Chip key={t} label={t} active={techFilter === t} onClick={() => setTechFilter(t)} />
              ))}
            </div>
          )}
        </div>

        {/* ── MOBILE: CARDS ── */}
        <div className="sm:hidden space-y-2">
          {filtered.length === 0 ? (
            <div className={`rounded-2xl border py-14 text-center ${cardBg}`}>
              <div className="text-4xl mb-2">🔍</div>
              <p className={`text-sm font-semibold ${text}`}>No users found</p>
              <p className={`text-xs mt-1 ${subText}`}>Adjust filters or register someone</p>
            </div>
          ) : filtered.map(u => (
            <UserCard key={u.id} u={u} theme={theme}
              onEdit={openEdit} onDelete={askDelete} onUnregister={askUnregister} />
          ))}
        </div>

        {/* ── DESKTOP: TABLE ── */}
        <div className={`hidden sm:block rounded-2xl border overflow-hidden ${cardBg}`}>
          {/* Head */}
          <div className={`grid gap-4 px-5 py-3 border-b ${border}
            ${isDarkMode ? "bg-white/[.03]" : "bg-zinc-50"}
            grid-cols-[2.5fr_2fr_1.4fr_1.6fr_1fr_136px]`}>
            {["Name", "Email", "NIC / Passport", "Role", "Status", "Actions"].map(h => (
              <span key={h} className={`text-[10px] font-bold uppercase tracking-widest ${subText}`}>{h}</span>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className={`text-sm font-semibold ${text}`}>No users found</p>
              <p className={`text-xs mt-1 ${subText}`}>Adjust filters or register someone</p>
            </div>
          ) : filtered.map((u) => {
            const exp = expandedRow === u.id;
            return (
              <div key={u.id} className={`border-b last:border-b-0 ${border}
                ${isDarkMode ? "hover:bg-white/[.025]" : "hover:bg-zinc-50/70"} transition-colors`}>

                <div
                  onClick={() => setExpandedRow(exp ? null : u.id)}
                  className="grid gap-4 px-5 py-4 items-center cursor-pointer grid-cols-[2.5fr_2fr_1.4fr_1.6fr_1fr_136px]">

                  {/* Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${ROLE_AVATAR[u.role]}`}>
                      {u.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-semibold truncate ${text}`}>{u.name}</div>
                      {u.apartmentNumber && <div className={`text-xs ${subText}`}>Apt {u.apartmentNumber}</div>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className={`text-sm truncate ${subText}`}>{u.email}</div>

                  {/* NIC */}
                  <div className={`text-sm font-mono ${subText}`}>{u.nic}</div>

                  {/* Role */}
                  <div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${ROLE_BADGE[u.role]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.role === "Admin" ? "bg-[#EAB308]" : u.role === "Technician" ? "bg-sky-400" : "bg-emerald-400"}`} />
                      {u.role}{u.techType ? ` · ${u.techType}` : ""}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${u.status === "active" ? "bg-emerald-400" : "bg-yellow-400"}`} />
                    <span className={`text-xs ${subText}`}>{u.status === "active" ? "Active" : "Unregistered"}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                    <button title="Edit" onClick={() => openEdit(u)}
                      className={`p-2 rounded-lg border cursor-pointer ${border} ${subText}
                        hover:border-[#EAB308] hover:text-[#EAB308] transition-all`}>
                      <Ic.edit />
                    </button>
                    <button title="Unregister" onClick={() => askUnregister(u)}
                      className={`p-2 rounded-lg border cursor-pointer ${border} ${subText}
                        hover:border-yellow-400 hover:text-yellow-400 transition-all`}>
                      <Ic.unreg />
                    </button>
                    <button title="Delete" onClick={() => askDelete(u)}
                      className={`p-2 rounded-lg border cursor-pointer ${border} ${subText}
                        hover:border-red-500 hover:text-red-500 transition-all`}>
                      <Ic.trash />
                    </button>
                  </div>
                </div>

                {/* Expanded row */}
                {exp && (
                  <div className={`px-5 pb-4 pt-3 border-t grid grid-cols-4 gap-2 ${border}`}>
                    {[
                      { l: "Phone",        v: u.phone || "—" },
                      u.techType && { l: "Tech Type", v: u.techType },
                      { l: "Registered",   v: new Date(u.createdAt).toLocaleDateString() },
                      { l: "Last Updated", v: new Date(u.updatedAt).toLocaleDateString() },
                    ].filter(Boolean).map(f => (
                      <div key={f.l} className={`rounded-xl p-3 border
                        ${isDarkMode ? "bg-white/[.03] border-white/8" : "bg-zinc-50 border-zinc-100"}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${subText}`}>{f.l}</div>
                        <div className={`text-sm font-medium ${text}`}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer count */}
        <p className={`text-center text-xs mt-4 ${subText}`}>
          Showing {filtered.length} of {users.length} users
        </p>
      </div>

      {/* ── MODALS ── */}
      {showForm && (
        <UserFormModal initial={editUser} onSave={handleSave}
          onCancel={closeForm} error={formError} theme={theme} />
      )}
      {confirm && (
        <ConfirmModal msg={confirm.msg} danger={confirm.danger} theme={theme}
          onConfirm={() => { confirm.go(); setConfirm(null); }}
          onCancel={() => setConfirm(null)} />
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2.5
          px-4 py-3 rounded-2xl text-sm font-semibold shadow-xl whitespace-nowrap
          ${toast.type === "err"
            ? "bg-red-500/10 border border-red-500/30 text-red-400"
            : "bg-[#EAB308]/10 border border-[#EAB308]/30 text-[#EAB308]"}`}>
          <span>{toast.type === "err" ? "✕" : "✓"}</span>
          {toast.msg}
        </div>
      )}
    </div>
  );
}