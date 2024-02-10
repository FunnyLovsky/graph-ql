import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../api";
import { FC, useEffect, useState } from "react";

interface IProps {
    queryString: string
}

const ReposList: FC<IProps> = ({ queryString }) => {
    const [repos, setRepos] = useState<any[]>([])
    const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
        variables: { queryString },
    });

    useEffect(() => {
        if (!loading && data && data.search && data.search.nodes) {
            const newRepositories = data.search.nodes;
            setRepos(prevRepositories => [...prevRepositories, ...newRepositories]);
        }
    }, [loading, data]);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return (
        <div className="repository-list">
            {repos.map((repository: any) => (
                <div key={repository.id + Date.now()} className="repository-item">
                    <h3><a href={repository.url}>{repository.name}</a></h3>
                    <p>{repository.description}</p>
                </div>
            ))}
            <button
                className="load-more-button"
                onClick={
                    () => fetchMore({
                        variables: {
                            queryString,
                            after: data.search.pageInfo.endCursor,
                        },
                    })
                }
            >
                Load More
            </button>
        </div>
    );
}

export default ReposList;