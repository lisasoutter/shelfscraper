import { useState } from 'react'

export default function Home() {
  const [ingredients, setIngredients] = useState('')
  const [recipes, setRecipes] = useState(null)
  const [loading, setLoading] = useState(false)

  const getRecipes = async () => {
    setLoading(true)
    setRecipes(null)
    const res = await fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients })
    })
    const data = await res.json()
    setRecipes(data.result)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">ShelfScraper 🥕</h1>
      <p className="mb-4">Enter what you have in your fridge or pantry. We'll give you meal ideas.</p>

      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="e.g. rice, spinach, canned beans"
        className="w-full p-3 border rounded mb-4"
        rows={4}
      />

      <button
        onClick={getRecipes}
        disabled={loading || !ingredients.trim()}
        className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'What Can I Make?'}
      </button>

      {recipes && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">
          {recipes}
        </div>
      )}
    </div>
  )
}
