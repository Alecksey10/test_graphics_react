import { type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"), // вместо "./routes/index.tsx"
  route("test_graphics_react/", "./routes/index.tsx"),
  route("test_graphics_react/part1/try1", "./routes/part1try1.tsx")
] satisfies RouteConfig;
