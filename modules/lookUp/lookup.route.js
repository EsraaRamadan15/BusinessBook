import * as express from 'express';

const router = express.Router();

import { getAllCountries, getAllCities } from "./controller/lookup.js";

router.get('/GetAllCountries',getAllCountries)
router.get('/GetAllCitiesByCountry',getAllCities)


export default router