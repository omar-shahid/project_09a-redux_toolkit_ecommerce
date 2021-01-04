import { createServer, Model } from "miragejs";
import faker from "faker";

const makeAPIServer = () =>
  createServer({
    models: {
      product: Model,
    },
    seeds(server) {
      for (let i = 0; i < 20; i++) {
        server.create("product", {
          title: faker.commerce.productName(),
          price: +faker.commerce.price(),
          description: faker.commerce.productDescription(),
          id: faker.random.number(999) + "",
          image: `https://source.unsplash.com/1600x900/?gf=${i}&shoes`,
          isAvailable: faker.random.boolean(),
        });
      }
    },
    routes() {
      this.namespace = "api";
      this.get("/products", (schema) =>
        schema.products.all().models.map((el) => el.attrs)
      );
    },
  });
export default makeAPIServer;
