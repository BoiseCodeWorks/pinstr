import { dbContext } from "../db/DbContext";

class FavoritesService {
  async get(query = {}) {
    return dbContext.Favorites.find(query);
  }

  async create(email, favoriteData) {
    favoriteData.creatorEmail = email;
    return await dbContext.Favorites.create(favoriteData);
  }

  async delete(email, id) {
    return await dbContext.Favorites.findOneAndRemove({ creatorEmail: email, _id: id });
  }

}

export const favoritesService = new FavoritesService();




// REVIEW why services dont force the user
// class StudentSubmissionService{
//   async create(email, submission){
//     submission.email = email;
//     return await dbContext.Favorites.create()
//   }
// }

// studentController
// POST
// students email should be used to create the submission

// instructorController
// POST
// students email should be used to create the submission


