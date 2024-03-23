import { createContext, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add, addToNum, minus } from "@/store/moudles/counterStore.js";

export const Context = createContext(null);

export function useCount() {
  const [count, setCount] = useState(1);
  const addCount = () => {
    setCount(count + 1);
  };
  return {
    count,
    addCount,
  };
}

export default function App() {
  // const { count, addCount } = useCount();
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      {count}
      <Button onClick={() => dispatch(add())}> + </Button>
      <Button onClick={() => dispatch(minus())}> - </Button>
      <Button onClick={() => dispatch(addToNum(10))}> + 10 </Button>
      {/*<Context.Provider value={count}>*/}
      {/*  Root: {count}*/}
      {/*  <Button onClick={addCount}>Add 1</Button>*/}
      {/*</Context.Provider>*/}
    </>
  );
}
