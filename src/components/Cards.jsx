import React from 'react'
import data from '../data'

function Icon({type}){
  if (type === 'career'){
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 11h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 21h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  if (type === 'ai'){
    return (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 7l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 7l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 2l3 6 6 .5-4.5 3 1.5 6L12 16l-6 2 1.5-6L3 8.5 9 8 12 2z" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" />
    </svg>
  )
}

function renderContent(content){
  if (Array.isArray(content)){
    return (
      <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-2 leading-relaxed">
        {content.map((item, idx) => (
          <li key={idx} className="break-words">{item}</li>
        ))}
      </ul>
    )
  }
  return <p className="mt-3 text-sm text-gray-700 leading-relaxed">{content}</p>
}

function Card({title, content, accent='indigo', iconType=''}){
  const accentBg = {
    indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-400',
    teal: 'bg-gradient-to-br from-teal-400 to-teal-300',
    yellow: 'bg-gradient-to-br from-yellow-400 to-orange-300'
  }[accent]

  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-gray-100">
      <div className="flex items-start gap-3">
        <div className={`${accentBg} shrink-0 w-10 h-10 rounded-full flex items-center justify-center`}> 
          <Icon type={iconType} />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      {renderContent(content)}
    </div>
  )
}

export default function Cards(){
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card title="Career Snapshot" content={data.careerSnapshot} accent="indigo" iconType="career" />
      <Card title="AI Innovations" content={data.aiInnovations} accent="teal" iconType="ai" />
      <Card title="Leadership" content={data.leadershipText} accent="yellow" iconType="lead" />
    </div>
  )
}
