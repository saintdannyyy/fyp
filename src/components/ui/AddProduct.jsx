import React, { useState } from "react";

const AddProduct = ({ onClose, onSave, categories = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    productId: "",
    category: "",
    buyingPrice: "",
    quantity: "",
    unit: "",
    expiryDate: "",
    supplierDetails: "",
  });

  const [errors, setErrors] = useState({});

  const handleImageSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageSelect(file);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.productId.trim())
      newErrors.productId = "Product ID is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.buyingPrice || formData.buyingPrice <= 0)
      newErrors.buyingPrice = "Valid buying price is required";
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = "Valid quantity is required";
    if (!formData.unit.trim()) newErrors.unit = "Unit is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const productData = {
        ...formData,
        price: parseFloat(formData.buyingPrice),
        cost: parseFloat(formData.buyingPrice),
        stock: parseInt(formData.quantity),
        sku: formData.productId,
        description: formData.supplierDetails || "No description provided",
        img: selectedImage,
        unit: formData.unit,
        expiryDate: formData.expiryDate,
      };

      onSave(productData);
    }
  };

  const handleDiscard = () => {
    setFormData({
      name: "",
      productId: "",
      category: "",
      buyingPrice: "",
      quantity: "",
      unit: "",
      expiryDate: "",
      supplierDetails: "",
    });
    setSelectedImage(null);
    setErrors({});
    onClose();
  };

  // Default categories if none provided
  const defaultCategories = [
    "Feed & Nutrition",
    "Day Old Chick",
    "Equipment",
    "Eggs & Dairy",
    "Live Birds",
  ];

  const categoryOptions =
    categories.length > 0
      ? categories.map((cat) => cat.name || cat)
      : defaultCategories;

  return (
    <div className="bg-white rounded-lg max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Image Upload Section */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-6">
            <div
              className={`border-2 border-dashed rounded-lg h-24 w-24 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-200 ${
                dragOver
                  ? "border-blue-500 bg-blue-50"
                  : selectedImage
                  ? "border-green-300 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById("file-input").click()}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="text-center">
                  <div className="text-gray-400 text-2xl mb-1">📷</div>
                </div>
              )}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 leading-relaxed">
                Drag image here
                <br />
                <span className="text-gray-500">or</span>
                <br />
                <button
                  type="button"
                  onClick={() => document.getElementById("file-input").click()}
                  className="text-blue-600 hover:text-blue-700 underline font-medium"
                >
                  Browse image
                </button>
              </p>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Product Name */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 text-right">
              Product Name
            </label>
            <div className="col-span-2">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Product ID */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 text-right">
              Product ID
            </label>
            <div className="col-span-2">
              <input
                type="text"
                value={formData.productId}
                onChange={(e) => handleInputChange("productId", e.target.value)}
                placeholder="Enter product ID"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.productId
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.productId && (
                <p className="mt-1 text-sm text-red-500">{errors.productId}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 text-right">
              Category
            </label>
            <div className="col-span-2">
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white ${
                  errors.category
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="">Select product category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Buying Price */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 text-right">
              Buying Price
            </label>
            <div className="col-span-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  GHS
                </span>
                <input
                  type="number"
                  value={formData.buyingPrice}
                  onChange={(e) =>
                    handleInputChange("buyingPrice", e.target.value)
                  }
                  placeholder="Enter buying price"
                  step="0.01"
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                    errors.buyingPrice
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
              {errors.buyingPrice && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.buyingPrice}
                </p>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 text-right">
              Quantity
            </label>
            <div className="col-span-2">
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                placeholder="Enter product quantity"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.quantity
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
              )}
            </div>
          </div>

          {/* Unit */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 text-right">
              Unit
            </label>
            <div className="col-span-2">
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleInputChange("unit", e.target.value)}
                placeholder="Enter product unit"
                className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  errors.unit
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.unit && (
                <p className="mt-1 text-sm text-red-500">{errors.unit}</p>
              )}
            </div>
          </div>

          {/* Expiry Date */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <label className="text-sm font-medium text-gray-700 text-right">
              Expiry Date
            </label>
            <div className="col-span-2">
              <div className="relative">
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    handleInputChange("expiryDate", e.target.value)
                  }
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  style={{
                    colorScheme: "light",
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Details */}
          <div className="grid grid-cols-3 gap-4 items-start">
            <label className="text-sm font-medium text-gray-700 text-right pt-3">
              Supplier Details
            </label>
            <div className="col-span-2">
              <textarea
                value={formData.supplierDetails}
                onChange={(e) =>
                  handleInputChange("supplierDetails", e.target.value)
                }
                placeholder="Enter Supplier details"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center gap-4 pt-3 mt-3 border-t border-gray-200">
          <div> </div>
          <div className="flex justify-between items-center gap-5">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
