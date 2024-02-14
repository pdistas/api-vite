import app from "./app";
import { PORT } from "./enviroment";

if (import.meta.env.PROD) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
}

export const viteNodeApp = app;
