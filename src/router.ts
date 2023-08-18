import { Router } from "express";

const router = Router();

const routes = import.meta.glob("./routes/**/*.{ts,js}", {
    eager: true
});

Object.entries(routes).forEach(([path, route]) => {
    const routeObj = route as { prefix?: string; default: typeof router };
    const prefix = routeObj.prefix || path.match(/\.\/routes(.*?)(\/index)?\.(ts|js)/)![1];

    router.use(prefix, routeObj.default);
});

export default router;
