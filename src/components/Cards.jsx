import React from 'react'
import data from '../data'

function Card({title, children}){
  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="mt-3 text-sm text-gray-700">{children}</div>
    </div>
  )
}

export default function Cards(){
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card title="Career Snapshot">{data.careerSnapshot}</Card>
      <Card title="AI Innovations">{data.aiInnovations}</Card>
      <Card title="Leadership">{data.leadershipText}</Card>
    </div>
  )
}
