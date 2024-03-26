import { useEffect, useState } from 'react';
import divider from './icon/divider.svg';
import dice from './icon/dice.svg';

function App() {
  const [count, setCount] = useState(0);
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function updateAdvice() {
    setCount(count + 1);
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchAdvices() {
        try {
          setIsLoading(true);

          const res = await fetch(`https://api.adviceslip.com/advice`, {
            signal: controller.signal,
          });
          const data = await res.json();
          const { id, advice } = data.slip;
          // setAdvice(data.slip.advice)
          setAdvice(advice);

          setAdviceId(id);
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      }
      fetchAdvices();

      return function () {
        controller.abort();
      };
    },
    [advice, count],
  );

  return (
    <div className="flex h-screen items-center justify-center bg-grayish-80 text-center font-body font-extrabold">
      <div className="relative flex h-5/6 w-1/2 flex-col items-center justify-evenly rounded-2xl bg-grayish-60 px-10 md:h-96">
        <h6 className="text-clamp-header my-10 uppercase tracking-[.2rem] text-neon-50">
          {isLoading && ''}
          {!isLoading && (adviceId !== 0 ? `advice # ${adviceId} ` : '')}
        </h6>
        {isLoading && <Loader />}
        {!isLoading && (
          <p className="mt-1 px-16 text-clamp-main text-cyan-50">{advice}</p>
        )}
        <img src={divider} className="my-8 w-[25rem]" />

        <button
          onClick={updateAdvice}
          className="absolute -bottom-8 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-neon-50 hover:shadow-3xl"
        >
          <img src={dice} className="bg-neon-50 hover:animate-spin-slow" />
        </button>
      </div>
    </div>
  );
}

function Loader() {
  return <p className="mt-1 text-clamp-main text-cyan-50">Loading...</p>;
}

export default App;
