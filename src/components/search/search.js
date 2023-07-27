import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../api";

const Search=({onSearchChange}) =>{

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    const loadOptions = async (inputValue) => {
        const response = await fetch(
            `${GEO_API_URL}?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        );
        const response_1 = await response.json();
        return {
            options: response_1.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                };
            }),
        };
      };
    

    return (
        <AsyncPaginate
            placeholder = "Enter city name"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            background-color = "#dfebed"
         />
    );
}

export default Search;