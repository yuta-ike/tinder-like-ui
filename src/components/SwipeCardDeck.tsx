import React from "react"
import { useState } from "react"
import SwipeCard from "./SwipeCard"

export type SwipeCardDeckProps = {
  render: (index: number, selected: boolean) => React.ReactNode
  count: number
}

const SwipeCardDeck: React.VFC<SwipeCardDeckProps> = ({ render, count }) => {
  const [index, setIndex] = useState(0)

  const goNextItem = () => {
    setIndex((prev) => {
      if (count <= prev + 1) {
        return prev + 1
      }
      return prev + 1
    })
  }

  return (
    <div className="relative">
      <div className="select-none">
        {Array(count)
          .fill(null)
          .slice(index + 1)
          .map((_, id) => (
            <div className="absolute">{render(id, false)}</div>
          ))}
      </div>

      {/* next */}
      {index + 1 < count && (
        <SwipeCard key={index + 1} className="absolute">
          {render(index + 1, true)}
        </SwipeCard>
      )}
      {/* current */}
      {index < count && (
        <SwipeCard
          onSwipeRight={goNextItem}
          onSwipeLeft={goNextItem}
          key={index}
          className="absolute"
        >
          {render(index, true)}
        </SwipeCard>
      )}
      {/* prev */}
      {index !== 0 && (
        <SwipeCard key={index - 1} className="absolute">
          {render(index - 1, true)}
        </SwipeCard>
      )}
    </div>
  )
}

export default SwipeCardDeck
