const InventoryType = require('../constants/InventoryType');
const Item = require('../models/Item');
const Review = require('../models/Review');
const User = require('../models/User');
const removeFiles = require('../utils/removeFiles');
const uploadFiles = require('../utils/uploadFiles');

const getItems = async (req, res) => {
  try {
    const { type } = req.params;
    const {
      page,
      pageSize,
      sortBy,
      sortDirection,
      search,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    if (!Object.values(InventoryType).includes(type)) {
      return res.status(404).json({ message: 'Invalid type' });
    }

    const items = await Item.find({
      type,
      title: search ? { $regex: search, $options: 'i' } : { $exists: true },
      category: category || { $exists: true },
      marketPrice: {
        $gte: minPrice || 0,
        $lte: maxPrice || 1000000,
      },
    })
      .sort([[sortBy || 'createdAt', sortDirection || 'asc']])
      .skip((parseInt(page) - 1) * parseInt(pageSize || 10))
      .limit(parseInt(pageSize) || 10);

    // foreach item get Reviews
    const itemsWithReviews = await Promise.all(
      items.map(async (item) => {
        const reviews = await Review.find({ item: item._id });
        item.reviews = reviews;
        return item;
      }),
    );

    let richItem = [...itemsWithReviews];
    if (req.user) {
      const user = await User.findById(req.user.id).select('favorites').exec();
      richItem = itemsWithReviews.map((item) => {
        return {
          ...item._doc,
          isFavorite: !!user.favorites.find(
            (favorite) => favorite.toString() == item._id.toString(),
          ),
        };
      });
    }

    res.status(200).json({ items: richItem });
  } catch (error) {
    console.log('items/getItems error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const reviews = await Review.find({ item: item._id }).exec();

    item.reviews = reviews;

    let isFavorite = false;
    if (req.user) {
      const user = await User.findById(req.user.id).select('favorites').exec();
      isFavorite = !!user.favorites.find((item) => item == id);
    }

    res.status(200).json({
      item: {
        ...item._doc,
        isFavorite,
      },
    });
  } catch (error) {
    console.log('items/getItem error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { type } = req.params;
    const {
      title,
      description,
      marketPrice,
      costPrice,
      stock,
      minAge,
      category,
    } = req.body;

    if (!Object.values(InventoryType).includes(type)) {
      return res.status(404).json({ message: 'Invalid type' });
    }

    const image = uploadFiles(req.files.image);

    const item = await Item.create({
      type,
      title,
      description,
      marketPrice,
      costPrice,
      stock,
      minAge,
      image,
      category,
    });

    item.reviews = [];

    res.status(200).json({ item });
  } catch (error) {
    console.log('items/createItem error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, marketPrice, costPrice, stock, minAge } =
      req.body;
    const { image } = req?.files;

    const item = Item.findById(id);

    if (!item) return res.status(400).json({ message: 'Item not found' });

    if (title) item.title = title;
    if (description) item.description = description;
    if (marketPrice) item.marketPrice = marketPrice;
    if (costPrice) item.costPrice = costPrice;
    if (stock) item.stock = stock;
    if (minAge) item.minAge = minAge;
    if (image) {
      await removeFiles(item.image);
      item.image = await uploadFiles(image);
    }

    await item.save();

    res.status(200).json({ item });
  } catch (error) {
    console.log('items/createItem error: ', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.query;

    const item = await Item.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    if (!item) return res.status(404).json({ message: 'Item not found' });

    return res.status(200).json('Item deleted');
  } catch (error) {
    console.log('items/deleteItem error: ', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};
