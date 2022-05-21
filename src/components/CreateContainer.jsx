import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import { Loader } from "./index.js";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFunctions";

function CreateContainer() {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [field, setField] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dataCollection = title || calories || imageAsset || price || category;

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.file[0];
    const storageRef = ref(storage, `images${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    //show the progress of the upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        setField(true);
        setMsg("Errro while uploading : Please Try Again");
        setAlertStatus("danger");
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      },
      //if no error found then this function will Execute
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setField(true);
          setMsg("Image uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setField(true);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setMsg("Image deleted successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setField(true);
      }, 4000);
    });
  };

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!dataCollection) {
        setField(true);
        setMsg("please fill required fields");
        setAlertStatus("danger");
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setMsg("Data uploaded successfully");
        setAlertStatus("success");
        setTimeout(() => {
          setField(true);
          clearData();
        }, 4000);
      }
    } catch (error) {
      setMsg("Errro while uploading : Please Try Again");
      setAlertStatus("danger");
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("Select Category");
  };

  return (
    <div className="flex-col flex items-center justify-center">
      <div className="w-[90%] md:w-[70%] lg:w-[60%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {field && (
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className={`w-full p-2 rounded-lg text-center ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a Title..."
            className="w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-500"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.event.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories.map((item) => (
              <option
                value={item.urlPname}
                key={item.id}
                className="text-base border-0 outline-none capitalize bg-white text-black"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="group flex justify-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h300 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <lable className="w-full h-full flex flex-col items-center justify-center cursor-pointer relative">
                  <div className="w-full h-full flex flex-col items-center justify-center ">
                    <MdCloudUpload className="text-gray-500 text-3xl group-hover:text-gray-700" />
                    <p className="text-gray-500  group-hover:text-gray-700">
                      Click Here To Upload
                    </p>
                  </div>
                  <input
                    type="file"
                    name="upload-image"
                    accept="image/*"
                    className="absolute w-full h-full cursor-pointer opacity-0"
                    onChange={uploadImage}
                  />
                </lable>
              ) : (
                <div className="relative h-full">
                  <img
                    scr={imageAsset}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={deleteImage}
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
