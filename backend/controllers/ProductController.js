import Product from "../models/productModel.js";

// Mengambil Data Product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.status(200).json(product);
  } catch (error) {
    console.log(error.messages);
  }
};

// Mengambil Data Product menggunakan ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    // Jika product tidak ditemukan, kirim pesan "Product not found" dengan status 404
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
  }
};

// Membuat Data Product
export const createProduct = async (req, res) => {
  try {
    // Sertakan supplierId dalam body permintaan
    const product = { ...req.body, supplierId: req.body.supplierId };

    // Cek apakah product dengan data yang sama sudah ada
    const existingProductSku = await Product.findOne({
      where: { sku: req.body.sku },
    });
    // Product dengan nama yang sama sudah ada, kirim respons bahwa product tidak dapat dibuat lagi
    if (existingProductSku) {
      return res.status(400).json({ msgName: "Product with the same sku already exists" });
    }

    // Cek apakah product dengan data yang sama sudah ada
    const existingProductName = await Product.findOne({
      where: { name: req.body.name },
    });
    // Product dengan nama yang sama sudah ada, kirim respons bahwa product tidak dapat dibuat lagi
    if (existingProductName) {
      return res.status(400).json({ msgName: "Product with the same name already exists" });
    }

    // Buat produk
    await Product.create(product);
    res.status(201).json({ msg: "Product Created Success" });
  } catch (error) {
    console.log(error.message);
  }
};

// Update Produk
export const updateProduct = async (req, res) => {
  try {
    // Apakah data produk ada
    const existingProduct = await Product.findOne({
      where: { id: req.params.id },
    });
    // Jika tidak ada tidak dapat di update
    if (!existingProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Sertakan supplierId dalam body permintaan
    const product = { ...req.body, supplierId: req.body.supplierId };
    await Product.update(product, {
      where: { id: req.params.id },
    });
    res.status(200).json({ msg: "Product Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Menghapus Data Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ msg: "Product Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
