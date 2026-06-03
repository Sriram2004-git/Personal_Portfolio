'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { RADAR_DATA } from '@/data/skills'

export function SkillRadar() {
  return (
    <div className="glass-card p-6 rounded-xl h-80">
      <p className="text-text-secondary text-xs font-mono mb-4 text-center tracking-widest">SKILL RADAR</p>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="rgba(14,165,233,0.15)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'var(--font-jetbrains)' }}
          />
          <Tooltip
            contentStyle={{
              background: '#0A1628',
              border: '1px solid rgba(14,165,233,0.2)',
              borderRadius: '8px',
              color: '#F1F5F9',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value}%`, 'Proficiency']}
          />
          <Radar
            name="Sriraam"
            dataKey="value"
            stroke="#0EA5E9"
            fill="#0EA5E9"
            fillOpacity={0.2}
            strokeWidth={2}
            dot={{ fill: '#0EA5E9', r: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
