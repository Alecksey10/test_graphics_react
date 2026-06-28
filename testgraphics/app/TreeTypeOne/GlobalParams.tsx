import { useContext, createContext } from "react";

export interface SceneParams {
  width:number,
  height:number
}
export let SceneParamsContext = createContext<SceneParams>({width:10, height:10});
export const useGetSceneParams = () => useContext(SceneParamsContext);
