import { jest } from '@jest/globals'

import  recommendationService  from "../../src/services/recommendationsService.js";
import recommendationRepository  from "../../src/repositories/recommendationRepository.js";
import { notFoundError } from '../../src/utils/errorUtils.js';

describe("recommendation creation unit test suite", () => {
  it("create a recommendation successfully", async () => {
    const data = {
      name: "not registered", 
      youtubeLink: "https://youtube.com/linklink"
    }
    jest.spyOn(recommendationRepository, 'create').mockImplementationOnce((): any => {});
    jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {});

    await recommendationService.insert(data);
    expect(recommendationRepository.create).toBeCalled();
  });

  it("tries to create a recommendation already registered", async () => {
    const data = {
      name: "already registered", 
      youtubeLink: "https://youtube.com/linklink"
    };

    jest.spyOn(recommendationRepository, 'findByName').mockImplementationOnce((): any => {
      return {
        name: data.name, 
        youtubeLink: data.youtubeLink
      }
    });

    const promise = recommendationService.insert(data);
    expect(promise).rejects.toEqual({ type: "conflict", message: "Recommendations names must be unique" })
  })

  it("tries to upvote a recommendation that doesn't exist", async () => {
    const promise = recommendationService.upvote(100);
    expect(promise).rejects.toEqual({ type: "not_found", message: "" })
  })

  it("upvotes an existing recommendation", async () => {
    const data = {
      name: "already registered", 
      youtubeLink: "https://youtube.com/linklink"
    };

    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
      return {
        id: 1,
        name: data.name,
        youtubeLink: data.youtubeLink,
        score: 0
      }
    })
    
    jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => {});
    await recommendationService.upvote(1);
    expect(recommendationRepository.updateScore).toHaveBeenCalled()
  })

  it("downvotes an existing recommendation", async () => {
    const data = {
      name: "already registered", 
      youtubeLink: "https://youtube.com/linklink"
    };

    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
      return {
        id: 1,
        name: data.name,
        youtubeLink: data.youtubeLink,
        score: 0
      }
    });

    jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => {
      return {
        id: 1,
        name: data.name,
        youtubeLink: data.youtubeLink,
        score: -1
      }
    });
    await recommendationService.downvote(1);
    expect(recommendationRepository.updateScore).toHaveBeenCalled()
  })

  it("downvotes an existing recommendation with bad score", async () => {
    const data = {
      name: "already registered", 
      youtubeLink: "https://youtube.com/linklink"
    };

    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => {
      return {
        id: 1,
        name: data.name,
        youtubeLink: data.youtubeLink,
        score: -5
      }
    });

    jest.spyOn(recommendationRepository, 'updateScore').mockImplementationOnce((): any => {
      return {
        id: 1,
        name: data.name,
        youtubeLink: data.youtubeLink,
        score: -6
      }
    });

    jest.spyOn(recommendationRepository, 'remove').mockImplementationOnce((): any => { });
    await recommendationService.downvote(1);
    expect(recommendationRepository.remove).toHaveBeenCalled()
  })
})

describe("find recommendation unit test suite", () => {
  it("tries to find a recommendation by id, fails return error", async () =>{
    const id = 1;
    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => { })
    const promise = recommendationService.getById(id);
    expect(promise).rejects.toEqual({ type: "not_found", message:"" })
  })

  it("find a recommendation by id", async () =>{
    const data = {
      name: 'amazingName',
      youtubeLink: 'https://youtube.com/amazing-link',
    }
    jest.spyOn(recommendationRepository, 'find').mockImplementationOnce((): any => { 
      return {
        id: 1,
        name: data.name,
        youtubeLink: data.youtubeLink,
        score: 9000
      }
    });

    const recommendation = await recommendationService.getById(1);
    expect(recommendation.id).toEqual(1)
  })

  it("gets all recommendations", async () => {
    jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {});
    await recommendationService.get()
    expect(recommendationRepository.findAll).toHaveBeenCalled();
  })

  it("gets top recommendations", async () => {
    const amount = 5;
    jest.spyOn(recommendationRepository, 'getAmountByScore').mockImplementationOnce((): any => {});
    await recommendationService.getTop(amount)
    expect(recommendationRepository.getAmountByScore).toHaveBeenCalled();
  })

  it("get a random recommendation with gt", async () => {
    const data = {
      name: "already registered", 
      youtubeLink: "https://youtube.com/linklink"
    };

    jest.spyOn(Math, "random").mockReturnValue(0.5)
    jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
      return [
        {
          id:1,
          name: data.name,
          youtubeLink: data.youtubeLink,
          score: 0
        }
      ]
    });
    const promise = await recommendationService.getRandom();
    expect(promise.name).toEqual(data.name)
  })

  it("get a random recommendation with lte", async () => {
    const data = {
      name: "already registered", 
      youtubeLink: "https://youtube.com/linklink"
    };

    jest.spyOn(Math, 'random').mockReturnValue(0.9)
    jest.spyOn(recommendationRepository, 'findAll').mockImplementationOnce((): any => {
      return [
        {
          id:1,
          name: data.name,
          youtubeLink: data.youtubeLink,
          score: 0
        }
      ]
    });
    const promise = await recommendationService.getRandom();
    expect(promise.name).toEqual(data.name)
  })

  it("tries to get a recommendation that doesn't exist, fails and returns error", async () => {
    jest.spyOn(recommendationRepository, 'findAll').mockImplementation((): any => {
      return []
    })
    const promise = recommendationService.getRandom();
    expect(promise).rejects.toEqual({ type: "not_found", message:"" })
  })
})
