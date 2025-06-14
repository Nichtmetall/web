"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface AnimatedCodeEditorProps {
  className?: string
}

const codeSnippets = [
  {
    code: `export default function Button({ onClick, children }) {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}`,
    filename: "Button.tsx"
  },
  {
    code: `function handleClick() {
  const button = document.querySelector('.btn');
  button.addEventListener('click', () => {
    alert('Button clicked successfully!');
  });
}`,
    filename: "script.js"
  },
  {
    code: `const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    filename: "api.js"
  }
]

export function AnimatedCodeEditor({ className }: AnimatedCodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLPreElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const filenameRef = useRef<HTMLSpanElement>(null)
  const clickTargetRef = useRef<HTMLDivElement>(null)
  const browserCursorRef = useRef<HTMLDivElement>(null)
  const dataContainerRef = useRef<HTMLDivElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)
  
  // Use refs for animation state to avoid React re-renders
  const animationStateRef = useRef({
    currentSnippetIndex: 0,
    isAnimating: false,
    masterTimeline: null as gsap.core.Timeline | null
  })

  useEffect(() => {
    // Ensure all required elements exist
    if (!editorRef.current || !codeRef.current || 
        !browserRef.current || !filenameRef.current || !clickTargetRef.current || 
        !browserCursorRef.current || !dataContainerRef.current || !alertRef.current) {
      console.warn('AnimatedCodeEditor: Not all refs are available')
      return
    }

    // Kill any existing animations
    if (animationStateRef.current.masterTimeline) {
      animationStateRef.current.masterTimeline.kill()
    }

    // Create master timeline
    const masterTL = gsap.timeline({ repeat: -1 })
    animationStateRef.current.masterTimeline = masterTL

    // Initialize states with null checks
    if (browserRef.current) {
      gsap.set(browserRef.current, { opacity: 0, scale: 0.8 })
    }
    if (browserCursorRef.current) {
      gsap.set(browserCursorRef.current, { opacity: 0, x: 100, y: 200 })
    }
    if (dataContainerRef.current) {
      gsap.set(dataContainerRef.current, { opacity: 0, y: 20 })
    }
    if (alertRef.current) {
      gsap.set(alertRef.current, { opacity: 0, scale: 0.8, y: -20 })
    }

    const createTypingAnimation = (snippet: typeof codeSnippets[0]) => {
      const tl = gsap.timeline()
      
      // Clear the code editor completely at the start of each typing animation
      tl.call(() => {
        if (codeRef.current) {
          codeRef.current.textContent = ""
        }
      })
      
      // Update filename immediately with null check
      if (filenameRef.current) {
        filenameRef.current.textContent = snippet.filename
      }

      // Typing animation - read current content from DOM each time
      const chars = snippet.code.split('')
      
      chars.forEach((char, index) => {
        tl.call(() => {
          if (codeRef.current) {
            // Always read the current content from DOM and append the new character
            const currentContent = codeRef.current.textContent || ""
            codeRef.current.textContent = currentContent + char
          }
        }, [], index * 0.03 + Math.random() * 0.01)
      })

      // Shorter pause after typing
      tl.to({}, { duration: 1 })

      return tl
    }

    const createBrowserAnimation = (snippetIndex: number) => {
      const tl = gsap.timeline()
      const isHandleClickFunction = snippetIndex === 1 // Second snippet is handleClick
      const isFetchDataFunction = snippetIndex === 2 // Third snippet is fetchData

      // Transition to browser with null checks
      if (codeRef.current && filenameRef.current) {
        tl.to([codeRef.current, filenameRef.current], { opacity: 0.3, duration: 0.3 }) // Faster transition
      }
      
      if (browserRef.current) {
        tl.to(browserRef.current, { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, // Faster
          ease: "back.out(1.7)" 
        })
      }
      
      if (browserCursorRef.current) {
        tl.to(browserCursorRef.current, { opacity: 1, duration: 0.2 }, "<0.2") // Faster
      }

      // Move cursor to button and click - faster
      if (browserCursorRef.current) {
        tl.to(browserCursorRef.current, {
          x: 180, // Approximate button position
          y: 120,
          duration: 0.8, // Faster movement
          ease: "power2.inOut"
        })
        .to(browserCursorRef.current, { scale: 0.8, duration: 0.05 }) // Faster click
      }
      
      if (clickTargetRef.current) {
        tl.to(clickTargetRef.current, { scale: 0.95, duration: 0.05 }, "<") // Faster click
      }
      
      if (browserCursorRef.current) {
        tl.to(browserCursorRef.current, { scale: 1, duration: 0.05 }) // Faster click
      }
      
      if (clickTargetRef.current) {
        tl.to(clickTargetRef.current, { scale: 1, duration: 0.05 }, "<") // Faster click
      }

      // Show alert animation if it's the handleClick function
      if (isHandleClickFunction && alertRef.current) {
        tl.to({}, { duration: 0.3 }) // Small pause after click
          .to(alertRef.current, { 
            opacity: 1, 
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)"
          })
          .to({}, { duration: 1.5 }) // Pause to show the alert
          .to(alertRef.current, { 
            opacity: 0, 
            scale: 0.8,
            y: -20,
            duration: 0.3 
          })
      }
      // Show data animation if it's the fetchData function
      else if (isFetchDataFunction && dataContainerRef.current) {
        tl.to({}, { duration: 0.3 }) // Small pause after click
          .to(dataContainerRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            ease: "back.out(1.7)"
          })
          .to({}, { duration: 1.2 }) // Longer pause to show the data
          .to(dataContainerRef.current, { 
            opacity: 0, 
            y: 20, 
            duration: 0.3 
          })
      } else {
        tl.to({}, { duration: 0.5 }) // Shorter pause for Button component
      }

      // Transition back to editor - faster
      if (browserRef.current) {
        tl.to(browserRef.current, { opacity: 0, scale: 0.8, duration: 0.3 })
      }
      
      if (browserCursorRef.current) {
        tl.to(browserCursorRef.current, { opacity: 0, duration: 0.2 }, "<")
      }
      
      if (codeRef.current && filenameRef.current) {
        tl.to([codeRef.current, filenameRef.current], { opacity: 1, duration: 0.3 })
      }

      return tl
    }

    const createDeletingAnimation = () => {
      const tl = gsap.timeline()
      
      // Create a function that dynamically gets current text and deletes one character
      const deleteOneChar = () => {
        if (codeRef.current) {
          const currentContent = codeRef.current.textContent || ""
          if (currentContent.length > 0) {
            codeRef.current.textContent = currentContent.slice(0, -1)
            return currentContent.length - 1 // Return remaining length
          }
        }
        return 0
      }

      // Get initial text length
      const initialLength = codeRef.current?.textContent?.length || 0
      
      // Create deletion sequence
      for (let i = 0; i < initialLength; i++) {
        tl.call(() => {
          deleteOneChar()
        }, [], i * 0.01)
      }

      // Ensure complete clearing at the end
      tl.call(() => {
        if (codeRef.current) {
          codeRef.current.textContent = ""
        }
      })

      tl.to({}, { duration: 0.3 })

      return tl
    }

    // Build the complete animation sequence
    codeSnippets.forEach((snippet, index) => {
      // Typing animation
      masterTL.add(createTypingAnimation(snippet))
      
      // Browser interaction with snippet index
      masterTL.add(createBrowserAnimation(index))
      
      // Delete current code (including the last iteration to reset before loop)
      masterTL.add(createDeletingAnimation())
    })

    // Start animations
    masterTL.play()

    return () => {
      // Cleanup
      if (animationStateRef.current.masterTimeline) {
        animationStateRef.current.masterTimeline.kill()
      }
      // Kill all tweens with null checks
      const elements = [
        browserRef.current, 
        codeRef.current, 
        filenameRef.current, 
        browserCursorRef.current, 
        clickTargetRef.current,
        dataContainerRef.current,
        alertRef.current
      ].filter(Boolean) // Remove null elements
      
      if (elements.length > 0) {
        gsap.killTweensOf(elements)
      }
    }
  }, [])

  return (
    <div
      ref={editorRef}
      className={cn(
        "w-full h-96 bg-gradient-to-br from-primary-900 to-primary-800 rounded-2xl border border-slate-700 overflow-hidden relative",
        className
      )}
    >
      {/* Editor Header */}
      <div className="h-8 bg-slate-800/50 border-b border-slate-700 flex items-center px-4 justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span ref={filenameRef}>Button.tsx</span>
        </div>
      </div>

      {/* Code Editor View */}
      <div className="relative p-4 font-mono text-sm h-full">
        <pre 
          ref={codeRef} 
          className="text-slate-300 whitespace-pre-wrap leading-6 relative z-10"
          style={{ 
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '0.875rem'
          }}
        />
      </div>

      {/* Browser View */}
      <div 
        ref={browserRef}
        className="absolute inset-0 bg-white rounded-2xl overflow-hidden opacity-0"
      >
        {/* Browser Header */}
        <div className="h-8 bg-gray-100 border-b border-gray-300 flex items-center px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white border border-gray-300 rounded px-3 py-1 text-xs text-gray-600">
              localhost:3000/api/data
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="p-8 bg-white h-full overflow-y-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">API Data Demo</h1>
          <p className="text-gray-600 mb-8">Click the button below to fetch data from the API:</p>
          
          <div 
            ref={clickTargetRef}
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors shadow-md"
          >
            Fetch Data
          </div>

          {/* Alert - Shows after handleClick function click */}
          <div 
            ref={alertRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 rounded-lg shadow-2xl p-6 min-w-80 z-50"
          >
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Alert</h3>
            </div>
            <p className="text-gray-700 mb-6">Button clicked successfully!</p>
            <div className="flex justify-end">
              <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-sm">
                OK
              </div>
            </div>
          </div>

          {/* Data Container - Shows after fetchData function click */}
          <div 
            ref={dataContainerRef}
            className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white rounded border">
                <span className="font-medium text-gray-700">User ID:</span>
                <span className="text-gray-900">12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Cursor */}
        <div 
          ref={browserCursorRef}
          className="absolute w-3 h-3 pointer-events-none z-50"
          style={{ 
            background: 'linear-gradient(-45deg, transparent 0%, transparent 40%, white 40%, white 60%, black 60%)',
            clipPath: 'polygon(0 0, 0 100%, 35% 85%, 50% 100%, 65% 85%, 100% 100%, 100% 0)'
          }}
        />
      </div>
    </div>
  )
} 