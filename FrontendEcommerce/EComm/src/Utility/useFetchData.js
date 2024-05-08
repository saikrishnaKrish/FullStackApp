import React, { useCallback, useEffect, useState } from 'react';

const useFetchData = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData=useCallback(async ()=> {
        setIsLoading(true);
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            setData(responseData.data || responseData);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    },[])


    useEffect(() => {
        fetchData();
    }, [initialUrl]); // Ensure useEffect only runs when initialUrl changes

    return {
        isLoading,
        data,
        error
    };
};

export default useFetchData;
