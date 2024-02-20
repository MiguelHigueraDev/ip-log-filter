
const IpLog = ({ipLog, handleIpLogChange, updateList}) => {
  return (
    <div className="w-full mt-10 sm:mt-0 h-[300px]">
        <h2 className="text-2xl font-bold mb-2">Enter IP log</h2>
        <textarea className="resize-none text-xl p-2 w-full h-full" value={ipLog} onInput={handleIpLogChange} onKeyDown={updateList} onKeyUp={updateList}></textarea>
    </div>
  )
}

export default IpLog