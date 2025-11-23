import React from 'react'
export default function RequestList(){
return (
<section className="mt-10">
<div className="flex gap-6 text-sm border-b pb-2">
<button className="font-medium border-b-2 border-indigo-600 pb-2">All Requests (1)</button>
<button className="text-gray-500">Active (1)</button>
<button className="text-gray-500">Resolved (0)</button>
</div>


<div className="bg-white mt-4 p-6 rounded-xl shadow border">
<div className="flex items-center gap-3 text-sm">
<span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">in progress</span>
<span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">high</span>
</div>


<h3 className="mt-3 font-semibold text-lg">Leaking faucet in kitchen</h3>
<p className="mt-2 text-sm text-gray-600 max-w-2xl">The kitchen faucet has been dripping continuously for the past two days. Water is being wasted.</p>


<div className="grid md:grid-cols-4 gap-4 mt-6 text-sm text-gray-700">
<div>A-101 - Kitchen</div>
<div>Plumbing</div>
<div>Lisa Brown</div>
<div>Nov 21, 2025, 12:20 AM</div>
</div>
</div>
</section>
)
}