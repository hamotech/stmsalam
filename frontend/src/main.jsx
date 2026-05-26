import './styles/index.css'

const rootEl = document.getElementById('root')

function showFatal(message, stack) {
  const safe = (s) =>
    String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  rootEl.innerHTML = `
    <div style="font-family:system-ui,sans-serif;padding:32px;max-width:640px;margin:48px auto;line-height:1.5;color:#0f172a;background:#fef2f2;border:1px solid #fecaca;border-radius:12px">
      <h1 style="margin:0 0 12px;font-size:1.25rem">App failed to start</h1>
      <p style="margin:0 0 16px">${safe(message)}</p>
      <p style="margin:0;font-size:0.875rem;color:#64748b">Open the browser devtools console (F12) for full details.</p>
      <pre style="margin-top:16px;padding:12px;background:#fff;border-radius:8px;overflow:auto;font-size:12px;color:#334155;border:1px solid #e2e8f0;white-space:pre-wrap">${safe(stack)}</pre>
    </div>
  `
}

async function boot() {
  const [{ default: App }, React, { createRoot }] = await Promise.all([
    import('./App.jsx'),
    import('react'),
    import('react-dom/client'),
  ])

  createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

boot().catch((err) => {
  console.error(err)
  showFatal(err?.message || String(err), err?.stack || '')
})
