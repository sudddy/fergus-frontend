import Modal from "components/Modal";
import React, { Fragment, useEffect, useState } from "react";
import axios from "request/index";
import {useForm} from "react-hook-form"
import _ from "lodash";
import EditIcon from "images/edit.svg"

const Jobs = () => {
  const [jobDetails, setJobDetails] = useState([]); 
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [job, setJob] = useState({});
  const [isNotes, setIsNotes] = useState(false);
  const {register} = useForm();

  const getInitialProps = () => {
    axios.get("/jobs/").then((req) => {
      setJobDetails(req.data);
      setFilteredJobs(req.data);
    });
  };

  const updateJob = (id) => {
    axios.get(`/jobs/${id}`).then((req) => {
      setJob(req.data[0]);
    });
    setShowModal(true);
  };

  const filterJobs = (e) => {
    if(_.isEmpty(e.target.value)){
      setFilteredJobs(jobDetails);
    }
    setFilteredJobs(_.filter(jobDetails, (filterItem) => {
      if(_.includes(_.toLower(filterItem.job_name),_.toLower(e.target.value))){
        return filterItem;
      }
    }));
  }

  useEffect(() => {
    getInitialProps();
  }, [job]);

  return (
    <div className="flex justify-center flex-col max-h-screen">
      {showModal ? (
        <Modal
          job={job}
          setJob={setJob}
          setShowModal={setShowModal}
          notes={isNotes}
        />
      ) : null}

     <div className="sort-filter flex flex-row justify-end mt-10 pr-20">
        <div className="grid content-center"> <p className="text-blue-900 uppercase mx-4">Filter</p></div>
        <input
              type="text"
              className="form-control block w-80 h-14 px-3 py-1.5 border border-solid border-formBorder rounded"
              id="exampleInputPassword1"
              placeholder="Job name"
              {...register("filter", {
                required: true,
                onChange: (e) => { filterJobs(e)},
              })}
            />
       
        </div>


      <div className="overflow-x-auto overflow-y-auto relative w-full px-20 bg-white uppercase  border-black my-10">
       

        <table className="w-full overflow-auto text-sm text-left border-separate border-spacing-y-8">
          <thead className="text-xs text-white  bg-blue-900 uppercase sticky top-0">
            <tr className="px-10 bg-blue-900">
              <th scope="col" className="py-6 px-6">
                Job Identifier
              </th>
              <th scope="col" className="py-6 px-6">
                <div className="flex items-center">Job Name</div>
              </th>
              <th scope="col" className="py-6 px-6">
                <div className="flex items-center">Contact Details</div>
              </th>
              <th scope="col" className="py-6 px-6">
                <div className="flex items-center">Job Status</div>
              </th>

              <th scope="col" className="py-6 px-6">
                <div className="flex items-center">Notes</div>
              </th>

              <th scope="col" className="py-6 px-6 mb-10">
                <span className="sr-only">Edit</span>
              </th>
            </tr> 
          </thead>
          <tbody>
            {filteredJobs.map((item,index) => (
              <Fragment key={index}>
                <tr key={index} className="border shadow-md border-[#0c4a6e] rounded-md hover:shadow-lg border-spacing-y-8">
                  <th
                    scope="row"
                    className="py-6 px-6 font-medium text-[#1e3a8a] whitespace-nowrap uppercase"
                  >
                    {item.job_identifier}
                  </th>
                  <td className="py-6 px-6">{item.job_name}</td>
                  <td className="py-6 px-6">{item.contact_details}</td>
                  <td className="py-6 px-6">
                  <span class="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{item.status}</span>
                        
                    </td>
                  <td className="py-6 px-6">
                    <button
                      onClick={() => {
                        setIsNotes(true);
                        updateJob(item._id);
                      }}
                      className="font-medium text-[#1e3a8a] dark:text-[#1e3a8a] hover:underline"
                    >
                      Notes
                    </button>
                  </td>
                  <td className="py-6 px-6 text-right">
                    <button
                      onClick={() => {
                        setIsNotes(false);
                        updateJob(item._id);
                      }}
                      className="font-medium text-[#1e3a8a] dark:text-[#1e3a8a] hover:underline"
                    >
                      <img src={EditIcon} width="20" height="20"/>
                    </button>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        {_.isEmpty(filteredJobs) ?<div className="flex justify-center"> <p className="ml-20">No Records to display</p></div>  : null}
      </div>
    </div>
  );
};

export default Jobs;
