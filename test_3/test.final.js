import React, {useEffect, useState} from 'react';

const USERS_URL = 'https://example.com/api/users';

function App() {
    const [pageData, setPageData] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10;
    const [maxPage, setMaxPage] = useState(0)


    const validate = (data) => {
        if(data && data.results && data.count){
            let m = Math.floor((data.count - 1)/pageSize);
            if(m < 0) m = 0;
            setMaxPage(m);
            if(Array.isArray(data.results)){
                setPageData(data);
            }
        }
    }

    useEffect(() => {
        const fetchData = async (page) => {
            try {
                let response = await fetch(`${USERS_URL}?page=${page}`);
                let data = await response.json();

                validate(data);
            }catch (e) {
                
            }

        }

        fetchData(currentPage);

    }, [currentPage])

    const onNext = () => {
        if (pageData) {
            if (currentPage < maxPage) {
                setCurrentPage(currentPage + 1);
            }
        }
    }

    const onPrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const gotoLastPage = () => {
        setCurrentPage(maxPage)
    }

    const gotoFirstPage = () => {
        setCurrentPage(0);
    }

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
                </thead>
                <tbody>
                {pageData && pageData.results && pageData.results.map(element => {
                    return <tr key={element.id}>
                        <th>{element.id}</th>
                        <th>{element.firstName}</th>
                        <th>{element.lastName}</th>
                    </tr>
                })}
                </tbody>
            </table>
            <section className="pagination">
                <button className="first-page-btn" onClick={gotoFirstPage}>first</button>
                <button className="previous-page-btn" onClick={onPrev}>previous</button>
                <button className="next-page-btn" onClick={onNext}>next</button>
                <button className="last-page-btn" onClick={gotoLastPage}>last</button>
            </section>
        </div>
    );
}

export default App;
