import Modal from "components/Modal";
import React, { Fragment, useEffect, useState } from "react";
import axios from "request/index";

const Jobs = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [job, setJob] = useState({});
  const [isNotes, setIsNotes] = useState(false);

  const getInitialProps = () => {
    axios.get("/jobs/").then((req) => {
      setJobDetails(req.data);
    });
  };

  const updateJob = (id) => {
    axios.get(`/jobs/${id}`).then((req) => {
      setJob(req.data[0]);
    });
    setShowModal(true);
  };

  useEffect(() => {
    getInitialProps();
  }, [job]);

  return (
    <div className="flex justify-center">
      {showModal ? (
        <Modal
          job={job}
          setJob={setJob}
          setShowModal={setShowModal}
          notes={isNotes}
        />
      ) : null}
      <div class="overflow-x-auto h-full overflow-y-auto relative w-full mx-40 bg-white uppercase">
        <table class="w-full overflow-auto text-sm text-left border-collapse border-spacing-y-6">
          <thead class="text-xs text-gray-700 uppercase">
            <tr className="px-10">
              <th scope="col" class="py-6 px-6">
                Job Identifier
              </th>
              <th scope="col" class="py-6 px-6">
                <div class="flex items-center">Job Name</div>
              </th>
              <th scope="col" class="py-6 px-6">
                <div class="flex items-center">Contact Details</div>
              </th>
              <th scope="col" class="py-6 px-6">
                <div class="flex items-center">Job Status</div>
              </th>

              <th scope="col" class="py-6 px-6">
                <div class="flex items-center">Notes</div>
              </th>

              <th scope="col" class="py-6 px-6 mb-10">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {jobDetails.map((item) => (
              <Fragment>
                <tr class="border shadow-md border-[#0c4a6e] rounded-md hover:shadow-lg">
                  <th
                    scope="row"
                    class="py-6 px-6 font-medium text-[#1e3a8a] whitespace-nowrap uppercase"
                  >
                    {item.job_identifier}
                  </th>
                  <td class="py-6 px-6">{item.job_name}</td>
                  <td class="py-6 px-6">{item.contact_details}</td>
                  <td class="py-6 px-6">{item.status}</td>
                  <td class="py-6 px-6">
                    <button
                      onClick={() => {
                        setIsNotes(true);
                        updateJob(item._id);
                      }}
                      class="font-medium text-[#1e3a8a] dark:text-[#1e3a8a] hover:underline"
                    >
                      Notes
                    </button>
                  </td>
                  <td class="py-6 px-6 text-right">
                    <button
                      onClick={() => {
                        setIsNotes(false);
                        updateJob(item._id);
                      }}
                      class="font-medium text-[#1e3a8a] dark:text-[#1e3a8a] hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <br />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobs;
