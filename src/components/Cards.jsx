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
function Card({title, children, accentClass=''}){
  return (
    <div className={`bg-white rounded-lg shadow p-6 flex-1 transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-gray-100`}>
      <div className="flex items-start gap-3">
        {accentClass && <div className={`${accentClass} shrink-0 w-10 h-10 rounded-full`} />}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default function Cards(){
export default function Cards(){
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Career Snapshot">
          {renderContent(data.careerSnapshot)}
        </Card>
        <Card title="AI Innovations">
          {renderContent(data.aiInnovations)}
        </Card>
        <Card title="Leadership Snapshot">
          {renderContent(data.leadershipText)}
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Skills & Leadership</h3>
        <Carousel
          slides={[
            { type: 'skills' },
            { type: 'leadership' }
          ]}
          interval={10000}
          renderSlide={(slide) => (
            slide.type === 'skills' ? (
              <Card title="Skills">
                <div className="space-y-4">
                  {Object.entries(data.skills).map(([cat, items]) => (
                    <div key={cat}>
                      <div className="text-sm font-medium text-gray-600">{cat}</div>
                      <SkillChips items={items} />
                    </div>
                  ))}
                </div>
              </Card>
            ) : (
              <Card title="Leadership">
                {renderContent(data.leadership)}
              </Card>
            )
          )}
        />
      </div>
    </div>
  )
}
