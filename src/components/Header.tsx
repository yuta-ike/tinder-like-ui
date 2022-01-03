import React from "react"

const Header: React.VFC = () => {
  return (
    <header className="fixed inset-x-0 top-0 w-screen p-2">
      <div className="flex w-full h-full text-white bg-[#525b66] rounded shadow items-center justify-between p-2">
        <h1 className="mx-1">Tinder like UI Sample</h1>
        <a
          href="https://github.com/yuta-ike/tinder-like-ui"
          className="px-2 py-1 text-sm border border-white rounded outline-none hover:bg-white/10 focus:bg-white/10 focus:outline-none focus-visible:ring"
          target="_blank"
          rel="external nofollow noopener noreferrer"
          aria-label="Githubで見る"
        >
          Github
        </a>
      </div>
    </header>
  )
}

export default Header
