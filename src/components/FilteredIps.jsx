const FilteredIps = ({filteredIps, copyToClipboard, isFormatted, handleFormatChange}) => {
  const filteredIpsCount = filteredIps.trim().split('\n').filter(ip => ip !== "").length
  const formattedIps = (filteredIps === "") ? "" : 
  filteredIps.split('\n').map(ip => `-A INPUT -s ${ip} -j DROP`).join('\n')

  if (isFormatted) return (
    <div className='w-full h-[300px] mt-14 sm:mt-1'>
    <div className="flex gap-3 p-1">
      { (filteredIpsCount > 0) ? (
        <h1 className="text-2xl font-bold">Formatted IPs ({filteredIpsCount})</h1>
      ) : (
        <h1 className="text-2xl font-bold">Formatted IPs</h1>
      )}
      <div className="flex justify-end flex-grow gap-3">
        <button type="button" aria-label="Copy formatted IPs to clipboard" onClick={() => copyToClipboard(formattedIps)}>
          <img src="/clipboard.svg" width={30} height={30} alt="" />
        </button>
        <button type="button" aria-label="Change format" onClick={() => handleFormatChange()}>
          <img src="/file.svg" width={30} height={30} alt="" />
        </button>
      </div>
    </div>
    <textarea className='w-full h-full resize-none text-xl p-2' value={formattedIps} readOnly></textarea>
  </div>
  )

  return (
    <div className='w-full h-[300px] mt-14 sm:mt-1'>
    <div className="flex gap-3 p-1">
      { (filteredIpsCount > 0) ? (
        <h1 className="text-2xl font-bold">Filtered IPs ({filteredIpsCount})</h1>
      ) : (
        <h1 className="text-2xl font-bold">Filtered IPs</h1>
      )}
      <div className="flex justify-end flex-grow gap-3">
        <button type="button" aria-label="Copy formatted IPs to clipboard" onClick={() => copyToClipboard(filteredIps)}>
          <img src="/clipboard.svg" width={30} height={30} alt="" />
        </button>
        <button type="button" aria-label="Change format" onClick={() => handleFormatChange()}>
          <img src="/file.svg" width={30} height={30} alt="" />
        </button>
      </div>
    </div>
    <textarea className='w-full h-full resize-none text-xl p-2' value={filteredIps} readOnly></textarea>
  </div>
  )
}

export default FilteredIps