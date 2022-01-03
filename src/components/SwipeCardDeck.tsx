import React, { useRef } from "react"
import { useState } from "react"
import SwipeCard from "./SwipeCard"

export type SwipeCardDeckProps = {
  render: (index: number, selected: boolean) => React.ReactNode
  count: number
}

const SwipeCardDeck: React.VFC<SwipeCardDeckProps> = ({ render, count }) => {
  const [index, setIndex] = useState(0)
  const cardRef = useRef<HTMLDivElement | null>(null)
  // const rightButtonRef = useRef<HTMLButtonElement | null>(null)
  // const leftButtonRef = useRef<HTMLButtonElement | null>(null)

  const goNextItem = () => {
    setIndex((prev) => {
      console.log(prev + 1)
      if (count <= prev + 1) {
        return prev + 1
      }
      return prev + 1
    })
    focusCurrentItem()
  }

  const focusCurrentItem = () => {
    cardRef.current?.focus()
  }

  return (
    <div className="relative">
      {/* NOTE: focus trap */}
      <div tabIndex={0} onFocus={focusCurrentItem} />

      <div className="pointer-events-none select-none" aria-hidden>
        {Array(count)
          .fill(null)
          .slice(index + 1)
          .map((_, id) => (
            <div className="absolute" key={id}>
              {render(id, false)}
            </div>
          ))}
      </div>

      {/* next */}
      {index + 1 < count && (
        <SwipeCard key={index + 1} className="absolute inset-x-0 top-0" disableAction>
          {render(index + 1, true)}
        </SwipeCard>
      )}
      {/* current */}
      {index < count && (
        <SwipeCard
          key={index}
          className=""
          onSwipeRight={goNextItem}
          onSwipeLeft={goNextItem}
          role="dialog"
          cardRef={cardRef}
          tabIndex={-1}
          // rightButtonRef={rightButtonRef}
          // leftButtonRef={leftButtonRef}
        >
          {render(index, true)}
        </SwipeCard>
      )}
      {/* prev */}
      {index !== 0 && (
        <SwipeCard
          key={index - 1}
          // NOTE: 最後のアイテムのみ、absoluteにしない（レイアウト崩れを防ぐため）
          className={index === count ? "" : "absolute inset-x-0 top-0"}
          disableAction
        >
          {render(index - 1, true)}
        </SwipeCard>
      )}
    </div>
  )
}

export default SwipeCardDeck
