import { ApolloProvider } from "@apollo/client"
import Form from "./components/Form";
import { client } from "./api";

const App = () => {
    return(
        <ApolloProvider client={client}>
            <Form />
        </ApolloProvider>
    )
}

export default App;