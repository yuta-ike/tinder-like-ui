const ingredients = [
  { item: "玉ねぎ", amount: "1/2個" },
  { item: "にんにく", amount: "1片" },
  { item: "パン粉", amount: "200g" },
  { item: "卵", amount: "Mサイズ1個" },
  { item: "塩", amount: "小さじ1" },
  { item: "コショウ", amount: "少々" },
  { item: "牛・豚合挽き肉", amount: "300g" },
  { item: "牛乳", amount: "1/2カップ" },
  { item: "ナツメグ（あれば）", amount: "少々" },
]

export type CardProps = {
  title: string
  showShadow?: boolean
}

const Card: React.VFC<CardProps> = ({ title, showShadow = false }) => {
  return (
    <section
      className={`w-[300px] border rounded border-gray-200 p-4 ${
        showShadow ? "shadow-lg" : ""
      } bg-white`}
    >
      <div>
        <h1 className="text-sm font-bold">{title}</h1>
      </div>
      <div className="relative mt-2 overflow-hidden rounded shadow-md">
        <img src="/image1.jpg" alt="" className="drag-none" />
        <div className="absolute bottom-0 right-0 px-1.5 py-0.5 font-bold text-white bg-orange-500 rounded-tl shadow rounded-rb">
          30
          <span className="ml-0.5 text-xs">分</span>
        </div>
      </div>
      <div>
        <p className="mt-4 text-xs text-gray-600">誰でも簡単に作れるハンバーグです</p>
      </div>
      <dl className="grid grid-cols-2 grid-rows-3 p-2 mt-4 text-xs text-gray-700 border border-gray-200 rounded gap-x-4 gap-y-2">
        {ingredients
          .slice(0, ingredients.length < 6 ? ingredients.length : ingredients.length === 6 ? 6 : 5)
          .map(({ item, amount }) => (
            <div key={item} className="flex justify-between space-x-2">
              <dt className="truncate">{item}</dt>
              <dd className="shrink-0">{amount}</dd>
            </div>
          ))}
        {6 < ingredients.length && (
          <button className="text-xs text-left underline hover:no-underline text-orange-500/80">
            ...材料を全て見る
          </button>
        )}
      </dl>
    </section>
  )
}

export default Card
