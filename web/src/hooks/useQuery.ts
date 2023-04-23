import axios from "axios";

interface ConfigInterface {
    method: string;
    url: string;
    data?: object;
}

const useQuery = () => {
    return async (method: string, api: string, data?: object) => {
        let config: ConfigInterface;
    
        if(method === "POST" || method === "PUT" || method === "PATCH") {
            config = {
                method,
                url: `http://localhost:8080/api/${api}`,
                data,
            }
        }else if(method === "DELETE" || method === "GET"){
            config = {
                method,
                url: `http://localhost:8080/api/${api}`,
            }
        }
    
        try {
            const response = await axios(config!);
    
            return {
                status: "success",
                data: response.data
            };
        } catch (error: any) {
            return {
                status: "error",
                data: error.response.data
            };
        }
    };
}
 
export default useQuery;