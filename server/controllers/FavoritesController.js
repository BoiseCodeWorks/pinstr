import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { favoritesService } from "../services/FavoritesService";

export class FavoritesController extends BaseController {
  constructor() {
    super("api/favorites");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.get)
      .post("", this.create)
      .delete("/:favoriteId", this.delete);
  }

  async get(req, res, next) {
    try {
      req.query.creatorEmail = req.userInfo.email;
      let favorites = await favoritesService.get(req.query);
      res.send(favorites);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      let favorite = await favoritesService.create(req.userInfo.email, req.body);
      res.send(favorite);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      let favorite = await favoritesService.delete(req.userInfo.email, req.params.favoriteId);
      res.send(favorite);
    } catch (e) {
      next(e);
    }
  }

}
