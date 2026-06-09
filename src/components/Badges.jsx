import React from 'react'
import data from '../data'

function SkillChips({items, color='indigo'}){
  const bg = color === 'indigo' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-800'
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span key={item} className={`inline-flex items-center px-3 py-1 rounded-full ${bg} text-sm font-medium`}>{item}</span>
      ))}
    </div>
  )
}

export default function Badges(){
  const skills = data.skills
  const leadership = data.leadership
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-3">Skills</h4>
        {Array.isArray(skills) ? (
          <SkillChips items={skills} />
        ) : (
          <div className="space-y-4">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <div className="text-sm font-medium text-gray-600 mb-1">{cat}</div>
                <SkillChips items={items} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-semibold mb-3">Leadership</h4>
        <div className="flex flex-wrap gap-2">
          {leadership.map(l => (
            <span key={l} className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">{l}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
