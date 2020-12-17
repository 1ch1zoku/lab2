import {Router} from "express";
import gasStationKeepingControler from "./controler";

const gasStationKeepingRouter = new Router();
gasStationKeepingRouter.get("/", gasStationKeepingControler.get);
gasStationKeepingRouter.get("/:id", gasStationKeepingControler.getById);
gasStationKeepingRouter.post("/", gasStationKeepingControler.post);
gasStationKeepingRouter.delete("/:id",gasStationKeepingControler.delete);
gasStationKeepingRouter.patch("/:id", gasStationKeepingControler.patch);

export default gasStationKeepingRouter;