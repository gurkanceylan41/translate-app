import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getLanguages, translateText } from "./redux/actions";
import { setAnswer } from "./redux/slices/translateSlice";

const App = () => {
  const dispatch = useDispatch();
  /* Reducer */
  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer
  );
  const translateState = useSelector((store) => store.translateReducer);

  /* State */
  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });
  const [text, setText] = useState();

  /*
   * Dil dizisini bizden istenilen formata çevirme
   * Nesnelerin içerisindeki code ve name degerleri value ve label degerlerine çevirdik
   * Diziyi formatlama işlemi her render sırasında olmasını istemediğimiz için useMemo kullanarak
   * Cache(Önbelleğe) gönderdik.
   */

  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleTranslate = () => {
    dispatch(translateText({ text, targetLang, sourceLang }));
    dispatch(translateText);
  };

  const handleSwap = () => {
    //* Selec alanlarındaki verileri yer değiştirir.
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    //* reducer'da tutulan cevabı text state'ine aktar
    setText(translateState.answer);
    dispatch(setAnswer(text));
  };

  return (
    <div className="  bg-zinc-900 h-screen text-white grid place-items-center overflow-auto">
      <div className=" w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">Çeviri +</h1>
        {/* Üst Kısım */}
        <div className="flex gap-2 text-black">
          <Select
            isLoading={isLoading}
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
            isDisabled={isLoading}
            options={formatted}
            className="flex-1"
          />
          <button
            onClick={handleSwap}
            className="bg-zinc-700 py-2 px-6 hover:bg-zinc-800 transition rounded text-white"
          >
            Değiş
          </button>
          <Select
            isLoading={isLoading}
            value={targetLang}
            onChange={(e) => setSourceLang(e)}
            isDisabled={isLoading}
            options={formatted}
            className="flex-1"
          />
        </div>

        {/* Text alanlaır */}
        <div className="flex gap-3 mt-5 md:gap-[105px] max-md:flex-col">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] text-black text-[20px] rounded p-[10px]"
            ></textarea>
          </div>
          <div className="relative flex-1">
            <textarea
              disabled
              value={translateState.answer}
              className="w-full min-h-[300px] max-h-[500px] text-[20px] rounded p-[10px] "
            ></textarea>
            {isLoading && (
              <h1 className="absolute top-[50%] left-[50%] translate-x-[-50% ]">
                <div className="loader"></div>
              </h1>
            )}
          </div>
        </div>

        {/* buton */}
        <button
          disabled={translateState.isLoading}
          onClick={handleTranslate}
          className="bg-zinc-700 px-5 py-3 rounded-md font-semibold hover:ring-2 hover:bg-zinc-900 cursor-pointer transition mt-3 disabled:brightness-50"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
