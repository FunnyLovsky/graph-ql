import { useState } from "react";
import ReposList from "./ReposList";

const Form: React.FC = () => {
    const [value, setValue] = useState('')
    const [queryString, setQueryString] = useState('');

    return(
        <>
            <div className="app">
                <input
                    className="search-input"
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Enter search query"
                />
                <button className="search-button" onClick={() => setQueryString(value)}>
                    Search
                </button>
                {queryString && <ReposList queryString={queryString} />}
            </div>
            
        </>
    )
}

export default Form;