import { useEffect,useState } from "react";

const API_URL ="https://data.gov.sg/api/action/datastore_search?resource_id=d_d085ce60a604f938aff6779ed08a106a";

function useAccidentData(){
    const [data,setData] = useState([]);
    const [loading,setLoading]= useState(true);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await fetch(API_URL);
                const json = await response.json();
                const records = json.result.records;
                setData(records);
            } catch (error) {
                console.error("error fetching data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData()
    }, []);

    return {data,loading};
}

export default useAccidentData;