export default async function handler(req, res) {
  const { ingredients } = req.body

  const prompt = `You are a helpful chef. A user has the following ingredients: ${ingredients}.
  Suggest 2 recipes using mostly those ingredients. Include a title, short description, ingredients list, and simple steps.`

  const completion = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  })

  const json = await completion.json()
  res.status(200).json({ result: json.choices[0].message.content })
}
