import { faker } from "@faker-js/faker";

Cypress.Commands.add("deleteRecommendations", () => {
  cy.request("DELETE", "http://localhost:5000/recommendations");
});

Cypress.Commands.add("badScoreRecommendation", () => {
  const prefixArr = [
    "https://youtu.be/",
    "https://www.youtube.com/",
    "www.youtube.com/",
    "youtu.be/",
  ];
  const randomYtURL = prefixArr.sort(randomizer)[0];
  const data = {
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=YR_wIb_n4ZU&list=RDYR_wIb_n4ZU&start_radio=1&ab_channel=Claranon",
    score: -5
  };
  cy.request("POST", "http://localhost:5000/recommendations/many", data)
  return cy.wrap(data);
})

Cypress.Commands.add("createRecommendationValidLink", () => {
  const data = {
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=YR_wIb_n4ZU&list=RDYR_wIb_n4ZU&start_radio=1&ab_channel=Claranon"
  };
  cy.request("POST", "http://localhost:5000/recommendations", data);
})

Cypress.Commands.add("createRecommendation", () => {
  const prefixArr = [
    "https://youtu.be/",
    "https://www.youtube.com/",
    "www.youtube.com/",
    "youtu.be/",
  ];
  const randomYtURL = prefixArr.sort(randomizer)[0];
  const data = {
    name: faker.name.findName(),
    youtubeLink: randomYtURL + faker.name.findName(),
  };
  cy.request("POST", "http://localhost:5000/recommendations", data);
  return cy.wrap(data);
})

Cypress.Commands.add("createsUpTo11Recommendations", () => {
  const prefixArr = [
    "https://youtu.be/",
    "https://www.youtube.com/",
    "www.youtube.com/",
    "youtu.be/",
  ];
  const randomYtURL = prefixArr.sort(randomizer)[0];
  const randomNumber = Math.ceil(Math.random() * 10 + 1);
  const data = [];
  for (let i = 0; i < randomNumber; i++) {
    data.push({
      name: faker.name.findName(),
      youtubeLink: randomYtURL + faker.name.findName(),
      score: Math.ceil((Math.random() - 0.7) * 10),
    });
  };
  cy.request('POST', "http://localhost:5000/recommendations/many", data);
})

Cypress.Commands.add("getRecommendationByName", (name) => {
  cy.request("get",`http://localhost:5000/recommendations/name/${name}`).then((res) => {
    const recommendation = res.body;
    return cy.wrap(recommendation).as("recommendation")
  });
})

async function createUpTo11Recommendations() {
  const prefixArr = [
    "https://youtu.be/",
    "https://www.youtube.com/",
    "www.youtube.com/",
    "youtu.be/",
  ];
  const randomYtURL = prefixArr.sort(randomizer)[0];
  const randomNumber = Math.ceil(Math.random() * 10 + 1);
  const data = [];
  for (let i = 0; i < randomNumber; i++) {
    data.push({
      name: faker.name.findName(),
      youtubeLink: randomYtURL + faker.name.findName(),
      score: Math.ceil((Math.random() - 0.7) * 10),
    });
  }
  await prisma.recommendation.createMany({
    data,
  });

  return randomNumber;
};

function randomizer() {
  return Math.random() - 0.5;
}