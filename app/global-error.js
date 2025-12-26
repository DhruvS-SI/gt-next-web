'use client'

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <main>
          <h1>Something went wrong!</h1>
          <p>{error.message || 'A global error occurred'}</p>
          <button onClick={() => reset()}>Try again</button>
        </main>
      </body>
    </html>
  )
}

