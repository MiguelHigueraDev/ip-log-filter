import { useEffect, useState } from 'react'
import IpLog from './components/IpLog'
import './App.css'
import IgnoredIps from './components/IgnoredIps'
import FilteredIps from './components/FilteredIps'
import CountryList from './components/CountryList'

function App() {
  const [ipLog, setIpLog] = useState('')
  const [ignoredIps, setIgnoredIps] = useState(() => {
    const storedIgnoredIps = localStorage.getItem('ignoredIps')
    return storedIgnoredIps ? storedIgnoredIps : ''
  })
  const [filteredIps, setFilteredIps] = useState('')
  const [countries, setCountries] = useState([])
  const [isFormatted, setIsFormatted] = useState(false)

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

  const handleFormatChange = () => {
    setIsFormatted(!isFormatted)
  }

  const copyToClipboard = (state) => {
    navigator.clipboard.writeText(state).catch(() => {alert('An error has ocurred while copying to the clipboard.')})
  }

  const updateList = () => {
    const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}(?:\/\d+)?\b/g;
    const allIps = ipLog.match(ipPattern)
    const uniqueIps = new Set(allIps)
    const ipList = Array.from(uniqueIps)
    // Remove entries that are ignored
    const ignored = ignoredIps.split('\n')
    const filteredIps = ipList.filter(ip => !ignored.includes(ip)).join('\n')
    filteredIps != null ? setFilteredIps(filteredIps) : setFilteredIps('')
  }

  const loadCountries = async () => {
    const ips = filteredIps.split('\n')
    // Do not query API if list is empty
    if (ips.length < 1) return;
    if (ips.length === 1 && ips[0] === '') return;

    setCountries([])
    try {
      for (const ip of ips) {
        const country = await fetch(`https://freeipapi.com/api/json/${ip}`)
        const data = await country.json()
        if (data.countryName != null) {
          // Unknown
          if (data.countryName === '-') {
            setCountries(prev => [...prev, `${ip} - IP INVÁLIDA`])
          } else {
            setCountries(prev => [...prev, `${ip} - ${data.countryName}`])
          }

        } 
      }
    } catch (error) {
      console.error(error)
      alert('Error loading countries from API.')
    }


  }
  return (
    <main className="min-h-screen bg-gray-200 max-w-4xl mx-auto  p-4">
      <div className='flex justify-between mb-4'>
        <h1 className='text-3xl font-black'>IP Log Filter</h1>
        <a href="https://github.com/MiguelHigueraDev/ip-log-filter/" aria-label="Go to this project's GitHub repository" target="_blank" rel="noopener noreferrer"><img src="/github.svg" height={40} width={40} className='' alt="GitHub Logo" /></a>
      </div>

      <div className="flex flex-col-reverse sm:flex-row min-h-[350px] gap-4">
        <IpLog ipLog={ipLog} handleIpLogChange={handleIpLogChange} updateList={() => updateList()}/>
        <IgnoredIps ignoredIps={ignoredIps} handleIgnoredIpsChange={handleIgnoredIpsChange} updateList={() => updateList()}/>
      </div>
      <div className="flex flex-col sm:flex-row min-h-[350px] gap-4">
        <FilteredIps filteredIps={filteredIps} copyToClipboard={copyToClipboard} isFormatted={isFormatted} handleFormatChange={handleFormatChange}/>
        <CountryList countries={countries} loadCountries={loadCountries} />
      </div>
      <p className='mt-14 sm:mt-1 text-center'>The geolocation API is limited to 60 requests per minute.</p>
    </main>
    
  )
}

export default App
