import React from 'react'
const Card = ({title,value,sub,color}) => (
<div className="bg-white p-5 rounded-xl shadow border">
<div className="text-sm text-gray-500">{title}</div>
<div className="text-3xl font-bold mt-1">{value}</div>
<div className={`text-xs mt-1 ${color}`}>{sub}</div>
</div>
)
export default function Stats(){
return (
<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
<Card title="Total Requests" value={1} sub="All-time submissions" color="text-gray-500" />
<Card title="Active Requests" value={1} sub="In progress now" color="text-yellow-500" />
<Card title="Resolved" value={0} sub="Successfully completed" color="text-green-600" />
</div>
)
}