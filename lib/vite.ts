import { createServer } from "./";

createServer().then(
    () => console.info('Server start'),
    (err) => console.error(err)
);