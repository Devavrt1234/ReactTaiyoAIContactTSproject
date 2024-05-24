import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate, useLocation } from "react-router";
import {
  getContactList,
  setContactList,
  updateContactList,
} from "../../utils/slices/contact-list";

type TFormfields = {
  id: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required "),
  lastName: Yup.string().required("Last Name is required "),
  //   status: Yup.string().required("Please select status "),
});

const initialValues: TFormfields = {
  id: "",
  firstName: "",
  lastName: "",
  status: "active",
};

type TEditForm = {
  editValues?: TFormfields;
  viewFormValue?: TFormfields;
};

const ContactForm = ({ editValues, viewFormValue }: TEditForm) => {
  const contactList = useSelector(getContactList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formValues = editValues ? editValues: viewFormValue? viewFormValue: initialValues;

  const addContactData = (values: TFormfields) => {
    /* add values */
    const updatedValues = {
      ...values,
      id: uuidv4(),
    };
    dispatch(setContactList(updatedValues));
    navigate("/");
  };

  const updateContactData = (values: TFormfields) => {
    console.log("called");
    const updatedData = contactList?.map((list) => {
      if (list?.id === editValues?.id) {
        return {
          ...list,
          firstName: values?.firstName,
          lastName: values?.lastName,
          status: values?.status,
        };
      }

      return list;
    });

    dispatch(updateContactList(updatedData));
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: formValues,
    validationSchema,
    onSubmit: (values: TFormfields) => {
      editValues  ? updateContactData(values): viewFormValue? handleBack(): addContactData(values);
    },
  });

  return (
    <>
      <form className="bg-gradient-to-l
from-blue-200 to-red-500 shadow-md rounded-3xl border-black border-2 px-8 pt-6 pb-8 mb-6 w-1/2 scale-95 hover:scale-100">
        <div className=" flex flex-col gap-5 justify-center items-center w-full">
          <div className=" w-[70%]">
            <label className="block text-white text-2xl font-bold mb-2">
              Firstname
            </label>
            <input
              name="firstName"
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline animate-pulse"
              type="text"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder="FirstName"
              disabled={viewFormValue ? true : false}
            />

            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-400">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="w-[70%]">
            <label className="block text-white text-2xl font-bold mb-2">
              Lastname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black-200 leading-tight focus:outline-none focus:shadow-outline animate-pulse"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder="LastName"
              disabled={viewFormValue ? true : false}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-400">{formik.errors.lastName}</div>
            )}
          </div>

          <div className="w-[70%]">
            <label className="block text-white text-2xl font-bold mb-2 animate-pulse">
              Status
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center ">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-800 bg-gray-100 border-gray-300  animate-pulse"
                  value="active"
                  name="status"
                  disabled={viewFormValue ? true : false}
                  checked={formik.values.status === "active"}
                  onChange={formik.handleChange}
                />
                <label className="ml-2 font-medium text-white text-2xl animate-pulse">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value="inactive"
                  disabled={viewFormValue ? true : false}
                  onChange={formik.handleChange}
                  name="status"
                  checked={formik.values.status === "inactive"}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  animate-pulse"
                />
                <label className="ml-2 font-medium text-white text-2xl animate-pulse">
                  Inactive
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-[70%]">
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline animate-pulse border-white border-2 rounded-full"
              type="button"
              onClick={() => formik.handleSubmit()}
              // disabled={viewFormValue ? true : false}
            >
              {/* {editValues ? "Update" : "Save"} */}

              {editValues ? "Update" : viewFormValue ? "Back to Home" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
// Certainly! Here's a detailed explanation of each line in the provided React component code:

// jsx
// Copy code
// import React, { useEffect, useState } from "react";
// This line imports React and specific hooks (useEffect, useState) from the 'react' library.

// jsx
// Copy code
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { v4 as uuidv4 } from "uuid";
// These lines import useFormik from the 'formik' library for form handling, Yup for validation schema, and uuidv4 from the 'uuid' library to generate unique IDs.

// jsx
// Copy code
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import { useDispatch } from "react-redux/es/exports";
// import { useNavigate, useLocation, useParams } from "react-router";
// These lines import hooks from 'react-redux' for accessing and modifying the Redux store, and hooks from 'react-router' for navigation and URL parameters.

// jsx
// Copy code
// import {
//   getContactList,
//   setContactList,
//   updateContactList,
// } from "../../utils/slices/contact-list";
// This line imports Redux action creators and selectors from a local utility file.

// jsx
// Copy code
// type TFormfields = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   status: "active" | "inactive";
// };
// Defines a TypeScript type TFormfields to specify the structure of the form data.

// jsx
// Copy code
// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("First Name is required "),
//   lastName: Yup.string().required("Last Name is required "),
//   //   status: Yup.string().required("Please select status "),
// });
// Defines a validation schema using Yup to ensure firstName and lastName are required fields. The status field validation is commented out.

// jsx
// Copy code
// const initialValues: TFormfields = {
//   id: "",
//   firstName: "",
//   lastName: "",
//   status: "active",
// };
// Defines the initial form values, setting the default status to "active".

// jsx
// Copy code
// type TEditForm = {
//   editValues?: TFormfields;
//   viewFormValue?: TFormfields;
// };
// Defines a TypeScript type TEditForm to specify the props that the ContactForm component can receive.

// jsx
// Copy code
// const ContactForm = ({ editValues, viewFormValue }: TEditForm) => {
// Defines the ContactForm component which takes editValues and viewFormValue as props.

// jsx
// Copy code
//   const contactList = useSelector(getContactList);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
// Uses React-Redux hooks to access the contact list, dispatch actions, and navigate programmatically.

// jsx
// Copy code
//   const formValues = editValues ? editValues: viewFormValue? viewFormValue: initialValues;
// Determines the initial values for the form based on the presence of editValues or viewFormValue props.

// jsx
// Copy code
//   const addContactData = (values: TFormfields) => {
//     const updatedValues = {
//       ...values,
//       id: uuidv4(),
//     };
//     dispatch(setContactList(updatedValues));
//     navigate("/");
//   };
// Defines a function addContactData to add a new contact. It assigns a unique ID to the contact, dispatches an action to update the contact list in the Redux store, and navigates to the home page.

// jsx
// Copy code
//   const updateContactData = (values: TFormfields) => {
//     console.log("called");
//     const updatedData = contactList?.map((list) => {
//       if (list?.id === editValues?.id) {
//         return {
//           ...list,
//           firstName: values?.firstName,
//           lastName: values?.lastName,
//           status: values?.status,
//         };
//       }

//       return list;
//     });

//     dispatch(updateContactList(updatedData));
//     navigate("/");
//   };
// Defines a function updateContactData to update an existing contact. It maps through the contact list to find the contact to be updated, modifies its details, dispatches an update action, and navigates to the home page.

// jsx
// Copy code
//   const handleBack = () => {
//     navigate("/");
//   };
// Defines a function handleBack to navigate back to the home page.

// jsx
// Copy code
//   const formik = useFormik({
//     initialValues: formValues,
//     validationSchema,
//     onSubmit: (values: TFormfields) => {
//       editValues
//         ? updateContactData(values)
//         : viewFormValue
//         ? handleBack()
//         : addContactData(values);
//     },
//   });
// Initializes Formik with the form values, validation schema, and submit handler. Depending on whether editValues or viewFormValue is present, it either updates a contact, goes back to the home page, or adds a new contact.

// jsx
// Copy code
//   return (
//     <>
//       <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
//         <div className=" flex flex-col gap-2 justify-center items-center w-full">
//           <div className=" w-[60%]">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Firstname
//             </label>
//             <input
//               name="firstName"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               type="text"
//               value={formik.values.firstName}
//               onChange={formik.handleChange}
//               placeholder="FirstName"
//               disabled={viewFormValue ? true : false}
//             />
//             {formik.touched.firstName && formik.errors.firstName && (
//               <div className="text-red-400">{formik.errors.firstName}</div>
//             )}
//           </div>
//           <div className="w-[60%]">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Lastname
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               type="text"
//               name="lastName"
//               value={formik.values.lastName}
//               onChange={formik.handleChange}
//               placeholder="LastName"
//               disabled={viewFormValue ? true : false}
//             />
//             {formik.touched.lastName && formik.errors.lastName && (
//               <div className="text-red-400">{formik.errors.lastName}</div>
//             )}
//           </div>
//           <div className="w-[60%]">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Status
//             </label>
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center ">
//                 <input
//                   type="radio"
//                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
//                   value="active"
//                   name="status"
//                   disabled={viewFormValue ? true : false}
//                   checked={formik.values.status === "active"}
//                   onChange={formik.handleChange}
//                 />
//                 <label className="ml-2 text-sm font-medium text-gray-900 ">
//                   Active
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="default-radio-2"
//                   type="radio"
//                   value="inactive"
//                   disabled={viewFormValue ? true : false}
//                   onChange={formik.handleChange}
//                   name="status"
//                   checked={formik.values.status === "inactive"}
//                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
//                 />
//                 <label className="ml-2 text-sm font-medium text-gray-900 ">
//                   Inactive
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-between w-[60%]">
//             <button
//               className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={() => formik.handleSubmit()}
//             >
//               {editValues ? "Update" : viewFormValue ? "Back to Home" : "Save"}
//             </button>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };
// This section renders the form UI, including input fields for first name, last name, and status, with appropriate labels and validation messages. It also includes a submit button which calls the formik handleSubmit method when clicked. The button label changes based on the presence of editValues or viewFormValue.

// jsx
// Copy code
// export default ContactForm;
// Exports the ContactForm component as the default export of the module.

// viewFormValue what is this
// ChatGPT
// In the provided code, viewFormValue is a prop passed to the ContactForm component. This prop allows the form to be rendered in a read-only or view mode, where the form fields are displayed with their values but cannot be edited.

// Here’s a more detailed explanation of how viewFormValue is used within the ContactForm component:

// Determining Form Mode:
// viewFormValue is used to determine whether the form should be in view mode. If viewFormValue is provided, the form fields will be populated with the values from viewFormValue, but the input fields will be disabled, preventing the user from modifying the values.

// Setting Initial Form Values:

// jsx
// Copy code
// const formValues = editValues ? editValues : viewFormValue ? viewFormValue : initialValues;
// This line sets the initial values of the form. If editValues is provided (indicating the form is in edit mode), those values are used. If not, and viewFormValue is provided (indicating the form is in view mode), those values are used. If neither is provided, the form uses the default initialValues.

// Disabling Input Fields:

// jsx
// Copy code
// <input
//   name="firstName"
//   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//   type="text"
//   value={formik.values.firstName}
//   onChange={formik.handleChange}
//   placeholder="FirstName"
//   disabled={viewFormValue ? true : false}
// />
// Each input field checks if viewFormValue is present. If it is, the disabled attribute is set to true, making the input field read-only.

// Button Label and Behavior:

// jsx
// Copy code
// <button
//   className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//   type="button"
//   onClick={() => formik.handleSubmit()}
// >
//   {editValues ? "Update" : viewFormValue ? "Back to Home" : "Save"}
// </button>
// The button label changes based on the presence of editValues or viewFormValue. If editValues is present, the button label is "Update". If viewFormValue is present, the button label is "Back to Home". Otherwise, it defaults to "Save".

// Form Submission Logic:

// jsx
// Copy code
// const formik = useFormik({
//   initialValues: formValues,
//   validationSchema,
//   onSubmit: (values: TFormfields) => {
//     editValues
//       ? updateContactData(values)
//       : viewFormValue
//       ? handleBack()
//       : addContactData(values);
//   },
// });
// In the onSubmit function of Formik, if viewFormValue is present, it calls handleBack() to navigate back to the home page instead of submitting the form data, as the form is in view mode.

// In summary, viewFormValue allows the ContactForm component to be used in a read-only mode where the form fields display data but are not editable, providing a way to view contact details without making changes.