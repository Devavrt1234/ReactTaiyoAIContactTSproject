import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getContactList,
  removeContactList,
} from "../../utils/slices/contact-list";
import EmptyState from '../Empty';

// import { ReactComponent as Empty } from "../../assets/images/empty-state.svg";
type TFormfields = {
  id: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
};

const ContactList = () => {
  const list = useSelector(getContactList);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/contact-form/${id}`);
  };
  const handleView = (id: string) => {
    navigate(`/contact-view-form/${id}`);
  };

  const handleDelete = (id: string) => {
    dispatch(removeContactList(id));
  };
  return (
    <>
      <div className="flex flex-col gap-3 w-full">
        <div className="w-full flex justify-center">
          <button
            onClick={() => navigate("/contact-form")}
            className="bg-gradient-to-t
            from-yellow-200 to-red-500 hover:bg-gradient-to-r
            from-blue-200 to-red-500 text-white font-semibold hover:text-white-800 hover:px-4 hover:py-4  py-3 px-3 mt-3 border-4 border-t-indigo-500 border-r-red-500 border-r-yellow-500 border-l-red-500 border-b-green-500 rounded-2xl animate-bounce"
          >
            Add Contacts
          </button>
        </div>

        {list?.length === 0 ? (
          <>
            <EmptyState />
          </>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full ">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Person's Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list?.map((list: any) => {
                  const name = list?.firstName + " " + list?.lastName;
                  return (
                    <>
                      <tr className="bg-white border-b " key={list?.id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {name}
                        </th>

                        <td className="px-6 py-4 text-gray-600">
                          {list?.status}
                        </td>
                        <td className="px-6 py-4 flex gap-4">
                          <p
                            onClick={() => handleView(list?.id)}
                            className="font-medium text-blue-600  hover:underline cursor-pointer"
                          >
                            View
                          </p>
                          <p
                            // href="#"
                            className="font-medium text-blue-600  hover:underline cursor-pointer"
                            onClick={() => handleEdit(list?.id)}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() => handleDelete(list?.id)}
                            className="font-medium text-red-600  hover:underline cursor-pointer"
                          >
                            Delete
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactList;

// import React, { useState } from "react";
// import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux/es/exports";
// import { useSelector } from "react-redux/es/hooks/useSelector";
// import {
//   getContactList,
//   removeContactList,
// } from "../../utils/slices/contact-list";
// import EmptyState from '../Empty';
// These lines import necessary modules and components. React, useState, useNavigate, useDispatch, and useSelector are imported from their respective libraries. getContactList and removeContactList are action creators/selectors from a Redux slice. EmptyState is a component to display when the contact list is empty.

// jsx
// Copy code
// type TFormfields = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   status: "active" | "inactive";
// };
// This defines a TypeScript type TFormfields to specify the structure of the contact form data.

// jsx
// Copy code
// const ContactList = () => {
// Defines the ContactList functional component.

// jsx
// Copy code
//   const list = useSelector(getContactList);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
// Uses React-Redux hooks to access the contact list from the Redux store, dispatch actions, and navigate programmatically.

// jsx
// Copy code
//   const handleEdit = (id: string) => {
//     navigate(`/contact-form/${id}`);
//   };
//   const handleView = (id: string) => {
//     navigate(`/contact-view-form/${id}`);
//   };
//   const handleDelete = (id: string) => {
//     dispatch(removeContactList(id));
//   };
// Defines three handler functions:

// handleEdit navigates to the contact form page for editing a contact by its ID.
// handleView navigates to the contact view form page to view the contact details by its ID.
// handleDelete dispatches an action to remove a contact from the list by its ID.
// jsx
// Copy code
//   return (
//     <>
//       <div className="flex flex-col gap-3 w-full">
//         <div className="w-full flex justify-end">
//           <button
//             onClick={() => navigate("/contact-form")}
//             className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
//           >
//             Add Contacts
//           </button>
//         </div>
{/* Renders a button that navigates to the contact form page to add a new contact. The button has Tailwind CSS classes for styling.

jsx
Copy code
        {list?.length === 0 ? (
          <>
            <EmptyState />
          </>
        ) : (
Checks if the contact list is empty. If it is, renders the EmptyState component.

jsx
Copy code
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Person's Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {list?.map((list: any) => {
                  const name = list?.firstName + " " + list?.lastName;
                  return (
                    <>
                      <tr className="bg-white border-b " key={list?.id}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {name}
                        </th>
                        <td className="px-6 py-4 text-gray-600">
                          {list?.status}
                        </td>
                        <td className="px-6 py-4 flex gap-4">
                          <p
                            onClick={() => handleView(list?.id)}
                            className="font-medium text-blue-600  hover:underline cursor-pointer"
                          >
                            View
                          </p>
                          <p
                            className="font-medium text-blue-600  hover:underline cursor-pointer"
                            onClick={() => handleEdit(list?.id)}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() => handleDelete(list?.id)}
                            className="font-medium text-red-600  hover:underline cursor-pointer"
                          >
                            Delete
                          </p>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}; */}
// If the contact list is not empty, it renders a table with the contact details. Each row in the table represents a contact and includes:

// The contact's name.
// The contact's status.
// Action links (View, Edit, Delete) to handle different actions on the contact.
// The table is styled using Tailwind CSS classes.

// jsx
// Copy code
// export default ContactList;
// Exports the ContactList component as the default export of the module.

// Summary:
