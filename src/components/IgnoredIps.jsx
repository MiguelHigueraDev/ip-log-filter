const IgnoredIps = ({ignoredIps, handleIgnoredIpsChange, updateList}) => {
  const ignoredIpsCount = ignoredIps.trim().split('\n').filter(ip => ip !== "").length
  return (
    <div className="w-full h-[300px]">
      {ignoredIpsCount > 0 ? (
        <h1 className="text-2xl font-bold mb-2">
          Ignored IPs ({ignoredIpsCount})
        </h1>
      ) : (
        <h1 className="text-2xl font-bold mb-2">Ignored IPs</h1>
      )}

      <textarea
        className="w-full h-full resize-none text-xl p-2"
        aria-label="Enter ignored IPs here (whitelist)"
        value={ignoredIps}
        onInput={handleIgnoredIpsChange}
        onKeyDown={updateList}
        onKeyUp={updateList}
      ></textarea>
    </div>
  );
};

export default IgnoredIps;
