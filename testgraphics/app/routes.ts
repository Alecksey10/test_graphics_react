import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("/test/part1/try1", "./routes/part1try1.tsx")
 ] satisfies RouteConfig;
