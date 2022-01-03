import Card from "./components/Card"
import SwipeCardDeck from "./components/SwipeCardDeck"

const App: React.VFC = () => {
  return (
    <>
      <footer className="fixed inset-x-0 top-0 w-screen p-2">
        <div className="flex w-full h-full text-white bg-[#525b66] rounded shadow items-center justify-between p-2">
          <h1 className="mx-1">Tinder like UI Sample</h1>
          <a
            href="https://github.com/yuta-ike/tinder-like-ui"
            className="px-2 py-1 text-sm border border-white rounded"
            target="_blank"
            rel="external nofollow noopener noreferrer"
            aria-label="Githubで見る"
          >
            Github
          </a>
        </div>
      </footer>
      <div className="flex items-center justify-center w-screen h-screen overflow-hidden">
        <SwipeCardDeck
          count={10}
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
