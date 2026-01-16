import { useState, useEffect } from "react";


export const useFetch = (url) => {
    const [data, setData] = useState(null);


    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);


    const [loanding , setLoanding] = useState(false);



    const httpConfig = (data, method) => {
        if (method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setMethod(method);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoanding(true);
            const res = await fetch(url);
            const json = await res.json();
            setData(json);
            setLoanding(false);
        };

        fetchData();
    }, [url, callFetch]);

    // Refatorando POST
    useEffect(() => {

        const httpRequest = async () => {
            if (method === "POST") {
                let fectOPtions = [url, config];

                const res = await fetch(...fectOPtions);
                const json = await res.json();

                setCallFetch(json);

            }
        };

        httpRequest();

    }, [config, method, url])

    return { data, httpConfig, loanding };
};