import supertest from "supertest";
import { faker } from "@faker-js/faker"

import app from "../src/app.js"
import { prisma } from "../src/database.js";  

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("Recommendation creation suite", () => {
  it("creates a valid Recommendation, receives code 201", async () => {
    const prefixArr = ["https://youtu.be/", "https://www.youtube.com/", "www.youtube.com/", "youtu.be/"];
    function randomizer(){
      return Math.random() - 0.5;
    } 
    const randomYtURL = prefixArr.sort(randomizer)[0]
    const link = {
      "name": faker.name.findName(),
      "youtubeLink": randomYtURL + faker.name.findName()
    }
    const response = await supertest(app).post("/recommendations").send(link);
    const status = response.status;
    expect(status).toEqual(201);
  });

  it("creates a recommendation sending an invalid link, receives code 422", async () => {
    const link = {
      "name": faker.name.findName(),
      "youtubeLink": faker.internet.domainName()
    };

    const response = await supertest(app).post("/recommendations").send(link);
    const statusCode = response.status;
    expect(statusCode).toEqual(422);
  });

  it("creates a recommendation without sending a name, receives code 422", async () => {
    const link = {
      "name": "",
      "youtubeLink": faker.internet.domainName()
    };

    const response = await supertest(app).post("/recommendations").send(link);
    const statusCode = response.status;
    expect(statusCode).toEqual(422);
  });

  it("creates a recommendation without sending a link, receives code 422", async () => {
    const link = {
      "name": "",
      "youtubeLink": faker.internet.domainName()
    };

    const response = await supertest(app).post("/recommendations").send(link);
    const statusCode = response.status;
    expect(statusCode).toEqual(422);
  });

  it("creates a recommendation sending a name with a number instead of a string, receives code 422", async () => {
    const link = {
      "name": 1,
      "youtubeLink": faker.internet.domainName()
    };

    const response = await supertest(app).post("/recommendations").send(link);
    const statusCode = response.status;
    expect(statusCode).toEqual(422);
  });

  it("creates a recommendation sending a link with a number instead of a string, receives code 422", async () => {
    const link = {
      "name": faker.name.findName(),
      "youtubeLink": 1234
    };

    const response = await supertest(app).post("/recommendations").send(link);
    const statusCode = response.status;
    expect(statusCode).toEqual(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});