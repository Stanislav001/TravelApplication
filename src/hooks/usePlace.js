import { useQuery } from "react-query";
import placeService from "../services/placeService";

export const useGetPlaces = (config) => {
    return useQuery(["fetch-places"], () => placeService.getPlaces().then((res) => res.places), config);
};

export const useGetPlace = (id, config) => {
    return useQuery(["fetch-place", id], () => placeService.getPlace(id).then((res) => res.place), config);
};