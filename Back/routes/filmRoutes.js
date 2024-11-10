const express = require('express');
const Film = require('../models/Film');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - imageUrl
 *         - imdb
 *         - metaScore
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the film
 *         name:
 *           type: string
 *           description: The name of the film
 *         description:
 *           type: string
 *           description: The description of the film
 *         imageUrl:
 *           type: string
 *           description: URL to the image of the film
 *         imdb:
 *           type: number
 *           description: IMDb rating of the film
 *         metaScore:
 *           type: number
 *           description: Meta score of the film
 *       example:
 *         name: Inception
 *         description: A mind-bending thriller by Christopher Nolan.
 *         imageUrl: https://link-to-image.com/inception.jpg
 *         imdb: 8.8
 *         metaScore: 74
 */

/**
 * @swagger
 * /films:
 *   post:
 *     summary: Create a new film
 *     tags: [Films]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       201:
 *         description: The film was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       400:
 *         description: Invalid input
 */
router.post('/films', async (req, res) => {
  try {
    const { name, description, imageUrl, imdb, metaScore } = req.body;
    
    // Validate that all required fields are provided
    if (!name || !description || !imageUrl || !imdb || !metaScore) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newFilm = new Film({
      name,
      description,
      imageUrl,
      imdb,
      metaScore,
    });

    const savedFilm = await newFilm.save();
    res.status(201).json(savedFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /films:
 *   get:
 *     summary: Returns a list of all films
 *     tags: [Films]
 *     responses:
 *       200:
 *         description: A list of all films
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Film'
 */
router.get('/films', async (req, res) => {
  try {
    const films = await Film.find();
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /films/{id}:
 *   get:
 *     summary: Get a film by its ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The film ID
 *     responses:
 *       200:
 *         description: The film details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       404:
 *         description: Film not found
 */
router.get('/films/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findById(id);
    
    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }

    res.status(200).json(film);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /films/{id}:
 *   put:
 *     summary: Update a film by ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The film ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Film'
 *     responses:
 *       200:
 *         description: The film was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Film not found
 */
router.put('/films/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, imageUrl, imdb, metaScore } = req.body;

    // Validate that all required fields are provided
    if (!name || !description || !imageUrl || !imdb || !metaScore) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedFilm = await Film.findByIdAndUpdate(
      id,
      { name, description, imageUrl, imdb, metaScore },
      { new: true }  // Return the updated document
    );

    if (!updatedFilm) {
      return res.status(404).json({ error: 'Film not found' });
    }

    res.status(200).json(updatedFilm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @swagger
 * /films/{id}:
 *   delete:
 *     summary: Delete a film by ID
 *     tags: [Films]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The film ID
 *     responses:
 *       200:
 *         description: The film was deleted
 *       404:
 *         description: Film not found
 */
router.delete('/films/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFilm = await Film.findByIdAndDelete(id);

    if (!deletedFilm) {
      return res.status(404).json({ error: 'Film not found' });
    }

    res.status(200).json({ message: 'Film deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
