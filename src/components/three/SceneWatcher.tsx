'use client'
import { useEffect } from 'react'
import { useSceneStore, SceneType } from '@/lib/sceneStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SceneWatcher() {
  const setScene = useSceneStore((s) => s.setScene)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const sections: { id: string; scene: SceneType }[] = [
      { id: 'hero',       scene: 'hero'       },
      { id: 'about',      scene: 'about'      },
      { id: 'skills',     scene: 'skills'     },
      { id: 'projects',   scene: 'projects'   },
      { id: 'experience', scene: 'experience' },
      { id: 'contact',    scene: 'contact'    },
    ]

    const triggers = sections.map(({ id, scene }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setScene(scene),
        onEnterBack: () => setScene(scene),
      })
    )

    return () => triggers.forEach(t => t.kill())
  }, [setScene])

  return null
}
