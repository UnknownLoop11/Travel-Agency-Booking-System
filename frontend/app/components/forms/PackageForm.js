import React, { useState, useEffect } from "react";

// Next imports
import Image from "next/image";

// Services
import {
  createPackage,
  updatePackage,
  deletePackage,
} from "@/app/lib/services";
import moment from "moment";

const PackageForm = ({ formData, onCancel }) => {
  const [form, setForm] = useState({
    title: formData.title || "",
    description: formData.description || "",
    price: formData.price || "",
    availableDates: formData.availableDates || [],
    image: formData.image || "",
  });

  const [isNewForm, setIsNewForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDate = () => {
    if (form.availableDates.includes(selectedDate)) return;

    setForm({
      ...form,
      availableDates: [...form.availableDates, selectedDate],
    });
  };

  const handleRemoveDate = (date) => {
    const newDates = form.availableDates.filter((d) => d !== date);
    setForm({ ...form, availableDates: newDates });
  };

  useEffect(() => {
    if (!formData._id) {
      setIsNewForm(true);
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNewForm) {
      const res = await createPackage(form);

      if (res.status === "SUCCESS") {
        alert("Package created successfully");
        onCancel();
      } else {
        alert("Error creating package. Please try again");
      }
    } else {
      // Update pack age

      const res = await updatePackage(formData._id, form);

      if (res.status === "SUCCESS") {
        alert("Package updated successfully");
        onCancel();
      } else {
        alert("Error updating package. Please try again");
      }
    }
  };

  const handleDelete = async () => {
    const res = await deletePackage(formData._id);

    if (res.status === "SUCCESS") {
      alert("Package deleted successfully");
      onCancel();
    } else {
      alert("Error deleting package. Please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-4/5">
      <h4 className="text-xl font-semibold">
        {isNewForm ? "Add New Package" : "Package Details"}
      </h4>
      <hr />
      <label className={`form-control space-y-2 ${isNewForm && "hidden"}`}>
        <span className="label-text font-semibold">ObjectId</span>
        <p>{formData._id}</p>
      </label>
      {/* Title  */}
      <label className="form-control space-y-2">
        <span className="label-text font-semibold">Title</span>
        <input
          name="title"
          type="text"
          className="input input-bordered"
          placeholder=""
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>
      {/* Description */}
      <label className="form-control space-y-2">
        <span className="label-text font-semibold">Description</span>
        <textarea
          name="description"
          type="text"
          className="textarea textarea-bordered h-32"
          placeholder=""
          value={form.description}
          onChange={handleChange}
          required
        />
      </label>
      {/* Price */}
      <label className="form-control space-y-2">
        <span className="label-text font-semibold">Price</span>
        <label className="w-28 input input-bordered flex items-center gap-2">
          <span>$</span>
          <input
            name="price"
            type="number"
            className="grow w-full"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
      </label>
      {/* Available Dates */}
      <div className="space-y-3">
        <div className="flex gap-x-2 items-center">
          <span className="text-sm font-semibold">Available Dates</span>
          <label></label>
          <input
            className="input input-sm input-bordered"
            type="date"
            value={moment(selectedDate).format("YYYY-MM-DD")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            required
          />
          <button
            className="btn btn-square btn-sm"
            type="button"
            onClick={handleAddDate}
          >
            +
          </button>
        </div>
        <div className="flex gap-x-3">
          {/* Available Dates Display*/}
          {form.availableDates.map((date, idx) => {
            return (
              <div key={idx} className="badge gap-x-1">
                <span>{moment(date).format("DD-MM-YYYY")}</span>
                <Image
                  src={"/icons/close.png"}
                  alt="close"
                  width={16}
                  height={16}
                  className="cursor-pointer hover:border"
                  onClick={() => handleRemoveDate(date)}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Image */}
      <label className="form-control space-y-2">
        <span className="label-text font-semibold">Image Url</span>
        <input
          name="image"
          type="text"
          className="input input-bordered"
          value={form.image}
          onChange={handleChange}
          required
        />
      </label>
      {/* Form Actions */}
      <div className="flex justify-end gap-x-3 h-10 *:h-full *:btn-sm *:px-6">
        <button type="submit" className="btn btn-md btn-primary">
          Save
        </button>
        <button
          type="button"
          className={`btn  btn-error text-white ${isNewForm && "hidden"}`}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-outline btn-neutral"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PackageForm;
