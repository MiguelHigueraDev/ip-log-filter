const CountryList = ({countries, loadCountries}) => {
  return (
    <div className="w-full h-[300px] mt-8 sm:mt-1">
      <div className="flex gap-3 justify-between p-1">
        <h1 className="text-2xl font-bold">Countries</h1>
        <button type="button" className="self-end" aria-label="Load countries from API" onClick={loadCountries}>
          <img src="/download.svg" width={30} height={30} alt="" />
        </button>
      </div>
      <textarea
        className="w-full h-full resize-none text-xl p-2"
        value={countries.join("\n")}
        aria-label="Country list"
        readOnly
      ></textarea>
    </div>
  );
};

export default CountryList;
