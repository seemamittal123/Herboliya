import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { serverUrl } from "../App";
const AddFoodItem = () => {
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState("");
  const [error, setError] = useState({});
  const [discription, setDiscription] = useState('')
  const [loadding, setLoadding] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams();
  const handleName = (value) => {
    setName(value);
    setError({ ...error, nameError: "" });
  };

  const handleFile = (value) => {
    setBackendImage(value);
    setFrontendImage(URL.createObjectURL(value));
    setError({ ...error, fileError: "" });
  };

  const handleDiscription = (value) => {
    setDiscription(value);
    setError({ ...error, discriptionError: "" });
  }

  const handleData = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/item/find-item/${id}`,
      );
      setPrice(data.item.price);
      setName(data.item.name);
      setDiscription(data.item.discription)
      setFrontendImage(data.item.image);
      setBackendImage(data.item.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {
      nameError: "",
      fileError: "",
      discriptionError: ""
    };
    if (!name) errors.nameError = "Name is Required";
    if (!backendImage) errors.fileError = "Image is Required";
    if (!discription) errors.discriptionError = "Description is required"
    setError(errors);
    if (errors.nameError || errors.fileError) return;
    setLoadding(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discription", discription);

    if (backendImage) {
      formData.append("image", backendImage);
    }

    try {
      let { data } = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        {
          withCredentials: true,
        },
      );
      toast.success(data.message);
      setLoadding(false);
      navigate("/");
    } catch (error) {
      setLoadding(false);
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let errors = {
      nameError: "",
      fileError: "",
      discriptionError: ""
    };
    if (!name) errors.nameError = "Name is Required";
    if (!backendImage) errors.fileError = "Image is Required";
    if (!discription) errors.discriptionError = "Description is required"

    setError(errors);
    if (errors.nameError || errors.fileError) return;
    setLoadding(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discription", discription);

    if (backendImage) {
      formData.append("image", backendImage);
    }

    try {
      let { data } = await axios.post(
        `${serverUrl}/api/item/edit-item/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      toast.success(data.message);
      setLoadding(false);
      navigate("/");
    } catch (error) {
      setLoadding(false);
      console.log(error);
    }
  };
  useEffect(() => {
    setFrontendImage(userData.image);
    setName(userData.name);
  }, [userData]);

  useEffect(() => {
    handleData();
  }, [id]);

  return (
    <div className="addFood">

      <div className="container">
        <div className="form-container">
          <Link to="/" className="back-link">
            <FaArrowLeftLong size={23} />
          </Link>
          <div className="form-outer">
            <div className="top">
              <div className="image-section">
                <TbBowlSpoonFilled />
              </div>
              <h2 className="heading">{id ? "Edit" : "Add"} Food</h2>
            </div>
            <form onSubmit={id ? handleEdit : handleSubmit}>
              <div className="input-wrapper">
                <label htmlFor="name">Food Name</label>
                <input
                  type="text"
                  value={name}
                  id="name"
                  onChange={(e) => handleName(e.target.value)}
                />
                <p>{error.nameError}</p>
              </div>
              <div className="input-wrapper">
                <label htmlFor="image">Food Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                {frontendImage && (
                  <div className="image">
                    <img src={frontendImage} alt="" />
                  </div>
                )}
                <p>{error.fileError}</p>
              </div>
              <div className="input-wrapper">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={price}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <p>{error.priceErrror}</p>
              </div>
              <div className="input-wrapper">
                <label htmlFor="discription">Discription</label>
                <input
                  type="text"
                  placeholder="Enter discription"
                  value={discription}
                  id="discription"
                  onChange={(e) => handleDiscription(e.target.value)}
                />
                <p>{error.discriptionError}</p>
              </div>

              <button
                type="submit"
                disabled={loadding}
                className={loadding && "btn"}
              >
                {loadding ? <HashLoader color="#111184" size={25} /> : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
