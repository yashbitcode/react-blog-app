import { useState } from "react";

class Ab {
    constructor(name: string) {
        console.log(name);
    }
}

const App = () => {
    const [val, setVal] = useState(1);
    const obj = new Ab("yash");


    return <div><button onClick={() => setVal(val + 1)}>{val}</button></div>;
};

export default App;
