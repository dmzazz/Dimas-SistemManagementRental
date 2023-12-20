import Supplier from "../models/supplierModel.js";

// Mengambil Data Supplier
export const getSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findAll();
    res.status(200).json(supplier);
  } catch (error) {
    console.log(error.messages);
  }
};

// Mengambil Data Supplier menggunakan ID
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findOne({
      where: {
        id: req.params.id,
      },
    });
    // Jika supplier tidak ditemukan, kirim pesan "Supplier not found" dengan status 404
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.log(error.message);
  }
};

// Membuat Data Supplier
export const createSupplier = async (req, res) => {
  try {
    // Cek apakah supplier dengan data yang sama sudah ada
    const existingSupplierName = await Supplier.findOne({
      where: { person_name: req.body.person_name },
    });
    // Supplier dengan nama yang sama sudah ada, kirim respons bahwa supplier tidak dapat dibuat lagi
    if (existingSupplierName) {
      return res.status(400).json({ msgName: "Supplier with the same name already exists" });
    }

    // Cek apakah supplier dengan data yang sama sudah ada
    const existingSupplierEmail = await Supplier.findOne({
      where: { email: req.body.email },
    });
    // Supplier dengan email yang sama sudah ada, kirim respons bahwa supplier tidak dapat dibuat lagi
    if (existingSupplierEmail) {
      return res.status(400).json({ msgEmail: "Supplier with the same email already exists" });
    }

    // Cek apakah supplier dengan data yang sama sudah ada
    const existingSupplierPhone = await Supplier.findOne({
      where: { phone: req.body.phone },
    });
    // Supplier dengan email yang sama sudah ada, kirim respons bahwa supplier tidak dapat dibuat lagi
    if (existingSupplierPhone) {
      return res.status(400).json({ msgPhone: "Supplier with the same phone already exists" });
    }

    // Jika supplier belum ada, buat supplier baru
    await Supplier.create(req.body);
    res.status(201).json({ msg: "Supplier Created Success" });
  } catch (error) {
    console.log(error.message);
  }
};

// Mengupdate Data Supplier
export const updateSupplier = async (req, res) => {
  try {
    await Supplier.update(req.body, {
      where: { id: req.params.id },
    });
    if (!supplier) {
      res.status(404).json({ msg: "Supplier not found" });
    }
    res.status(200).json({ msg: "Supplier Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// Menghapus Data Supplier
export const deleteSupplier = async (req, res) => {
  try {
    await Supplier.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ msg: "Supplier Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
