import React from 'react'
export default function TopBanner(){
return (
<div className="mt-6">
<div className="bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-6 rounded-2xl shadow-lg flex items-center justify-between">
<div>
<div className="text-sm opacity-80">Welcome back 👋</div>
<h2 className="text-3xl font-semibold mt-1">Hello, John!</h2>
<p className="mt-1 text-sm opacity-90">You have 1 active request being processed by our team.</p>
</div>
<button className="bg-white text-purple-600 px-5 py-3 rounded-xl shadow font-medium hover:bg-gray-200">+ Create New Request</button>
</div>
</div>
)
}
