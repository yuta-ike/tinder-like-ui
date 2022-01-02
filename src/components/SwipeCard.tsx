import React, { useEffect, useRef, useState } from "react"
import { throttle } from "throttle-debounce"

const easeOutSine = (x: number) => {
  return Math.sin((x * Math.PI) / 2)
}

export type SwipeCardProps = {
  children: React.ReactNode
  onSwipeRight?: () => void
  onSwipeLeft?: () => void
  onDrag?: (process: number) => void
  border?: number
  className?: string
  disableAction?: boolean
}

const SwipeCard: React.VFC<SwipeCardProps> = ({
  children,
  onDrag,
  onSwipeRight,
  onSwipeLeft,
  border = 0.2,
  className,
  disableAction,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragProcess, setDragProcess] = useState<number>(0.0)
  const cardWrapperRef = useRef<HTMLDivElement | null>(null)
  const dragBasePosX = useRef<number | null>(null)

  const handleDragStart = (e: React.MouseEvent) => {
    if (disableAction) {
      return
    }
    setIsDragging(true)
    dragBasePosX.current = e.clientX
    console.log("drag start")
  }

  useEffect(() => {
    const callback = throttle(50, (e: any) => {
      if (disableAction || !isDragging) {
        return
      }
      console.log("dragging")
      const xDel = e.clientX - (dragBasePosX.current ?? 0)
      const process =
        cardWrapperRef.current?.clientWidth === 0
          ? 0
          : xDel / (cardWrapperRef.current?.clientWidth ?? 200)
      setDragProcess(process)
      console.log("dragging", process)
    })
    document.addEventListener("mousemove", callback)
    return () => document.removeEventListener("mousemove", callback)
  }, [isDragging, disableAction])

  useEffect(() => {
    const callback = () => {
      if (disableAction || !isDragging) {
        return
      }
      setIsDragging(false)

      if (border < Math.abs(dragProcess)) {
        if (dragProcess < 0) {
          onSwipeLeft?.()
        } else {
          onSwipeRight?.()
        }
        setTimeout(() => {
          dragBasePosX.current = null
          setDragProcess(dragProcess < 0 ? -1.0 : 1.0)
        }, 0)
      } else {
        // NOTE: アニメーションを発火させるため
        setTimeout(() => {
          dragBasePosX.current = null
          setDragProcess(0)
        }, 0)
      }
    }
    document.addEventListener("mouseup", callback)
    return () => document.removeEventListener("mouseup", callback)
  }, [isDragging, dragProcess, disableAction])

  const normalizedDragProcess = Math.max(-1.0, Math.min(dragProcess, 1.0))
  const x = easeOutSine(normalizedDragProcess) * (cardWrapperRef.current?.clientWidth ?? 200) * 0.75
  const y =
    easeOutSine(Math.abs(normalizedDragProcess)) * (cardWrapperRef.current?.clientHeight ?? 200)
  const rotate = easeOutSine(normalizedDragProcess) * 45

  useEffect(() => {
    onDrag?.(normalizedDragProcess)
  }, [normalizedDragProcess, onDrag])

  return (
    <div
      onMouseDown={handleDragStart}
      className={`flex ${!isDragging ? "transition" : "select-none"} ${className}`}
      style={{
        transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
      }}
      ref={cardWrapperRef}
    >
      {children}
    </div>
  )
}

export default SwipeCard
