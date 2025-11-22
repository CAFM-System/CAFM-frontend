import React from 'react'
export default function Footer(){
return (
<footer className="mt-16 bg-gradient-to-r from-indigo-800 to-purple-900 text-white py-12">
<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
<div>
<div className="flex items-center gap-3 text-xl font-semibold"><span className="text-2xl">🏠</span>CAFM System</div>
<p className="mt-3 text-sm text-gray-300 max-w-sm">Revolutionizing apartment maintenance and facility management with intelligent technology.</p>
<div className="mt-4 flex gap-3 text-xs"><span className="px-3 py-1 rounded-full bg-white/10">Award Winning</span><span className="px-3 py-1 rounded-full bg-white/10">Secure & Reliable</span></div>
</div>
<div>
<h3 className="font-semibold mb-3">Quick Links</h3>
<ul className="text-sm space-y-2 text-gray-300"><li>Dashboard</li><li>Create Request</li><li>My Profile</li><li>Help Center</li></ul>
</div>
<div>
<h3 className="font-semibold mb-3">Contact Us</h3>
<div className="text-sm text-gray-300 space-y-3"><div>Email: support@cafm.com</div><div>Phone: +1 (555) 123-4567</div></div>
</div>
</div>
<div className="text-center text-xs text-gray-400 mt-10">© 2024 CAFM System. All rights reserved.</div>
</footer>
)
}