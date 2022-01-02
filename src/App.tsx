import Card from "./components/Card"
import SwipeCardDeck from "./components/SwipeCardDeck"

const App: React.VFC = () => {
  return (
    <div className="flex m-[200px]">
      <SwipeCardDeck
        count={10}
        render={(index, selected) => (
          <div>
            <Card title={`レンジで簡単！ジューシーハンバーグ:${index}`} showShadow={selected} />
          </div>
        )}
      />
    </div>
  )
}

export default App
