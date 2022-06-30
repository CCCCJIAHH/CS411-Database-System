import './App.css';
import 'antd/dist/antd.min.css';
import {useRoutes} from "react-router-dom";
import IndexRouter from "./routes/IndexRouter";

function App() {
    return (
        <div className="App">
            <IndexRouter/>
        </div>
    );
}

export default App;
