'use client'

import { motion } from 'framer-motion'
import { SKILLS, SKILL_CATEGORIES } from '@/data/skills'
import { fadeInUp } from '@/lib/animations'
import type { SkillCategory } from '@/types'

export function SkillGrid() {
  const categories = Object.keys(SKILL_CATEGORIES) as SkillCategory[]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {categories.map((cat, catIdx) => {
        const catInfo = SKILL_CATEGORIES[cat]
        const catSkills = SKILLS.filter((s) => s.category === cat)

        return (
          <motion.div
            key={cat}
            variants={fadeInUp}
            custom={catIdx}
            className="glass-card p-5 rounded-xl flex flex-col gap-4"
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full`}
                style={{
                  background:
                    cat === 'AI/LLM'
                      ? '#8B5CF6'
                      : cat === 'Data'
                      ? '#0EA5E9'
                      : cat === 'Tools'
                      ? '#06B6D4'
                      : '#10B981',
                }}
              />
              <h3 className="text-text-primary font-display font-semibold text-sm">{catInfo.label}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {catSkills.map((skill) => (
                <span key={skill.name} className={`px-2.5 py-1 rounded-lg text-xs font-medium ${catInfo.tailwind}`}>
                  {skill.name}
                </span>
              ))}
            </div>

            {/* Level bars */}
            <div className="flex flex-col gap-2 mt-1">
              {catSkills.slice(0, 3).map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <span className="text-text-muted text-xs w-24 truncate">{skill.name}</span>
                  <div className="flex-1 h-1 bg-bg-elevated rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          cat === 'AI/LLM'
                            ? 'linear-gradient(90deg, #8B5CF6, #06B6D4)'
                            : cat === 'Data'
                            ? 'linear-gradient(90deg, #0EA5E9, #8B5CF6)'
                            : cat === 'Tools'
                            ? 'linear-gradient(90deg, #06B6D4, #0EA5E9)'
                            : 'linear-gradient(90deg, #10B981, #06B6D4)',
                      }}
                    />
                  </div>
                  <span className="text-text-muted text-xs w-8 text-right">{skill.level}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
