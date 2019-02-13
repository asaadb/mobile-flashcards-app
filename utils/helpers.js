
export function formatResults (results) {
  return results === null
    ? null
    : JSON.parse(results)
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatDeck (title) {
  const id = generateUID()
  return {
    [id]:{
      title: title,
      questions:[],
    }
  }
}
