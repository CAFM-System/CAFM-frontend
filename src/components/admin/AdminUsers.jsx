import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import AdminService from "../../services/admin.service";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ROLES     = ["admin", "technician", "resident"];
const ROLE_LABEL = { admin: "Admin", technician: "Technician", resident: "Resident" };
const SORT_OPTIONS = [
  { value: "created_at-desc", label: "Newest First" },
  { value: "created_at-asc", label: "Oldest First" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "email-asc", label: "Email A-Z" },
  { value: "email-desc", label: "Email Z-A" },
  { value: "role-asc", label: "Role A-Z" },
  { value: "status-desc", label: "Active First" },
  { value: "status-asc", label: "Inactive First" },
];
const ROLE_BADGE = {
  admin:      "bg-[#EAB308]/15 text-[#EAB308] ring-1 ring-[#EAB308]/30",
  technician: "bg-sky-500/15 text-sky-400 ring-1 ring-sky-400/30",
  resident:   "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30",
};
const ROLE_AVATAR = {
  admin:      "bg-[#EAB308]/20 text-[#EAB308]",
  technician: "bg-sky-500/20 text-sky-400",
  resident:   "bg-emerald-500/20 text-emerald-400",
};
const ROLE_DOT = {
  admin:      "bg-[#EAB308]",
  technician: "bg-sky-400",
  resident:   "bg-emerald-400",
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
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
  copy:    () => <I d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />,
  chevron: () => <I d="M6 9l6 6 6-6" s={14} />,
  back:    () => <I d="M15 18l-6-6 6-6M21 12H9" />,
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

// ─── HELPER ───────────────────────────────────────────────────────────────────
const fullName = (u) => `${u.first_name || ""} ${u.last_name || ""}`.trim();

// ─── FORM MODAL ───────────────────────────────────────────────────────────────
const EMPTY_FORM = { first_name: "", last_name: "", email: "", nic_passport: "", phone: "", role: "resident", apartment_no: "" };

function UserFormModal({ initial, onSave, onCancel, error, theme }) {
  const { cardBg, text, subText, border, inputBg } = theme;
  const isEdit = !!initial?.user_id;
  const [form, setForm] = useState(initial ? { ...EMPTY_FORM, ...initial } : EMPTY_FORM);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const iCls = `w-full px-3 py-2.5 rounded-xl border text-sm outline-none
    focus:border-[#EAB308] transition-colors duration-150 ${inputBg}`;
  const lCls = `block text-[11px] font-bold uppercase tracking-widest mb-1.5 ${subText}`;

  const submit = () => {
    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      role: form.role,
    };
    if (!isEdit) {
      payload.email = form.email;
      payload.nic_passport = form.nic_passport;
      if (form.role === "resident") {
        payload.apartment_no = form.apartment_no;
      }
    }
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
              <h2 className={`text-lg font-bold ${text}`}>{isEdit ? "Edit User" : "Register User"}</h2>
              <p className={`text-xs mt-0.5 ${subText}`}>{isEdit ? "Update account details" : "Create a new system account"}</p>
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lCls}>First Name *</label>
                <input className={iCls} value={form.first_name} onChange={e => set("first_name", e.target.value)} placeholder="e.g. Ayesha" />
              </div>
              <div>
                <label className={lCls}>Last Name *</label>
                <input className={iCls} value={form.last_name} onChange={e => set("last_name", e.target.value)} placeholder="e.g. Fernando" />
              </div>
            </div>
            <div>
              <label className={lCls}>Email Address *</label>
              <input className={iCls} type="email" value={form.email}
                onChange={e => set("email", e.target.value)}
                disabled={isEdit}
                placeholder="ayesha@example.com"
                style={isEdit ? { opacity: 0.6 } : {}} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lCls}>NIC / Passport *</label>
                <input className={iCls} value={form.nic_passport}
                  onChange={e => set("nic_passport", e.target.value)}
                  disabled={isEdit}
                  placeholder="123456789V"
                  style={isEdit ? { opacity: 0.6 } : {}} />
              </div>
              <div>
                <label className={lCls}>Phone *</label>
                <input className={iCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+94 77 …" />
              </div>
            </div>
            <div>
              <label className={lCls}>Role *</label>
              <select className={`${iCls} cursor-pointer`} value={form.role} onChange={e => set("role", e.target.value)}>
                {ROLES.map(r => <option key={r} value={r}>{ROLE_LABEL[r]}</option>)}
              </select>
            </div>
            {!isEdit && form.role === "resident" && (
              <div>
                <label className={lCls}>Apartment Number *</label>
                <input
                  className={iCls}
                  value={form.apartment_no}
                  onChange={e => set("apartment_no", e.target.value)}
                  placeholder="e.g. B-304"
                />
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
              {isEdit ? "Save Changes" : "Register User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER SUCCESS MODAL ───────────────────────────────────────────────────
function RegisterSuccessModal({ info, onClose, theme }) {
  const { cardBg, text, subText, border } = theme;
  const [copied, setCopied] = useState(false);
  const formatDateTime = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleString();
  };

  const handleCopyPassword = async () => {
    if (!info?.tempPassword) return;
    await navigator.clipboard.writeText(info.tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${cardBg}`}>
        <h3 className={`text-lg font-bold mb-2 ${text}`}>User Registered Successfully</h3>
        <p className={`text-sm mb-4 ${subText}`}>The new user account has been created.</p>
        <div className={`space-y-2 p-3 rounded-xl border ${border} mb-4`}>
          <p className={`text-sm ${text}`}>
            <span className={`font-semibold ${subText}`}>Full Name:</span> {info.fullName}
          </p>
          <p className={`text-sm ${text}`}>
            <span className={`font-semibold ${subText}`}>Role:</span> {info.role}
          </p>
          <p className={`text-sm ${text}`}>
            <span className={`font-semibold ${subText}`}>Created At:</span> {formatDateTime(info.createdAt)}
          </p>
          {info.tempPassword && (
            <div>
              <p className={`text-sm ${text}`}>
                <span className={`font-semibold ${subText}`}>Temporary Password:</span>
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <code className={`flex-1 text-xs px-2.5 py-1.5 rounded-lg border font-mono ${border} ${text}`}>
                  {info.tempPassword}
                </code>
                <button
                  onClick={handleCopyPassword}
                  className={`p-2 rounded-lg border cursor-pointer transition-all ${border} ${subText}
                    hover:border-[#EAB308] hover:text-[#EAB308]`}
                  title="Copy password"
                >
                  <Ic.copy />
                </button>
              </div>
              {copied && <p className="text-xs text-emerald-400 mt-1">Password copied</p>}
            </div>
          )}
          {info.warning && (
            <p className="text-xs text-yellow-400">Warning: {info.warning}</p>
          )}
        </div>
        <p className={`text-xs mb-3 ${subText}`}>This popup closes automatically in a few seconds.</p>
        <button onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#EAB308] text-[#18181B] text-sm font-bold
            hover:bg-[#EAB308]/90 active:scale-[.98] transition-all shadow-lg shadow-[#EAB308]/20 cursor-pointer">
          Close Now
        </button>
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
function UserCard({ u, onEdit, onDelete, onToggleStatus, theme }) {
  const { cardBg, text, subText, border } = theme;
  const [open, setOpen] = useState(false);
  const name = fullName(u);
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${cardBg}`}>
      <div className="p-4 flex items-start gap-3 cursor-pointer select-none" onClick={() => setOpen(o => !o)}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${ROLE_AVATAR[u.role]}`}>
          {name.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-semibold ${text}`}>{name}</span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-bold ${ROLE_BADGE[u.role]}`}>
              {ROLE_LABEL[u.role]}
            </span>
          </div>
          <p className={`text-xs mt-0.5 truncate ${subText}`}>{u.email}</p>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className={`text-[11px] font-mono ${subText}`}>{u.nic_passport}</span>
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${u.is_active ? "bg-emerald-400" : "bg-yellow-400"}`} />
              <span className={`text-[11px] ${subText}`}>{u.is_active ? "Active" : "Inactive"}</span>
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
          <button onClick={() => onToggleStatus(u)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer
              ${border} ${subText} hover:border-yellow-400 hover:text-yellow-400 transition-all`}>
            <Ic.unreg /> {u.is_active ? "Deactivate" : "Activate"}
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
  const navigate = useNavigate();
  const theme = useTheme();
  const { isDarkMode, toggleTheme, bg, cardBg, text, subText, border, inputBg } = theme;

  const [users,       setUsers]       = useState([]);
  const [total,       setTotal]       = useState(0);
  const [page,        setPage]        = useState(1);
  const [totalPages,  setTotalPages]  = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search,      setSearch]      = useState("");
  const [roleFilter,  setRoleFilter]  = useState("All");
  const [sortBy,      setSortBy]      = useState("created_at");
  const [sortOrder,   setSortOrder]   = useState("desc");
  const [loading,     setLoading]     = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [editUser,    setEditUser]    = useState(null);
  const [formError,   setFormError]   = useState("");
  const [confirm,     setConfirm]     = useState(null);
  const [toast,       setToast]       = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [registerSuccessInfo, setRegisterSuccessInfo] = useState(null);

  const searchTimer = useRef(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page };
      if (roleFilter !== "All") params.role = roleFilter;
      if (search) params.search = search;
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;
      const res = await AdminService.getUsers(params);
      setUsers(res.data.users);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (e) {
      console.error("Failed to load users:", e);
    } finally {
      setLoading(false);
    }
  }, [page, roleFilter, search, sortBy, sortOrder]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!registerSuccessInfo) return undefined;
    const timer = setTimeout(() => {
      setRegisterSuccessInfo(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [registerSuccessInfo]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 400);
  };

  const handleSortChange = (event) => {
    const [nextSortBy, nextSortOrder] = event.target.value.split("-");
    setSortBy(nextSortBy);
    setSortOrder(nextSortOrder);
    setPage(1);
  };

  const toggleColumnSort = (column) => {
    if (sortBy === column) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder(column === "created_at" ? "desc" : "asc");
    }
    setPage(1);
  };

  const sortIndicator = (column) => {
    if (sortBy !== column) return "";
    return sortOrder === "asc" ? " ↑" : " ↓";
  };

  const notify = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openEdit  = (u) => { setEditUser(u); setFormError(""); setShowForm(true); };
  const openNew   = ()  => { setEditUser(null); setFormError(""); setShowForm(true); };
  const closeForm = ()  => { setShowForm(false); setEditUser(null); };

  const handleSave = async (data) => {
    setFormError("");
    try {
      if (editUser?.user_id) {
        await AdminService.updateUser(editUser.user_id, data);
        notify("User updated");
      } else {
        const response = await AdminService.createUser(data);
        setRegisterSuccessInfo({
          fullName: `${data.first_name} ${data.last_name}`.trim(),
          role: ROLE_LABEL[data.role] || data.role,
          createdAt: new Date().toISOString(),
          tempPassword: response.data?.tempPassword || "",
          warning: response.data?.warning || null,
        });
        notify("User registered");
      }
      closeForm();
      load();
    } catch (e) {
      setFormError(
        e.response?.data?.error ||
        e.response?.data?.message ||
        e.response?.data?.errors?.[0]?.msg ||
        e.message
      );
    }
  };

  const askDelete = (u) => setConfirm({
    msg: `Permanently delete "${fullName(u)}"? This cannot be undone.`,
    danger: true,
    go: async () => {
      try {
        await AdminService.deleteUser(u.user_id);
        notify("User deleted", "err");
      } catch (e) {
        notify(e.response?.data?.message || "Delete failed", "err");
      }
      load();
    },
  });

  const askToggleStatus = (u) => {
    const willActivate = !u.is_active;
    setConfirm({
      msg: `${willActivate ? "Activate" : "Deactivate"} "${fullName(u)}"?${!willActivate ? " They will lose system access." : ""}`,
      danger: !willActivate,
      go: async () => {
        try {
          await AdminService.updateUserStatus(u.user_id, willActivate);
          notify(`User ${willActivate ? "activated" : "deactivated"}`);
        } catch (e) {
          const msg =
            e.response?.data?.error ||
            e.response?.data?.message ||
            e.response?.data?.errors?.[0]?.msg ||
            e.message ||
            "Status update failed";
          notify(msg, "err");
        }
        load();
      },
    });
  };

  const Chip = ({ label, active, onClick }) => (
    <button onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-all
        ${active
          ? "bg-[#EAB308] text-[#18181B] shadow-md shadow-[#EAB308]/20"
          : `border ${border} ${subText} hover:border-[#EAB308] hover:text-[#EAB308]`}`}>
      {label}
    </button>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bg}`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-5 lg:px-8 py-6 sm:py-8">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3 flex-wrap">
          <div>
            <button
              onClick={() => navigate(-1)}
              className={`mb-3 inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${border} ${subText} hover:border-[#EAB308] hover:text-[#EAB308]`}
            >
              <Ic.back />
              Back
            </button>
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
            { label: "Total Users", value: total, color: "#EAB308" },
            { label: "Current Page", value: page, color: "#38bdf8" },
            { label: "Total Pages", value: totalPages, color: "#34d399" },
            { label: "Showing", value: users.length, color: "#a78bfa" },
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
              value={searchInput} onChange={handleSearchChange}
              placeholder="Search name, email, NIC…"
              className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none
                focus:border-[#EAB308] transition-colors ${inputBg}`}
            />
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${subText}`}>Sort:</span>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={handleSortChange}
                className={`px-3 py-1.5 rounded-xl border text-xs outline-none cursor-pointer ${inputBg}`}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className={`w-px h-5 ${border} hidden sm:block`} />

            <div className="flex gap-2 flex-wrap items-center">
              <span className={`text-[10px] font-bold uppercase tracking-widest ${subText}`}>Role:</span>
              {["All", ...ROLES].map(r => (
                <Chip key={r} label={r === "All" ? "All" : ROLE_LABEL[r]} active={roleFilter === r}
                  onClick={() => { setRoleFilter(r); setPage(1); }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── LOADING ── */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-[#EAB308] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ── MOBILE: CARDS ── */}
        {!loading && (
          <div className="sm:hidden space-y-2">
            {users.length === 0 ? (
              <div className={`rounded-2xl border py-14 text-center ${cardBg}`}>
                <div className="text-4xl mb-2">🔍</div>
                <p className={`text-sm font-semibold ${text}`}>No users found</p>
                <p className={`text-xs mt-1 ${subText}`}>Adjust filters or register someone</p>
              </div>
            ) : users.map(u => (
              <UserCard key={u.user_id} u={u} theme={theme}
                onEdit={openEdit} onDelete={askDelete} onToggleStatus={askToggleStatus} />
            ))}
          </div>
        )}

        {/* ── DESKTOP: TABLE ── */}
        {!loading && (
          <div className={`hidden sm:block rounded-2xl border overflow-hidden ${cardBg}`}>
            {/* Head */}
            <div className={`grid gap-4 px-5 py-3 border-b ${border}
              ${isDarkMode ? "bg-white/[.03]" : "bg-zinc-50"}
              grid-cols-[2.5fr_2fr_1.4fr_1.6fr_1fr_136px]`}>
              <button onClick={() => toggleColumnSort("name")} className={`text-left text-[10px] font-bold uppercase tracking-widest ${subText}`}>Name{sortIndicator("name")}</button>
              <button onClick={() => toggleColumnSort("email")} className={`text-left text-[10px] font-bold uppercase tracking-widest ${subText}`}>Email{sortIndicator("email")}</button>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${subText}`}>NIC / Passport</span>
              <button onClick={() => toggleColumnSort("role")} className={`text-left text-[10px] font-bold uppercase tracking-widest ${subText}`}>Role{sortIndicator("role")}</button>
              <button onClick={() => toggleColumnSort("status")} className={`text-left text-[10px] font-bold uppercase tracking-widest ${subText}`}>Status{sortIndicator("status")}</button>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${subText}`}>Actions</span>
            </div>

            {users.length === 0 ? (
              <div className="py-16 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className={`text-sm font-semibold ${text}`}>No users found</p>
                <p className={`text-xs mt-1 ${subText}`}>Adjust filters or register someone</p>
              </div>
            ) : users.map((u) => {
              const exp = expandedRow === u.user_id;
              const name = fullName(u);
              return (
                <div key={u.user_id} className={`border-b last:border-b-0 ${border}
                  ${isDarkMode ? "hover:bg-white/[.025]" : "hover:bg-zinc-50/70"} transition-colors`}>

                  <div
                    onClick={() => setExpandedRow(exp ? null : u.user_id)}
                    className="grid gap-4 px-5 py-4 items-center cursor-pointer grid-cols-[2.5fr_2fr_1.4fr_1.6fr_1fr_136px]">

                    {/* Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${ROLE_AVATAR[u.role]}`}>
                        {name.charAt(0)?.toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm font-semibold truncate ${text}`}>{name}</div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className={`text-sm truncate ${subText}`}>{u.email}</div>

                    {/* NIC */}
                    <div className={`text-sm font-mono ${subText}`}>{u.nic_passport}</div>

                    {/* Role */}
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${ROLE_BADGE[u.role]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${ROLE_DOT[u.role]}`} />
                        {ROLE_LABEL[u.role]}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${u.is_active ? "bg-emerald-400" : "bg-yellow-400"}`} />
                      <span className={`text-xs ${subText}`}>{u.is_active ? "Active" : "Inactive"}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                      <button title="Edit" onClick={() => openEdit(u)}
                        className={`p-2 rounded-lg border cursor-pointer ${border} ${subText}
                          hover:border-[#EAB308] hover:text-[#EAB308] transition-all`}>
                        <Ic.edit />
                      </button>
                      <button title={u.is_active ? "Deactivate" : "Activate"} onClick={() => askToggleStatus(u)}
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
                        { l: "Registered",   v: u.created_at ? new Date(u.created_at).toLocaleDateString() : "—" },
                        { l: "Last Updated", v: u.updated_at ? new Date(u.updated_at).toLocaleDateString() : "—" },
                      ].map(f => (
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
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border
                ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:border-[#EAB308] hover:text-[#EAB308]"}
                ${border} ${subText}`}>
              ← Prev
            </button>
            <span className={`text-xs font-bold ${subText}`}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all border
                ${page === totalPages ? "opacity-40 cursor-not-allowed" : "hover:border-[#EAB308] hover:text-[#EAB308]"}
                ${border} ${subText}`}>
              Next →
            </button>
          </div>
        )}

        {/* Footer count */}
        <p className={`text-center text-xs mt-4 ${subText}`}>
          Showing {users.length} of {total} users
        </p>
      </div>

      {/* ── MODALS ── */}
      {showForm && (
        <UserFormModal initial={editUser} onSave={handleSave}
          onCancel={closeForm} error={formError} theme={theme} />
      )}
      {confirm && (
        <ConfirmModal msg={confirm.msg} danger={confirm.danger} theme={theme}
          onConfirm={async () => { setConfirm(null); await confirm.go(); }}
          onCancel={() => setConfirm(null)} />
      )}
      {registerSuccessInfo && (
        <RegisterSuccessModal info={registerSuccessInfo}
          onClose={() => setRegisterSuccessInfo(null)} theme={theme} />
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
