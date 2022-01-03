import React, { useEffect, useRef, useState } from "react"
import { throttle } from "throttle-debounce"
import { easeOut } from "../utils/animation"
import { isIOSChrome } from "../utils/userAgentCheck"

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
  const [swipeResult, setSwipeResult] = useState<"left" | "right" | null>(null)
  const [dragProcess, setDragProcess] = useState<number>(0.0)
  const cardWrapperRef = useRef<HTMLDivElement | null>(null)
  const dragBasePosX = useRef<number | null>(null)

  const handleDragStart = (e: React.MouseEvent) => {
    if (disableAction) {
      return
    }
    setIsDragging(true)
    dragBasePosX.current = e.clientX
  }

  useEffect(() => {
    if (disableAction) {
      return
    }
    const callback = throttle(50, (e: any) => {
      if (!isDragging || swipeResult != null) {
        return
      }
      const xDel = e.clientX - (dragBasePosX.current ?? 0)
      const process =
        cardWrapperRef.current?.clientWidth === 0
          ? 0
          : xDel / (cardWrapperRef.current?.clientWidth ?? 200)
      setDragProcess(process)
    })
    document.addEventListener("pointermove", callback)
    return () => document.removeEventListener("pointermove", callback)
  }, [isDragging, disableAction, swipeResult])

  useEffect(() => {
    if (disableAction) {
      return
    }
    const callback = () => {
      if (!isDragging || swipeResult != null) {
        return
      }
      setIsDragging(false)

      if (border < Math.abs(dragProcess)) {
        setTimeout(() => {
          dragBasePosX.current = null
          if (dragProcess < 0) {
            onSwipeLeft?.()
            setSwipeResult("left")
            setDragProcess(-1.0)
          } else {
            onSwipeRight?.()
            setSwipeResult("right")
            setDragProcess(1.0)
          }
        }, 0)
      } else {
        // NOTE: アニメーションを発火させるため
        setTimeout(() => {
          dragBasePosX.current = null
          setDragProcess(0)
        }, 0)
      }
    }
    document.addEventListener("pointerup", callback)
    return () => document.removeEventListener("pointerup", callback)
  }, [isDragging, dragProcess, disableAction, swipeResult])

  const normalizedDragProcess =
    swipeResult === "left"
      ? -1
      : swipeResult === "right"
      ? 1
      : Math.max(-1.0, Math.min(dragProcess, 1.0))
  const x = easeOut(normalizedDragProcess) * (cardWrapperRef.current?.clientWidth ?? 200) * 0.75
  const y = easeOut(Math.abs(normalizedDragProcess)) * (cardWrapperRef.current?.clientHeight ?? 200)
  const rotate = easeOut(normalizedDragProcess) * 45

  useEffect(() => {
    onDrag?.(normalizedDragProcess)
  }, [normalizedDragProcess, onDrag])

  return (
    <div
      onPointerDown={handleDragStart}
      className={`flex touch-none ${
        !isDragging ? (isIOSChrome() ? "" : "transition duration-1000") : "select-none"
      } ${className}`}
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
