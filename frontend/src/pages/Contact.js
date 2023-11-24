import React from "react";
import Navigation from "../Components/Navigation";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";
const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function that displays a success toast on bottom right of the page when form submission is successful
  const toastifySuccess = () => {
    toast("Form sent!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
    });
  };

  // Function called on submit that uses emailjs to send email of valid contact form
  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
      );

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Navigation />
      <div className="ContactForm">
        <div className="container">
          <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Row 1 of form */}
            <div>
              <div>
                <input
                  type="text"
                  name="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Entrez votre nom svp",
                    },
                    maxLength: {
                      value: 30,
                      message: "Moins de 30 caractères svp",
                    },
                  })}
                  placeholder="Votre nom"
                ></input>
                {errors.name && (
                  <span className="errorMessage">{errors.name.message}</span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                  placeholder="Adresse e-mail"
                ></input>
                {errors.email && (
                  <span className="errorMessage">
                    Veuillez entrer une adresse email valide
                  </span>
                )}
              </div>
            </div>
            {/* Row 2 of form */}
            <div>
              <input
                type="text"
                name="subject"
                {...register("subject", {
                  required: {
                    value: true,
                    message: "Veuillez entrer un sujet",
                  },
                  maxLength: {
                    value: 75,
                    message: "Ne peut excéder 75 caractères",
                  },
                })}
                placeholder="Objet de votre message"
              ></input>
              {errors.subject && (
                <span className="errorMessage">{errors.subject.message}</span>
              )}
            </div>
            {/* Row 3 of form */}
            <div className="messagetextarea">
              <div className="col">
                <textarea
                  rows={4}
                  columns={60}
                  name="message"
                  {...register("message", {
                    required: true,
                  })}
                  placeholder="Faites-moi part de vos questions ou commentaires"
                ></textarea>
                {errors.message && (
                  <span className="errorMessage">Please enter a message</span>
                )}
              </div>
            </div>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Contact;
