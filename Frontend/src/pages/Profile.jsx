/* eslint-disable no-unused-vars */
// src/pages/Profile.jsx
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      {user && (
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-200 relative overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute -top-10 right-10 w-28 h-28 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30"></div>

          <div className="flex flex-col items-center text-center relative z-10">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
              alt="avatar"
              className="w-24 h-24 rounded-full shadow-md mb-4 border-4 border-blue-500"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <div className="mt-6 text-sm text-gray-400">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
