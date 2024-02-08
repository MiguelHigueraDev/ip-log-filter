import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [ipLog, setIpLog] = useState('')
  const [ignoredIps, setIgnoredIps] = useState(() => {
    const storedIgnoredIps = localStorage.getItem('ignoredIps')
    return storedIgnoredIps ? storedIgnoredIps : ''
  })
  const [filteredIps, setFilteredIps] = useState('')

  const formattedIps = filteredIps.split('\n')
    .map(ip => `-A INPUT -s ${ip} -j DROP`).join('\n')

  useEffect(() => {
    localStorage.setItem('ignoredIps', ignoredIps)
  }, [ignoredIps])

  const handleIpLogChange = (event) => {
    setIpLog(event.target.value)
    updateList()
  }

  const handleIgnoredIpsChange = (event) => {
    setIgnoredIps(event.target.value)
    updateList()
  }

  const copyIps = () => {
    navigator.clipboard.writeText(filteredIps).catch(() => {alert('Se produjo un error al copiar al portapapeles.')})
  }

  const copyFormattedIps = () => {
    navigator.clipboard.writeText(formattedIps).catch(() => {alert('Se produijo un error al copiar al portapapeles.')})
  }

  const updateList = () => {
    const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
    const ips = ipLog.match(ipPattern)
    const differentIps = new Set(ips)
    const ipList = Array.from(differentIps).join('\n')
    // Remove entries that are ignored
    const ignored = ignoredIps.split('\n')
    const filteredIps = ipList.split('\n').filter(ip => !ignored.includes(ip)).join('\n')
    if (filteredIps != null) setFilteredIps(filteredIps)
    else setFilteredIps('')
  }
  return (
    <main className="min-h-screen bg-gray-200 max-w-7xl mx-auto  p-4">
      <div className='flex justify-between'>
        <h1 className='text-3xl font-black'>Filtro IPs</h1>
        <a className='mb-10 text-xl' href="https://github.com/MiguelHigueraDev/ip-log-filter/" target="_blank" rel="noopener noreferrer">GitHub repo</a>
      </div>

      <div className="grid grid-cols-2 min-h-[350px] gap-4">
        <div className='w-full h-full'>
          <h1 className="text-2xl font-bold mb-2">Ingresa log de IPs</h1>
          <textarea className='w-full h-full resize-none text-xl p-2' value={ipLog} onInput={handleIpLogChange} onKeyDown={updateList} onKeyUp={updateList}></textarea>
        </div>
        <div className='w-full h-full'>
          <h1 className="text-2xl font-bold mb-2">IPs ignoradas (ingresa una por fila)</h1>
          <textarea className='w-full h-full resize-none text-xl p-2' value={ignoredIps} onInput={handleIgnoredIpsChange} onKeyDown={updateList} onKeyUp={updateList}></textarea>
        </div>
      </div>
      <div className="grid grid-rows-1 grid-cols-2 gap-3 mt-[50px] min-h-[300px]">
        <div className='w-full h-full'>
          <div className="flex gap-3">
            <h1 className="text-2xl font-bold">Lista de IP filtradas</h1>
            <button type="button" onClick={copyIps}>Copiar</button>
          </div>
          <textarea className='w-full h-full resize-none text-xl p-2' value={filteredIps} readOnly></textarea>
        </div>
        <div className='w-full h-full'>
          <div className='flex gap-3'>
            <h1 className="text-2xl font-bold">Formateadas</h1>
            <button type="button" onClick={copyFormattedIps}>Copiar</button>
          </div>
          <textarea className='w-full h-full resize-none text-xl p-2' value={formattedIps} readOnly></textarea>
        </div>
      </div>
    </main>
    
  )
}

export default App
