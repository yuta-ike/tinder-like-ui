import Card from "./components/Card"
import Header from "./components/Header"
import SwipeCardDeck from "./components/SwipeCardDeck"

const App: React.VFC = () => {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
        <SwipeCardDeck
          count={6}
          render={(index, selected) => (
            <div>
              <Card title={`レンジで簡単！ジューシーハンバーグ:${index}`} showShadow={selected} />
            </div>
          )}
        />
      </div>
    </>
  )
}

export default App
